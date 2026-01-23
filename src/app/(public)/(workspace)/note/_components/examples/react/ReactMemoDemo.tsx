'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@/shared/ui/Button';

const ExpensiveChild = React.memo(function ExpensiveChild({ value }: { value: number }) {
  const computed = useMemo(() => {
    // 가벼운 계산 흉내
    let sum = 0;
    for (let i = 0; i < 100000; i += 1) {
      sum += (i * value) % 7;
    }
    return sum;
  }, [value]);

  return (
    <span className="text-xs tracking-[0.01em] text-muted-foreground dark:text-muted-foreground">
      memoized 결과: {computed}
    </span>
  );
});

export default function ReactMemoDemo() {
  const [value, setValue] = useState(1);
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setValue((v) => v + 1)}>
          값 변경(+1)
        </Button>
        <Button size="sm" variant="outline" onClick={() => setCount((c) => c + 1)}>
          불필요 렌더 버튼({count})
        </Button>
      </div>
      <ExpensiveChild value={value} />
    </div>
  );
}
