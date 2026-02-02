'use client';

import { useState } from 'react';
import { Tabs } from '@/shared/ui/Tabs';
import { Icon } from '@/shared/ui/Icons';
import type { IconName } from '@/shared/ui/Icons';

interface StateSchema {
  id: string;
  name: string;
  icon: IconName;
  color: string;
  borderColor: string;
  textColor: string;
  bgLight: string;
  description: string;
  examples: string[];
  tools: string[];
  antiPatterns: string[];
  goodPractices: string[];
}

const STATE_SCHEMAS: StateSchema[] = [
  {
    id: 'ui',
    name: 'UI 상태',
    icon: 'monitor',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
    bgLight: 'bg-blue-50',
    description: 'useState의 80%',
    examples: ['모달 열림/닫힘', '탭 선택', '드롭다운 상태', '툴팁 표시'],
    tools: ['useState', 'useReducer'],
    antiPatterns: ['UI 상태를 전역에 올리기', '서버 데이터와 섞기'],
    goodPractices: ['컴포넌트 로컬에 보관', '필요시 상위로 lifting', 'Props로 제어'],
  },
  {
    id: 'server',
    name: '서버 상태',
    icon: 'server',
    color: 'bg-green-500',
    borderColor: 'border-green-500',
    textColor: 'text-green-600',
    bgLight: 'bg-green-50',
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
    color: 'bg-purple-500',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-600',
    bgLight: 'bg-purple-50',
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
    color: 'bg-orange-500',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-600',
    bgLight: 'bg-orange-50',
    description: 'react-hook-form 같은 게 필요한 이유',
    examples: ['입력 값', '유효성 에러', '터치 여부', '제출 중'],
    tools: ['react-hook-form', 'Formik', 'uncontrolled inputs'],
    antiPatterns: ['모든 input을 useState로', 'onChange마다 validation', '중복 상태 관리'],
    goodPractices: ['라이브러리 활용', 'uncontrolled 우선', 'submit 시점 검증'],
  },
  {
    id: 'control',
    name: '제어 상태 (컨트롤 플로우)',
    icon: 'gitBranch',
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    textColor: 'text-red-600',
    bgLight: 'bg-red-50',
    description: '로직 흐름의 스위치',
    examples: ['loading', 'step', 'phase', 'mode'],
    tools: ['useState', 'useReducer', 'state machines'],
    antiPatterns: ['boolean 여러 개로 상태 표현', '불가능한 상태 조합 허용'],
    goodPractices: ['명시적 enum/union', 'state machine 고려', '불가능한 상태 제거'],
  },
];

const ARCHITECTURE_LAYERS = [
  {
    name: 'Presentation (DOM)',
    description: 'React 컴포넌트, JSX',
    items: ['컴포넌트 트리', 'Props 흐름', '이벤트 핸들러'],
    color: 'bg-slate-100',
  },
  {
    name: 'State Layer',
    description: '5가지 상태 스키마 위치',
    items: [
      'UI State (로컬)',
      'Server State (Query)',
      'Domain State (Store)',
      'Form State',
      'Control Flow',
    ],
    color: 'bg-blue-50',
  },
  {
    name: 'Business Logic',
    description: 'Hooks, 유틸리티',
    items: ['Custom Hooks', 'Helpers', 'Validators', 'Formatters'],
    color: 'bg-purple-50',
  },
  {
    name: 'Data Access',
    description: 'API 통신, 캐시',
    items: ['API Client', 'Query Functions', 'Mutations', 'Cache Strategy'],
    color: 'bg-green-50',
  },
];

