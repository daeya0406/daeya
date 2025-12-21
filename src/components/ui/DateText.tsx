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
    <div className="flex items-center gap-2 rounded-md border border-border bg-depth-1/70 px-3 py-2 text-sm shadow-sm">
      {label && (
        <Text.Caption className="font-semibold text-foreground" as="span">
          {label}
        </Text.Caption>
      )}
      <span className="font-medium text-foreground">{formatDate(value, format)}</span>
      {showRelative && <span className="text-xs text-muted-foreground">({fromNow(value)})</span>}
    </div>
  );
}
