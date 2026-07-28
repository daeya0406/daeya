'use client';

import { useState } from 'react';
import { Tabs } from '@/shared/ui/Tabs';
import { Icon } from '@/shared/ui/Icons';
import type { IconName } from '@/shared/ui/Icons';

type StateSchema = {
  id: string;
  name: string;
  icon: IconName;
  description: string;
  examples: string[];
  tools: string[];
  antiPatterns: string[];
  goodPractices: string[];
};

const STATE_SCHEMAS: StateSchema[] = [
  {
    id: 'ui',
    name: 'UI 상태',
    icon: 'monitor',
    description: 'useState의 대부분',
    examples: ['모달 열림/닫힘', '탭 선택', '드롭다운 상태', '툴팁 표시'],
    tools: ['useState', 'useReducer'],
    antiPatterns: ['UI 상태를 전역에 올리기', '서버 데이터와 섞기'],
    goodPractices: ['컴포넌트 로컬에 보관', '필요시 상위로 lifting', 'Props로 제어'],
  },
  {
    id: 'server',
    name: '서버 상태',
    icon: 'server',
    description: 'React Query가 다루는 상태',
    examples: ['API 응답 데이터', '캐시된 목록', '무한 스크롤 데이터', '실시간 업데이트'],
    tools: ['React Query', 'SWR', 'Apollo Client'],
    antiPatterns: ['useState에 API 데이터 저장', '수동 캐시 관리', 'useEffect에서 fetch'],
    goodPractices: ['Query로 읽기', 'Mutation으로 쓰기', 'invalidation 패턴'],
  },
  {
    id: 'domain',
    name: '클라이언트 도메인 상태',
    icon: 'database',
    description: 'Zustand / Context / Redux 대상',
    examples: ['현재 로그인 유저', '앱 설정', '테마', '장바구니(로컬)'],
    tools: ['Zustand', 'Context API', 'Redux'],
    antiPatterns: ['모든 상태를 전역으로', '서버 상태 중복 저장', '과도한 리렌더'],
    goodPractices: ['진짜 전역만', '작은 store로 분리', 'selector 활용'],
  },
  {
    id: 'form',
    name: '폼/입력 상태',
    icon: 'fileText',
    description: 'react-hook-form 등이 필요한 이유',
    examples: ['입력 값', '유효성 에러', '터치 여부', '제출 중'],
    tools: ['react-hook-form', 'Formik', 'uncontrolled inputs'],
    antiPatterns: ['모든 input을 useState로', 'onChange마다 validation', '중복 상태 관리'],
    goodPractices: ['라이브러리 활용', 'uncontrolled 우선', 'submit 시점 검증'],
  },
  {
    id: 'control',
    name: '제어 상태',
    icon: 'gitBranch',
    description: '로직 흐름의 스위치',
    examples: ['loading', 'step', 'phase', 'mode'],
    tools: ['useState', 'useReducer', 'state machines'],
    antiPatterns: ['boolean 여러 개로 상태 표현', '불가능한 상태 조합 허용'],
    goodPractices: ['명시적 enum/union', 'state machine 고려', '불가능한 상태 제거'],
  },
];

const ARCHITECTURE_LAYERS = [
  {
    name: 'Presentation',
    description: 'React 컴포넌트, JSX',
    items: ['컴포넌트 트리', 'Props 흐름', '이벤트 핸들러'],
  },
  {
    name: 'State',
    description: '5가지 상태 스키마 위치',
    items: ['UI (로컬)', 'Server (Query)', 'Domain (Store)', 'Form', 'Control Flow'],
  },
  {
    name: 'Business Logic',
    description: 'Hooks, 유틸리티',
    items: ['Custom Hooks', 'Helpers', 'Validators', 'Formatters'],
  },
  {
    name: 'Data Access',
    description: 'API 통신, 캐시',
    items: ['API Client', 'Query Functions', 'Mutations', 'Cache Strategy'],
  },
];

const FLOW_DECISIONS = [
  { question: 'UI 변경?', answer: 'useState' },
  { question: '서버 요청?', answer: 'useMutation' },
  { question: '전역 공유?', answer: 'Zustand' },
  { question: '폼 제출?', answer: 'react-hook-form' },
  { question: '흐름 제어?', answer: 'useReducer' },
];

const PRINCIPLES = [
  '상태는 하나가 아니라 종류다',
  'Query/Mutation은 서버 상태 전용',
  '상태를 섞으면 설계가 무너진다',
];

const cardClassName = 'rounded-2xl bg-depth-1 shadow-sm ring-1 ring-border';

