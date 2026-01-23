import { CodeLine, ExampleCard } from '../shared/ExampleCard';

export default function ArrayMethodsDemo() {
  const nums = [1, 2, 3, 4];
  const doubled = nums.map((n) => n * 2);
  const evens = nums.filter((n) => n % 2 === 0);
  const sum = nums.reduce((acc, n) => acc + n, 0);
  const firstEven = nums.find((n) => n % 2 === 0);
  const allPositive = nums.every((n) => n > 0);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <ExampleCard title="원본">
        <CodeLine label="nums" value={JSON.stringify(nums)} />
      </ExampleCard>
      <ExampleCard title="map / filter">
        <CodeLine label="map x2" value={JSON.stringify(doubled)} />
        <CodeLine label="filter even" value={JSON.stringify(evens)} />
      </ExampleCard>
      <ExampleCard title="reduce / find">
        <CodeLine label="reduce sum" value={String(sum)} />
        <CodeLine label="find even" value={String(firstEven)} />
      </ExampleCard>
      <ExampleCard title="every">
        <CodeLine label="all > 0" value={String(allPositive)} />
      </ExampleCard>
    </div>
  );
}
