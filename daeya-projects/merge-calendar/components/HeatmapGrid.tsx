"use client";

import { DayPageTabs, useDayPages } from "@/components/DayPageTabs";
import type { HeatCell } from "@/lib/heatmap";
import {
  dayShort,
  hourLabels,
  meetingDays,
  minuteLabel,
  slotMinutes,
  type MeetingWindow,
} from "@/lib/slots";

type Props = {
  window: MeetingWindow;
  cells: HeatCell[];
  selected: { day: string; startMinute: number } | null;
  onSelect: (day: string, startMinute: number) => void;
};

export function HeatmapGrid({ window, cells, selected, onSelect }: Props) {
  const allDays = meetingDays(window);
  const { page, setPage, pageCount, visibleDays, labels } = useDayPages(allDays);
  const hours = hourLabels(window);
  const map = new Map(cells.map((c) => [`${c.day}|${c.startMinute}`, c]));

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
            <div className="text-[10px] font-normal text-toss-faint">
              {d.slice(5).replace("-", "/")}
            </div>
          </div>
        ))}

        {hours.map((h) => {
          const tops = [h * 60, h * 60 + 30].filter((m) =>
            slotMinutes(window).includes(m),
          );
          if (!tops.length) return null;
          return (
            <HourHeat
              key={h}
              hour={h}
              minutes={tops}
              days={visibleDays}
              map={map}
              selected={selected}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      {pageCount > 1 ? (
        <p className="mt-2 px-1 text-center text-[12px] text-toss-faint">
          {page + 1}/{pageCount}페이지
        </p>
      ) : null}
    </div>
  );
}

function HourHeat({
  hour,
  minutes,
  days,
  map,
  selected,
  onSelect,
}: {
  hour: number;
  minutes: number[];
  days: string[];
  map: Map<string, HeatCell>;
  selected: { day: string; startMinute: number } | null;
  onSelect: (day: string, startMinute: number) => void;
}) {
  return (
    <>
      <div className="flex items-center justify-end pr-1 text-[10px] leading-none text-toss-faint">
        {hour}
      </div>
      {days.map((day) => (
        <div key={day} className="flex min-w-0 flex-col gap-0.5">
          {minutes.map((m) => {
            const cell = map.get(`${day}|${m}`);
            const isSel =
              selected?.day === day && selected?.startMinute === m;
            let bg = "bg-toss-line/40 opacity-55";
            if (cell?.kind === "best") bg = "bg-toss-blue-50";
            else if (cell?.kind === "coord") bg = "bg-toss-blue/15";
            else if (cell?.kind === "empty") bg = "bg-toss-line/25";

            const clickable = cell?.selectable;

            return (
              <button
                key={m}
                type="button"
                disabled={!clickable}
                title={minuteLabel(m)}
                onClick={() => clickable && onSelect(day, m)}
                className={`relative flex h-7 w-full flex-col items-center justify-center overflow-hidden rounded-sm px-0.5 ${bg} ${
                  clickable ? "cursor-pointer" : "cursor-not-allowed"
                } ${isSel ? "ring-2 ring-toss-blue" : ""}`}
              >
                {cell?.kind === "best" ? (
                  <span className="text-[8px] font-semibold leading-tight text-toss-blue">
                    전원
                    <br />
                    가능
                  </span>
                ) : null}
                {cell?.badges.map((b) => (
                  <span
                    key={b.name}
                    className={`max-w-full truncate rounded px-0.5 text-[8px] font-semibold ${
                      b.tone === "unavail"
                        ? "bg-toss-red/15 text-toss-red"
                        : "bg-toss-amber/40 text-[#8B6914]"
                    }`}
                  >
                    {b.required ? "*" : ""}
                    {b.name.slice(0, 3)}
                  </span>
                ))}
              </button>
            );
          })}
        </div>
      ))}
    </>
  );
}
