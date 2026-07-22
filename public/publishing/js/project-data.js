// ----------------------------------------
// 프로젝트 상세 데이터
// ※ home.slide: true → 메인 Web Project 스와이퍼 노출
// ※ card.slide: true → About Career 카드 슬라이드 노출
// ※ device: 'phone' | 'kiosk' → 세로형 디바이스 프레임 (PC 목업 대신)
// ----------------------------------------
var PROJECT_DATA = {
  daeya: {
    title: 'DAEYA 반응형 웹사이트',
    summary:
      '개인 브랜딩용 반응형 포트폴리오 웹사이트. 기획부터 디자인, 퍼블리싱까지 단독으로 진행했습니다.',
    tags: ['HTML', 'CSS', 'jQuery', 'GSAP', 'AOS', '반응형'],
    meta: [
      ['클라이언트', '개인 프로젝트'],
      ['기간', '2023.01 ~ 2023.02'],
      ['참여 인원', '1명 (단독)'],
      ['담당 역할', '기획 · 디자인 · 퍼블리싱 전체'],
      ['사용 기술', 'HTML5, CSS3, jQuery, GSAP, AOS, Swiper'],
    ],
    contrib: [
      ['기획 · 디자인', 100],
      ['HTML 마크업', 100],
      ['CSS 스타일링', 100],
      ['인터랙션 스크립트', 100],
    ],
    tasks: [
      'PC · 태블릿 · 모바일 3단 반응형 레이아웃 설계 및 구현',
      'GSAP ScrollTrigger 기반 스크롤 인터랙션 구현',
      '무한 루프 배너, 스와이퍼 슬라이드 등 메인 모션 구현',
      '시맨틱 마크업과 웹 접근성을 고려한 구조 설계',
    ],
    screens: ['img/page/1.png'],
    mockup: 1,
    card: {
      org: '개인 프로젝트',
      title: 'DAEYA 반응형 웹사이트',
      period: '기획 · 디자인 · 퍼블리싱 단독',
      points: ['GSAP 스크롤 인터랙션 구현', 'PC·태블릿·모바일 3단 반응형'],
      slide: true,
    },
  },

  kras: {
    title: '안전보건공단 KRAS',
    summary: '안전보건공단 위험성평가 지원 시스템(KRAS) 웹표준 개선 및 반응형 퍼블리싱 프로젝트.',
    tags: ['HTML', 'CSS', 'jQuery', '웹표준', '웹접근성', '크로스브라우징'],
    meta: [
      ['클라이언트', '안전보건공단'],
      ['기간', '2024.02 ~ 2024.05'],
      ['참여 인원', '퍼블리셔 1명 / 개발 3명 / PM 1명'],
      ['담당 역할', '메인 · 서브 페이지 퍼블리싱, 공통 UI 컴포넌트'],
      ['사용 기술', 'HTML5, CSS3, jQuery'],
    ],
    contrib: [
      ['화면설계 및 디자인', 100],
      ['HTML, CSS 마크업', 100],
      ['인터랙션 스크립트', 100],
      ['웹접근성 · 크로스브라우징', 100],
    ],
    tasks: [
      '위험성평가 프로세스 화면 마크업 및 스타일링',
      '공통 UI 컴포넌트(탭, 모달, 폼) 제작 및 가이드 정리',
      '웹접근성 기준 준수 마크업 적용',
      '크로스브라우징 대응 및 감리 기준 통과',
    ],
    screens: ['img/page/2.png'],
    mockup: 2,
    home: { org: '안전보건공단', title: '위험성평가시스템', slide: true },
    card: {
      org: '안전보건공단',
      title: '위험성평가시스템 KRAS',
      period: '2024.02 ~ 2024.05',
      points: ['위험성평가 프로세스 화면 퍼블리싱', '웹접근성(KWCAG)·크로스브라우징 대응'],
      slide: true,
    },
  },

  ncs: {
    title: '산업인력공단 NCS',
    summary:
      '국가직무능력표준(NCS) 포털 운영 및 개선 퍼블리싱. 대규모 공기업 사이트의 유지보수와 신규 화면을 담당했습니다.',
    tags: ['HTML', 'CSS', 'jQuery', '웹표준', '공기업'],
    link: 'https://www.ncs.go.kr/index.do',
    meta: [
      ['클라이언트', '한국산업인력공단'],
      ['기간', '2022.12 ~ 2023.02'],
      ['참여 인원', '퍼블리셔 2명 / 개발 6명'],
      ['담당 역할', '각 페이지 세팅'],
      ['사용 기술', 'HTML5, CSS3, jQuery'],
      [
        '링크',
        '<a href="https://www.ncs.go.kr/index.do" target="_blank">ncs.go.kr <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
    ],
    contrib: [
      ['HTML 마크업', 70],
      ['CSS 스타일링', 75],
      ['인터랙션 스크립트', 50],
      ['유지보수 · 운영 대응', 85],
    ],
    tasks: [
      'NCS 통합 페이지 각 화면 퍼블리싱',
      '화면 리뉴얼 웹표준 개선 작업',
      '운영 이슈 대응 및 화면 수정 배포',
    ],
    screens: ['img/page/3.png'],
    mockup: 3,
    home: { org: '산업인력공단', title: 'NCS', slide: true },
    card: {
      org: '한국산업인력공단',
      title: 'NCS 국가직무능력표준',
      period: '2022.12 ~ 2023.02',
      points: ['검색·조회 신규 화면 퍼블리싱', '레거시 화면 웹표준 개선'],
      slide: true,
    },
  },

  safetyedu: {
    title: '안전보건공단 교육원',
    summary:
      '안전보건교육 온라인 학습 사이트 구축 퍼블리싱. 학습 플레이어와 마이페이지 등 회원 영역을 담당했습니다.',
    tags: ['HTML', 'CSS', 'jQuery', 'LMS', '반응형'],
    link: 'https://www.safetyedu.net/safetyedu',
    meta: [
      ['클라이언트', '안전보건공단 교육원'],
      ['기간', '2022.02 ~ 2022.06'],
      ['참여 인원', '퍼블리셔 1명 / 개발 5명 / PM 1명'],
      ['담당 역할', '각 페이지 세팅'],
      ['사용 기술', 'HTML5, CSS3, jQuery'],
      [
        '링크',
        '<a href="https://www.safetyedu.net/safetyedu" target="_blank">safetyedu.net <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
    ],
    contrib: [
      ['HTML 마크업', 100],
      ['CSS 스타일링', 100],
      ['인터랙션 스크립트', 100],
      ['반응형 대응', 100],
    ],
    tasks: [
      '온라인 학습 플레이어 UI 퍼블리싱',
      '수강신청 · 마이페이지 화면 구현',
      '모바일 학습 환경 반응형 대응',
    ],
    screens: ['img/page/4.png'],
    mockup: 4,
    home: { org: '안전보건공단', title: '교육원', slide: true },
    card: {
      org: '안전보건공단 교육원',
      title: '온라인 교육 홈페이지',
      period: '2022.02 ~ 2022.06',
      points: ['학습 플레이어·마이페이지 퍼블리싱', '모바일 학습 환경 반응형 대응'],
      slide: true,
    },
  },

  kiws: {
    title: '한국안심일터기술원',
    summary:
      '한국안심일터기술원 공식 홈페이지 구축 퍼블리싱. 메인부터 서브 전체 화면을 담당했습니다.',
    tags: ['HTML', 'CSS', 'jQuery', '반응형', '웹접근성'],
    link: 'http://kiws.or.kr/corpId.mo',
    meta: [
      ['클라이언트', '한국안심일터기술원'],
      ['기간', '2022.10 ~ 2022.12'],
      ['참여 인원', '퍼블리셔 1명 / 개발 2명 / 디자인 1명'],
      ['담당 역할', '전체 화면 퍼블리싱 단독 담당'],
      ['사용 기술', 'HTML5, CSS3, jQuery'],
      [
        '링크',
        '<a href="http://kiws.or.kr/corpId.mo" target="_blank">kiws.or.kr <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
    ],
    contrib: [
      ['HTML 마크업', 80],
      ['CSS 스타일링', 80],
      ['인터랙션 스크립트', 100],
      ['웹접근성', 100],
    ],
    tasks: [
      '메인 · 서브 전체 화면 단독 퍼블리싱',
      '메인 비주얼 슬라이드 및 모션 구현',
      '웹접근성 인증마크 대응 마크업',
    ],
    screens: ['img/page/5.png'],
    mockup: 5,
    home: { org: '안심일터기술원', title: '홈페이지', slide: true },
    card: {
      org: '한국안심일터기술원',
      title: '공식 홈페이지 구축',
      period: '2022.10 ~ 2022.12',
      points: ['전체 화면 단독 퍼블리싱', '메인 비주얼 슬라이드·모션 구현'],
      slide: true,
    },
  },

  topik: {
    title: '산업인력공단 한국어능력시험',
    summary: '외국인 구직자 대상 한국어능력시험(EPS-TOPIK) 안내 사이트 및 CBT 화면 퍼블리싱.',
    tags: ['HTML', 'CSS', 'jQuery', '웹표준', '공기업'],
    meta: [
      ['클라이언트', '한국산업인력공단'],
      ['기간', '2023.03 ~ 2023.04'],
      ['참여 인원', '퍼블리셔 1명 / 개발 3명'],
      ['담당 역할', '시험 안내·접수 화면 퍼블리싱'],
      ['사용 기술', 'HTML5, CSS3, jQuery'],
    ],
    contrib: [
      ['HTML 마크업', 85],
      ['CSS 스타일링', 85],
      ['인터랙션 스크립트', 100],
      ['웹표준 · 다국어 대응', 50],
    ],
    tasks: [
      '시험 안내·원서접수 화면 퍼블리싱',
      'CBT 응시 환경 화면 구현',
      '다국어(한/영) 레이아웃 대응',
    ],
    screens: ['img/page/7.png'],
    mockup: 7,
    home: { org: '산업인력공단', title: '한국어능력시험', slide: true },
  },

  law: {
    title: '법률구조공단 기관정보관리',
    summary:
      '법률구조공단 내부 기관정보관리 시스템 구축 퍼블리싱. 관리자 대시보드와 데이터 관리 화면을 담당했습니다. (내부망 시스템으로 외부 링크가 없습니다)',
    tags: ['VUE.js', 'SCSS', '관리자', '내부 시스템'],
    meta: [
      ['클라이언트', '대한법률구조공단'],
      ['기간', '2024.12 ~ 2024.12'],
      ['참여 인원', '퍼블리셔 1명 / 개발 2명'],
      ['담당 역할', '관리자 화면 전체 퍼블리싱'],
      ['사용 기술', 'VUE.js, SCSS'],
    ],
    contrib: [
      ['Vue.js', 70],
      ['CSS 스타일링', 70],
      ['인터랙션 스크립트', 70],
      ['그리드 · 폼 UI', 70],
    ],
    tasks: [
      '관리자 대시보드 레이아웃 퍼블리싱',
      '대용량 데이터 테이블 · 검색 폼 UI 구현',
      '등록 · 수정 폼 검증 UI 및 안내 메시지 처리',
    ],
    screens: [
      'img/page/law/law1.jpg',
      'img/page/law/law2.jpg',
      'img/page/law/law3.jpg',
      'img/page/law/law4.jpg',
    ],
    mockup: 6,
    home: { org: '법률구조공단', title: '기관정보관리', slide: true },
    card: {
      org: '대한법률구조공단',
      title: '기관정보관리 시스템',
      period: '2024.12 ~ 2024.12',
      points: ['관리자 대시보드·데이터 관리 화면 퍼블리싱', '대용량 테이블·검색 폼 UI 구현'],
      img: 'img/page/6.jpg',
      slide: true,
    },
  },

  rolling: {
    title: '롤링페이퍼',
    summary:
      '서로 메시지를 남길 수 있는 롤링페이퍼 웹 애플리케이션. 코드잇 프론트엔드 과정 팀 프로젝트로, 팀장을 맡아 세팅·배포와 핵심 작성 플로우를 담당했습니다.',
    tags: ['React', 'Vite', 'SCSS', 'React Router', 'Swiper', 'Vercel'],
    link: 'https://rolling-19-2.vercel.app/',
    meta: [
      ['구분', '코드잇 팀 프로젝트'],
      ['기간', '2025.09.25 ~ 2025.10.15'],
      ['참여 인원', '프론트엔드 3명'],
      [
        '담당 역할',
        '팀장 · 프로젝트 세팅·배포 · 롤링페이지 생성(/post) · 메시지 작성(/post/:id/message) · 로딩 컴포넌트',
      ],
      ['사용 기술', 'React 19, Vite, React Router 7, SCSS, React-Quill, Swiper, Vercel'],
      [
        '링크',
        '<a href="https://rolling-19-2.vercel.app/" target="_blank" rel="noopener">rolling-19-2.vercel.app <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
      [
        'GitHub',
        '<a href="https://github.com/Rolling-to-Modern-React/rolling-part2-team2" target="_blank" rel="noopener">rolling-part2-team2 <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
    ],
    contrib: [
      ['React', 30],
      ['JavaScript', 35],
      ['SCSS', 70],
      ['세팅 · 배포', 100],
    ],
    tasks: [
      'Vite 기반 프로젝트 초기 세팅 및 Vercel 배포 파이프라인 구성',
      '롤링페이지 생성(/post) 화면 구현',
      '메시지 보내기(/post/:id/message) 플로우 구현',
      '로딩 컴포넌트 제작 및 페이지 연동',
    ],
    screens: ['img/page/codeit/rolling-paper.png'],
    mockup: 10,
    home: { org: '코드잇', title: '롤링페이퍼' }, // slide 없음 = 메인 스와이퍼 비노출
    card: {
      org: '코드잇',
      title: '롤링페이퍼',
      period: '2025.09 ~ 2025.10',
      points: ['팀장 · 세팅·배포 담당', '롤링페이지 생성·메시지 작성 플로우 구현'],
      img: 'img/page/codeit/rolling-paper.png',
    },
  },

  julge: {
    title: '더줄게',
    summary:
      '인증·공고 신청 플로우를 갖춘 웹 애플리케이션. Next.js App Router 기반 팀 프로젝트에서 디자인 토큰과 공통 리스트 UI, 지역 필터, 404 페이지를 담당했습니다.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'zod', 'Vercel'],
    link: 'https://the-julge-cyan.vercel.app/',
    meta: [
      ['구분', '코드잇 팀 프로젝트'],
      ['기간', '2025.11.18 ~ 2025.12.03'],
      ['참여 인원', '프론트엔드 3명'],
      ['담당 역할', '글로벌 폰트·컬러 토큰 · 리스트 테이블 · 지역 필터링 · 404 페이지'],
      [
        '사용 기술',
        'Next 16, React 19, TypeScript, Tailwind CSS 4, react-hook-form, zod, axios, Husky',
      ],
      [
        '링크',
        '<a href="https://the-julge-cyan.vercel.app/" target="_blank" rel="noopener">the-julge-cyan.vercel.app <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
      [
        'GitHub',
        '<a href="https://github.com/TEAM3-5/The-Julge" target="_blank" rel="noopener">The-Julge <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
    ],
    contrib: [
      ['Next.js', 40],
      ['TypeScript', 35],
      ['Tailwind CSS', 50],
      ['공통 UI', 70],
    ],
    tasks: [
      '글로벌 글꼴·컬러 토큰 정의 및 공통 스타일 기반 구축',
      '리스트 테이블 컴포넌트 제작',
      '지역 필터링 컴포넌트 구현',
      '404 페이지 UI 구성',
    ],
    screens: ['img/page/codeit/the-julge.png'],
    mockup: 9,
    home: { org: '코드잇', title: '더줄게' },
    card: {
      org: '코드잇',
      title: '더줄게',
      period: '2025.11 ~ 2025.12',
      points: ['디자인 토큰·공통 테이블/필터 담당', '404 페이지 구현'],
      img: 'img/page/codeit/the-julge.png',
    },
  },

  nomad: {
    title: '체험한입',
    summary:
      '체험(액티비티) 탐색·예약·관리 프론트엔드. FSD 구조의 Next.js 팀 프로젝트에서 디자인 토큰·다크모드, 공통 UI, 카카오 인증, 내 체험 관리(등록/수정/삭제/SSR·무한스크롤), 리뷰·메타 SEO 등을 폭넓게 담당했습니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Zustand', 'FSD', 'Storybook'],
    link: 'https://global-nomad-rust.vercel.app/',
    meta: [
      ['구분', '코드잇 팀 프로젝트'],
      ['기간', '2025.12 ~ 2026.01'],
      ['참여 인원', '프론트엔드 팀'],
      [
        '담당 역할',
        '디자인 토큰·다크모드 · shared UI(Modal, Skeleton, Radio 등) · 카카오 로그인 · 내 체험 등록/수정/삭제·현황 · 메인·상세 위젯 · SEO(title/OG/favicon)',
      ],
      ['사용 기술', 'Next.js App Router, TypeScript, Tailwind CSS, Zustand, Storybook, Husky'],
      [
        '링크',
        '<a href="https://global-nomad-rust.vercel.app/" target="_blank" rel="noopener">global-nomad-rust.vercel.app <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
      [
        'GitHub',
        '<a href="https://github.com/FE19-Team3/global_nomad" target="_blank" rel="noopener">global_nomad <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
    ],
    contrib: [
      ['Next.js', 30],
      ['TypeScript', 30],
      ['Tailwind CSS', 40],
      ['JavaScript · 상태관리', 25],
    ],
    tasks: [
      '디자인 토큰·cn/tv 세팅 및 다크모드 기반 구축',
      'Zustand 모달 스토어, Modal portal, Skeleton·Radio·Badge 등 shared UI 제작',
      '카카오 회원가입·로그인 연동',
      '내 체험 등록/수정/삭제·예약 가능 일정·SSR·무한스크롤 구현',
      '메인 ExperienceCard/Hero, activity overview, 리뷰 작성 UX',
      'title·OG·favicon 등 SEO 메타 및 다크모드 배경 대응',
    ],
    screens: ['img/page/codeit/one-bite.png'],
    mockup: 8,
    home: { org: '코드잇', title: '체험한입' },
    card: {
      org: '코드잇',
      title: '체험한입',
      period: '2025.12 ~ 2026.01',
      points: ['내 체험 관리·카카오 인증 담당', '디자인 토큰·다크모드·공통 UI 구축'],
      img: 'img/page/codeit/one-bite.png',
    },
  },

  ajdInterior: {
    title: '아정당 인테리어',
    summary: '아정당 인테리어 서비스 페이지 기획에 맞춰 화면을 구성했습니다.',
    tags: ['Vue.js', 'SCSS', 'JS', '반응형'],
    meta: [
      ['클라이언트', '아정당'],
      ['기간', '2025.03 ~ 2025.04'],
      ['참여 인원', 'Vue.js'],
      ['담당 역할', '인테리어 서비스 페이지'],
      ['사용 기술', 'Vue.js, scss, js'],
    ],
    contrib: [
      ['Vue.js', 80],
      ['scss', 100],
      ['인터랙션 스크립트', 100],
      ['반응형 대응', 100],
    ],
    tasks: [
      '인테리어 서비스 소개 페이지 마크업·스타일링',
      '상담·문의 유도 UI/UX 구성',
      'PC·모바일 반응형 대응',
    ],
    screens: ['img/page/ajd/interior.png'],
    mockup: 11,
    card: {
      org: '아정당',
      title: '아정당 인테리어',
      period: '2025.03 ~ 2025.04',
      points: ['인테리어 서비스 페이지 퍼블리싱', '반응형 레이아웃 구현'],
      img: 'img/page/ajd/interior.png',
      slide: true,
    },
  },

  eduHub: {
    title: 'EDU-HUB AI 키오스크',
    summary:
      '안전보건공단 EDU-HUB AI 키오스크·관리자 시스템. 웹 비주얼 쇼케이스보다 요구사항 이행·문서 정리·발표 전달이 핵심인 프로젝트로, 발표용 프로토타입(Figma)과 소스(GitHub)를 근거로 남겼습니다.',
    tags: ['eGovFrame', 'Spring', 'JSP', 'C#', 'MariaDB', 'Figma'],
    listLabel: 'KIOSK',
    device: 'kiosk',
    meta: [
      ['클라이언트', '안전보건공단'],
      ['기간', '2026.05 ~ 2026.06'],
      ['구분', '키오스크 · 관리자 시스템'],
      ['담당 역할', '요구사항 정리·이행 점검 · 산출 문서화 · 발표 프로토타입(Figma) 제작'],
      ['사용 기술', 'eGov Spring(Java), JSP, C#, MariaDB'],
      [
        '발표자료',
        '<a href="https://www.figma.com/proto/2IVadAL9yJ3aGdkHLbm1nW/EDU-HUB-AI-%ED%82%A4%EC%98%A4%EC%8A%A4%ED%81%AC-%EA%B4%80%EB%A6%AC%EC%9E%90?node-id=728-148&amp;p=f&amp;viewport=-443%2C-1051%2C0.04&amp;t=GU3xpLXJObKyOuVA-1&amp;scaling=min-zoom&amp;content-scaling=fixed&amp;starting-point-node-id=728%3A148&amp;page-id=0%3A1" target="_blank" rel="noopener">Figma 발표 프로토타입 <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
      [
        'GitHub',
        '<a href="https://github.com/EDU-HUB-AI-Project" target="_blank" rel="noopener">EDU-HUB-AI-Project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
    ],
    contrib: [
      ['요구사항 · 문서 정리', 50],
      ['발표 프로토타입(Figma)', 100],
      ['화면·플로우 전달', 80],
      ['개발 협업·검수', 30],
    ],
    tasks: [
      '키오스크·관리자 요구사항 정리 및 이행 여부 점검',
      '기능·화면 기준 산출 문서화 (전달·인수 관점)',
      '발표용 Figma 프로토타입 전 구간 제작',
      'eGov Spring / JSP / C# / MariaDB 기반 개발 산출물과 문서·발표 정합',
    ],
    screens: ['img/page/mobile/edu-hub.png'],
    card: {
      org: '안전보건공단',
      title: 'EDU-HUB AI 키오스크',
      period: '2026.05 ~ 2026.06',
      points: ['요구사항 이행·문서 정리', '발표 프로토타입(Figma) 제작'],
      img: 'img/page/mobile/edu-hub.png',
      slide: true,
    },
  },

  tossPd: {
    title: '일정 맞추기',
    summary:
      '토스 프로덕트 디자이너 챌린지 2026 제출작. 6명 회의 일정을 겹쳐 보고 모두 괜찮은 시간을 찾는 모바일 웹 프로토타입으로, Figma 없이 문제 정의부터 UI·플로우·설계 결정까지 직접 기획·구현했습니다.',
    tags: ['Product Design', 'UX', '프로토타입', 'HTML', 'CSS', 'JavaScript'],
    listLabel: 'PD',
    device: 'phone',
    meta: [
      ['구분', '토스 프로덕트 디자이너 챌린지 2026'],
      ['기간', '2026.07'],
      ['참여', '1명 (단독)'],
      ['담당 역할', '문제 정의 · UX/UI 설계 · 웹 프로토타입 제작 · 설계 문서·회고'],
      ['사용 기술', 'HTML, CSS, JavaScript (웹 프로토타입)'],
      [
        '프로토타입',
        '<a href="https://daeya0406.github.io/2026-toss-pd-challenge/index.html" target="_blank" rel="noopener">일정 맞추기 허브 <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
      [
        'GitHub',
        '<a href="https://github.com/daeya0406/2026-toss-pd-challenge" target="_blank" rel="noopener">2026-toss-pd-challenge <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
      [
        '회고',
        '<a href="https://velog.io/@daeya0406/PD-%ED%86%A0%EC%8A%A4-%ED%94%84%EB%A1%9C%EB%8D%95%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B4%EB%84%88%EC%B1%8C%EB%A6%B0%EC%A7%80-2026" target="_blank" rel="noopener">velog 회고 <i class="fa-solid fa-arrow-up-right-from-square"></i></a>',
      ],
    ],
    contrib: [
      ['문제 정의 · 기획', 100],
      ['UX/UI 설계', 100],
      ['프로토타입 구현', 100],
      ['설계 문서 · 회고', 100],
    ],
    tasks: [
      '6명 회의 조율 문제 정의 및 주최자·참석자 플로우 설계',
      '회의 만들기 → 일정 입력 → 히트맵·확정 프로토타입 구현',
      '개별 일정 겹쳐보기(레이어 합성) 차별점 설계',
      'UI 컴포넌트·설계 결정 문서화 및 제출용 허브 구성',
    ],
    screens: ['img/page/mobile/toss-pd.png'],
    card: {
      org: '토스 PD 챌린지',
      title: '일정 맞추기',
      period: '2026.07',
      points: ['문제 정의부터 웹 프로토타입까지 단독', '히트맵·겹쳐보기로 일정 조율 UX'],
      img: 'img/page/mobile/toss-pd.png',
      slide: true,
    },
  },
};

// 연도별 수행 이력 (About 전체 + 메인 요약)
// items: [기간, 기관, 제목] 또는 [기간, 기관, 제목, true] — true면 메인 Career에도 노출
var CAREER_ALL = [
  {
    year: '2026년',
    items: [
      ['2026.07', '토스 PD 챌린지', '일정 맞추기', true],
      ['2026.05 ~ 2026.06', '안전보건공단', 'EDU-HUB AI 키오스크', true],
    ],
  },
  {
    year: '2025년',
    items: [
      ['2025.02 ~ 2025.04', '아정당', '아정당 이사', true],
      ['2025.03 ~ 2025.04', '아정당', '아정당 카드'],
      ['2025.03 ~ 2025.04', '아정당', '아정당 인테리어', true],
      ['2025.04 ~ 2025.05', '아정당', '아정당 청소'],
      ['2025.05 ~ 2025.06', '아정당', '아정당 메인페이지 리뉴얼', true],
      ['2025.05 ~ 2025.06', '아정당', '아정당 자동차보험'],
      ['2025.05 ~ 2025.06', '아정당', '우노벌스'],
      ['2025.09 ~ 2025.10', '코드잇', '롤링페이퍼', true],
      ['2025.11 ~ 2025.12', '코드잇', '더줄게'],
      ['2025.12 ~ 2026.01', '코드잇', '체험한입'],
    ],
  },
  {
    year: '2024년',
    items: [
      ['2024.12 ~ 2024.12', '법률구조공단', '기관정보관리', true],
      ['2024.12 ~ 2024.12', '토이프로젝트', '부꾸러미 어플리케이션'],
      ['2024.12 ~ 2024.12', '울산도시공사', '제안 기획'],
      ['2024.11 ~ 2024.11', '한전원자력연료', '종료보고'],
      ['2024.07 ~ 2024.09', '마키나락스', 'Annotation Tool', true],
      ['2024.02 ~ 2024.05', '안전보건공단', '위험성평가시스템(KRAS)', true],
      ['2024.01 ~ 2024.01', '자사', '사내그룹웨어', true],
    ],
  },
  {
    year: '2023년',
    items: [
      ['2023.07 ~ 2023.12', '한전원자력연료', 'MES', true],
      ['2023.03 ~ 2023.04', '산업인력공단', '한국어능력시험 CBT', true],
      ['2022.02 ~ 2023.03', '에이치씨엔씨', '재난관리시스템', true],
      ['2022.12 ~ 2023.02', '산업인력공단', 'NCS', true],
    ],
  },
  {
    year: '2022년',
    items: [
      ['2022.10 ~ 2022.12', '한국안심일터기술원', '홈페이지', true],
      ['2022.08 ~ 2022.09', '안전보건공단', '유해위험기계기구 종합정보시스템(MIIS)'],
      ['2022.06 ~ 2022.08', 'SKC', 'SKYME 설비관리시스템', true],
      ['2022.02 ~ 2022.06', '안전보건공단', '교육원 홈페이지', true],
      ['2022.01 ~ 2022.01', '근로복지공단', '홈페이지 유지보수', true],
    ],
  },
  {
    year: '2021년',
    items: [
      ['2021.12 ~ 2021.12', '현대로보틱스', 'CES 국제전자제품박람회 키오스크', true],
      ['2021.11 ~ 2021.12', '국립재난안전연구원', '웹포탈시스템', true],
      ['2021.07 ~ 2022.12', '울산감염병관리지원단', '홈페이지 유지보수'],
      ['2021.09 ~ 2021.10', '자화전자', 'SPC 공정관리시스템'],
      ['2021.08 ~ 2021.10', '일자리안정자금', '홈페이지'],
      ['2021.07 ~ 2021.08', '울산과학대학', '실시간 모니터링 시스템'],
      ['2021.07 ~ 2021.07', '동서발전', '실시간 모니터링 시스템', true],
      ['2021.04 ~ 2021.06', 'S-OIL', '웹포탈시스템', true],
      ['2021.01 ~ 2021.06', 'HK.InnoN', 'PIMS 시스템'],
      ['2021.02 ~ 2021.04', '풀무원', '디지털팩토리'],
      ['2021.01 ~ 2021.01', '동서발전', '모니터링 화면'],
    ],
  },
  {
    year: '2020년',
    items: [
      ['2020.05 ~ 2020.06', '에테르 카페', '홈페이지', true],
      ['2020.04 ~ 2020.05', 'LX풀빌라', '홈페이지', true],
      ['2020.04 ~ 2020.05', '꿈에그린펜션', '홈페이지', true],
      ['2020.04 ~ 2020.04', '포블게이트', '홈페이지', true],
    ],
  },
];

var CAREER_HOME = CAREER_ALL.map(function (y) {
  return {
    year: y.year,
    items: y.items
      .filter(function (it) {
        return it[3];
      })
      .map(function (it) {
        return [it[0], it[1], it[2]];
      }),
  };
}).filter(function (y) {
  return y.items.length;
});

// ----------------------------------------
// About 페이지 Career 카드 (PROJECT_DATA 재사용)
// ----------------------------------------
(function () {
  var wrap = $('.career-scroll-wrap[data-source="project-data"]');
  if (!wrap.length) return;

  // card.slide === true 인 프로젝트만 About Career 슬라이드에 노출
  var order = [
    'tossPd',
    'eduHub',
    'ajdInterior',
    'nomad',
    'julge',
    'rolling',
    'law',
    'kras',
    'ncs',
    'kiws',
    'safetyedu',
    'daeya',
  ].filter(function (id) {
    return PROJECT_DATA[id].card && PROJECT_DATA[id].card.slide;
  });

  wrap.html(
    order
      .map(function (id) {
        var d = PROJECT_DATA[id];
        var c = d.card;
        var thumb = c.img || (d.screens && d.screens[0]);
        var imgClass = 'career-card-img' + (d.device ? ' career-card-img--device' : '');
        var imgHtml = thumb
          ? '<div class="' + imgClass + '"><img src="' + thumb + '" alt="' + c.title + '"></div>'
          : '<div class="career-card-img career-card-img--empty" aria-hidden="true"></div>';
        return (
          '<a href="project-detail.html?id=' +
          id +
          '" class="career-card" title="">' +
          imgHtml +
          '<div class="career-card-body">' +
          '<span>' +
          c.org +
          '</span>' +
          '<h3>' +
          c.title +
          '</h3>' +
          '<h6>' +
          c.period +
          '</h6>' +
          '<ul>' +
          c.points
            .map(function (p) {
              return '<li>' + p + '</li>';
            })
            .join('') +
          '</ul>' +
          '<div class="career-card-tags">' +
          d.tags
            .slice(0, 4)
            .map(function (t) {
              return '<em>' + t + '</em>';
            })
            .join('') +
          '</div>' +
          '<p class="career-card-more">자세히 보기 <i class="fa-solid fa-arrow-right"></i></p>' +
          '</div>' +
          '</a>'
        );
      })
      .join('')
  );
})();

// ----------------------------------------
// About 전체 수행 이력
// ----------------------------------------
(function () {
  var wrap = $('.career-all [data-source="career-all"]');
  if (!wrap.length) return;

  wrap.html(
    CAREER_ALL.map(function (y, i) {
      return (
        '<details' +
        (i === 0 ? ' open' : '') +
        '>' +
        '<summary>' +
        y.year +
        ' <em>' +
        y.items.length +
        '건</em></summary>' +
        '<ul>' +
        y.items
          .map(function (it) {
            return (
              '<li>' +
              '<h6>' +
              it[0] +
              '</h6>' +
              '<p><span>[' +
              it[1] +
              ']</span>' +
              it[2] +
              '</p>' +
              '</li>'
            );
          })
          .join('') +
        '</ul>' +
        '</details>'
      );
    }).join('')
  );
})();

// ----------------------------------------
// 메인 Web Project 스와이퍼
// ----------------------------------------
(function () {
  var wrap = $('#slide1 .swiper-wrapper[data-source="project-data"]');
  if (!wrap.length) return;

  // home.slide === true 인 프로젝트만 메인 스와이퍼에 노출
  var order = ['kras', 'ncs', 'safetyedu', 'kiws', 'topik', 'law'].filter(function (id) {
    return PROJECT_DATA[id].home && PROJECT_DATA[id].home.slide;
  });

  wrap.html(
    order
      .map(function (id) {
        var d = PROJECT_DATA[id];
        var h = d.home;
        var media = d.mockup
          ? '<div class="mockup-pc mockup-pc' +
            d.mockup +
            '"><img src="img/mockup/mockup-pc.png" alt="' +
            d.title +
            ' 목업 화면"></div>'
          : '<div class="project-thumb"><img src="' +
            ((d.card && d.card.img) || d.screens[0]) +
            '" alt="' +
            d.title +
            '"></div>';
        return (
          '<div class="swiper-slide">' +
          '<a href="project-detail.html?id=' +
          id +
          '" title="">' +
          media +
          '<h5><span>[' +
          h.org +
          ']</span>' +
          h.title +
          '</h5>' +
          '</a>' +
          '</div>'
        );
      })
      .join('')
  );
})();

// ----------------------------------------
// 메인 Career 스와이퍼
// ----------------------------------------
(function () {
  var wrap = $('#slide2 .swiper-wrapper[data-source="career-home"]');
  if (!wrap.length) return;

  wrap.html(
    CAREER_HOME.map(function (y) {
      return (
        '<div class="swiper-slide">' +
        '<div class="career-box">' +
        '<div class="career-box-year"><h5>' +
        y.year +
        '</h5></div>' +
        '<div class="career-box-content"><ul>' +
        y.items
          .map(function (it) {
            return (
              '<li>' +
              '<h6>' +
              it[0] +
              '</h6>' +
              '<p><span>[' +
              it[1] +
              ']</span>' +
              it[2] +
              '</p>' +
              '</li>'
            );
          })
          .join('') +
        '</ul></div>' +
        '</div>' +
        '</div>'
      );
    }).join('')
  );
})();

// ----------------------------------------
// Project 목록 (PROJECT_DATA 재사용)
// ----------------------------------------
(function () {
  var list = $('.project-list[data-source="project-data"] > ul');
  if (!list.length) return;

  var order = [
    'ajdInterior',
    'kras',
    'ncs',
    'tossPd',
    'eduHub',
    'daeya',
    'safetyedu',
    'kiws',
    'law',
    'nomad',
    'julge',
    'rolling',
  ];

  list.html(
    order
      .map(function (id) {
        var d = PROJECT_DATA[id];
        var thumb = (d.card && d.card.img) || (d.screens && d.screens[0]);
        var media;
        if (d.mockup) {
          media =
            '<div class="mockup-pc mockup-pc' +
            d.mockup +
            '"><img src="img/mockup/mockup-pc.png" alt="' +
            d.title +
            ' 목업 화면"></div>';
        } else if (d.device && thumb) {
          media =
            '<div class="project-device project-device-' +
            d.device +
            '"><img src="' +
            thumb +
            '" alt="' +
            d.title +
            '"></div>';
        } else if (thumb) {
          media =
            '<div class="project-thumb"><img src="' + thumb + '" alt="' + d.title + '"></div>';
        } else {
          media = '';
        }
        var label = d.listLabel || (d.mockup ? 'WEBSITE' : 'FRONTEND');
        return (
          '<li>' +
          '<a href="project-detail.html?id=' +
          id +
          '" title="">' +
          '<div class="project-img-wrap">' +
          media +
          '</div>' +
          '<h5>' +
          label +
          '</h5>' +
          '<h6>' +
          d.title +
          '</h6>' +
          '</a>' +
          '</li>'
        );
      })
      .join('')
  );
})();

// ----------------------------------------
// 상세 페이지 렌더링 (?id=kras 형태의 쿼리로 프로젝트 선택)
// ----------------------------------------
(function () {
  if (!document.getElementById('detail-title')) return;

  var id = new URLSearchParams(location.search).get('id');
  var data = PROJECT_DATA[id];
  if (!data) {
    location.replace('project.html');
    return;
  }

  document.title = 'Daeya - ' + data.title;
  $('#detail-title').text(data.title);
  $('#detail-summary').text(data.summary);

  $('#detail-tags').html(
    data.tags
      .map(function (t) {
        return '<span>' + t + '</span>';
      })
      .join('')
  );

  $('#detail-meta').html(
    data.meta
      .map(function (row) {
        return '<tr><th>' + row[0] + '</th><td>' + row[1] + '</td></tr>';
      })
      .join('')
  );

  $('#detail-contrib').html(
    data.contrib
      .map(function (c) {
        return (
          '<div class="contrib-item">' +
          '<div class="contrib-label"><span>' +
          c[0] +
          '</span><em>' +
          c[1] +
          '%</em></div>' +
          '<div class="contrib-bar"><span data-value="' +
          c[1] +
          '"></span></div>' +
          '</div>'
        );
      })
      .join('')
  );

  $('#detail-tasks').html(
    data.tasks
      .map(function (t) {
        return '<li>' + t + '</li>';
      })
      .join('')
  );

  // 대표 화면은 상단에, 나머지는 하단 "추가 화면"으로 (스크린 없으면 hero·추가화면 숨김)
  var screens = data.screens || [];
  var screensSection = $('#detail-screens-section');
  var device = data.device; // 'phone' | 'kiosk'

  function frameHtml(src, alt, lazy) {
    var img = '<img src="' + src + '" alt="' + alt + '"' + (lazy ? ' loading="lazy"' : '') + '>';
    if (device) {
      return (
        '<div class="device-frame device-' +
        device +
        '"><div class="device-screen">' +
        img +
        '</div></div>'
      );
    }
    return '<div class="shot-frame">' + img + '</div>';
  }

  if (!screens.length) {
    $('#detail-hero').hide().empty();
    $('.screens-hint').hide();
    screensSection.addClass('is-empty');
  } else {
    if (device) {
      $('#detail-hero')
        .addClass('is-device')
        .html(frameHtml(screens[0], data.title + ' 대표 화면'));
      $('.screens-hint').hide();
    } else {
      $('#detail-hero')
        .removeClass('is-device')
        .html(frameHtml(screens[0], data.title + ' 대표 화면'));
    }

    var rest = screens.slice(1);
    if (rest.length === 0) {
      screensSection.addClass('is-empty');
    } else {
      $('#detail-screens')
        .toggleClass('cols2', !device && rest.length > 1)
        .toggleClass('is-device-grid', !!device)
        .html(
          rest
            .map(function (src) {
              return frameHtml(src, data.title + ' 화면', true);
            })
            .join('')
        );
    }
  }

  // 기여도 바 애니메이션
  setTimeout(function () {
    $('.contrib-bar > span').each(function () {
      this.style.width = this.getAttribute('data-value') + '%';
    });
  }, 300);
})();
