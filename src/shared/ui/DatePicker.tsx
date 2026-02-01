'use client';

import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Calendar } from './Calendar';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { Icon } from '@/shared/ui/Icons';

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
            'border-border bg-depth-1 text-foreground hover:bg-depth-2 flex min-w-[150px] max-w-[220px] items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm shadow-sm transition',
            className
          )}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <div className="flex items-center gap-2">
            <Icon name="calendar" size={16} className="text-primary" />
            <span className={!value ? 'text-muted-foreground' : ''}>{displayValue}</span>
          </div>
          <Icon
            name="chevronDown"
            size={16}
            className={cn('text-muted-foreground transition-transform', open && 'rotate-180')}
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
