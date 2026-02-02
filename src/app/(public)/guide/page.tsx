'use client';

import { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs } from '@/shared/ui/Tabs';
import { extractTabsFromNav } from '@/shared/common/navigation';

import { GuideTabContent } from './GuideTabContent';

const tabs = extractTabsFromNav('Guide');
type TabKey = string;

export default function Guide() {
  return (
    <Suspense
      fallback={<div className="text-muted-foreground py-10 text-center text-sm">Loading...</div>}
    >
      <GuidePageContent />
    </Suspense>
  );
}

function GuidePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultKey = tabs[0]?.key ?? '';

  const activeTab = useMemo<TabKey>(() => {
    const tab = searchParams.get('tab');
    return (tabs.find((t) => t.key === tab)?.key ?? defaultKey) as TabKey;
  }, [searchParams, defaultKey]);

  const onChange = (key: TabKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);
    router.replace(`/guide?${params.toString()}`, { scroll: false });
  };

  if (!tabs.length) {
    return null;
  }

  return (
    <section>
      <div className="mb-6 space-y-2">
        <h2 className="text-foreground mb-2 text-3xl font-bold">Guide</h2>
        <span className="text-muted-foreground">해당 포트폴리오 디자인토큰, 기술스택 정리</span>
      </div>

      <Tabs.Root value={activeTab} defaultValue={defaultKey} onValueChange={onChange}>
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.key} value={tab.key}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content key={activeTab} value={activeTab}>
          <div className="section-card">
            <GuideTabContent tab={activeTab} />
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
