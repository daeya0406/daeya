"use client";

import { DayPageTabs, useDayPages } from "@/components/DayPageTabs";
import {
  dayShort,
  hourLabels,
  meetingDays,
  minuteLabel,
  slotMinutes,
  type MeetingWindow,
} from "@/lib/slots";
import { useCallback, useRef } from "react";

export type MarkMode = "unavail" | "pref";

type Props = {
  window: MeetingWindow;
  mode: MarkMode;
  marks: Record<string, MarkMode>;
  dayBlocks: Set<string>;
  onPaint: (day: string, startMinute: number, erase: boolean) => void;
};

function key(day: string, m: number) {
  return `${day}|${m}`;
}

/** Hour-labeled rows; 30-min cells; paginate by 5 days. */
export function InputGrid({ window, mode, marks, dayBlocks, onPaint }: Props) {
  const allDays = meetingDays(window);
  const { page, setPage, pageCount, visibleDays, labels } = useDayPages(allDays);
  const hours = hourLabels(window);
  const painting = useRef(false);
  const eraseStroke = useRef(false);
  const painted = useRef(new Set<string>());

  const paintFromPoint = useCallback(
    (clientX: number, clientY: number) => {
      const el = document.elementFromPoint(clientX, clientY);
      const cell = el?.closest?.("[data-slot]") as HTMLElement | null;
      if (!cell) return;
      const day = cell.dataset.day;
      const minute = cell.dataset.minute;
      if (!day || minute == null) return;
      if (dayBlocks.has(day)) return;
      const k = key(day, Number(minute));
      if (painted.current.has(k)) return;
      painted.current.add(k);
      onPaint(day, Number(minute), eraseStroke.current);
    },
    [dayBlocks, onPaint],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    const cell = (e.target as HTMLElement).closest?.("[data-slot]") as HTMLElement | null;
    if (!cell) return;
    const day = cell.dataset.day;
    const minute = cell.dataset.minute;
    if (!day || minute == null || dayBlocks.has(day)) return;

    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

    const k = key(day, Number(minute));
    eraseStroke.current = marks[k] === mode;
    painting.current = true;
    painted.current = new Set();
    painted.current.add(k);
    onPaint(day, Number(minute), eraseStroke.current);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!painting.current) return;
    paintFromPoint(e.clientX, e.clientY);
  };

  const onPointerUp = () => {
    painting.current = false;
    painted.current = new Set();
  };

  return (
    <div className="w-full rounded-2xl bg-white p-2">
      <DayPageTabs
        page={page}
        pageCount={pageCount}
        labels={labels}
        onChange={setPage}
      />
      <div
        className="grid w-full select-none gap-0.5 touch-none"
        style={{
          gridTemplateColumns: `28px repeat(${visibleDays.length}, minmax(0, 1fr))`,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={(e) => {
          if (!painting.current) return;
          if (!(e.currentTarget as HTMLElement).hasPointerCapture?.(e.pointerId)) {
            onPointerUp();
          }
        }}
      >
        <div />
        {visibleDays.map((d) => (
          <div
            key={d}
            className="min-w-0 py-1 text-center text-[11px] font-semibold text-toss-muted"
          >
            {dayShort(d)}
            <div className="text-[10px] font-normal text-toss-faint">
              {d.slice(5).replace("-", "/")}
            </div>
          </div>
        ))}

        {hours.map((h) => {
          const top = h * 60;
          const bottom = h * 60 + 30;
          const showTop = slotMinutes(window).includes(top);
          const showBottom = slotMinutes(window).includes(bottom);
          if (!showTop && !showBottom) return null;

          return (
            <HourRow
              key={h}
              hour={h}
              days={visibleDays}
              top={showTop ? top : null}
              bottom={showBottom ? bottom : null}
              marks={marks}
              dayBlocks={dayBlocks}
              mode={mode}
            />
          );
        })}
      </div>
      <p className="mt-2 px-1 text-center text-[12px] text-toss-faint">
        드래그로 여러 칸 · 위(:00)/아래(:30)
        {pageCount > 1 ? ` · ${page + 1}/${pageCount}페이지` : ""} ·{" "}
        {mode === "unavail" ? "불가" : "비선호"}
      </p>
    </div>
  );
}

function HourRow({
  hour,
  days,
  top,
  bottom,
  marks,
  dayBlocks,
  mode,
}: {
  hour: number;
  days: string[];
  top: number | null;
  bottom: number | null;
  marks: Record<string, MarkMode>;
  dayBlocks: Set<string>;
  mode: MarkMode;
}) {
  return (
    <>
      <div className="flex items-center justify-end pr-1 text-[10px] leading-none text-toss-faint">
        {hour}
      </div>
      {days.map((day) => (
        <div key={day} className="flex min-w-0 flex-col gap-0.5">
          {[top, bottom].map((m, i) => {
            if (m === null) {
              return <div key={i} className="h-5 w-full" />;
            }
            const blocked = dayBlocks.has(day);
            const mark = marks[key(day, m)];
            let bg = "bg-toss-line/30";
            if (blocked) bg = "bg-toss-line/60";
            else if (mark === "unavail") bg = "bg-toss-red/25";
            else if (mark === "pref") bg = "bg-toss-amber/50";

            return (
              <div
                key={m}
                role="button"
                tabIndex={blocked ? -1 : 0}
                data-slot
                data-day={day}
                data-minute={m}
                title={minuteLabel(m)}
                aria-label={`${day} ${minuteLabel(m)} ${mode}`}
                aria-disabled={blocked}
                className={`h-5 w-full rounded-sm ${bg} ${blocked ? "cursor-not-allowed" : "cursor-crosshair"}`}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
