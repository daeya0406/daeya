'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
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

  const displayValue = value ? dayjs(value).format(format) : placeholder;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            'flex min-w-[150px] max-w-[220px] items-center justify-between gap-2 rounded-lg border border-border bg-depth-1 px-3 py-2 text-sm text-foreground shadow-sm transition hover:bg-depth-2',
            className
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
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
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          side="bottom"
          align="start"
          sideOffset={6}
          collisionPadding={12}
          className="z-50"
        >
          <Calendar
            value={value}
            onChange={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
