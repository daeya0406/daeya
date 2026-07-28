'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type WorkspaceListItemProps = {
  title: string;
  description?: string;
  tags?: string[];
  active?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
};

export function WorkspaceListItem({
  title,
  tags,
  active = false,
  onClick,
}: WorkspaceListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-xl border p-3 text-left transition',
        active
          ? 'border-primary/40 bg-primary/5'
          : 'border-transparent bg-depth-2 hover:border-border'
      )}
    >
      <div
        className={cn(
          'truncate text-sm font-semibold',
          active ? 'text-primary' : 'text-foreground'
        )}
      >
        {title}
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-medium',
                active ? 'bg-primary/10 text-primary' : 'bg-depth-3 text-muted-foreground'
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
