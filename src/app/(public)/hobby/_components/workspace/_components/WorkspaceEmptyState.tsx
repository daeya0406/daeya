'use client';

import type { ReactNode } from 'react';

type WorkspaceEmptyStateProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function WorkspaceEmptyState({ title, description, icon }: WorkspaceEmptyStateProps) {
  return (
    <div className="text-muted-foreground bg-depth-1 border-border flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl border p-12 text-center">
      <div className="h-16 w-16 opacity-20">{icon}</div>
      <div>
        <h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
