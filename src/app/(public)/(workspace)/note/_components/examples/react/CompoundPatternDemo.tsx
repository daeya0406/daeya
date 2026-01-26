'use client';

import React from 'react';
import { Tabs } from '@/shared/ui/Tabs';

export function CompoundPatternDemo() {
  const tabs = [
    { key: 'one', label: '탭 1', content: '첫 번째 탭 내용' },
    { key: 'two', label: '탭 2', content: '두 번째 탭 내용' },
    { key: 'three', label: '탭 3', content: '세 번째 탭 내용' },
  ];
  const [active, setActive] = React.useState(tabs[0].key);
  const current = tabs.find((t) => t.key === active);

  return (
    <div className="space-y-3">
      <Tabs.Root value={active} defaultValue={tabs[0].key} onValueChange={setActive}>
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.key} value={tab.key}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {current && (
          <Tabs.Content key={current.key} value={current.key}>
            <div className="section-component">{current.content}</div>
          </Tabs.Content>
        )}
      </Tabs.Root>
    </div>
  );
}
