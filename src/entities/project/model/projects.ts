export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectLinks = {
  caseStudy?: string;
  github?: string;
  live?: string;
};

export type ProjectCaseStudy = {
  overview?: string;
  goals?: string[];
  responsibilities?: string[];
  features?: string[];
  architecture?: string[];
  challenges?: { title: string; detail: string; code?: string }[];
  outcomes?: { label: string; value: string }[];
  learnings?: string[];
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  image?: string;
  tags: string[];
  metrics: ProjectMetric[];
  role?: string;
  period?: string;
  team?: string;
  highlights?: string[];
  links: ProjectLinks;
  featured?: boolean;
  caseStudy?: ProjectCaseStudy;
};

export const PROJECTS: Project[] = [
  {
    id: 'rolling-paper',
    title: 'Rolling Paper',
    summary: '서로 메시지를 남길 수 있는 온라인 롤링페이퍼 제작 서비스',
    image: '/images/projects/rolling.png',
    role: '팀장 / 프론트엔드',
    period: '2023.09 - 2023.10',
    team: 'FE 3',
    tags: ['React', 'Vite', 'React Router', 'SCSS'],
    metrics: [
      { label: '핵심 기능', value: '롤링페이지 생성' },
      { label: '운영 기능', value: '무한스크롤/관리자 모드' },
    ],
    highlights: [
      '반응형 UI와 접근성 고려한 컴포넌트 설계',
      '슬라이드 반응형과 무한스크롤 로직 구현',
      '롤링페이지 생성 및 메시지 전송 플로우 구축',
    ],
    links: {
      caseStudy: '/portfolio/rolling-paper',
      github: 'https://github.com/daeya0406/rolling-part2-team2',
    },
    caseStudy: {
      overview: '누구나 쉽게 롤링페이퍼를 만들고 공유할 수 있는 메시지 기반 웹 서비스입니다.',
      goals: ['반응형 UI와 접근성 강화', '롤링페이지 생성/메시지 작성 플로우 제공'],
      responsibilities: [
        '프로젝트 세팅과 배포 환경 구성',
        '롤링페이지 생성/메시지 작성 페이지 개발',
      ],
      features: ['무한 스크롤', '관리자 모드 토글 및 메시지 삭제', '슬라이드 UI'],
      challenges: [
        {
          title: 'TODO: 성능/UX 이슈',
          detail: '여기에 실제 겪었던 문제와 해결 과정을 적어주세요.',
        },
      ],
      outcomes: [
        { label: '반응형 대응', value: '완료' },
        { label: '접근성 개선', value: 'TODO' },
      ],
      learnings: ['TODO: 협업/기술적으로 얻은 인사이트를 적어주세요.'],
    },
  },
  {
    id: 'the-julge',
    title: 'The-Julge',
    summary: '인증/신청 플로우를 갖춘 웹 애플리케이션 구축 프로젝트',
    image: '/images/projects/the-julge.png',
    role: '프론트엔드',
    period: '2023.11 - 2023.12',
    team: 'FE 3',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'React Hook Form', 'Zod'],
    metrics: [
      { label: '핵심 플로우', value: '인증/신청' },
      { label: '품질 도구', value: 'ESLint/Prettier/Husky' },
    ],
    highlights: [
      '공통 UI 컴포넌트 구축과 폼 검증 패턴 정리',
      '커스텀 훅으로 페이지네이션과 모달 동작 관리',
      'API 클라이언트 구성과 타입 유틸 정리',
    ],
    links: {
      caseStudy: '/portfolio/the-julge',
      github: 'https://github.com/TEAM3-5/The-Julge',
      live: 'https://the-julge-git-dev-chldntjr1321s-projects.vercel.app/',
    },
    caseStudy: {
      overview: '인증과 신청 흐름을 중심으로 사용자 역할별 화면을 구성한 웹 애플리케이션입니다.',
      goals: ['폼 검증/상태 흐름 정리', '공통 UI 컴포넌트 재사용성 확보'],
      responsibilities: ['글로벌 폰트/컬러 정의', '리스트 테이블과 지역 필터 컴포넌트 개발'],
      features: ['react-hook-form + zod 검증', '공통 UI 컴포넌트 패턴'],
      challenges: [
        {
          title: 'TODO: 역할별 플로우 설계',
          detail: '역할 분기와 UI 상태 관리를 어떻게 정리했는지 적어주세요.',
        },
      ],
      outcomes: [
        { label: '배포', value: 'Vercel' },
        { label: '품질 도구', value: 'ESLint/Prettier/Husky' },
      ],
      learnings: ['TODO: 협업 규칙/워크플로우 개선점을 적어주세요.'],
    },
  },
  {
    id: 'activity-bite',
    title: '체험 한입',
    summary: '체험 탐색·예약·관리 플로우를 제공하는 FSD 기반 프론트엔드',
    image: '/images/projects/activity-bite2.png',
    role: '프론트엔드',
    period: '2023.11 - 2023.12',
    team: 'FE 3',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'FSD', 'DDD-lite'],
    metrics: [
      { label: '아키텍처', value: 'FSD + DDD-lite' },
      { label: '워크플로우', value: 'Husky/commitlint' },
    ],
    highlights: [
      'App Router는 라우팅/레이아웃만 담당하도록 분리',
      '도메인 로직을 entities/features로 구분해 확장성 확보',
      'BFF 레이어를 통한 인증/요청 흐름 정리',
    ],
    links: {
      caseStudy: '/portfolio/global-nomad',
      github: 'https://github.com/FE19-Team3/global_nomad',
      live: 'https://global-nomad-rust.vercel.app/',
    },
    caseStudy: {
      overview:
        '체험(액티비티) 탐색·예약·관리 흐름을 제공하는 서비스로 FSD + DDD-lite를 적용했습니다.',
      goals: ['FSD 구조 정착', '도메인 로직 확장성 확보'],
      responsibilities: ['TODO: 담당한 기능/페이지를 적어주세요.'],
      architecture: [
        'app은 라우팅/레이아웃만 담당',
        '비즈니스 로직은 features/entities에만 배치',
        'API 네이밍은 Swagger 기준 정렬',
      ],
      features: ['예약/관리 플로우', '알림/리뷰/프로필 영역 구성'],
      challenges: [
        {
          title: 'FSD + DDD-lite 구조 정착',
          detail:
            'page는 조립만 담당하고 features/entities에 로직을 고정하였습니다. Lint/CI로 디렉토리 규칙을 자동 검증해 구조가 흔들리지 않도록 유지하였습니다.',
          code: `FSD :
page(화면 조립)
features(기능 로직)
entities(공통 상태·규칙)
shared(기술적 재사용 요소)

lite DDD :
규모 대비 복잡도가 과도해질 수 있음을 고려하여 완전한 DDD의 Entity 구현이 아닌, 타입/스키마로 구조 및 제약을 표현`,
        },
        {
          title: '다크 모드 상태 관리 일관화',
          detail:
            '쿠키로 초기 테마를 결정한 뒤 Provider에서 상태를 관리하고, data-theme로 스타일을 전환하였습니다. CSS 변수와 Tailwind 매핑으로 유지보수 비용을 줄였습니다.',
        },
        {
          title: '모달 매니저 통합',
          detail:
            'Zustand + stack(LIFO) 구조로 모달을 중앙 관리하고 Portal로 렌더링하였습니다. z-index 순서와 공통 UX(ESC/배경 클릭)를 통일해 예측 가능한 흐름을 만들었습니다.',
        },
      ],
      outcomes: [
        { label: '아키텍처', value: 'FSD + DDD-lite' },
        { label: '워크플로우', value: 'Husky/commitlint' },
      ],
      learnings: ['TODO: 구조화/아키텍처 관점의 인사이트를 적어주세요.'],
    },
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
