'use client';

import * as React from 'react';
import { Calendar } from './Calendar';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
  format?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = '날짜 선택',
  className,
  format = 'YYYY.MM.DD',
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<'bottom' | 'top'>('bottom');
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayValue = value ? dayjs(value).format(format) : placeholder;

  const toggleOpen = () => {
    setOpen((prev) => {
      const next = !prev;
      if (!next) return next;
      // decide placement
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const estimatedHeight = 360;
        setPlacement(spaceBelow < estimatedHeight ? 'top' : 'bottom');
      }
      return next;
    });
  };

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={toggleOpen}
        className="flex min-w-[150px] max-w-[220px] items-center justify-between gap-2 rounded-lg border border-border bg-bg-depth-1 px-3 py-2 text-sm text-foreground shadow-sm transition hover:bg-bg-depth-2"
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-primary" />
          <span className={!value ? 'text-muted-foreground' : ''}>{displayValue}</span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-muted-foreground transition-transform',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            'absolute left-0 z-50',
            placement === 'bottom' ? 'top-[calc(100%+6px)]' : 'bottom-[calc(100%+6px)]'
          )}
        >
          <Calendar
            value={value}
            onChange={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
