'use client';

import type { ReactNode } from 'react';

type WorkspaceDemoCardProps = {
  title?: string;
  children: ReactNode;
};

export function WorkspaceDemoCard({ title = 'Demo', children }: WorkspaceDemoCardProps) {
  return (
    <div className="bg-depth-1 border-border overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-border border-b px-4 py-3">
        <h3 className="text-foreground text-sm font-semibold">{title}</h3>
      </div>
      <div className="bg-depth-2/50 p-4 md:p-5">{children}</div>
    </div>
  );
}
