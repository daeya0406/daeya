'use client';

import { Text } from '@/components/ui/Text';

export default function HydrationDemo() {
  return (
    <div className="space-y-2 rounded-lg border border-slate-200/70 bg-white/80 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/60">
      <Text.Body14 className="font-semibold text-slate-900 dark:text-slate-50">Hydration</Text.Body14>
      <ul className="list-disc space-y-1 pl-4 text-slate-700 dark:text-slate-200">
        <li>SSR로 내려온 HTML을 클라이언트 JS가 다시 “살려” 이벤트 연결</li>
        <li>서버/클라이언트 렌더 결과가 달라지면 mismatch 에러 발생</li>
        <li>날짜/랜덤/locale 의존 값은 고정 포맷으로 맞추는 것이 안전</li>
      </ul>
    </div>
  );
}
