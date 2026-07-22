'use client';

import { Icon } from '@/shared/ui/Icons';
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
    <div className="border-border bg-depth-1 overflow-hidden rounded-2xl border shadow-sm">
      <div className="border-border flex items-center justify-between gap-3 border-b px-4 py-3">
        <h3 className="text-foreground text-sm font-semibold">{label}</h3>
        <button
          type="button"
          onClick={onCopy}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition',
            copied
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-depth-2 hover:text-foreground'
          )}
        >
          <Icon name={copied ? 'check' : 'copy'} size={14} />
          {copied ? '복사됨' : '복사'}
        </button>
      </div>
      <div className="p-4">
        <CodeBlock code={code} />
      </div>
    </div>
  );
}
