'use client';

import { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { InfoBlock } from '../InfoBlock';

const base = {
  tags: ['react'],
};

export default function ShallowDeepCopyDemo() {
  const [original] = useState(base);
  const [shallow, setShallow] = useState({ ...base });
  const [deep, setDeep] = useState(structuredClone(base));

  const pushShallow = () => {
    shallow.tags.push('next');
    setShallow({ ...shallow });
  };

  const pushDeep = () => {
    const next = structuredClone(deep);
    next.tags.push('next');
    setDeep(next);
  };

  return (
    <div className="space-y-3">
      <InfoBlock
        title="비교"
        points={[
          '얕은 복사: 최상위만 복사, 중첩 객체/배열은 같은 참조',
          '깊은 복사: 중첩까지 새로 생성 (structuredClone, cloneDeep)',
          '중첩 상태 수정 시 얕은 복사는 원본에 영향 줄 수 있음',
        ]}
      />

      <div className="grid gap-3 rounded-lg border border-slate-200/70 bg-white/80 p-3 text-sm md:grid-cols-3 dark:border-slate-800 dark:bg-slate-900/60">
        {[
          { title: '원본', data: original },
          { title: '복사본(shallow)', data: shallow },
          { title: '복사본(deep)', data: deep },
        ].map((item) => (
          <div
            key={item.title}
            className="space-y-3 rounded-md border border-slate-200/60 p-2 dark:border-slate-700"
          >
            <Text.Caption className="block">{item.title}</Text.Caption>
            <div className="text-xs text-slate-700 dark:text-slate-200">
              <div className="flex flex-wrap gap-1">
                tags:
                {item.data.tags.map((t, index) => (
                  <Badge key={`${t}-${index}`} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={pushShallow}>
          shallow.tags.push(&quot;next&quot;)
        </Button>
        <Button size="sm" variant="outline" onClick={pushDeep}>
          deep.tags.push(&quot;next&quot;)
        </Button>
      </div>
    </div>
  );
}
