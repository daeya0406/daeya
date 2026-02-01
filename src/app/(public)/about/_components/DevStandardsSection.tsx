'use client';

import { useState } from 'react';
import { Icon, IconName } from '@/shared/ui/Icons';

const cardClassName = 'bg-depth-1 ring-border/50 rounded-3xl shadow-sm ring-1';

interface StandardItem {
  title: string;
  description: string;
}

interface DevStandard {
  category: string;
  icon: IconName;
  color: string;
  bgColor: string;
  items: StandardItem[];
}

const DEV_STANDARDS: DevStandard[] = [
  {
    category: 'Git & Collaboration',
    icon: 'gitBranch',
    color: 'text-orange-600',
    bgColor: 'bg-orange-600/10',
    items: [
      {
        title: 'Git Workflow',
        description:
          'main / dev / feature / hotfix 브랜치 전략 선호 (작업 분리 + 릴리즈 안정성 + 긴급 수정 흐름 명확)',
      },
      {
        title: 'Commit/PR 규칙',
        description:
          '변경 유형을 드러내는 메시지/제목(feat/fix/refactor 등)과 작은 단위 PR 선호 (리뷰/롤백/추적 쉬움)',
      },
    ],
  },
  {
    category: 'Architecture & Routing',
    icon: 'layers',
    color: 'text-purple-600',
    bgColor: 'bg-purple-600/10',
    items: [
      {
        title: 'Routing/권한(Next.js)',
        description:
          '인증/권한 가드는 서버에서 먼저(middleware/서버 컴포넌트), 클라이언트 가드는 UX 보조용',
      },
      {
        title: '아키텍처 관점(FSD)',
        description:
          'Entities: 여러 feature가 공유하는 도메인 조각 / Features: 유저 행동 단위 기능 / Pages/App: 라우팅/조합 전용',
      },
    ],
  },
  {
    category: 'Error & API Handling',
    icon: 'shield',
    color: 'text-red-600',
    bgColor: 'bg-red-600/10',
    items: [
      {
        title: 'Error Handling',
        description:
          'Error Boundary로 UI 실패를 격리(페이지/섹션 단위), 사용자 메시지와 개발자 디버깅 정보를 분리',
      },
      {
        title: 'API 에러 형태 통일',
        description: 'API 에러를 ApiError 같은 단일 형태로 변환해 처리 흐름을 단순화',
      },
      {
        title: '로깅/모니터링',
        description: '사용자 영향 있는 에러는 Sentry(또는 로깅)로 수집 + request id/컨텍스트 포함',
      },
      {
        title: 'Data Fetching',
        description:
          'Axios보다 fetch 일원화 + fetch wrapper 선호 (헤더/인증/에러/타임아웃/재시도 규칙을 한 곳에 모으기)',
      },
    ],
  },
  {
    category: 'State & Data Management',
    icon: 'code2',
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    items: [
      {
        title: '서버 상태 관리',
        description: '캐시/재시도/동기화가 필요한 서버 데이터는 React Query 같은 도구로 관리',
      },
      {
        title: '캐시 키 규칙',
        description: "['domain', id] 형태로 도메인 단위 규칙을 통일",
      },
      {
        title: 'invalidate 규칙',
        description: 'mutation 성공 → 관련 query invalidate 로 일관된 최신화',
      },
      {
        title: '상태 관리(Zustand)',
        description:
          '여러 영역 공유 + 이벤트/액션 중심 상태(모달/토스트/필터 등) 또는 프롭 드릴링이 구조를 망칠 때만 전역으로',
      },
    ],
  },
  {
    category: 'UI & Accessibility',
    icon: 'palette',
    color: 'text-green-600',
    bgColor: 'bg-green-600/10',
    items: [
      {
        title: 'Radix 사용 기준',
        description:
          '접근성/포커스/키보드 내비게이션 구현 비용이 큰 UI(Modal, Tabs, Menu, Popover 등)에 사용',
      },
      {
        title: '접근성(A11y) 기본 룰',
        description:
          'button/a 시맨틱 우선(클릭 div 지양), ESC 닫기/포커스 복귀/키보드 탭 흐름 확인',
      },
      {
        title: 'Typography 룰',
        description:
          '태그(semantic)는 의미 기준으로 고정, 반응형은 클래스/variant로만 조절(태그를 화면 크기에 따라 바꾸지 않기)',
      },
      {
        title: 'Styling 룰',
        description: '페이지 조합은 cn, 재사용 컴포넌트의 variant는 tv',
      },
      {
        title: '디자인 토큰 우선',
        description:
          '색/간격/타이포는 토큰 기반으로 통일(임의 값 남발 지양), variant는 tv로만 확장',
      },
      {
        title: 'Theme',
        description: 'Provider로 주입하고 cookie로 SSR/초기값을 맞춰 hydration mismatch 줄이기',
      },
    ],
  },
  {
    category: 'Component Design',
    icon: 'layers',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-600/10',
    items: [
      {
        title: 'Custom Hook 기준',
        description:
          '2곳 이상에서 반복 + 상태/이펙트/핸들러가 묶인 로직일 때만 분리(단순 유틸은 lib로)',
      },
      {
        title: '컴포넌트 설계',
        description: '"무의미 UI(shared/ui)"와 "도메인 UI(entities/ui)"를 분리',
      },
      {
        title: '데이터 의존 최소화',
        description:
          '컴포넌트는 가능한 데이터 구조를 모르도록(프레젠테이션) 만들고 필요하면 viewModel 형태로 주입',
      },
    ],
  },
  {
    category: 'Performance & Testing',
    icon: 'zap',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-600/10',
    items: [
      {
        title: '성능 원칙',
        description:
          '측정 전 최적화 금지(DevTools/Profiler 기반), memo/useMemo/useCallback은 병목 확인된 곳에만',
      },
      {
        title: '이미지/폰트 로딩',
        description: 'Core Web Vitals 관점으로 lazy/priority를 결정(초기 렌더에 필요한 것만 우선)',
      },
      {
        title: '테스트(필요 최소)',
        description:
          'feature(유즈케이스) 단위 통합/E2E는 최소 1~2개, 복잡한 유틸/매퍼/파서는 단위테스트 가치 높음, 스냅샷은 최소화',
      },
    ],
  },
];

