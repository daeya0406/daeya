'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, pageSize, total, onPageChange }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const windowSize = 5;
  const start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-bg-depth-1 px-3 py-2 text-sm shadow-sm">
      <button
        className={cn(
          'rounded-md px-3 py-1 font-medium text-foreground transition hover:bg-bg-depth-2 disabled:opacity-50',
          page === 1 && 'pointer-events-none'
        )}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label="이전 페이지"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'min-w-[28px] rounded-md px-2 py-1 text-sm font-semibold transition',
              p === page
                ? 'text-primary border border-primary/40 bg-primary-100'
                : 'text-foreground hover:bg-bg-depth-2'
            )}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        className={cn(
          'rounded-md px-3 py-1 font-medium text-foreground transition hover:bg-bg-depth-2 disabled:opacity-50',
          page === totalPages && 'pointer-events-none'
        )}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label="다음 페이지"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
