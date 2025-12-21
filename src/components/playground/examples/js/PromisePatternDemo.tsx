import { useEffect, useRef, useState } from 'react';
import { Text } from '@/components/ui/Text';

export default function PromisePatternDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const log = (msg: string) => setLogs((prev) => [...prev, msg]);

    const fetchA = () => Promise.resolve('A done');
    const fetchB = () => Promise.resolve('B done');

    // 병렬
    Promise.all([fetchA(), fetchB()]).then((res) => log(`Promise.all → ${res.join(', ')}`));

    // 직렬
    (async () => {
      log('Serial start');
      for (const task of [fetchA, fetchB]) {
        const res = await task();
        log(`Serial → ${res}`);
      }
      log('Serial end');
    })();

    // 타임아웃 레이스
    const timeout = new Promise<string>((resolve) => setTimeout(() => resolve('timeout 50ms'), 50));
    Promise.race([fetchA(), timeout]).then((res) => log(`Promise.race → ${res}`));
  }, []);

  return (
    <div className="section-component">
      <Text.Body14 className="font-semibold text-foreground dark:text-foreground">
        Promise 패턴
      </Text.Body14>
      <div className="mt-2 space-y-1 font-mono text-xs text-foreground dark:text-muted-foreground">
        {logs.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
}
