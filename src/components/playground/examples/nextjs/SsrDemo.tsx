'use client';

import { Text } from '@/components/ui/Text';

export default function SsrDemo() {
  return (
    <div className="space-y-2 rounded-lg border border-border bg-bg-depth-1 p-4 text-sm">
      <Text.Body14 className="font-semibold text-foreground">SSR (서버 렌더)</Text.Body14>
      <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
        <li>요청마다 HTML을 서버에서 만든 뒤 클라이언트로 전달</li>
        <li>첫 페인트 빠르고, SEO에 유리</li>
        <li>클라이언트 진입 시 하이드레이션 필요</li>
      </ul>
    </div>
  );
}
