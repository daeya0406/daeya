'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function QueryBoundaryDemo() {
  const [state, setState] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  const fetchData = () => {
    setState('loading');
    setTimeout(() => {
      Math.random() > 0.5 ? setState('success') : setState('error');
    }, 800);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={fetchData} isLoading={state === 'loading'}>
          데이터 불러오기
        </Button>
        <Button size="sm" variant="outline" onClick={() => setState('idle')}>
          초기화
        </Button>
      </div>
      <div className="rounded-lg border border-border bg-bg-depth-1 p-3 text-sm">
        {state === 'idle' && <p className="text-muted-foreground">클릭해서 데이터를 불러오세요.</p>}
        {state === 'loading' && <p className="animate-pulse text-muted-foreground">로딩 중...</p>}
        {state === 'error' && <p className="text-[rgb(var(--status-danger))]">에러 발생. 다시 시도하세요.</p>}
        {state === 'success' && <p className="text-primary">데이터 로드 완료!</p>}
      </div>
    </div>
  );
}
