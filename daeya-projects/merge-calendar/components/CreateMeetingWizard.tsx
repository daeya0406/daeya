'use client';

import { createMeeting } from '@/app/actions';
import { CtaButton, PhoneShell } from '@/components/ui';
import { MAX_WINDOW_HOURS } from '@/lib/slots';
import { useMemo, useState, useTransition } from 'react';

const WEEKDAY_OPTS = [
  { v: 1, label: '월' },
  { v: 2, label: '화' },
  { v: 3, label: '수' },
  { v: 4, label: '목' },
  { v: 5, label: '금' },
  { v: 6, label: '토' },
  { v: 0, label: '일' },
];

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function addDaysISO(iso: string, n: number) {
  const d = new Date(iso + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

type Member = { name: string; role: 'required' | 'optional' };

export function CreateMeetingWizard({
  hostName,
  userLabel,
}: {
  hostName: string;
  userLabel?: string | null;
}) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('팀 킥오프 미팅');
  const [rangeStart, setRangeStart] = useState(todayISO());
  const [rangeEnd, setRangeEnd] = useState(addDaysISO(todayISO(), 4));
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(18); // 9시간 창 (최대 10)
  const [weekdays, setWeekdays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [members, setMembers] = useState<Member[]>([
    { name: hostName, role: 'required' },
    { name: '', role: 'required' },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const slotStart = startHour * 60;
  const slotEnd = endHour * 60;

  const reviewDays = useMemo(
    () =>
      WEEKDAY_OPTS.filter((w) => weekdays.includes(w.v))
        .map((w) => w.label)
        .join('·'),
    [weekdays]
  );

  function setStart(h: number) {
    setStartHour(h);
    const maxEnd = Math.min(24, h + MAX_WINDOW_HOURS);
    const minEnd = Math.min(24, h + 1);
    setEndHour((prev) => Math.min(maxEnd, Math.max(minEnd, prev)));
  }

  function setEnd(h: number) {
    const minEnd = startHour + 1;
    const maxEnd = Math.min(24, startHour + MAX_WINDOW_HOURS);
    setEndHour(Math.min(maxEnd, Math.max(minEnd, h)));
  }

  function toggleDay(v: number) {
    setWeekdays((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v].sort()));
  }

  function submit() {
    setError(null);
    startTransition(async () => {
      const res = await createMeeting({
        title,
        range_start: rangeStart,
        range_end: rangeEnd,
        slot_start_minute: slotStart,
        slot_end_minute: slotEnd,
        weekdays,
        attendees: members.filter((m) => m.name.trim()),
      });
      if (res?.error) setError(res.error);
    });
  }

  return (
    <PhoneShell
      title="회의 만들기"
      backHref={step > 1 ? undefined : '/'}
      userLabel={userLabel}
      footer={
        step < 4 ? (
          <CtaButton
            onClick={() => {
              if (step === 1 && !title.trim()) {
                setError('회의 이름을 입력해주세요');
                return;
              }
              if (step === 2) {
                const spanH = endHour - startHour;
                if (spanH > MAX_WINDOW_HOURS || spanH < 1) {
                  setError(`하루 가능 시간은 1~${MAX_WINDOW_HOURS}시간이에요`);
                  return;
                }
              }
              if (step === 3) {
                if (!members.some((m) => m.name.trim())) {
                  setError('참석자를 한 명 이상 추가해주세요');
                  return;
                }
                if (members.some((m) => !m.name.trim())) {
                  setError('참석자 이름을 입력해주세요');
                  return;
                }
              }
              setError(null);
              setStep((s) => s + 1);
            }}
          >
            {step === 3 ? '회의 만들기' : '다음'}
          </CtaButton>
        ) : (
          <div className="flex flex-col gap-2">
            <CtaButton disabled={pending} onClick={submit}>
              {pending ? '보내는 중…' : '일정 입력 요청 발송'}
            </CtaButton>
            <CtaButton variant="secondary" onClick={() => setStep(3)}>
              이전
            </CtaButton>
          </div>
        )
      }
    >
      {error ? (
        <p className="bg-toss-red/10 text-toss-red mb-3 rounded-xl px-3 py-2 text-[14px]">
          {error}
        </p>
      ) : null}

      {step === 1 ? (
        <section>
          <h2 className="text-[22px] font-bold leading-snug">회의 이름을 입력해요</h2>
          <p className="text-toss-muted mt-2 text-[15px]">참석자에게 보이는 회의 제목이에요</p>
          <label className="field-card mt-6">
            <span className="text-toss-faint text-[13px] font-semibold">회의 이름</span>
            <input
              className="field-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="회의 이름"
            />
          </label>
        </section>
      ) : null}

      {step === 2 ? (
        <section>
          <button type="button" className="mb-2 text-lg" onClick={() => setStep(1)}>
            ←
          </button>
          <h2 className="text-[22px] font-bold leading-snug">언제 맞출까요?</h2>
          <p className="text-toss-muted mt-2 text-[15px]">
            이 기간·시간·요일 안에서만 선택할 수 있어요
          </p>

          <div className="mt-6 space-y-4 rounded-2xl bg-white p-4">
            <label className="text-toss-faint block text-[13px] font-semibold">
              시작일
              <input
                type="date"
                className="mt-1 w-full text-[17px]"
                value={rangeStart}
                onChange={(e) => setRangeStart(e.target.value)}
              />
            </label>
            <label className="text-toss-faint block text-[13px] font-semibold">
              종료일
              <input
                type="date"
                className="mt-1 w-full text-[17px]"
                value={rangeEnd}
                onChange={(e) => setRangeEnd(e.target.value)}
              />
            </label>
            <div className="flex gap-3">
              <label className="text-toss-faint flex-1 text-[13px] font-semibold">
                하루 시작
                <select
                  className="mt-1 w-full text-[17px]"
                  value={startHour}
                  onChange={(e) => setStart(Number(e.target.value))}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i} disabled={i >= 23}>
                      {i}:00
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-toss-faint flex-1 text-[13px] font-semibold">
                하루 끝
                <select
                  className="mt-1 w-full text-[17px]"
                  value={endHour}
                  onChange={(e) => setEnd(Number(e.target.value))}
                >
                  {Array.from({ length: 24 }, (_, i) => {
                    const h = i + 1;
                    const minEnd = startHour + 1;
                    const maxEnd = Math.min(24, startHour + MAX_WINDOW_HOURS);
                    const ok = h >= minEnd && h <= maxEnd;
                    return (
                      <option key={h} value={h} disabled={!ok}>
                        {h}:00
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <p className="text-toss-faint text-[12px]">
              슬롯 30분 단위 · 하루 창은 최대 {MAX_WINDOW_HOURS}시간
              {` (${endHour - startHour}시간 선택됨)`}
            </p>
            <div>
              <p className="text-toss-faint text-[13px] font-semibold">포함할 요일</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {WEEKDAY_OPTS.map((w) => {
                  const on = weekdays.includes(w.v);
                  return (
                    <button
                      key={w.v}
                      type="button"
                      onClick={() => toggleDay(w.v)}
                      className={`h-10 w-10 rounded-full text-[14px] font-semibold ${
                        on ? 'bg-toss-blue text-white' : 'bg-toss-bg text-toss-muted'
                      }`}
                    >
                      {w.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {step === 3 ? (
        <section>
          <button type="button" className="mb-2 text-lg" onClick={() => setStep(2)}>
            ←
          </button>
          <h2 className="text-[22px] font-bold leading-snug">참석자를 추가해요</h2>
          <p className="text-toss-muted mt-2 text-[15px]">필수·선택 참석 여부를 설정해요</p>
          <ul className="mt-6 space-y-2">
            {members.map((m, i) => (
              <li key={i} className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2">
                <select
                  className="bg-toss-bg rounded-lg px-2 py-2 text-[13px] font-semibold"
                  value={m.role}
                  onChange={(e) => {
                    const role = e.target.value as Member['role'];
                    setMembers((prev) => prev.map((x, j) => (j === i ? { ...x, role } : x)));
                  }}
                >
                  <option value="required">필수</option>
                  <option value="optional">선택</option>
                </select>
                <input
                  className="min-w-0 flex-1 bg-transparent text-[16px] outline-none"
                  placeholder="이름"
                  value={m.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setMembers((prev) => prev.map((x, j) => (j === i ? { ...x, name } : x)));
                  }}
                  aria-label="참석자 이름"
                />
                {i > 0 ? (
                  <button
                    type="button"
                    className="text-toss-faint"
                    onClick={() => setMembers((prev) => prev.filter((_, j) => j !== i))}
                  >
                    삭제
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="text-toss-blue mt-3 text-[15px] font-semibold"
            onClick={() => setMembers((prev) => [...prev, { name: '', role: 'optional' }])}
          >
            + 참석자 추가
          </button>
        </section>
      ) : null}

      {step === 4 ? (
        <section>
          <h2 className="text-[22px] font-bold leading-snug">이렇게 요청할까요?</h2>
          <dl className="mt-6 space-y-3 rounded-2xl bg-white p-4 text-[15px]">
            <div>
              <dt className="text-toss-faint">회의 이름</dt>
              <dd className="font-semibold">{title}</dd>
            </div>
            <div>
              <dt className="text-toss-faint">기간</dt>
              <dd className="font-semibold">
                {rangeStart} ~ {rangeEnd}
              </dd>
            </div>
            <div>
              <dt className="text-toss-faint">시간 · 요일</dt>
              <dd className="font-semibold">
                {startHour}:00–{endHour}:00 · {reviewDays}
              </dd>
            </div>
            <div>
              <dt className="text-toss-faint">
                참석자 ({members.filter((m) => m.name.trim()).length}명)
              </dt>
              <dd className="mt-1 space-y-1">
                {members
                  .filter((m) => m.name.trim())
                  .map((m) => (
                    <div key={m.name} className="flex justify-between">
                      <span>{m.name}</span>
                      <span className="text-toss-faint">
                        {m.role === 'required' ? '필수' : '선택'}
                      </span>
                    </div>
                  ))}
              </dd>
            </div>
          </dl>
        </section>
      ) : null}
    </PhoneShell>
  );
}
