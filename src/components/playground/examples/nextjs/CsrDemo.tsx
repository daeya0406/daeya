'use client';

import { Text } from '@/components/ui/Text';

export default function CsrDemo() {
  return (
    <div className="space-y-2 rounded-lg border border-slate-200/70 bg-white/80 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/60">
      <Text.Body14 className="font-semibold text-slate-900 dark:text-slate-50">CSR (클라이언트 렌더)</Text.Body14>
      <ul className="list-disc space-y-1 pl-4 text-slate-700 dark:text-slate-200">
        <li>초기에는 최소 HTML + JS 번들만 내려받고, 브라우저에서 렌더</li>
        <li>첫 페인트는 느릴 수 있지만 이후 네비게이션이 빠름</li>
        <li>SEO/첫화면이 중요하지 않은 대시보드 등에 적합</li>
      </ul>
    </div>
  );
}
