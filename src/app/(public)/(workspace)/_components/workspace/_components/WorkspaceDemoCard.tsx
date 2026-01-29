'use client';

import type { ReactNode } from 'react';
import { PlayCircle } from 'lucide-react';

type WorkspaceDemoCardProps = {
  title?: string;
  children: ReactNode;
};

export function WorkspaceDemoCard({ title = 'Live Demo', children }: WorkspaceDemoCardProps) {
  return (
    <div className="bg-depth-1 border-border overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-border from-depth-2 to-depth-1 flex items-center gap-2 border-b bg-gradient-to-r px-6 py-4">
        <PlayCircle className="text-primary h-5 w-5" />
        <h3 className="text-foreground text-sm font-semibold">{title}</h3>
      </div>
      <div className="bg-depth-2 p-6">{children}</div>
    </div>
  );
}
