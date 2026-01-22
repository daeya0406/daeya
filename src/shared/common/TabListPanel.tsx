'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type TabListPanelProps = {
  children: ReactNode;
  className?: string;
};

export function TabListPanel({ children, className }: TabListPanelProps) {
  return (
    <aside
      className={cn(
        'max-h-[100% - 200px] overflow-y-auto rounded-lg lg:sticky lg:top-24',
        className
      )}
    >
      {children}
    </aside>
  );
}
