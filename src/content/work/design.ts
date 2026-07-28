import { designWorkSchema, type DesignWork } from '../schema';

export const DESIGN_INTRO = {
  title: '프로덕트 디자인',
  description: 'PD 챌린지와 디자인 시스템 정리입니다. 프로토타입과 토큰을 함께 봅니다.',
};

export const DESIGN_WORKS: DesignWork[] = [
  {
    id: 'toss-pd-challenge',
    title: '토스 Product Design — 일정 맞추기',
    summary:
      '6명 회의 일정을 겹쳐 보고 가능한 시간을 찾는 모바일 웹 프로토타입. 문제 정의부터 플로우 설계까지 진행했습니다.',
    tags: ['Product Design', 'Figma', 'Prototype', 'Mobile'],
    image: '/publishing/img/page/mobile/toss-pd.png',
    featured: true,
    links: {
      prototype: 'https://daeya0406.github.io/2026-toss-pd-challenge/index.html',
      github: 'https://github.com/daeya0406/2026-toss-pd-challenge',
    },
    process: [
      '회의 일정 조율 문제를 사용자 시나리오로 정의',
      '가능 시간대를 겹쳐 보는 모바일 플로우 설계',
      '프로토타입으로 참여자 경험 검증',
    ],
  },
  {
    id: 'design-system',
    title: '디자인 시스템 — Color · Font · UI',
    summary:
      '이 사이트에서 쓰는 컬러 토큰, 타이포, UI 컴포넌트를 정리한 디자인 시스템입니다. 실제 구현과 맞춰 두었습니다.',
    tags: ['Design Tokens', 'Typography', 'Components'],
    featured: true,
    links: {
      guide: '/hobby/guide',
    },
    process: [
      '브랜드 컬러와 depth 레이어를 CSS 변수로 정의',
      'Pretendard 기반 타이포 스케일 정리',
      'Button, Badge, Dialog 등 공통 UI 패턴 문서화',
    ],
  },
  {
    id: 'scss-foundation',
    title: 'SCSS Foundation Guide',
    summary: '레이어 구조·토큰·mixin·Vue 컴포넌트 사용법을 정리한 SCSS 가이드입니다.',
    tags: ['SCSS', 'Design System', 'Vue'],
    links: {
      guide: 'https://setting-guide-scss.vercel.app/',
      github: 'https://github.com/daeya-playground/scss',
    },
    process: [
      '레이어 구조와 네이밍 규칙 정의',
      '토큰과 mixin으로 스타일 일관성 확보',
      'Vue 컴포넌트 사용 예시 정리',
    ],
  },
];

DESIGN_WORKS.forEach((work) => designWorkSchema.parse(work));

export const FEATURED_DESIGN_WORKS = DESIGN_WORKS.filter((w) => w.featured);
