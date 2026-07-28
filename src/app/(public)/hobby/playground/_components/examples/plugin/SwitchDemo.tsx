'use client';

import { useState } from 'react';
import { Switch } from '@/shared/ui/Switch';

export function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="border-border bg-depth-1 flex items-center justify-between rounded-lg border p-3">
      <div>
        <p className="text-foreground text-sm font-semibold">알림</p>
        <span className="text-xs tracking-[0.01em]">프로젝트 업데이트를 이메일로 받기</span>
      </div>
      <Switch checked={on} onCheckedChange={setOn} />
    </div>
  );
}
