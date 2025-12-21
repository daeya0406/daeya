'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function TryCatchDemo() {
  const [message, setMessage] = useState<string | null>(null);

  const runSafe = () => {
    try {
      const result = JSON.parse('{ "ok": true }');
      setMessage(`성공: ${result.ok}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '알 수 없는 에러');
    } finally {
      // 필요한 정리 작업이 있다면 여기서 수행
    }
  };

  const runError = () => {
    try {
      JSON.parse('잘못된 JSON');
      setMessage('여기는 실행되지 않습니다.');
    } catch {
      setMessage('에러 캐치됨: 잘못된 JSON');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button size="sm" onClick={runSafe}>
          성공 케이스
        </Button>
        <Button size="sm" variant="outline" onClick={runError}>
          에러 케이스
        </Button>
      </div>
      {message && (
        <div className="rounded-md border border-border bg-depth-2 p-3 text-sm">
          {message}
        </div>
      )}
    </div>
  );
}
