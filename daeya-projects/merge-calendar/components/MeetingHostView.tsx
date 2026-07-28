"use client";

import { DayPageTabs, useDayPages } from "@/components/DayPageTabs";
import { HeatmapGrid } from "@/components/HeatmapGrid";
import { CtaButton, PhoneShell } from "@/components/ui";
import {
  buildHeatmap,
  layerColor,
  type AttendeeInput,
} from "@/lib/heatmap";
import {
  dayShort,
  hourLabels,
  meetingDays,
  minuteLabel,
  slotMinutes,
  type MeetingWindow,
} from "@/lib/slots";
import { useMemo, useState, useTransition } from "react";
import { confirmSlot } from "@/app/actions";


type Props = {
  meetingId: string;
  title: string;
  inviteToken: string;
  status: "collecting" | "confirmed";
  confirmedDay: string | null;
  confirmedStartMinute: number | null;
  window: MeetingWindow;
  attendees: AttendeeInput[];
  origin: string;
  userLabel?: string | null;
};

export function MeetingHostView(props: Props) {
  const [tab, setTab] = useState<"status" | "heat" | "layer" | "done">(
    props.status === "confirmed" ? "done" : "status",
  );
  const [selected, setSelected] = useState<{
    day: string;
    startMinute: number;
  } | null>(
    props.confirmedDay && props.confirmedStartMinute != null
      ? { day: props.confirmedDay, startMinute: props.confirmedStartMinute }
      : null,
  );
  const [activeIds, setActiveIds] = useState(
    () => new Set(props.attendees.filter((a) => a.status === "submitted").map((a) => a.id)),
  );
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();

  const cells = useMemo(
    () => buildHeatmap(props.window, props.attendees),
    [props.window, props.attendees],
  );

  const inviteUrl = `${props.origin}/m/${props.inviteToken}`;
  const submitted = props.attendees.filter((a) => a.status === "submitted").length;
  const shell = { userLabel: props.userLabel };

  function doConfirm() {
    if (!selected) return;
    setError(null);
    startTransition(async () => {
      const res = await confirmSlot(
        props.meetingId,
        selected.day,
        selected.startMinute,
      );
      if (res?.error) setError(res.error);
      else setTab("done");
    });
  }

  if (tab === "done" || props.status === "confirmed") {
    const day = selected?.day ?? props.confirmedDay;
    const min = selected?.startMinute ?? props.confirmedStartMinute;
    return (
      <PhoneShell title="가능한 시간" backHref="/meetings/new" {...shell}>
        <div className="flex flex-col items-center pt-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-toss-blue-50 text-2xl text-toss-blue">
            ✓
          </div>
          <h2 className="mt-6 text-[22px] font-bold">회의 시간을 확정했어요</h2>
          <p className="mt-3 text-[17px] font-semibold text-toss-blue">
            {day} {min != null ? minuteLabel(min) : ""}
          </p>
          <p className="mt-1 text-[15px] text-toss-muted">{props.title}</p>
        </div>
        <ul className="mt-8 space-y-2">
          {props.attendees.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-[14px]"
            >
              <span>
                {a.name}
                <span className="ml-2 text-toss-faint">
                  {a.role === "required" ? "필수" : "선택"}
                </span>
              </span>
              <span
                className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                  a.status === "submitted"
                    ? "bg-toss-blue-50 text-toss-blue"
                    : "bg-toss-line text-toss-faint"
                }`}
              >
                {a.status === "submitted" ? "참석" : "미제출"}
              </span>
            </li>
          ))}
        </ul>
      </PhoneShell>
    );
  }

  if (tab === "status") {
    return (
      <PhoneShell
        title="가능한 시간"
        backHref="/meetings/new"
        {...shell}
        footer={
          <CtaButton
            onClick={() => setTab("heat")}
            disabled={submitted === 0}
          >
            {submitted === 0 ? "입력을 기다려 주세요" : "가능한 시간 보기"}
          </CtaButton>
        }
      >
        <h2 className="text-[22px] font-bold">{props.title}</h2>
        <p className="mt-2 text-[15px] text-toss-muted">
          {submitted}/{props.attendees.length}명 입력 완료
        </p>

        <div className="mt-6 rounded-2xl bg-white p-4">
          <p className="text-[13px] font-semibold text-toss-faint">초대 링크</p>
          <p className="mt-1 break-all text-[13px] text-toss-blue">{inviteUrl}</p>
          <p className="mt-2 text-[12px] leading-relaxed text-toss-faint">
            참석자에게 이 링크를 보내세요. 로그인 없이 이름만 입력하면 돼요.
            {` `}(같은 Wi‑Fi면 localhost 링크도 본인 폰에서 열립니다)
          </p>
          <button
            type="button"
            className="mt-3 text-[14px] font-semibold text-toss-ink"
            onClick={async () => {
              await navigator.clipboard.writeText(inviteUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? "복사됐어요" : "링크 복사"}
          </button>
        </div>

        {submitted === 0 ? (
          <div className="mt-4 rounded-2xl bg-toss-blue-50 px-4 py-3 text-[14px] text-toss-blue">
            아직 제출한 사람이 없어요. 링크를 공유한 뒤 다시 들어와 주세요.
          </div>
        ) : null}

        <ul className="mt-4 space-y-2">
          {props.attendees.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between rounded-2xl bg-white px-4 py-3"
            >
              <span className="text-[15px]">
                {a.name}
                <span className="ml-2 text-[12px] text-toss-faint">
                  {a.role === "required" ? "필수" : "선택"}
                </span>
              </span>
              <span
                className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                  a.status === "submitted"
                    ? "bg-toss-blue-50 text-toss-blue"
                    : "bg-toss-line text-toss-faint"
                }`}
              >
                {a.status === "submitted" ? "완료" : "대기중"}
              </span>
            </li>
          ))}
        </ul>
      </PhoneShell>
    );
  }

  if (tab === "layer") {
    return (
      <PhoneShell
        title="일정 겹쳐보기"
        {...shell}
        footer={
          <CtaButton variant="secondary" onClick={() => setTab("heat")}>
            히트맵으로 돌아가기
          </CtaButton>
        }
      >
        <button type="button" className="mb-2 text-lg" onClick={() => setTab("heat")}>
          ←
        </button>
        <h2 className="text-[20px] font-bold">이름을 켜고 겹쳐 봐요</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {props.attendees.map((a) => {
            const on = activeIds.has(a.id);
            const disabled = a.status !== "submitted";
            return (
              <button
                key={a.id}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setActiveIds((prev) => {
                    const next = new Set(prev);
                    if (next.has(a.id)) next.delete(a.id);
                    else next.add(a.id);
                    return next;
                  });
                }}
                className={`rounded-full px-3 py-1.5 text-[13px] font-semibold disabled:opacity-40 ${
                  on ? "bg-toss-blue text-white" : "bg-white text-toss-muted"
                }`}
              >
                {a.name}
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <LayerGrid window={props.window} attendees={props.attendees} activeIds={activeIds} />
        </div>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell
      title="가능한 시간"
      {...shell}
      footer={
        <div className="flex flex-col gap-2">
          {error ? <p className="text-[13px] text-toss-red">{error}</p> : null}
          <CtaButton disabled={!selected || pending} onClick={doConfirm}>
            {pending ? "확정 중…" : "이 시간으로 확정"}
          </CtaButton>
          <CtaButton variant="secondary" onClick={() => setTab("layer")}>
            개별 일정 겹쳐보기
          </CtaButton>
        </div>
      }
    >
      <button type="button" className="mb-2 text-lg" onClick={() => setTab("status")}>
        ←
      </button>
      <h2 className="text-[22px] font-bold">한눈에 비교해요</h2>
      <p className="mt-2 text-[15px] text-toss-muted">
        전원 가능 · 조율 대상 · 30분 단위
      </p>
      {submitted === 0 ? (
        <div className="mt-10 rounded-2xl bg-white px-6 py-12 text-center">
          <p className="text-[17px] font-semibold text-toss-ink">아직 모인 일정이 없어요</p>
          <p className="mt-2 text-[14px] text-toss-muted">
            참석자가 링크에서 일정을 내면 여기에 히트맵이 생겨요
          </p>
          <button
            type="button"
            className="mt-6 text-[15px] font-semibold text-toss-blue"
            onClick={() => setTab("status")}
          >
            초대 링크로 돌아가기
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4">
            <HeatmapGrid
              window={props.window}
              cells={cells}
              selected={selected}
              onSelect={(day, startMinute) => setSelected({ day, startMinute })}
            />
          </div>
          {selected ? (
            <p className="mt-3 text-center text-[14px] font-semibold text-toss-blue">
              선택: {selected.day} {minuteLabel(selected.startMinute)}
            </p>
          ) : (
            <p className="mt-3 text-center text-[14px] text-toss-faint">
              시간을 선택해주세요
            </p>
          )}
        </>
      )}
    </PhoneShell>
  );
}

function LayerGrid({
  window,
  attendees,
  activeIds,
}: {
  window: MeetingWindow;
  attendees: AttendeeInput[];
  activeIds: Set<string>;
}) {
  const allDays = meetingDays(window);
  const { page, setPage, pageCount, visibleDays, labels } = useDayPages(allDays);
  const hours = hourLabels(window);

  return (
    <div className="w-full rounded-2xl bg-white p-2">
      <DayPageTabs
        page={page}
        pageCount={pageCount}
        labels={labels}
        onChange={setPage}
      />
      <div
        className="grid w-full gap-0.5"
        style={{
          gridTemplateColumns: `28px repeat(${visibleDays.length}, minmax(0, 1fr))`,
        }}
      >
        <div />
        {visibleDays.map((d) => (
          <div
            key={d}
            className="min-w-0 py-1 text-center text-[11px] font-semibold text-toss-muted"
          >
            {dayShort(d)}
          </div>
        ))}
        {hours.map((h) => {
          const mins = [h * 60, h * 60 + 30].filter((m) =>
            slotMinutes(window).includes(m),
          );
          if (!mins.length) return null;
          return (
            <div key={h} className="contents">
              <div className="flex items-center justify-end pr-1 text-[10px] leading-none text-toss-faint">
                {h}
              </div>
              {visibleDays.map((day) => (
                <div key={day} className="flex min-w-0 flex-col gap-0.5">
                  {mins.map((m) => {
                    const c = layerColor(attendees, activeIds, day, m);
                    const bg =
                      c === "unavail"
                        ? "bg-toss-red/35"
                        : c === "pref"
                          ? "bg-toss-amber/50"
                          : c === "ok"
                            ? "bg-toss-blue/20"
                            : "bg-toss-line/20";
                    return (
                      <div
                        key={m}
                        className={`h-5 w-full rounded-sm ${bg}`}
                        title={minuteLabel(m)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
