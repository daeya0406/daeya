'use client';

import { Text } from '@/components/ui/Text';

type CodeCardProps = {
  title: string;
  description?: string;
  code: string;
};

export function CodeCard({ title, description, code }: CodeCardProps) {
  return (
    <div className="space-y-2 rounded-lg border border-border bg-bg-depth-1 p-4 text-sm shadow-sm">
      <div>
        <Text.H6 className="text-foreground">{title}</Text.H6>
        {description ? <Text.Body14 className="text-muted-foreground">{description}</Text.Body14> : null}
      </div>
      <pre className="whitespace-pre-wrap rounded-md bg-bg-depth-2 p-3 font-mono text-xs text-foreground">
        {code}
      </pre>
    </div>
  );
}
