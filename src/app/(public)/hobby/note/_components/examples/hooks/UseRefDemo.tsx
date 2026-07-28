'use client';

import { useRef, useState } from 'react';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

export function UseRefDemo() {
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
    <div className="border-border bg-depth-1 space-y-4 rounded-lg border p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-foreground text-sm font-semibold">useRef</p>
          <span className="text-xs tracking-[0.01em]">DOM 직접 참조 / 렌더 없이 값 보관</span>
        </div>
        <Badge variant="outline">no re-render on ref</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="border-border bg-depth-2 space-y-2 rounded-lg border p-3 text-sm">
          <p className="text-md mb-4 font-normal">1) DOM 직접 참조</p>
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
          <span className="text-muted-foreground text-xs tracking-[0.01em]">
            DOM 노드를 ref로 직접 제어. state 없이도 포커스/값 삽입 가능
          </span>
        </div>

        <div className="border-border bg-depth-2 space-y-2 rounded-lg border p-3 text-sm">
          <p className="text-md mb-4 font-normal">2) 렌더링 없이 값 저장</p>
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
          <div className="text-foreground space-y-1 text-sm">
            <p>ref 카운트(동기화 시 표시): {visibleCount}</p>
            <p>state 카운트(렌더 발생): {stateCount}</p>
            <p>렌더 횟수(ref 추적): {renderCountRef.current}</p>
          </div>
          <span className="text-muted-foreground text-xs tracking-[0.01em]">
            ref는 바뀌어도 컴포넌트 렌더를 유발하지 않음. 필요할 때만 state로 동기화
          </span>
        </div>
      </div>
    </div>
  );
}
