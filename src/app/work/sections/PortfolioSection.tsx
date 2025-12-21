'use client';

import { Text } from '@/components/ui/Text';

export default function PortfolioSection() {
  return (
    <div className="space-y-3">
      <Text.H3>Portfolio</Text.H3>
      <Text.Caption className="block text-muted-foreground">
        실제 프로젝트/역할/스택을 카드로 정리할 공간입니다.
      </Text.Caption>
      <div className="rounded-xl border border-border bg-depth-1/70 p-4 shadow-sm">
        <p className="text-sm text-foreground">프로젝트 카드 리스트를 여기에 배치하세요.</p>
      </div>
    </div>
  );
}
