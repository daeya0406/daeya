import { Text } from '@/components/ui/Text';

export default function ThisBindingDemo() {
  const logs: string[] = [];

  const obj = {
    value: 42,
    getThis() {
      return this.value;
    },
  };

  const arrowHolder = {
    value: 100,
    getThis: () => obj.value,
  };

  const bound = obj.getThis.bind({ value: 7 });

  logs.push(`obj.getThis() => ${obj.getThis()}`); // 42
  logs.push(`arrowHolder.getThis() => ${arrowHolder.getThis()}`); // 42 (obj를 캡처)
  logs.push(`bound() => ${bound()}`); // 7

  return (
    <div className="section-component">
      <Text.Body14 className="font-semibold text-foreground dark:text-foreground">
        this 바인딩 예시
      </Text.Body14>
      <div className="mt-2 space-y-1 font-mono text-xs text-foreground dark:text-muted-foreground">
        {logs.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground dark:text-muted-foreground">
        메서드 호출(obj), 화살표 함수는 상위 this 캡처, bind로 명시적 바인딩을 확인합니다.
      </p>
    </div>
  );
}
