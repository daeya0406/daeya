'use client';

import { Text } from '@/components/ui/Text';

export default function FocusDemo() {
  return (
    <div className="space-y-3">
      <Text.Body14 className="text-slate-600 dark:text-slate-200">
        키보드 포커스 / 접근성: focus-visible + aria-label
      </Text.Body14>
      <div className="grid gap-3 md:grid-cols-2">
        <button className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
          기본 버튼 (Tab으로 포커스 확인)
        </button>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Text.Caption className="text-slate-500">입력</Text.Caption>
          <input
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-slate-600 dark:bg-slate-900"
            placeholder="aria-label 예시"
            aria-label="접근성 입력 필드"
          />
        </label>
      </div>
    </div>
  );
}
