'use client';

import { Text } from '@/components/ui/Text';

export default function BlogSection() {
  return (
    <div className="space-y-3">
      <Text.H3>Blog</Text.H3>
      <Text.Caption className="block text-slate-500 dark:text-slate-300">
        글/노트 목록을 테이블이나 카드 형태로 구성하세요.
      </Text.Caption>
      <div className="rounded-xl border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-sm text-slate-700 dark:text-slate-200">블로그 포스트 리스트가 올 자리입니다.</p>
      </div>
    </div>
  );
}
