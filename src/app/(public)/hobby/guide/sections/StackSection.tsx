'use client';

import { GuideSectionIntro } from '../GuideSectionIntro';

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
      <GuideSectionIntro
        title="Stack"
        description="이 사이트에서 쓰는 프레임워크·라이브러리·패턴입니다."
      />

      <div className="grid gap-3 md:grid-cols-2">
        {stacks.map((group) => (
          <div
            key={group.title}
            className="border-border bg-depth-2/50 rounded-xl border p-5"
          >
            <h3 className="text-foreground text-sm font-bold">{group.title}</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-start gap-2">
                  <span className="bg-primary mt-2 h-1 w-1 shrink-0 rounded-full" />
                  <div>
                    <span className="text-foreground font-semibold">{item.name}</span>
                    <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                      {item.desc}
                    </p>
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
