import { Text } from '@/components/ui/Text';

export default function ObjectMethodsDemo() {
  const user = { id: 1, name: 'Daeya', active: false };
  const keys = Object.keys(user);
  const entries = Object.entries(user);
  const clone = Object.assign({}, user, { active: true });
  const rebuilt = Object.fromEntries(entries);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <DemoCard title="원본 객체">
        <CodeLine label="user" value={JSON.stringify(user)} />
      </DemoCard>
      <DemoCard title="keys / entries">
        <CodeLine label="keys" value={JSON.stringify(keys)} />
        <CodeLine label="entries" value={JSON.stringify(entries)} />
      </DemoCard>
      <DemoCard title="assign (얕은 병합)">
        <CodeLine label="clone" value={JSON.stringify(clone)} />
      </DemoCard>
      <DemoCard title="fromEntries">
        <CodeLine label="rebuilt" value={JSON.stringify(rebuilt)} />
      </DemoCard>
    </div>
  );
}

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="section-component">
      <Text.Body14 className="font-semibold text-foreground dark:text-foreground">{title}</Text.Body14>
      <div className="mt-2 space-y-1 font-mono text-xs text-foreground dark:text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function CodeLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground">{label}:</span>
      <span className="break-all">{value}</span>
    </div>
  );
}
