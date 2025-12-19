'use client';

import { Text } from '@/components/ui/Text';

export default function PortfolioSection() {
  return (
    <div className="space-y-3">
      <Text.H3>Portfolio</Text.H3>
      <Text.Caption className="block text-slate-500 dark:text-slate-300">
        실제 프로젝트/역할/스택을 카드로 정리할 공간입니다.
      </Text.Caption>
      <div className="rounded-xl border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-sm text-slate-700 dark:text-slate-200">프로젝트 카드 리스트를 여기에 배치하세요.</p>
      </div>
    </div>
  );
}
