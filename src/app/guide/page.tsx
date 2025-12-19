'use client';

import { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs } from '@/components/ui/Tabs';
import { extractTabsFromNav } from '@/components/common/navigation';
import { Text } from '@/components/ui/Text';

import { GuideTabContent } from './GuideTabContent';

const tabs = extractTabsFromNav('Guide');
type TabKey = string;

export default function Guide() {
  return (
    <Suspense fallback={<div className="py-10 text-center text-sm text-slate-500">Loading...</div>}>
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
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 space-y-2">
        <Text.H2>Guide</Text.H2>
        <Text.Caption>UI / Tokens / Stack 정리</Text.Caption>
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
