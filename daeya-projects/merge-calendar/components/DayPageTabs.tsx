"use client";

import { useEffect, useMemo, useState } from "react";

export const DAYS_PER_PAGE = 5;

function pageLabel(days: string[]): string {
  if (!days.length) return "";
  const a = days[0].slice(5).replace("-", "/");
  const b = days[days.length - 1].slice(5).replace("-", "/");
  return a === b ? a : `${a} – ${b}`;
}

export function useDayPages(allDays: string[]) {
  const pageCount = Math.max(1, Math.ceil(allDays.length / DAYS_PER_PAGE));
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1));
  }, [pageCount]);

  const safePage = Math.min(page, pageCount - 1);
  const visibleDays = useMemo(
    () =>
      allDays.slice(
        safePage * DAYS_PER_PAGE,
        safePage * DAYS_PER_PAGE + DAYS_PER_PAGE,
      ),
    [allDays, safePage],
  );

  const labels = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < pageCount; i++) {
      out.push(
        pageLabel(
          allDays.slice(i * DAYS_PER_PAGE, i * DAYS_PER_PAGE + DAYS_PER_PAGE),
        ),
      );
    }
    return out;
  }, [allDays, pageCount]);

  return { page: safePage, setPage, pageCount, visibleDays, labels };
}

/** Prototype-style bar tabs when >5 days */
export function DayPageTabs({
  page,
  pageCount,
  labels,
  onChange,
}: {
  page: number;
  pageCount: number;
  labels: string[];
  onChange: (p: number) => void;
}) {
  if (pageCount <= 1) return null;

  return (
    <div className="mb-3 flex border-b border-toss-line">
      {labels.map((label, i) => (
        <button
          key={label + i}
          type="button"
          onClick={() => onChange(i)}
          className={`relative flex-1 py-3 text-center text-[13px] font-medium ${
            i === page
              ? "font-semibold text-toss-blue"
              : "text-toss-faint"
          }`}
        >
          {label}
          {i === page ? (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-toss-blue" />
          ) : null}
        </button>
      ))}
    </div>
  );
}
