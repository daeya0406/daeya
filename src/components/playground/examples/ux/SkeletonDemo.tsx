'use client';

import { useState, useEffect } from 'react';

export default function SkeletonDemo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-md font-normal text-muted-foreground">
        로딩 시 Skeleton(자리 유지) vs Spinner(레이아웃 점프)
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-depth-1 p-3 text-sm">
          <span className="text-xs tracking-[0.01em] text-muted-foreground">Skeleton</span>
          {loading ? (
            <div className="mt-2 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-depth-3" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-depth-3" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-depth-3" />
            </div>
          ) : (
            <p className="mt-2">레이아웃을 유지해 깜빡임/점프를 줄입니다.</p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-depth-1 p-3 text-sm">
          <span className="text-xs tracking-[0.01em] text-muted-foreground">Spinner</span>
          {loading ? (
            <div className="mt-4 flex items-center gap-2 text-muted-foreground">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-transparent" />
              <span>로딩 중...</span>
            </div>
          ) : (
            <p className="mt-2">스피너는 레이아웃 점프가 있지만 단순합니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
