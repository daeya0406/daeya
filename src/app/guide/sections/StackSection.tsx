'use client';

import { Text } from '@/components/ui/Text';

type StackGroup = {
  title: string;
  items: { name: string; desc: string }[];
};

const stacks: StackGroup[] = [
  {
    title: 'Core',
    items: [
      { name: 'Next.js 16', desc: 'App Router 기반 SSR/CSR 믹스' },
      { name: 'React 19 + TS', desc: '타입 안전한 컴포넌트/훅' },
    ],
  },
  {
    title: 'Style & UX',
    items: [
      { name: 'TailwindCSS', desc: '유틸 위주 스타일링' },
      { name: 'Framer Motion', desc: '섹션 전환·마이크로 인터랙션' },
      { name: 'clsx + tailwind-merge', desc: '클래스 병합/조건부' },
    ],
  },
  {
    title: 'Forms & Validation',
    items: [
      { name: 'React Hook Form', desc: '폼 상태/성능 최적화' },
      { name: 'Zod + resolvers', desc: '타입·스키마 검증 통합' },
      { name: 'Form Compound', desc: 'FormField/Control/Message로 aria 연동' },
    ],
  },
  {
    title: 'Data Fetching',
    items: [
      { name: 'React Query', desc: '쿼리/뮤테이션 캐시 관리' },
      { name: 'Supabase SDK', desc: 'Auth + 데이터 호출' },
    ],
  },
  {
    title: 'State & Utils',
    items: [
      { name: 'Zustand', desc: '가벼운 전역 상태' },
      { name: 'dayjs', desc: '포맷/relative time' },
    ],
  },
  {
    title: 'UI Base',
    items: [
      { name: 'Radix UI', desc: 'Dialog/Dropdown/Select 등 접근성 베이스' },
      { name: 'Text Scale + CVA Buttons', desc: '스케일·variant 기반 시스템' },
      { name: 'Sonner', desc: '토스트 알림' },
    ],
  },
  {
    title: 'Quality',
    items: [
      { name: 'ESLint', desc: 'Next 권장 룰 기반' },
      { name: 'Prettier + Tailwind', desc: '포맷/클래스 정렬 자동화' },
    ],
  },
];

export default function StackSection() {
  return (
    <div className="space-y-6">
      <div className="line-bottom mb-8 space-y-2">
        <Text.H3 className="text-primary">Stack</Text.H3>
        <Text.Caption className="block">
          프로젝트에서 사용하는 프레임워크·라이브러리·패턴 리스트입니다.
        </Text.Caption>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {stacks.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm ring-1 ring-white/40 backdrop-blur md:p-8 dark:border-slate-800/70 dark:bg-slate-900/60 dark:ring-slate-800/50"
          >
            <Text.H4 className="text-slate-900 dark:text-slate-50">{group.title}</Text.H4>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-start gap-2">
                  <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-900 dark:text-slate-50">
                      {item.name}
                    </span>
                    <div className="leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
