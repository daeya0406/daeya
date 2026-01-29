'use client';

import * as React from 'react';

export type LayoutMode = 'default' | 'dashboard';

type LayoutModeContextValue = {
  isDesktop: boolean;
  effectiveMode: LayoutMode;
};

const LayoutModeContext = React.createContext<LayoutModeContextValue | null>(null);

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean>(() => {
    // 서버/초기 렌더에서는 데스크톱으로 간주해 SSR 마크업과 클라이언트 초기 렌더 맞추기
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

export function LayoutModeProvider({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const effectiveMode: LayoutMode = isDesktop ? 'dashboard' : 'default';

  const value = React.useMemo<LayoutModeContextValue>(
    () => ({ isDesktop, effectiveMode }),
    [isDesktop, effectiveMode]
  );

  return <LayoutModeContext.Provider value={value}>{children}</LayoutModeContext.Provider>;
}

export function useLayoutMode() {
  const ctx = React.useContext(LayoutModeContext);
  if (!ctx) throw new Error('useLayoutMode must be used within <LayoutModeProvider>');
  return ctx;
}
