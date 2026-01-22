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
  description,
  tags,
  active = false,
  icon,
  onClick,
}: WorkspaceListItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full overflow-hidden rounded-xl border p-3 text-left transition',
        active
          ? 'border-primary/50 bg-primary/5 shadow-primary/5 shadow-sm'
          : 'bg-depth-2 hover:border-border hover:bg-depth-3 border-transparent'
      )}
    >
      {active && (
        <div className="bg-primary/10 absolute right-0 top-0 h-16 w-16 -translate-y-4 translate-x-4 rounded-full blur-2xl" />
      )}

      <div className="relative mb-2 flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              'truncate text-sm font-semibold',
              active ? 'text-primary' : 'text-foreground'
            )}
          >
            {title}
          </div>
          {description && (
            <div className="text-muted-foreground mt-1 line-clamp-2 text-xs leading-relaxed">
              {description}
            </div>
          )}
        </div>
      </div>

      {tags && tags.length > 0 && (
        <div className="relative flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={cn(
                'rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors',
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
