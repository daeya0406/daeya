'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { Tabs } from '@/components/ui/Tabs';
import { extractTabsFromNav } from '@/components/common/navigation';
import { noteItems } from '@/components/playground/noteData';
import { useSyncedTab } from '@/hooks/useSyncedTab';
import { TabListPanel } from '@/components/common/TabListPanel';

const tabs = extractTabsFromNav('Note');
type TabKey = string;

export default function NotePage() {
  return (
    <Suspense fallback={<div className="py-10 text-center text-sm text-slate-500">Loading...</div>}>
      <NotePageContent />
    </Suspense>
  );
}

function NotePageContent() {
  const { activeTab, defaultTab, onChangeTab } = useSyncedTab(tabs, '/note');

  const filteredItems = useMemo(
    () => noteItems.filter((item) => item.categories.includes(activeTab)),
    [activeTab]
  );

  const [activeId, setActiveId] = useState<string | undefined>(filteredItems[0]?.id);

  useEffect(() => {
    if (filteredItems.length === 0) {
      setActiveId(undefined);
      return;
    }

    setActiveId((prev) => {
      if (prev && filteredItems.some((i) => i.id === prev)) return prev;
      return filteredItems[0]?.id;
    });
  }, [filteredItems]);

  const activeItem = filteredItems.find((item) => item.id === activeId);

  if (!tabs.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 space-y-2">
        <Text.H2>Note</Text.H2>
        <Text.Caption>JS / React / Hooks / TS / Next.js 개념 메모</Text.Caption>
      </div>

      <Tabs.Root value={activeTab} defaultValue={defaultTab} onValueChange={onChangeTab}>
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.key} value={tab.key}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content key={activeTab} value={activeTab}>
          <div className="grid gap-6 pt-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
            <TabListPanel>
              <div className="flex flex-col gap-2">
                {filteredItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      className={`border-border bg-bg-primary flex flex-col items-start gap-y-1 rounded-lg border px-3 py-3 text-left transition ${
                        isActive
                          ? 'border-primary/80 text-primary'
                          : 'hover:border-border hover:bg-bg-secondary'
                      }`}
                    >
                      <Text.S14.Bold className={isActive ? 'text-primary' : 'text-foreground'}>
                        {item.title}
                      </Text.S14.Bold>
                      <Text.Caption
                        className={isActive ? 'text-primary/80' : 'text-muted-foreground'}
                      >
                        {item.tags.join(' • ')}
                      </Text.Caption>
                    </button>
                  );
                })}
              </div>
            </TabListPanel>

            <div className="space-y-4 rounded-xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-700/20">
              {activeItem ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="line-bottom space-y-1">
                      <Text.H5>{activeItem.title}</Text.H5>
                      <Text.S12 className="text-slate-500 dark:text-slate-400">
                        {activeItem.description}
                      </Text.S12>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(activeItem.code);
                        toast.success('코드가 복사되었습니다.');
                      }}
                    >
                      코드 복사
                    </Button>
                  </div>

                  {activeItem.demo && (
                    <div className="rounded-lg border border-slate-200/70 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                      {activeItem.demo}
                    </div>
                  )}

                  <div className="rounded-lg border border-slate-200/70 bg-slate-200/50 p-4 text-sm dark:border-slate-700 dark:bg-slate-700/30">
                    <pre className="whitespace-pre-wrap font-mono text-xs text-slate-500 dark:text-slate-100">
                      {activeItem.code}
                    </pre>
                  </div>
                </>
              ) : (
                <Text.Caption>이 탭에는 준비된 항목이 없습니다.</Text.Caption>
              )}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
