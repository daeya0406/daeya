'use client';

import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';

export default function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [domValue, setDomValue] = useState('');

  const silentCountRef = useRef(0);
  const renderCountRef = useRef(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [stateCount, setStateCount] = useState(0);

  renderCountRef.current += 1;

  const focusInput = () => inputRef.current?.focus();
  const insertText = () => {
    if (!inputRef.current) return;
    inputRef.current.value = 'ref로 직접 작성';
    inputRef.current.focus();
  };

  const addSilent = () => {
    silentCountRef.current += 1; // 렌더 없음
  };
  const syncToView = () => setVisibleCount(silentCountRef.current);

  return (
    <div className="space-y-4 rounded-lg border border-border bg-depth-1 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">useRef</p>
          <Text.Caption>DOM 직접 참조 / 렌더 없이 값 보관</Text.Caption>
        </div>
        <Badge variant="outline">no re-render on ref</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2 rounded-lg border border-border bg-depth-2 p-3 text-sm">
          <Text.Body14 className="mb-4">1) DOM 직접 참조</Text.Body14>
          <Input
            ref={inputRef}
            value={domValue}
            onChange={(e) => setDomValue(e.target.value)}
            placeholder="버튼으로 focus / 값 삽입"
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={focusInput}>
              focus()
            </Button>
            <Button size="sm" variant="outline" onClick={insertText}>
              값 삽입(ref)
            </Button>
          </div>
          <Text.Caption className="text-muted-foreground">
            DOM 노드를 ref로 직접 제어. state 없이도 포커스/값 삽입 가능
          </Text.Caption>
        </div>

        <div className="space-y-2 rounded-lg border border-border bg-depth-2 p-3 text-sm">
          <Text.Body14 className="mb-4">2) 렌더링 없이 값 저장</Text.Body14>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={addSilent}>
              ref 카운트 +1 (렌더 없음)
            </Button>
            <Button size="sm" variant="outline" onClick={() => setStateCount((c) => c + 1)}>
              state +1 (렌더 발생)
            </Button>
            <Button size="sm" onClick={syncToView}>
              렌더
            </Button>
          </div>
          <div className="space-y-1 text-sm text-foreground">
            <p>ref 카운트(동기화 시 표시): {visibleCount}</p>
            <p>state 카운트(렌더 발생): {stateCount}</p>
            <p>렌더 횟수(ref 추적): {renderCountRef.current}</p>
          </div>
          <Text.Caption className="text-muted-foreground">
            ref는 바뀌어도 컴포넌트 렌더를 유발하지 않음. 필요할 때만 state로 동기화
          </Text.Caption>
        </div>
      </div>
    </div>
  );
}
