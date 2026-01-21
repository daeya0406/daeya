'use client';

import { Suspense, useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { Tabs } from '@/components/ui/Tabs';
import { extractTabsFromNav } from '@/components/common/navigation';
import { playgroundItems } from '@/components/playground/playgroundData';
import { useSyncedTab } from '@/hooks/useSyncedTab';
import { TabListPanel } from '@/components/common/TabListPanel';
import { CodeBlock } from '@/components/common/CodeBlock';
import { cn } from '@/lib/utils';

const tabs = extractTabsFromNav('Playground');
type TabKey = string;

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={<div className="text-muted-foreground py-10 text-center text-sm">Loading...</div>}
    >
      <PlaygroundPageContent />
    </Suspense>
  );
}

function PlaygroundPageContent() {
  const { activeTab, defaultTab, onChangeTab } = useSyncedTab(tabs, '/playground');

  const filteredItems = useMemo(
    () => playgroundItems.filter((item) => item.categories.includes(activeTab)),
    [activeTab]
  );

  const [activeId, setActiveId] = useState<string | undefined>(filteredItems[0]?.id);
  const currentActiveId = useMemo(() => {
    if (!filteredItems.length) return undefined;
    if (activeId && filteredItems.some((i) => i.id === activeId)) return activeId;
    return filteredItems[0]?.id;
  }, [activeId, filteredItems]);

  const activeItem = filteredItems.find((item) => item.id === currentActiveId);
  const codeBlocks =
    activeItem &&
    (activeItem.codes
      ? activeItem.codes.map((entry) =>
          typeof entry === 'string' ? { label: undefined, code: entry } : entry
        )
      : activeItem.code
        ? [{ label: undefined, code: activeItem.code }]
        : []);

  if (!tabs.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-bold">Playground</h2>
        <span className="text-xs tracking-[0.01em]">
          항목을 선택하면 데모/코드 흐름을 볼 수 있습니다.
        </span>
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
                <h6 className="text-md font-semibold">목록</h6>
                <span className="text-[11px] leading-[14px] text-muted-foreground">
                  {filteredItems.length}개
                </span>
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
                      <span
                        className={cn(
                          'truncate text-sm leading-[16px]',
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        )}
                      >
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          'truncate text-[11px] leading-[14px]',
                          isActive ? 'text-primary/60' : 'text-muted-foreground'
                        )}
                      >
                        {item.tags.join(' • ')}
                      </span>
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
                    <h5 className="text-lg font-semibold">{activeItem.title}</h5>
                    <span className="text-xs leading-[14px] text-muted-foreground">
                      {activeItem.description}
                    </span>
                  </div>
                </div>

                  {activeItem.demo && (
                    <div className="bg-depth-2 rounded-lg p-4">{activeItem.demo}</div>
                  )}

                  {codeBlocks?.map((block, idx) => (
                    <div key={idx} className="border-border space-y-2 rounded-lg border p-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs leading-[14px] text-muted-foreground">
                          {block.label ?? `코드 ${idx + 1}`}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(block.code);
                            toast.success(
                              `${block.label ?? `코드 ${idx + 1}`}이(가) 복사되었습니다.`
                            );
                          }}
                        >
                          복사
                        </Button>
                      </div>
                      <CodeBlock code={block.code} />
                    </div>
                  ))}
                </>
              ) : (
                <span className="text-xs tracking-[0.01em]">
                  이 탭에는 준비된 항목이 없습니다.
                </span>
              )}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
