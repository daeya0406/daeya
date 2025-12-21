import { useEffect, useState, useRef } from 'react';
import { Text } from '@/components/ui/Text';

export default function EventLoopDemo() {
  const [logs, setLogs] = useState<string[]>(['sync']);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    queueMicrotask(() => setLogs((prev) => [...prev, 'microtask']));
    Promise.resolve().then(() => setLogs((prev) => [...prev, 'promise.then']));
    setTimeout(() => setLogs((prev) => [...prev, 'setTimeout 0ms']), 0);
  }, []);

  return (
    <div className="section-component">
      <Text.Body14 className="font-semibold text-foreground dark:text-foreground">
        이벤트 루프 순서
      </Text.Body14>
      <p className="mt-1 text-xs text-muted-foreground dark:text-muted-foreground">
        실행 흐름을 바로 찍어봤습니다.
      </p>
      <pre className="mt-2 whitespace-pre-wrap font-mono text-xs text-foreground dark:text-muted-foreground">
        {logs.join('\n')}
      </pre>
    </div>
  );
}
