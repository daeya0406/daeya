'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/Switch';
import { Text } from '@/components/ui/Text';

export default function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-bg-depth-1 p-3">
      <div>
        <p className="text-sm font-semibold text-foreground">알림</p>
        <Text.Caption>프로젝트 업데이트를 이메일로 받기</Text.Caption>
      </div>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
}
