'use client';

import { useCallback, useRef, useState } from 'react';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';

export function ThrottleDebounceDemo() {
  const [text, setText] = useState('');
  const [debounced, setDebounced] = useState('');
  const [throttled, setThrottled] = useState('');
  const throttleRef = useRef<number | null>(null);
  const debounceRef = useRef<number | null>(null);

  const handleChange = useCallback((value: string) => {
    setText(value);

    // debounce 400ms
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setDebounced(value);
    }, 400);

    // throttle 400ms
    if (throttleRef.current) return;
    setThrottled(value);
    throttleRef.current = window.setTimeout(() => {
      throttleRef.current = null;
    }, 400);
  }, []);

  const reset = () => {
    setText('');
    setDebounced('');
    setThrottled('');
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    if (throttleRef.current) window.clearTimeout(throttleRef.current);
    debounceRef.current = null;
    throttleRef.current = null;
  };

  return (
    <div className="space-y-3">
      <span className="text-xs tracking-[0.01em] block text-muted-foreground">
        Debounce vs Throttle (400ms)
      </span>
      <Input
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="타이핑해보세요"
      />
      <div className="grid gap-2 rounded-lg border border-border bg-depth-1 p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Debounced</span>
          <span className="font-mono text-primary">{debounced}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Throttled</span>
          <span className="font-mono text-primary">{throttled}</span>
        </div>
      </div>
      <Button size="sm" variant="outline" onClick={reset}>
        초기화
      </Button>
    </div>
  );
}
