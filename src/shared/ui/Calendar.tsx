'use client';

import * as React from 'react';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalendarProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
};

export function Calendar({ value, onChange, className }: CalendarProps) {
  const [current, setCurrent] = React.useState(dayjs(value ?? new Date()));
  const [focused, setFocused] = React.useState(dayjs(value ?? new Date()));
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!value) return;
    const next = dayjs(value);
    setCurrent(next);
    setFocused(next);
  }, [value]);

  const days = React.useMemo(() => {
    const start = current.startOf('month').startOf('week');
    return Array.from({ length: 42 }, (_, i) => start.add(i, 'day'));
  }, [current]);

  const selected = value ? dayjs(value) : null;
  const isSameDay = (a: dayjs.Dayjs, b: dayjs.Dayjs | null) => !!b && a.isSame(b, 'day');
  const focusDay = React.useCallback((day: dayjs.Dayjs) => {
    const key = day.format('YYYY-MM-DD');
    requestAnimationFrame(() => {
      const el = gridRef.current?.querySelector<HTMLButtonElement>(
        `[data-date="${key}"]`
      );
      el?.focus();
    });
  }, []);

  React.useEffect(() => {
    focusDay(focused);
  }, [focused, focusDay]);

  const moveFocus = (next: dayjs.Dayjs) => {
    setFocused(next);
    if (!next.isSame(current, 'month')) {
      setCurrent(next);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, day: dayjs.Dayjs) => {
    const key = e.key;
    if (
      key !== 'ArrowRight' &&
      key !== 'ArrowLeft' &&
      key !== 'ArrowUp' &&
      key !== 'ArrowDown' &&
      key !== 'PageUp' &&
      key !== 'PageDown' &&
      key !== 'Home' &&
      key !== 'End' &&
      key !== 'Enter' &&
      key !== ' '
    ) {
      return;
    }

    e.preventDefault();

    if (key === 'Enter' || key === ' ') {
      onChange?.(day.toDate());
      return;
    }

    let next = day;
    if (key === 'ArrowRight') next = day.add(1, 'day');
    if (key === 'ArrowLeft') next = day.subtract(1, 'day');
    if (key === 'ArrowUp') next = day.subtract(7, 'day');
    if (key === 'ArrowDown') next = day.add(7, 'day');
    if (key === 'PageUp') next = day.subtract(1, 'month');
    if (key === 'PageDown') next = day.add(1, 'month');
    if (key === 'Home') next = day.startOf('week');
    if (key === 'End') next = day.endOf('week');

    moveFocus(next);
  };

  const changeMonth = (delta: number) => {
    const nextCurrent = current.add(delta, 'month');
    setCurrent(nextCurrent);
    setFocused((prev) => (prev.isSame(current, 'month') ? prev.add(delta, 'month') : nextCurrent));
  };

  return (
    <div
      className={cn(
        'w-full min-w-[280px] max-w-sm overflow-hidden rounded-xl border border-border bg-depth-1/90 p-3 shadow-lg backdrop-blur',
        className
      )}
      role="dialog"
      aria-label="날짜 선택"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition hover:bg-depth-2"
          aria-label="이전 달"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-semibold text-foreground">
          {current.format('YYYY년 MM월')}
        </div>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition hover:bg-depth-2"
          aria-label="다음 달"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        className="mt-2 grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground"
        role="row"
      >
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <span key={d} className="py-1 font-semibold" role="columnheader">
            {d}
          </span>
        ))}
      </div>

      <div
        ref={gridRef}
        className="mt-1 grid max-h-[320px] grid-cols-7 gap-1 overflow-y-auto text-sm"
        role="grid"
        aria-readonly="true"
      >
        {days.map((day) => {
          const inMonth = day.isSame(current, 'month');
          const isSelected = isSameDay(day, selected);
          const isFocused = day.isSame(focused, 'day');
          return (
            <button
              key={day.format('YYYY-MM-DD')}
              type="button"
              onClick={() => onChange?.(day.toDate())}
              onFocus={() => setFocused(day)}
              onKeyDown={(e) => handleKeyDown(e, day)}
              className={cn(
                'h-8 rounded-lg border border-transparent transition',
                isSelected
                  ? 'border-primary bg-primary-100 font-semibold text-primary shadow-sm'
                  : 'hover:border-border hover:bg-depth-2',
                !inMonth && 'text-muted-foreground'
              )}
              role="gridcell"
              aria-selected={isSelected}
              tabIndex={isFocused ? 0 : -1}
              data-date={day.format('YYYY-MM-DD')}
              aria-label={day.format('YYYY년 MM월 DD일')}
            >
              {day.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
