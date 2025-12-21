'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';

export default function UxOptimisticDemo() {
  const [likes, setLikes] = useState(12);
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');

  const toggleLike = () => {
    setStatus('saving');
    setLikes((v) => v + 1); // optimistic
    setTimeout(() => {
      const fail = Math.random() < 0.25;
      if (fail) {
        setLikes((v) => v - 1);
        setStatus('error');
      } else {
        setStatus('idle');
      }
    }, 600);
  };

  return (
    <div className="space-y-2">
      <Text.Body14 className="text-muted-foreground">Optimistic UI: 먼저 UI 반영 → 실패 시 롤백</Text.Body14>
      <div className="flex items-center gap-3 rounded-lg border border-border bg-depth-1 p-3 text-sm">
        <Button size="sm" onClick={toggleLike} disabled={status === 'saving'}>
          좋아요 +1
        </Button>
        <Text.Body14 className="text-foreground">{likes} likes</Text.Body14>
        <Text.Caption className="text-muted-foreground">
          {status === 'saving' && '서버 반영 중...'}
          {status === 'error' && '실패: 롤백됨'}
          {status === 'idle' && '즉시 반영 후 서버 동기화'}
        </Text.Caption>
      </div>
    </div>
  );
}
