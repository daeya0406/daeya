import { hobbyTeaserSchema, type HobbyTeaser } from '../schema';

export const HOBBY_TEASERS: HobbyTeaser[] = [
  {
    id: 'infinite-scroll',
    title: '무한 스크롤 패턴',
    description: 'IntersectionObserver와 React Query로 목록을 이어 붙입니다.',
    tags: ['React Query', 'Templates'],
    href: '/hobby/playground?tab=templates',
    category: 'playground',
    featured: true,
  },
  {
    id: 'number-motion',
    title: '숫자 모션',
    description: 'Framer Motion으로 카운트업 애니메이션을 구현합니다.',
    tags: ['Framer Motion', 'UX'],
    href: '/hobby/playground?tab=ux',
    category: 'playground',
    featured: true,
  },
  {
    id: 'event-loop',
    title: '이벤트 루프',
    description: 'microtask와 macrotask 실행 순서를 시각화합니다.',
    tags: ['JavaScript'],
    href: '/hobby/note?tab=js',
    category: 'note',
    featured: true,
  },
  {
    id: 'app-router',
    title: 'App Router 구조',
    description: 'Next.js App Router 레이아웃과 라우팅 패턴을 정리합니다.',
    tags: ['Next.js'],
    href: '/hobby/note?tab=nextjs',
    category: 'note',
    featured: true,
  },
];

HOBBY_TEASERS.forEach((teaser) => hobbyTeaserSchema.parse(teaser));

export const FEATURED_HOBBY_TEASERS = HOBBY_TEASERS.filter((t) => t.featured);
