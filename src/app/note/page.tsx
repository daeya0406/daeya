'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Typo } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { Tabs } from '@/components/ui/Tabs';
import { extractTabsFromNav } from '@/components/common/navigation';
import { noteItems } from '@/components/playground/noteData';

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
  const searchParams = useSearchParams();

  const defaultTab = tabs[0]?.key ?? 'js';
  const pendingScroll = useRef<number | null>(null);
  const [localTab, setLocalTab] = useState<TabKey>(() => {
    const tab = searchParams.get('tab');
    return (tabs.find((t) => t.key === tab)?.key ?? defaultTab) as TabKey;
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    const next = (tabs.find((t) => t.key === tab)?.key ?? defaultTab) as TabKey;
    requestAnimationFrame(() => {
      setLocalTab((prev) => (prev === next ? prev : next));
    });
  }, [searchParams, defaultTab]);

  const activeTab = localTab;

  const filteredItems = useMemo(
    () => noteItems.filter((item) => item.categories.includes(activeTab)),
    [activeTab]
  );

  const [activeId, setActiveId] = useState<string | undefined>(filteredItems[0]?.id);

  useEffect(() => {
    if (filteredItems.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveId(undefined);
      return;
    }

    setActiveId((prev) => {
      if (prev && filteredItems.some((i) => i.id === prev)) return prev;
      return filteredItems[0]?.id;
    });
  }, [filteredItems]);

  const activeItem = filteredItems.find((item) => item.id === activeId);

  useEffect(() => {
    if (pendingScroll.current !== null && typeof window !== 'undefined') {
      const top = pendingScroll.current;
      pendingScroll.current = null;
      window.scrollTo({ top });
    }
  }, [activeTab]);

  const onChangeTab = (key: TabKey) => {
    if (typeof window !== 'undefined') {
      pendingScroll.current = window.scrollY;
    }
    setLocalTab(key);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('tab', key);
      const href = `/note?${params.toString()}`;
      window.history.replaceState(window.history.state, '', href);
    }
  };

  if (!tabs.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 space-y-2">
        <Typo.h2>Note</Typo.h2>
        <Typo.caption>JS / React / Hooks / TS / Next.js 개념 메모</Typo.caption>
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
            <aside className="lg:max-h-130 max-h-80 overflow-y-auto rounded-xl border border-slate-200/70 bg-white/70 p-3 shadow-sm lg:sticky lg:top-24 dark:border-slate-800 dark:bg-slate-800/20">
              <div className="flex flex-col gap-2">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`flex flex-col items-start rounded-lg border px-3 py-3 text-left transition ${
                      activeId === item.id
                        ? 'text-primary border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'border-transparent hover:border-slate-200 hover:bg-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="typo-body-sm font-semibold text-slate-900 dark:text-slate-50">
                      {item.title}
                    </span>
                    <span className="typo-caption text-slate-500 dark:text-slate-400">
                      {item.tags.join(' • ')}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="space-y-4 rounded-xl border border-slate-200/70 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-slate-700/20">
              {activeItem ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="line-bottom space-y-1">
                      <Typo.h5>{activeItem.title}</Typo.h5>
                      <Typo.bodyXs className="text-slate-500 dark:text-slate-400">
                        {activeItem.description}
                      </Typo.bodyXs>
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
                <Typo.caption>이 탭에는 준비된 항목이 없습니다.</Typo.caption>
              )}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
