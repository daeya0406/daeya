'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';

function heavyInit() {
  console.log('무거운 연산');
}

export default function UseStateDemo() {
  const [text, setText] = useState('');
  const [nameText, setNameText] = useState('');
  const [name, setName] = useState(['홍길동', '김민수']);
  const [heavy, setHeavy] = useState(() => heavyInit());

  const rerunHeavy = () => setHeavy(heavyInit());

  const handleUpload = () => {
    nameText && setName((prev) => [nameText, ...prev]); // nameText 있을 때만 추가
    setNameText(''); // 해당 input 초기화
  };

  return (
    <div className="space-y-4 rounded-lg border border-border bg-depth-1 p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">useState</p>
          <Text.Caption>인풋 상태 업데이트</Text.Caption>
        </div>
        <Badge variant="outline">setState</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-3">
          <div className="flex flex-col gap-y-1">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="타이핑하면 즉시 반영"
            />
            <Text.Caption className="text-muted-foreground">
              현재 입력: {text || '(비어있음)'}
            </Text.Caption>
          </div>
          <div className="flex flex-col gap-y-1">
            <Input
              value={nameText}
              onChange={(e) => setNameText(e.target.value)}
              placeholder="버튼 클릭해야 반영"
            />
            <Button onClick={handleUpload}>추가</Button>
            <Text.Body14 className="text-muted-foreground">
              현재 입력: {name.map((name) => name).join(', ')}
            </Text.Body14>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-border bg-depth-2 p-3">
          <div className="flex items-center justify-between">
            <Text.Body14>lazy Initializer</Text.Body14>
            <Badge variant="default">useState(() =&gt; ...)</Badge>
          </div>
          <Text.Caption as="p" className="text-muted-foreground">
            초기 한 번만 실행된 무거운 계산 결과를 캐싱. 재계산은 버튼으로만 실행
            <br />( 대략적으로 3 ~ 5ms 이상일 경우 무거운 계산 결과로 간주 )
          </Text.Caption>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="outline" onClick={rerunHeavy}>
              재계산
            </Button>
            <Text.Caption className="text-muted-foreground">콘솔로 무거운 연산 확인</Text.Caption>
          </div>
        </div>
      </div>
    </div>
  );
}