export default function Architecture() {
  const [selectedSchema, setSelectedSchema] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'schemas' | 'layers' | 'flow'>('schemas');

  const selectedState = STATE_SCHEMAS.find((s) => s.id === selectedSchema);

  return (
    <section className="mx-auto max-w-5xl space-y-8">
      {/* 헤더 - 단독 카드 */}
      <div className="bg-depth-1/80 rounded-2xl p-6 shadow-md backdrop-blur-sm md:p-10">
        <div className="space-y-3">
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
            <Icon name="layers" />
            프론트엔드 상태 아키텍처
          </div>
          <h1 className="text-foreground text-2xl font-bold leading-tight sm:text-3xl">
            상태는 하나가 아니라 종류
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            5가지 상태 스키마를 섞지 않는 것을 원칙으로 삼는 상태 관리 아키텍처입니다.
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 - 독립적 */}
      <Tabs.Root value={viewMode} onValueChange={(value) => setViewMode(value as typeof viewMode)}>
        <Tabs.List>
          <Tabs.Trigger value="schemas">5대 상태 스키마</Tabs.Trigger>
          <Tabs.Trigger value="layers">아키텍처 레이어</Tabs.Trigger>
          <Tabs.Trigger value="flow">데이터 플로우</Tabs.Trigger>
        </Tabs.List>

        {/* 5대 상태 스키마 */}
        <Tabs.Content value="schemas" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            {/* 좌측 리스트 */}
            <div className="space-y-3">
              {STATE_SCHEMAS.map((schema) => {
                const isSelected = selectedSchema === schema.id;

                return (
                  <button
                    key={schema.id}
                    onClick={() => setSelectedSchema(isSelected ? null : schema.id)}
                    className={`bg-depth-1 border-border hover:border-primary/30 w-full rounded-xl border p-5 text-left shadow-sm transition-all ${
                      isSelected ? `${schema.borderColor}` : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${schema.color} rounded-lg p-2.5 text-white shadow-sm`}>
                        <Icon name={schema.icon} size={20} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-foreground mb-1 text-base font-semibold">
                          {schema.name}
                        </h3>
                        <p className="text-muted-foreground text-xs">{schema.description}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {schema.examples.slice(0, 2).map((example) => (
                            <span
                              key={example}
                              className={`${schema.bgLight} ${schema.textColor} rounded-full px-2.5 py-1 text-xs font-medium`}
                            >
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 우측 상세 패널 */}
            <div className="lg:sticky lg:top-8 lg:self-start">
              {selectedState ? (
                <div className="bg-depth-1 border-border space-y-4 rounded-xl border p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className={`${selectedState.color} rounded-lg p-2.5 text-white shadow-sm`}>
                      <Icon name={selectedState.icon} size={20} />
                    </div>
                    <div>
                      <h2 className="text-foreground text-lg font-semibold">
                        {selectedState.name}
                      </h2>
                      <p className="text-muted-foreground text-xs">{selectedState.description}</p>
                    </div>
                  </div>

                  {/* 실제 예시 */}
                  <div>
                    <h3 className="text-foreground mb-2 flex items-center gap-2 text-xs font-semibold">
                      <Icon name="info" size={14} />
                      실제 예시
                    </h3>
                    <div className="space-y-2">
                      {selectedState.examples.map((example) => (
                        <div
                          key={example}
                          className={`${selectedState.bgLight} rounded-lg px-3 py-2`}
                        >
                          <code className={`${selectedState.textColor} text-xs font-medium`}>
                            {example}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 추천 도구 */}
                  <div>
                    <h3 className="text-foreground mb-2 flex items-center gap-2 text-xs font-semibold">
                      <Icon name="zap" size={14} />
                      추천 도구
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedState.tools.map((tool) => (
                        <span
                          key={tool}
                          className="bg-depth-2 text-muted-foreground rounded-md px-2.5 py-1 text-xs font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Good Practices */}
                  <div>
                    <h3 className="text-foreground mb-2 flex items-center gap-2 text-xs font-semibold">
                      <Icon name="checkCircle2" size={14} className="text-emerald-600" />
                      Good Practices
                    </h3>
                    <ul className="space-y-1.5">
                      {selectedState.goodPractices.map((practice) => (
                        <li key={practice} className="text-muted-foreground flex gap-2 text-xs">
                          <Icon name="checkCircle2" size={14} className="mt-0.5 flex-shrink-0 text-emerald-600" />
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Anti-patterns */}
                  <div>
                    <h3 className="text-foreground mb-2 flex items-center gap-2 text-xs font-semibold">
                      <Icon name="xCircle" size={14} className="text-[rgb(var(--status-danger))]" />
                      Anti-patterns
                    </h3>
                    <ul className="space-y-1.5">
                      {selectedState.antiPatterns.map((pattern) => (
                        <li key={pattern} className="text-muted-foreground flex gap-2 text-xs">
                          <Icon name="xCircle" size={14} className="mt-0.5 flex-shrink-0 text-[rgb(var(--status-danger))]" />
                          {pattern}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-depth-2/50 border-border flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed p-8 text-center">
                  <div className="space-y-2">
                    <Icon name="layers" size={40} className="text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground text-xs">
                      왼쪽에서 상태 스키마를 선택하면
                      <br />
                      상세 정보가 표시됩니다
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Tabs.Content>

        {/* 아키텍처 레이어 */}
        <Tabs.Content value="layers" className="mt-6">
          <div className="space-y-4">
            {ARCHITECTURE_LAYERS.map((layer, idx) => (
              <div
                key={layer.name}
                className="bg-depth-1 border-border space-y-4 rounded-xl border p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`${layer.color} text-foreground flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-foreground text-base font-semibold">{layer.name}</h3>
                    <p className="text-muted-foreground text-xs">{layer.description}</p>
                  </div>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {layer.items.map((item) => (
                    <div key={item} className="bg-depth-2 rounded-lg px-3 py-2.5">
                      <p className="text-foreground text-xs font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>

        {/* 데이터 플로우 */}
        <Tabs.Content value="flow" className="mt-6">
          <div className="bg-depth-1 border-border space-y-8 rounded-xl border p-6 shadow-sm md:p-8">
            {/* User Action */}
            <div className="text-center">
              <div className="bg-primary text-primary-foreground mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                <Icon name="cpu" />
                사용자 액션
              </div>
              <p className="text-muted-foreground text-xs">버튼 클릭, 입력, 스크롤 등</p>
            </div>

            <Icon name="arrowDown" size={24} className="text-muted-foreground mx-auto" />

            {/* 상태 업데이트 결정 */}
            <div className="space-y-4">
              <h3 className="text-foreground text-center text-base font-semibold">
                어떤 상태를 업데이트할까?
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'UI 변경?', color: 'bg-blue-500', example: '→ useState' },
                  { name: '서버 요청?', color: 'bg-green-500', example: '→ useMutation' },
                  { name: '전역 공유?', color: 'bg-purple-500', example: '→ Zustand' },
                  { name: '폼 제출?', color: 'bg-orange-500', example: '→ react-hook-form' },
                  { name: '흐름 제어?', color: 'bg-red-500', example: '→ useReducer' },
                ].map((item) => (
                  <div key={item.name} className="bg-depth-2 rounded-lg p-3.5 text-center">
                    <div
                      className={`${item.color} mb-2 inline-flex rounded-md px-3 py-1 text-xs font-semibold text-white`}
                    >
                      {item.name}
                    </div>
                    <p className="text-muted-foreground text-xs">{item.example}</p>
                  </div>
                ))}
              </div>
            </div>

            <Icon name="arrowDown" size={24} className="text-muted-foreground mx-auto" />

            {/* 리렌더 최적화 */}
            <div className="text-center">
              <div className="bg-primary mb-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white">
                <Icon name="zap" className="text-white" />
                리렌더 최적화
              </div>
              <div className="text-muted-foreground mx-auto space-y-1.5 text-left text-xs">
                <p>✓ UI 상태: 해당 컴포넌트만 리렌더</p>
                <p>✓ 서버 상태: React Query가 알아서 최적화</p>
                <p>✓ 전역 상태: selector로 필요한 부분만 구독</p>
                <p>✓ 폼 상태: uncontrolled로 불필요한 렌더 제거</p>
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      {/* 핵심 원칙 - 독립적 */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { title: '원칙 1', desc: '상태는 하나가 아니라, 종류다', color: 'bg-blue-500' },
          { title: '원칙 2', desc: 'Query/Mutation은 서버 상태 전용', color: 'bg-green-500' },
          { title: '원칙 3', desc: '상태를 섞으면 설계가 무너진다', color: 'bg-purple-500' },
        ].map((item) => (
          <div key={item.title} className={`${item.color} rounded-xl p-5 text-white shadow-md`}>
            <p className="mb-1 text-sm font-bold">{item.title}</p>
            <p className="text-xs text-white/90">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}