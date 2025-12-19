'use client';

import { formatDate, fromNow } from '@/lib/date';
import { Text } from './Text';

type DateTextProps = {
  value: string | number | Date;
  format?: string;
  showRelative?: boolean;
  label?: string;
};

export function DateText({ value, format = 'YYYY-MM-DD', showRelative = false, label }: DateTextProps) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-slate-200/70 bg-white/70 px-3 py-2 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      {label && (
        <Text.Caption className="font-semibold text-slate-700 dark:text-slate-200" as="span">
          {label}
        </Text.Caption>
      )}
      <span className="font-medium text-slate-900 dark:text-slate-50">{formatDate(value, format)}</span>
      {showRelative && (
        <span className="text-xs text-slate-500 dark:text-slate-400">({fromNow(value)})</span>
      )}
    </div>
  );
}
