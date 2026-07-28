export const ABOUT_STACK = {
  primary: ['JavaScript', 'React', 'TypeScript', 'Next.js'],
  comfortable: [
    'Web Accessibility',
    'Tailwind CSS',
    'SCSS',
    'Design Systems',
    'Zustand',
    'Storybook',
    'Framer Motion',
  ],
  learning: ['React Query', 'Supabase', 'Zod', 'Radix', 'Spring', 'SQL'],
};

export const ABOUT_PRINCIPLES = [
  {
    title: '접근성·시맨틱 우선',
    description: '퍼블리싱 경험을 바탕으로 마크업·키보드·반응형을 기본으로 챙깁니다.',
  },
  {
    title: '유지보수 가능한 구조',
    description: '재사용 컴포넌트와 일관된 네이밍·타입으로 나중에 읽기 쉬운 코드를 남깁니다.',
  },
  {
    title: '필요할 때만 복잡도',
    description: '새 기술은 문제를 더 잘 풀 수 있을 때 도입하고, 측정 없는 최적화는 하지 않습니다.',
  },
];

export const ABOUT_ADJACENT = [
  {
    tag: 'Guide',
    title: 'UI 세팅 — SCSS 규칙 · 컴포넌트 가이드',
    description:
      '레이어 구조·토큰·mixin·Vue 컴포넌트 사용법을 정리한 SCSS Foundation 가이드입니다.',
    links: [
      { label: '가이드 보기', href: 'https://setting-guide-scss.vercel.app/' },
      { label: 'GitHub', href: 'https://github.com/daeya-playground/scss' },
    ],
  },
  {
    tag: 'PD',
    title: '토스 Product Design — 일정 맞추기',
    description: '6명 회의 일정을 겹쳐 보고 가능한 시간을 찾는 모바일 웹 프로토타입입니다.',
    links: [
      {
        label: '프로토타입',
        href: 'https://daeya0406.github.io/2026-toss-pd-challenge/index.html',
      },
      { label: 'GitHub', href: 'https://github.com/daeya0406/2026-toss-pd-challenge' },
    ],
  },
  {
    tag: 'Learning',
    title: 'Spring(Java) · Vue 정리',
    description: 'API·쿼리 맥락을 읽고 Spring과 인접 스택을 정리해 둔 것입니다.',
    links: [
      { label: 'Spring', href: 'https://github.com/daeya-playground/spring' },
      { label: 'Vue', href: 'https://github.com/daeya-playground/vue' },
    ],
  },
];

export const ABOUT_LINKS = [
  { label: '프론트엔드', href: '/work/frontend' },
  { label: '실험실', href: '/hobby/playground' },
];

export const PROFILE_INTRO = {
  headline: '퍼블리싱 경험으로 UI를 잡고, 프론트엔드로 이어가고 있습니다',
  description:
    '5년+ 퍼블리싱으로 마크업·접근성·반응형을 빠르게 세팅하고, React·Next.js로 컴포넌트와 상태까지 책임집니다.',
  stats: [
    { label: '퍼블', value: '5년 이상' },
    { label: 'FE', value: '1년 이상' },
  ],
};
