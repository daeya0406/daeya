'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type CodeTickerProps = {
  snippets: string[];
  className?: string;
  intervalMs?: number;
};

export function CodeTicker({ snippets, className, intervalMs = 2800 }: CodeTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (snippets.length <= 1) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % snippets.length);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [snippets.length, intervalMs]);

  if (snippets.length === 0) return null;

  return (
    <div
      className={cn(
        'bg-depth-2 ring-border/50 overflow-hidden rounded-xl p-4 font-mono text-xs ring-1',
        className
      )}
    >
      <div className="text-muted-foreground mb-2 flex items-center gap-2">
        <span className="bg-point-rose h-2 w-2 rounded-full" />
        <span className="bg-point-yellow h-2 w-2 rounded-full" />
        <span className="bg-point-cyan h-2 w-2 rounded-full" />
      </div>
      <pre className="text-foreground overflow-x-auto whitespace-pre-wrap leading-relaxed">
        <code className="transition-opacity duration-300">{snippets[index]}</code>
      </pre>
    </div>
  );
}
