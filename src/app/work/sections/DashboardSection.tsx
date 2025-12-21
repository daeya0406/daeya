'use client';

import { Text } from '@/components/ui/Text';

export default function DashboardSection() {
  return (
    <div className="space-y-3">
      <Text.H3>Dashboard</Text.H3>
      <Text.Caption className="block text-muted-foreground">
        보호된 위젯/요약 정보를 배치할 공간입니다.
      </Text.Caption>
      <div className="rounded-xl border border-border bg-depth-1/70 p-4 shadow-sm">
        <p className="text-sm text-foreground">인증/권한이 필요한 영역을 샘플로 보여주세요.</p>
      </div>
    </div>
  );
}
