'use client';

import type { ReactNode } from 'react';
import { Tabs } from '@/shared/ui/Tabs';
import { cn } from '@/lib/utils';

type TabItem = {
  key: string;
  label: string;
};

type TabbedWorkspaceLayoutProps = {
  title: string;
  description?: string;
  itemCount?: number;
  tabs: TabItem[];
  activeTab: string;
  defaultTab?: string;
  onChangeTab: (value: string) => void;
  searchSlot?: ReactNode;
  headerRightSlot?: ReactNode;
  sidebarTitle?: string;
  sidebarCount?: number;
  sidebarSlot: ReactNode;
  contentSlot: ReactNode;
  className?: string;
};

export function TabbedWorkspaceLayout({
  title,
  description,
  itemCount,
  tabs,
  activeTab,
  defaultTab,
  onChangeTab,
  searchSlot,
  headerRightSlot,
  sidebarTitle = '목록',
  sidebarCount,
  sidebarSlot,
  contentSlot,
  className,
}: TabbedWorkspaceLayoutProps) {
  return (
    <section className={cn('mx-auto max-w-7xl', className)}>
      <div className="mb-8 space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-foreground mb-2 text-3xl font-bold">{title}</h1>
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
          {headerRightSlot ??
            (typeof itemCount === 'number' && (
              <div className="text-muted-foreground hidden text-sm sm:block">
                <span className="text-primary font-semibold">{itemCount}</span>개 항목
              </div>
            ))}
        </div>

        {searchSlot}
      </div>

      <Tabs.Root value={activeTab} defaultValue={defaultTab} onValueChange={onChangeTab}>
        <Tabs.List className="max-w-full gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.key}
              value={tab.key}
              className="data-[state=active]:border-primary data-[state=active]:text-primary hover:text-foreground border-b-1 border-transparent px-4 py-3 text-sm font-semibold transition"
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content key={activeTab} value={activeTab}>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
            <aside className="bg-depth-1 border-border top-4 max-h-[330px] overflow-y-auto rounded-2xl border p-4 shadow-sm lg:sticky lg:max-h-[calc(100vh-40px)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-foreground font-semibold">{sidebarTitle}</h3>
                {typeof sidebarCount === 'number' && (
                  <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-semibold">
                    {sidebarCount}개
                  </span>
                )}
              </div>
              {sidebarSlot}
            </aside>

            <div className="space-y-6">{contentSlot}</div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
