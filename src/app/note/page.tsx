'use client';

import { Suspense, useMemo, useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { Tabs } from '@/components/ui/Tabs';
import { extractTabsFromNav } from '@/components/common/navigation';
import { noteItems } from '@/components/playground/noteData';
import { useSyncedTab } from '@/hooks/useSyncedTab';
import { TabListPanel } from '@/components/common/TabListPanel';
import { CodeBlock } from '@/components/common/CodeBlock';
import { cn } from '@/lib/utils';

const tabs = extractTabsFromNav('Note');
type TabKey = string;

export default function NotePage() {
  return (
    <Suspense
      fallback={<div className="text-muted-foreground py-10 text-center text-sm">Loading...</div>}
    >
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
  const currentActiveId = useMemo(() => {
    if (!filteredItems.length) return undefined;
    if (activeId && filteredItems.some((i) => i.id === activeId)) return activeId;
    return filteredItems[0]?.id;
  }, [activeId, filteredItems]);

  const activeItem = filteredItems.find((item) => item.id === currentActiveId);

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
          <div className="grid gap-6 pt-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
            <TabListPanel className="bg-depth-1/70 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <Text.H6>목록</Text.H6>
                <Text.S11 className="text-muted-foreground">{filteredItems.length}개</Text.S11>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                {filteredItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        'bg-depth-2 flex items-center justify-between gap-2 rounded-lg border px-3 py-3 text-left transition',
                        isActive
                          ? 'bg-brand-secondary text-primary border-primary/40'
                          : 'text-foreground hover:border-primary/30 border-transparent'
                      )}
                    >
                      <Text.S13
                        className={cn(
                          'truncate',
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        )}
                      >
                        {item.title}
                      </Text.S13>
                      <Text.S11
                        className={cn(
                          'truncate',
                          isActive ? 'text-primary/60' : 'text-muted-foreground'
                        )}
                      >
                        {item.tags.join(' • ')}
                      </Text.S11>
                    </button>
                  );
                })}
              </div>
            </TabListPanel>

            <div className="border-border bg-depth-1 space-y-4 rounded-xl border p-5 shadow-sm">
              {activeItem ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="line-bottom space-y-1">
                      <Text.H5>{activeItem.title}</Text.H5>
                      <Text.S12 className="text-muted-foreground">
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
                    <div className="bg-depth-2 rounded-lg p-4">{activeItem.demo}</div>
                  )}

                  <CodeBlock code={activeItem.code} />
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