export default function Architecture() {
  const [selectedSchema, setSelectedSchema] = useState<string>(STATE_SCHEMAS[0].id);
  const [viewMode, setViewMode] = useState<'schemas' | 'layers' | 'flow'>('schemas');
  const selectedState = STATE_SCHEMAS.find((s) => s.id === selectedSchema);

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-foreground text-3xl font-bold">Architecture</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          프론트엔드 상태를 종류별로 나누는 기준입니다. 섞지 않는 것을 원칙으로 둡니다.
        </p>
      </header>

      <Tabs.Root value={viewMode} onValueChange={(value) => setViewMode(value as typeof viewMode)}>
        <Tabs.List>
          <Tabs.Trigger value="schemas">상태 스키마</Tabs.Trigger>
          <Tabs.Trigger value="layers">레이어</Tabs.Trigger>
          <Tabs.Trigger value="flow">데이터 플로우</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="schemas" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-2">
              {STATE_SCHEMAS.map((schema) => {
                const isSelected = selectedSchema === schema.id;
                return (
                  <button
                    key={schema.id}
                    type="button"
                    onClick={() => setSelectedSchema(schema.id)}
                    className={[
                      'w-full rounded-xl border p-4 text-left transition',
                      isSelected
                        ? 'border-primary bg-primary/5 ring-primary/20 ring-1'
                        : 'border-border bg-depth-1 hover:bg-depth-2',
                    ].join(' ')}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={[
                          'mt-0.5 inline-flex rounded-lg p-2',
                          isSelected ? 'bg-primary/10 text-primary' : 'bg-depth-2 text-muted-foreground',
                        ].join(' ')}
                      >
                        <Icon name={schema.icon} size={18} />
                      </span>
                      <div>
                        <h3 className="text-foreground text-sm font-semibold">{schema.name}</h3>
                        <p className="text-muted-foreground mt-0.5 text-xs">{schema.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedState && (
              <div className={['space-y-5 p-5 lg:sticky lg:top-8 lg:self-start', cardClassName].join(' ')}>
                <div>
                  <h2 className="text-foreground text-lg font-bold">{selectedState.name}</h2>
                  <p className="text-muted-foreground mt-1 text-sm">{selectedState.description}</p>
                </div>

                <div>
                  <h3 className="text-foreground mb-2 text-xs font-semibold uppercase tracking-wide">
                    예시
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedState.examples.map((example) => (
                      <span
                        key={example}
                        className="bg-depth-2 text-foreground rounded-full px-2.5 py-1 text-xs"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-foreground mb-2 text-xs font-semibold uppercase tracking-wide">
                    도구
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedState.tools.map((tool) => (
                      <span
                        key={tool}
                        className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-foreground mb-2 text-xs font-semibold uppercase tracking-wide">
                    Good
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedState.goodPractices.map((practice) => (
                      <li key={practice} className="text-muted-foreground flex gap-2 text-sm">
                        <span className="text-primary mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current" />
                        {practice}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-foreground mb-2 text-xs font-semibold uppercase tracking-wide">
                    Avoid
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedState.antiPatterns.map((pattern) => (
                      <li key={pattern} className="text-muted-foreground flex gap-2 text-sm">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-current opacity-40" />
                        {pattern}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content value="layers" className="mt-6">
          <div className="space-y-3">
            {ARCHITECTURE_LAYERS.map((layer, idx) => (
              <div key={layer.name} className={['p-5', cardClassName].join(' ')}>
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="text-primary text-sm font-bold">{idx + 1}</span>
                  <div>
                    <h3 className="text-foreground font-semibold">{layer.name}</h3>
                    <p className="text-muted-foreground text-xs">{layer.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-6">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="bg-depth-2 text-foreground rounded-full px-2.5 py-1 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="flow" className="mt-6">
          <div className={['space-y-6 p-6', cardClassName].join(' ')}>
            <div>
              <h3 className="text-foreground font-semibold">사용자 액션</h3>
              <p className="text-muted-foreground mt-1 text-sm">클릭, 입력, 스크롤 등</p>
            </div>

            <div className="border-border border-l-2 pl-4">
              <h3 className="text-foreground mb-3 text-sm font-semibold">어떤 상태를 업데이트할까?</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {FLOW_DECISIONS.map((item) => (
                  <div
                    key={item.question}
                    className="bg-depth-2 flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm"
                  >
                    <span className="text-foreground">{item.question}</span>
                    <span className="text-primary shrink-0 font-mono text-xs font-semibold">
                      {item.answer}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-foreground mb-2 text-sm font-semibold">리렌더 기준</h3>
              <ul className="text-muted-foreground space-y-1.5 text-sm">
                <li>UI 상태 → 해당 컴포넌트만</li>
                <li>서버 상태 → Query 캐시·구독 범위</li>
                <li>전역 상태 → selector로 필요한 부분만</li>
                <li>폼 상태 → uncontrolled로 불필요 렌더 줄이기</li>
              </ul>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <ul className={['space-y-2 p-5', cardClassName].join(' ')}>
        {PRINCIPLES.map((principle, idx) => (
          <li key={principle} className="flex gap-3 text-sm">
            <span className="text-primary w-4 shrink-0 font-bold">{idx + 1}</span>
            <span className="text-foreground">{principle}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
