'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function UseEffectDependencyDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [countHits, setCountHits] = useState(0);
  const [textHits, setTextHits] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  // 의존성 배열 없음: 모든 렌더마다 실행
  useEffect(() => {
    console.log('deps 없음: 렌더마다 실행');
  });

  // 특정 값이 바뀔 때만 실행
  useEffect(() => {
    setCountHits((hits) => hits + 1);
  }, [count]);

  useEffect(() => {
    setTextHits((hits) => hits + 1);
  }, [text]);

  // [running] 토글: 마운트 때 1회 설정 후, cleanup에서 clearInterval
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [running]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-depth-1 p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">useEffect 의존성 배열</p>
            <span className="text-xs tracking-[0.01em]">
              의존성 배열 없음 / [count] / [input] 비교
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={() => setCount((c) => c + 1)}>
                count +1
              </Button>
              <p className="text-md font-normal">count: {count}</p>
            </div>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="타이핑 해보세요"
            />
          </div>
          <div className="space-y-2 rounded-lg border border-border bg-depth-2 p-3">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Badge variant="default">[count]</Badge>
              <span>count 변경 effect 실행: {countHits}회</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Badge variant="default">[input]</Badge>
              <span>input 변경 effect 실행: {textHits}회</span>
            </div>
            <span className="text-xs tracking-[0.01em] text-muted-foreground">
              의존성 배열 없는 부분은 모든 렌더마다 실행 → 콘솔에서 확인 가능
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-depth-1 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">[running] 의존성 + setInterval</p>
            <span className="text-xs tracking-[0.01em]">
              마운트 1회 등록, 버튼으로 토글
            </span>
          </div>
          <Badge variant={running ? 'default' : 'outline'}>{running ? 'running' : 'stopped'}</Badge>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <p className="text-md font-normal">경과: {seconds}s</p>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (running) {
                setRunning(false);
              } else {
                setSeconds(0);
                setRunning(true);
              }
            }}
          >
            {running ? 'Stop' : 'Start'}
          </Button>
        </div>
      </div>
    </div>
  );
}
