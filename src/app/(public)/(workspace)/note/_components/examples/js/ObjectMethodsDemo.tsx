import { CodeLine, ExampleCard } from '../shared/ExampleCard';

export function ObjectMethodsDemo() {
  const user = { id: 1, name: 'Daeya', active: false };
  const keys = Object.keys(user);
  const entries = Object.entries(user);
  const clone = Object.assign({}, user, { active: true });
  const rebuilt = Object.fromEntries(entries);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ExampleCard title="원본 객체">
        <CodeLine label="user" value={JSON.stringify(user)} />
      </ExampleCard>
      <ExampleCard title="keys / entries">
        <CodeLine label="keys" value={JSON.stringify(keys)} />
        <CodeLine label="entries" value={JSON.stringify(entries)} />
      </ExampleCard>
      <ExampleCard title="assign (얕은 병합)">
        <CodeLine label="clone" value={JSON.stringify(clone)} />
      </ExampleCard>
      <ExampleCard title="fromEntries">
        <CodeLine label="rebuilt" value={JSON.stringify(rebuilt)} />
      </ExampleCard>
    </div>
  );
}
