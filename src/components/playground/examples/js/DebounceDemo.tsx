'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';

export default function DebounceDemo() {
  const [value, setValue] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), 1000);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="입력 후 잠시 기다려 보세요"
      />
      <Text.Caption className="block text-muted-foreground dark:text-muted-foreground">
        Debounced: <span className="font-semibold text-primary dark:text-primary">{debounced}</span>
      </Text.Caption>
    </div>
  );
}
