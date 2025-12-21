import { Text } from '@/components/ui/Text';

export default function ArrayMethodsDemo() {
  const nums = [1, 2, 3, 4];
  const doubled = nums.map((n) => n * 2);
  const evens = nums.filter((n) => n % 2 === 0);
  const sum = nums.reduce((acc, n) => acc + n, 0);
  const firstEven = nums.find((n) => n % 2 === 0);
  const allPositive = nums.every((n) => n > 0);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <DemoCard title="원본">
        <CodeLine label="nums" value={JSON.stringify(nums)} />
      </DemoCard>
      <DemoCard title="map / filter">
        <CodeLine label="map x2" value={JSON.stringify(doubled)} />
        <CodeLine label="filter even" value={JSON.stringify(evens)} />
      </DemoCard>
      <DemoCard title="reduce / find">
        <CodeLine label="reduce sum" value={String(sum)} />
        <CodeLine label="find even" value={String(firstEven)} />
      </DemoCard>
      <DemoCard title="every">
        <CodeLine label="all > 0" value={String(allPositive)} />
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
