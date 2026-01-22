'use client';

import * as React from 'react';

export type LayoutMode = 'default' | 'dashboard';

type LayoutModeContextValue = {
  mode: LayoutMode;
  setMode: React.Dispatch<React.SetStateAction<LayoutMode>>;
  toggle: () => void;
  isDesktop: boolean;
  effectiveMode: LayoutMode;
};

const LayoutModeContext = React.createContext<LayoutModeContextValue | null>(null);

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean>(() => {
    // 서버/초기 렌더에서는 데스크톱으로 간주해 SSR 마크업과 클라이언트 초기 렌더를 맞추기
    return true;
  });

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    queueMicrotask(onChange);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

const STORAGE_KEY = 'layout_mode';

export function LayoutModeProvider({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [mode, setModeState] = React.useState<LayoutMode>('dashboard');

  React.useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const next: LayoutMode = saved === 'dashboard' || saved === 'default' ? saved : 'dashboard';
      queueMicrotask(() => setModeState(next));
    } catch {
      queueMicrotask(() => setModeState('dashboard'));
    }
  }, []);

  const setMode = React.useCallback((next: React.SetStateAction<LayoutMode>) => {
    setModeState((prev) => {
      const resolved =
        typeof next === 'function' ? (next as (p: LayoutMode) => LayoutMode)(prev) : next;
      try {
        window.localStorage.setItem(STORAGE_KEY, resolved);
      } catch {
        // ignore
      }
      return resolved;
    });
  }, []);

  const toggle = React.useCallback(() => {
    setMode((prev) => (prev === 'dashboard' ? 'default' : 'dashboard'));
  }, [setMode]);

  const effectiveMode: LayoutMode = mode === 'dashboard' && isDesktop ? 'dashboard' : 'default';

  const value = React.useMemo<LayoutModeContextValue>(
    () => ({ mode, setMode, toggle, isDesktop, effectiveMode }),
    [mode, setMode, toggle, isDesktop, effectiveMode]
  );

  return <LayoutModeContext.Provider value={value}>{children}</LayoutModeContext.Provider>;
}

export function useLayoutMode() {
  const ctx = React.useContext(LayoutModeContext);
  if (!ctx) throw new Error('useLayoutMode must be used within <LayoutModeProvider>');
  return ctx;
}
