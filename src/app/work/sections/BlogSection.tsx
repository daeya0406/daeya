'use client';

import { Text } from '@/components/ui/Text';

export default function BlogSection() {
  return (
    <div className="space-y-3">
      <Text.H3>Blog</Text.H3>
      <Text.Caption className="block text-muted-foreground">
        글/노트 목록을 테이블이나 카드 형태로 구성하세요.
      </Text.Caption>
      <div className="rounded-xl border border-border bg-bg-depth-1/70 p-4 shadow-sm">
        <p className="text-sm text-foreground">블로그 포스트 리스트가 올 자리입니다.</p>
      </div>
    </div>
  );
}
