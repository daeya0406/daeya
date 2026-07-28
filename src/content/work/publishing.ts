import { publishingProjectSchema, type PublishingProject } from '../schema';

export const PUBLISHING_INTRO = {
  title: '퍼블리싱',
  description:
    'SI·퍼블리싱 작업물입니다. 웹표준·접근성·반응형을 기준으로 정리해 두었습니다. 상세는 정적 포트폴리오에서 볼 수 있습니다.',
  ctaLabel: '전체 포트폴리오 보기',
  ctaHref: '/publishing/index.html',
};

export const PUBLISHING_CI_LOGOS = Array.from(
  { length: 12 },
  (_, i) => `/publishing/img/main/ci/banner${String(i + 1).padStart(2, '0')}.png`
);

export const PUBLISHING_PROJECTS: PublishingProject[] = [
  {
    id: 'kras',
    title: '안전보건공단 KRAS',
    summary: '위험성평가 지원 시스템 웹표준 개선 및 반응형 퍼블리싱',
    tags: ['HTML', 'CSS', 'jQuery', '웹표준', '웹접근성'],
    client: '안전보건공단',
    period: '2024.02 ~ 2024.05',
    image: '/publishing/img/page/2.png',
    detailUrl: '/publishing/project-detail.html?id=kras',
    featured: true,
  },
  {
    id: 'ncs',
    title: '산업인력공단 NCS',
    summary: 'NCS 포털 운영 및 개선 퍼블리싱',
    tags: ['HTML', 'CSS', 'jQuery', '웹표준', '공기업'],
    client: '한국산업인력공단',
    period: '2022.12 ~ 2023.02',
    image: '/publishing/img/page/3.png',
    detailUrl: '/publishing/project-detail.html?id=ncs',
    featured: true,
  },
  {
    id: 'safetyedu',
    title: '안전보건공단 교육원',
    summary: '안전보건교육 온라인 학습 사이트 구축 퍼블리싱',
    tags: ['HTML', 'CSS', 'jQuery', 'LMS', '반응형'],
    client: '안전보건공단 교육원',
    period: '2022.02 ~ 2022.06',
    image: '/publishing/img/page/4.png',
    detailUrl: '/publishing/project-detail.html?id=safetyedu',
    featured: true,
  },
  {
    id: 'law',
    title: '법률구조공단',
    summary: '기관정보관리 시스템 퍼블리싱',
    tags: ['HTML', 'CSS', 'jQuery', '웹표준'],
    client: '법률구조공단',
    period: '2024.12',
    image: '/publishing/img/page/law/law1.jpg',
    detailUrl: '/publishing/project-detail.html?id=law',
    featured: false,
  },
  {
    id: 'eduHub',
    title: 'EDU-HUB AI 키오스크',
    summary: '안전보건공단 AI 키오스크 UI 퍼블리싱',
    tags: ['HTML', 'CSS', 'Kiosk', '반응형'],
    client: '안전보건공단',
    period: '2026.05 ~ 2026.06',
    image: '/publishing/img/page/mobile/edu-hub.png',
    detailUrl: '/publishing/project-detail.html?id=eduHub',
    featured: false,
  },
  {
    id: 'daeya',
    title: 'DAEYA 반응형 웹사이트',
    summary: '개인 브랜딩용 반응형 포트폴리오. 기획·디자인·퍼블리싱 단독 진행',
    tags: ['HTML', 'CSS', 'GSAP', 'AOS', '반응형'],
    client: '개인 프로젝트',
    period: '2023.01 ~ 2023.02',
    image: '/publishing/img/page/1.png',
    detailUrl: '/publishing/project-detail.html?id=daeya',
    featured: false,
  },
  {
    id: 'kiws',
    title: '한전원자력연료 MES',
    summary: '제조실행시스템 화면 퍼블리싱',
    tags: ['HTML', 'CSS', 'jQuery'],
    client: '한전원자력연료',
    period: '2023.07 ~ 2023.12',
    image: '/publishing/img/page/5.png',
    detailUrl: '/publishing/project-detail.html?id=kiws',
    featured: false,
  },
  {
    id: 'topik',
    title: '한국어능력시험 CBT',
    summary: '산업인력공단 한국어능력시험 시스템 퍼블리싱',
    tags: ['HTML', 'CSS', 'jQuery', 'CBT'],
    client: '산업인력공단',
    period: '2023.03 ~ 2023.04',
    image: '/publishing/img/page/6.jpg',
    detailUrl: '/publishing/project-detail.html?id=topik',
    featured: false,
  },
  {
    id: 'ajdInterior',
    title: '아정당 인테리어',
    summary: '인테리어 플랫폼 리뉴얼 퍼블리싱',
    tags: ['HTML', 'CSS', '반응형'],
    client: '아정당',
    period: '2025.02 ~ 2025.06',
    image: '/publishing/img/page/ajd/interior.png',
    detailUrl: '/publishing/project-detail.html?id=ajdInterior',
    featured: false,
  },
  {
    id: 'tossPd',
    title: '토스 PD 챌린지',
    summary: '일정 맞추기 모바일 웹 프로토타입',
    tags: ['Product Design', 'Figma'],
    client: '개인 프로젝트',
    period: '2026',
    image: '/publishing/img/page/mobile/toss-pd.png',
    detailUrl: '/publishing/project-detail.html?id=tossPd',
    featured: false,
  },
];

PUBLISHING_PROJECTS.forEach((project) => publishingProjectSchema.parse(project));

export const FEATURED_PUBLISHING_PROJECTS = PUBLISHING_PROJECTS.filter((p) => p.featured);
