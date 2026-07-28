import { CodeLine, ExampleCard } from '../shared/ExampleCard';

export function ImmutabilityDemo() {
  const base = [
    { id: 1, done: false },
    { id: 2, done: true },
  ];

  // 불변 업데이트 예시
  const toggled = base.map((t) => (t.id === 1 ? { ...t, done: !t.done } : t));
  const appended = [...base, { id: 3, done: false }];

  return (
    <div className="grid gap-3 md:grid-cols-1">
      <ExampleCard title="원본">
        <CodeLine label="base" value={JSON.stringify(base)} />
      </ExampleCard>
      <ExampleCard title="map으로 상태 토글">
        <CodeLine label="toggled" value={JSON.stringify(toggled)} />
        <CodeLine label="base === toggled" value={String(base === toggled)} />
      </ExampleCard>
      <ExampleCard title="스프레드로 추가">
        <CodeLine label="appended" value={JSON.stringify(appended)} />
        <CodeLine label="base length" value={String(base.length)} />
      </ExampleCard>
      <ExampleCard title="참조 분리 확인">
        <CodeLine label="base[0] === toggled[0]" value={String(base[0] === toggled[0])} />
        <CodeLine label="base[1] === toggled[1]" value={String(base[1] === toggled[1])} />
        <CodeLine label="appended includes id 3" value={String(appended.some((t) => t.id === 3))} />
      </ExampleCard>
    </div>
  );
}
