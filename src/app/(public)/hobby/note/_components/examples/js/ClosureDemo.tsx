export function ClosureDemo() {
  const logs: string[] = [];

  const log = (msg: string) => logs.push(msg);

  function createCounter() {
    let count = 0;
    return () => ++count;
  }

  const counterA = createCounter();
  const counterB = createCounter();

  log(`counterA() → ${counterA()}`); // 1
  log(`counterA() → ${counterA()}`); // 2
  log(`counterB() → ${counterB()}`); // 1 (독립 상태)

  return (
    <div className="section-component">
      <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-foreground dark:text-muted-foreground">
        {logs.join('\n')}
      </pre>
      <p className="mt-3 text-xs text-muted-foreground dark:text-muted-foreground">
        함수 스코프에 남는 count를 각각 캡처해서 독립적인 상태를 유지함
      </p>
    </div>
  );
}
