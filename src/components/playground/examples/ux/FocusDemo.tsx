'use client';

import { Text } from '@/components/ui/Text';

export default function FocusDemo() {
  return (
    <div className="space-y-3">
      <Text.Body14 className="text-muted-foreground">키보드 포커스 / 접근성: focus-visible + aria-label</Text.Body14>
      <div className="grid gap-3 md:grid-cols-2">
        <button className="rounded-lg border border-border bg-depth-1 px-4 py-3 text-sm shadow-sm outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40">
          기본 버튼 (Tab으로 포커스 확인)
        </button>
        <label className="flex items-center gap-2 rounded-lg border border-border bg-depth-1 px-4 py-3 text-sm shadow-sm">
          <Text.Caption className="text-muted-foreground">입력</Text.Caption>
          <input
            className="flex-1 rounded-md border border-border bg-depth-1 px-3 py-2 text-sm text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 placeholder:text-muted-foreground"
            placeholder="aria-label 예시"
            aria-label="접근성 입력 필드"
          />
        </label>
      </div>
    </div>
  );
}
