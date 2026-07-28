"use client";

import { loadAvailability, submitAvailability } from "@/app/actions";
import { ConfirmSheet } from "@/components/ConfirmSheet";
import { InputGrid, type MarkMode } from "@/components/InputGrid";
import { CtaButton, PhoneShell } from "@/components/ui";
import { meetingDays, type MeetingWindow } from "@/lib/slots";
import { useState, useTransition } from "react";

type Attendee = { id: string; name: string; role: string; status: string };
type Step = "name" | "already" | "days" | "grid" | "done" | "locked";

export function RespondFlow({
  token,
  title,
  window: meetingWindow,
  attendees,
  meetingStatus,
}: {
  token: string;
  title: string;
  window: MeetingWindow;
  attendees: Attendee[];
  meetingStatus: "collecting" | "confirmed";
}) {
  const [step, setStep] = useState<Step>(
    meetingStatus === "confirmed" ? "locked" : "name",
  );
  const [name, setName] = useState("");
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [dayBlocks, setDayBlocks] = useState<Set<string>>(new Set());
  const [marks, setMarks] = useState<Record<string, MarkMode>>({});
  const [mode, setMode] = useState<MarkMode>("unavail");
  const [error, setError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [loadingEdit, setLoadingEdit] = useState(false);

  const days = meetingDays(meetingWindow);

  function pickName(a: Attendee) {
    setName(a.name);
    setError(null);
    const submitted = a.status === "submitted";
    setWasSubmitted(submitted);
    if (meetingStatus === "confirmed") {
      setStep("locked");
      return;
    }
    if (submitted) setStep("already");
    else {
      setDayBlocks(new Set());
      setMarks({});
      setStep("days");
    }
  }

  async function startEdit() {
    setLoadingEdit(true);
    setError(null);
    const res = await loadAvailability(token, name);
    setLoadingEdit(false);
    if ("error" in res && res.error) {
      setError(res.error);
      return;
    }
    if ("ok" in res && res.ok) {
      if (res.meetingStatus === "confirmed") {
        setStep("locked");
        return;
      }
      setDayBlocks(new Set(res.dayBlocks));
      setMarks(res.marks);
      setWasSubmitted(true);
      setStep("days");
    }
  }

  function toggleDay(day: string) {
    setDayBlocks((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  }

  function paintSlot(day: string, startMinute: number, erase: boolean) {
    if (dayBlocks.has(day)) return;
    const k = `${day}|${startMinute}`;
    setMarks((prev) => {
      const next = { ...prev };
      if (erase) delete next[k];
      else next[k] = mode;
      return next;
    });
  }

  function requestSubmit() {
    setError(null);
    setConfirmOpen(true);
  }

  function doSubmit() {
    startTransition(async () => {
      const res = await submitAvailability({
        token,
        name: name.trim(),
        dayBlocks: [...dayBlocks],
        marks: Object.entries(marks).map(([k, mark]) => {
          const [day, min] = k.split("|");
          return { day, startMinute: Number(min), mark };
        }),
      });
      if (res?.error) {
        setError(res.error);
        setConfirmOpen(false);
        return;
      }
      setWasSubmitted(true);
      setConfirmOpen(false);
      setStep("done");
    });
  }

  const sheet = (
    <ConfirmSheet
      open={confirmOpen}
      title={
        wasSubmitted ? "이전 입력을\n덮어쓸까요?" : "이대로 입력을\n완료할까요?"
      }
      message={
        wasSubmitted
          ? "새로 입력한 내용으로 바뀌어요. 회의 확정 전까지 다시 수정할 수 있어요."
          : "회의가 확정되기 전까지 다시 수정할 수 있어요."
      }
      confirmText={wasSubmitted ? "덮어쓰기" : "완료하기"}
      cancelText="더 수정할게요"
      pending={pending}
      onConfirm={doSubmit}
      onCancel={() => setConfirmOpen(false)}
    />
  );

  if (step === "locked") {
    return (
      <PhoneShell title="일정 입력">
        <div className="flex flex-col items-center pt-16 text-center">
          <h2 className="text-[22px] font-bold">이미 확정된 회의예요</h2>
          <p className="mt-3 text-[15px] text-toss-muted">
            {title}
            <br />
            일정을 더 이상 수정할 수 없어요
          </p>
        </div>
      </PhoneShell>
    );
  }

  if (step === "done") {
    return (
      <PhoneShell
        title="일정 입력"
        footer={
          <CtaButton variant="secondary" onClick={startEdit} disabled={loadingEdit}>
            {loadingEdit ? "불러오는 중…" : "수정하기"}
          </CtaButton>
        }
      >
        <div className="flex flex-col items-center pt-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-toss-blue-50 text-2xl text-toss-blue">
            ✓
          </div>
          <h2 className="mt-6 text-[22px] font-bold">입력을 완료했어요</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-toss-muted">
            주최자가 일정을 확정하면 알려드릴게요.
            <br />
            확정 전까지는 아래에서 수정할 수 있어요.
          </p>
          {error ? <p className="mt-4 text-[14px] text-toss-red">{error}</p> : null}
        </div>
      </PhoneShell>
    );
  }

  if (step === "already") {
    return (
      <PhoneShell
        title="일정 입력"
        footer={
          <div className="flex flex-col gap-2">
            {error ? <p className="text-[13px] text-toss-red">{error}</p> : null}
            <CtaButton variant="secondary" onClick={() => setStep("done")}>
              그대로 두기
            </CtaButton>
            <CtaButton onClick={startEdit} disabled={loadingEdit}>
              {loadingEdit ? "불러오는 중…" : "수정하기"}
            </CtaButton>
          </div>
        }
      >
        <div className="flex flex-col items-center pt-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-toss-blue-50 text-2xl text-toss-blue">
            ✓
          </div>
          <h2 className="mt-6 text-[22px] font-bold">이미 일정을 입력했어요</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-toss-muted">
            {name}님 · 회의가 확정되기 전까지
            <br />
            다시 수정할 수 있어요
          </p>
        </div>
      </PhoneShell>
    );
  }

  if (step === "name") {
    return (
      <PhoneShell title="일정 입력">
        <h2 className="text-[22px] font-bold">이름을 확인해주세요</h2>
        <p className="mt-2 text-[15px] text-toss-muted">{title}</p>

        {attendees.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-toss-red/10 px-4 py-3 text-[14px] text-toss-red">
            참석자 목록이 비어 있어요. 주최자가 회의를 다시 만들어 링크를 보내주세요.
          </p>
        ) : (
          <ul className="mt-6 space-y-2">
            {attendees.map((a) => (
              <li key={a.id || a.name}>
                <button
                  type="button"
                  onClick={() => pickName(a)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-white px-4 py-4 text-left active:bg-toss-blue-50"
                >
                  <span className="text-[16px] font-semibold text-toss-ink">
                    {a.name}
                  </span>
                  <span className="text-[12px] text-toss-faint">
                    {a.role === "required" ? "필수" : "선택"}
                    {a.status === "submitted" ? " · 제출함" : ""}
                    {" →"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[13px] text-toss-faint">
          본인 이름을 누르면 일정 입력으로 넘어가요
        </p>
      </PhoneShell>
    );
  }

  if (step === "days") {
    return (
      <PhoneShell
        title="일정 입력"
        footer={<CtaButton onClick={() => setStep("grid")}>다음</CtaButton>}
      >
        <button
          type="button"
          className="mb-2 text-lg"
          onClick={() => setStep(wasSubmitted ? "already" : "name")}
        >
          ←
        </button>
        <h2 className="text-[22px] font-bold leading-snug">
          하루 종일 안 되는 날이 있나요?
        </h2>
        <p className="mt-2 text-[15px] text-toss-muted">
          {name}님 · 외근·휴가처럼 통째로 막는 날
          {wasSubmitted ? " · 이전 입력을 불러왔어요" : ""}
        </p>
        {days.length === 0 ? (
          <p className="mt-6 text-[14px] text-toss-red">
            선택 가능한 날짜가 없어요. 주최자 설정을 확인해주세요.
          </p>
        ) : (
          <ul className="mt-6 space-y-2">
            {days.map((d) => {
              const on = dayBlocks.has(d);
              return (
                <li key={d}>
                  <button
                    type="button"
                    onClick={() => toggleDay(d)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left ${
                      on ? "bg-toss-red/10 ring-1 ring-toss-red/40" : "bg-white"
                    }`}
                  >
                    <span className="font-semibold">{d}</span>
                    <span className="text-[13px] text-toss-faint">
                      {on ? "전체 불가" : "가능"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </PhoneShell>
    );
  }

  return (
    <PhoneShell
      title="일정 입력"
      footer={
        <div className="flex flex-col gap-2">
          {error ? <p className="text-[13px] text-toss-red">{error}</p> : null}
          <CtaButton disabled={pending} onClick={requestSubmit}>
            입력 완료
          </CtaButton>
        </div>
      }
    >
      {sheet}
      <button type="button" className="mb-2 text-lg" onClick={() => setStep("days")}>
        ←
      </button>
      <h2 className="text-[22px] font-bold leading-snug">
        나머지 안 되는 시간을 찍어주세요
      </h2>
      <p className="mt-2 text-[15px] text-toss-muted">
        드래그로 여러 칸 · 30분 단위
        {wasSubmitted ? " · 덮어쓰기 예정" : ""}
      </p>

      <div className="mt-4 mb-3 flex gap-1 rounded-xl bg-white p-1">
        <button
          type="button"
          className={`h-10 flex-1 rounded-lg text-[15px] font-semibold ${
            mode === "unavail" ? "bg-toss-red text-white" : "text-toss-muted"
          }`}
          onClick={() => setMode("unavail")}
        >
          불가
        </button>
        <button
          type="button"
          className={`h-10 flex-1 rounded-lg text-[15px] font-semibold ${
            mode === "pref" ? "bg-toss-amber text-[#8B6914]" : "text-toss-muted"
          }`}
          onClick={() => setMode("pref")}
        >
          비선호
        </button>
      </div>

      <InputGrid
        window={meetingWindow}
        mode={mode}
        marks={marks}
        dayBlocks={dayBlocks}
        onPaint={paintSlot}
      />
    </PhoneShell>
  );
}
