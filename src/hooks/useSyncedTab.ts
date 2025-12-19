'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Tab = { key: string; label: string };

type UseSyncedTabResult = {
  activeTab: string;
  defaultTab: string;
  tabs: Tab[];
  onChangeTab: (key: string) => void;
};

export function useSyncedTab(tabs: Tab[], path: string): UseSyncedTabResult {
  const searchParams = useSearchParams();
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
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('tab', key);
      const href = `${path}?${params.toString()}`;
      window.history.replaceState(window.history.state, '', href);
    }
  };

  return { activeTab: localTab, defaultTab, tabs, onChangeTab };
}
