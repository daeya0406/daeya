'use client';

import { useCallback, useRef, useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ThrottleDebounceDemo() {
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
      <Text.Caption className="block text-slate-500 dark:text-slate-300">
        Debounce vs Throttle (400ms)
      </Text.Caption>
      <Input
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="타이핑해보세요"
      />
      <div className="grid gap-2 rounded-lg border border-slate-200/70 bg-white/80 p-3 text-sm dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-300">Debounced</span>
          <span className="font-mono text-blue-600 dark:text-blue-300">{debounced}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600 dark:text-slate-300">Throttled</span>
          <span className="font-mono text-blue-600 dark:text-blue-300">{throttled}</span>
        </div>
      </div>
      <Button size="sm" variant="outline" onClick={reset}>
        초기화
      </Button>
    </div>
  );
}
