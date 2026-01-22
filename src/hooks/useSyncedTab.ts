'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Tab = { key: string; label: string };

type UseSyncedTabResult = {
  activeTab: string;
  defaultTab: string;
  tabs: Tab[];
  onChangeTab: (key: string) => void;
};

export function useSyncedTab(tabs: Tab[], path: string): UseSyncedTabResult {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultTab = tabs[0]?.key ?? '';
  const pendingScroll = useRef<number | null>(null);

  const [localTab, setLocalTab] = useState<string>(() => {
    const tab = searchParams.get('tab');
    return tabs.find((t) => t.key === tab)?.key ?? defaultTab;
  });

  useEffect(() => {
    const tab = searchParams.get('tab');
    const next = tabs.find((t) => t.key === tab)?.key ?? defaultTab;
    requestAnimationFrame(() => {
      setLocalTab((prev) => (prev === next ? prev : next));
    });
  }, [searchParams, defaultTab, tabs]);

  useEffect(() => {
    if (pendingScroll.current !== null && typeof window !== 'undefined') {
      const top = pendingScroll.current;
      pendingScroll.current = null;
      window.scrollTo({ top });
    }
  }, [localTab]);

  const onChangeTab = (key: string) => {
    if (typeof window !== 'undefined') {
      pendingScroll.current = window.scrollY;
    }
    setLocalTab(key);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);
    const href = `${path}?${params.toString()}`;
    router.replace(href, { scroll: false });
  };

  return { activeTab: localTab, defaultTab, tabs, onChangeTab };
}
