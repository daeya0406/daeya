'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs } from '@/components/ui/Tabs';
import { extractTabsFromNav } from '@/components/common/navigation';

import PortfolioSection from './sections/PortfolioSection';
import BlogSection from './sections/BlogSection';
import DashboardSection from './sections/DashboardSection';
import CardsSection from './sections/CardsSection';

const tabs = extractTabsFromNav('Work');
type TabKey = string;

export default function WorkPage() {
  return (
    <Suspense
      fallback={<div className="py-10 text-center text-sm text-muted-foreground">Loading...</div>}
    >
      <WorkPageContent />
    </Suspense>
  );
}

function WorkPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!tabs.length) return null;

  const tabParam = searchParams.get('tab');
  const activeTab = (tabs.find((t) => t.key === tabParam)?.key ?? tabs[0].key) as TabKey;

  const onChange = (key: TabKey) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);
    router.replace(`/work?${params.toString()}`, { scroll: false });
  };

  const renderTab = (key: TabKey) => {
    if (key.includes('portfolio')) return <PortfolioSection />;
    if (key.includes('blog')) return <BlogSection />;
    if (key.includes('dashboard')) return <DashboardSection />;
    if (key.includes('cards')) return <CardsSection />;
    return <PortfolioSection />;
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6 px-2 py-4">
      <Tabs.Root value={activeTab} defaultValue={tabs[0].key} onValueChange={onChange}>
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.key} value={tab.key}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content key={activeTab} value={activeTab}>
          <div className="section-card">{renderTab(activeTab)}</div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