export function DevStandardsSection() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) newSet.delete(category);
      else newSet.add(category);
      return newSet;
    });
  };

  const isAllExpanded = expandedCategories.size === DEV_STANDARDS.length;

  const toggleAll = () => {
    setExpandedCategories(
      isAllExpanded ? new Set() : new Set(DEV_STANDARDS.map((s) => s.category))
    );
  };

  return (
    <section className="space-y-6">
      <div className="text-center">
        <div className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
          Development Standards
        </div>
        <h2 className="text-foreground mb-4 text-3xl font-bold">개발 기준</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          프로젝트를 진행하며 점진적으로 선택하고 있는 개발 원칙들입니다
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={toggleAll}
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition"
          >
            {isAllExpanded ? '모두 접기' : '모두 펼치기'}
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        {DEV_STANDARDS.map((standard) => {
          const isExpanded = expandedCategories.has(standard.category);

          return (
            <div
              key={standard.category}
              className={['overflow-hidden transition-all', cardClassName].join(' ')}
            >
              <button
                onClick={() => toggleCategory(standard.category)}
                className="w-full p-6 text-left transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`${standard.bgColor} ${standard.color} rounded-xl p-2.5`}>
                      <Icon name={standard.icon} size={20} />
                    </div>
                    <div>
                      <h3 className="text-foreground text-lg font-bold">{standard.category}</h3>
                      <p className="text-muted-foreground text-sm">
                        {standard.items.length}개 원칙
                      </p>
                    </div>
                  </div>

                  <div
                    className={`${standard.color} transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  >
                    <Icon name="chevronRight" size={20} />
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="bg-depth-1 border-border/50 space-y-3 border-t p-6">
                  {standard.items.map((item, idx) => (
                    <div key={idx} className="bg-depth-2 group rounded-xl p-4 transition-colors">
                      <div className="flex gap-3">
                        <div
                          className={`${standard.bgColor} ${standard.color} mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold`}
                        >
                          {idx + 1}
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <h4 className="text-foreground text-sm font-semibold">{item.title}</h4>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={['p-6 text-center', cardClassName].join(' ')}>
        <p className="text-muted-foreground text-sm">
          이 기준들은 프로젝트 특성과 팀 상황에 따라 유연하게 적용됩니다.
          <br className="hidden sm:block" />
          <span className="text-foreground font-medium">측정 가능한 개선</span>과{' '}
          <span className="text-foreground font-medium">팀 생산성 향상</span>을 우선으로 합니다.
        </p>
      </div>
    </section>
  );
}
