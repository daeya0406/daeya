'use client';

import { Check, Copy, FileCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/shared/common/CodeBlock';

type WorkspaceCodeCardProps = {
  label: string;
  code: string;
  copied: boolean;
  onCopy: () => void;
};

export function WorkspaceCodeCard({ label, code, copied, onCopy }: WorkspaceCodeCardProps) {
  return (
    <div className="border-border to-depth-1 dark:from-depth-1 dark:via-depth-1 dark:to-depth-2 group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white via-white shadow-sm">
      <div className="bg-primary/5 absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />

      <div className="border-border from-depth-2/50 relative flex items-center justify-between border-b bg-gradient-to-r to-transparent px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary rounded-lg p-2">
            <FileCode className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-foreground text-sm font-semibold">{label}</h3>
            <p className="text-muted-foreground text-xs">클릭하여 복사</p>
          </div>
        </div>
        <button
          onClick={onCopy}
          className={cn(
            'group/btn flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all',
            copied
              ? 'bg-primary text-primary-foreground shadow-primary/20 shadow-sm'
              : 'text-muted-foreground hover:bg-depth-2 hover:text-foreground'
          )}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>복사됨</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
              <span>복사</span>
            </>
          )}
        </button>
      </div>
      <div className="relative p-6">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}
