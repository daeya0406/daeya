'use client';

import { useCallback, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Text } from '@/components/ui/Text';

function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback((next?: boolean) => {
    if (typeof next === 'boolean') {
      setValue(next);
    } else {
      setValue((v) => !v);
    }
  }, []);
  return { value, toggle, setValue };
}

export default function ToggleHookDemo() {
  const { value, toggle } = useToggle(false);

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-bg-depth-1 p-3">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">useToggle</p>
        <Text.Caption>boolean 상태를 간결하게 토글</Text.Caption>
        <Badge variant={value ? 'default' : 'outline'}>{value ? 'ON' : 'OFF'}</Badge>
      </div>
      <div className="flex items-center gap-3">
        <Switch checked={value} onCheckedChange={() => toggle()} />
        <Button size="sm" variant="outline" onClick={() => toggle()}>
          토글
        </Button>
      </div>
    </div>
  );
}
