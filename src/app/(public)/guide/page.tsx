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

  if (!tabs.length) return null;

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-foreground text-3xl font-bold">Guide</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          이 사이트에 쓰는 UI·폰트·컬러 토큰과 스택을 정리한 디자인 가이드입니다.
        </p>
      </header>

      <Tabs.Root value={activeTab} defaultValue={defaultKey} onValueChange={onChange}>
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.key} value={tab.key}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content key={activeTab} value={activeTab} className="mt-6">
          <div className="bg-depth-1 ring-border rounded-2xl p-5 shadow-sm ring-1 md:p-8">
            <GuideTabContent tab={activeTab} />
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
