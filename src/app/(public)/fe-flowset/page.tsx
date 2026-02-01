'use client';

import { useState } from 'react';
import { Icon } from '@/shared/ui/Icons';
import type { IconName } from '@/shared/ui/Icons';

interface FlowNode {
  id: string;
  label: string;
  description: string;
  icon: IconName;
  color: string;
  layer: number;
  highlight?: boolean;
  isError?: boolean;
}

interface Term {
  term: string;
  definition: string;
}

interface FlowDiagram {
  id: string;
  title: string;
  description: string;
  nodes: FlowNode[];
  terms: Term[];
}

const FLOW_DIAGRAMS: FlowDiagram[] = [
  {
    id: 'api-flow',
    title: 'API 요청 플로우',
    description: '사용자 요청부터 응답까지의 전체 흐름',
    nodes: [
      {
        id: 'user',
        label: 'User / Browser',
        description: 'HTTP Request (fetch/axios)',
        icon: 'monitor',
        color: 'bg-blue-500',
        layer: 1,
      },
      {
        id: 'bff',
        label: 'BFF / API Server',
        description: 'Next API route / Node',
        icon: 'server',
        color: 'bg-green-500',
        layer: 2,
      },
      {
        id: 'middleware',
        label: 'Middleware',
        description: '인증/인가(토큰), 로깅/레이트리밋, 헤더/쿠키 파싱',
        icon: 'shield',
        color: 'bg-purple-500',
        layer: 3,
        highlight: true,
      },
      {
        id: 'schema',
        label: 'Schema Validate',
        description: 'req.body 스키마 검사, upstream 응답 스키마 검사',
        icon: 'checkCircle',
        color: 'bg-orange-500',
        layer: 4,
        highlight: true,
      },
      {
        id: 'upstream',
        label: 'Upstream Service',
        description: '외부 API / 다른 서버 (Auth / Payments / DB)',
        icon: 'database',
        color: 'bg-cyan-500',
        layer: 5,
        highlight: true,
      },
      {
        id: 'transform',
        label: 'BFF Transform',
        description: '필요하면 응답 형태 변환',
        icon: 'refreshCw',
        color: 'bg-green-500',
        layer: 6,
      },
      {
        id: 'react',
        label: 'React Component',
        description: 'UI 렌더링',
        icon: 'code2',
        color: 'bg-blue-500',
        layer: 7,
      },
      {
        id: 'error-boundary',
        label: 'Error Boundary',
        description: 'UI 렌더 에러 잡는 안전망, fallback UI 보여줌',
        icon: 'alertTriangle',
        color: 'bg-red-500',
        layer: 8,
        isError: true,
      },
    ],
    terms: [
      {
        term: 'SCHEMA',
        definition: '데이터 모양 검사 (요청/응답이 예상한 형태인지 확인)',
      },
      {
        term: 'MIDDLEWARE',
        definition: '요청의 관문 (인증/로깅/레이트리밋 같은 공통 전처리)',
      },
      {
        term: 'ERROR BOUNDARY',
        definition: 'UI 안전망 (React 렌더링 중 에러 나면 앱 안죽게 fallback)',
      },
      {
        term: 'UPSTREAM',
        definition: '내가 호출하는 상위(외부) 시스템 (외부 API/다른 서버/DB)',
      },
    ],
  },
  {
    id: 'state-flow',
    title: '상태 관리 플로우',
    description: '사용자 액션부터 UI 업데이트까지',
    nodes: [
      {
        id: 'user-action',
        label: '사용자 액션',
        description: '버튼 클릭, 입력, 스크롤 등',
        icon: 'monitor',
        color: 'bg-blue-500',
        layer: 1,
      },
      {
        id: 'event-handler',
        label: 'Event Handler',
        description: 'onClick, onChange, onSubmit',
        icon: 'code2',
        color: 'bg-purple-500',
        layer: 2,
      },
      {
        id: 'state-decision',
        label: '상태 결정',
        description: 'UI/Server/Domain/Form/Control 중 선택',
        icon: 'layers',
        color: 'bg-orange-500',
        layer: 3,
        highlight: true,
      },
      {
        id: 'state-update',
        label: '상태 업데이트',
        description: 'setState / mutation / dispatch',
        icon: 'refreshCw',
        color: 'bg-green-500',
        layer: 4,
      },
      {
        id: 'reconciliation',
        label: 'React Reconciliation',
        description: 'Virtual DOM 비교 및 실제 DOM 업데이트',
        icon: 'zap',
        color: 'bg-cyan-500',
        layer: 5,
        highlight: true,
      },
      {
        id: 'ui-render',
        label: 'UI 리렌더',
        description: '변경된 부분만 화면에 반영',
        icon: 'monitor',
        color: 'bg-blue-500',
        layer: 6,
      },
    ],
    terms: [
      {
        term: 'RECONCILIATION',
        definition: 'React가 변경사항을 효율적으로 찾아내는 과정 (Virtual DOM Diffing)',
      },
      {
        term: 'STATE DECISION',
        definition: '어떤 종류의 상태로 관리할지 결정 (5대 상태 스키마)',
      },
    ],
  },
  {
    id: 'error-flow',
    title: '에러 처리 플로우',
    description: '예외 상황 발생 시 처리 흐름',
    nodes: [
      {
        id: 'error-source',
        label: '에러 발생',
        description: 'Upstream 500, Timeout, Network Error',
        icon: 'alertTriangle',
        color: 'bg-red-500',
        layer: 1,
      },
      {
        id: 'bff-catch',
        label: 'BFF에서 Catch',
        description: 'try-catch로 에러 잡기',
        icon: 'shield',
        color: 'bg-orange-500',
        layer: 2,
      },
      {
        id: 'transform-error',
        label: 'ApiError 변환',
        description: '표준 에러 형태로 통일 (code, message)',
        icon: 'refreshCw',
        color: 'bg-purple-500',
        layer: 3,
        highlight: true,
      },
      {
        id: 'send-error',
        label: 'Front로 전송',
        description: 'JSON 에러 응답 (4xx/5xx)',
        icon: 'server',
        color: 'bg-green-500',
        layer: 4,
      },
      {
        id: 'error-handling',
        label: 'UI 에러 처리',
        description: 'Toast / Error Page / Retry 버튼',
        icon: 'monitor',
        color: 'bg-blue-500',
        layer: 5,
      },
      {
        id: 'logging',
        label: 'Logging / Monitoring',
        description: 'Sentry 같은 도구로 에러 추적',
        icon: 'database',
        color: 'bg-cyan-500',
        layer: 6,
      },
    ],
    terms: [
      {
        term: 'ApiError',
        definition: '모든 API 에러를 통일된 형태로 변환한 객체 (일관된 처리를 위해)',
      },
      {
        term: 'Error Boundary',
        definition: 'React 렌더링 중 발생한 에러를 잡아서 fallback UI를 보여주는 컴포넌트',
      },
    ],
  },
];

export default function FrontendFlowset() {
  const [selectedFlow, setSelectedFlow] = useState(FLOW_DIAGRAMS[0].id);

  const currentFlow = FLOW_DIAGRAMS.find((f) => f.id === selectedFlow);

  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="space-y-8">
        {/* 헤더 */}
        <div className="text-center">
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
            <Icon name="workflow" />
            프론트엔드 플로우셋
          </div>
          <h2 className="text-foreground mb-3 text-2xl font-bold sm:text-3xl">
            실제 구현 시 생각하는 흐름
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            요청부터 응답, 상태 업데이트, 에러 처리까지 전체 흐름을 이해하고 설계합니다
          </p>
        </div>

        {/* 탭 선택 */}
        <div className="flex justify-center gap-2 rounded-xl p-1">
          {FLOW_DIAGRAMS.map((flow) => (
            <button
              key={flow.id}
              onClick={() => setSelectedFlow(flow.id)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                selectedFlow === flow.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {flow.title}
            </button>
          ))}
        </div>

        {/* 플로우 다이어그램 */}
        {currentFlow && (
          <div className="bg-depth-1/80 space-y-6 rounded-2xl p-6 shadow-md backdrop-blur-sm md:p-8">
            <div className="text-center">
              <h3 className="text-foreground mb-2 text-lg font-bold">{currentFlow.title}</h3>
              <p className="text-muted-foreground text-sm">{currentFlow.description}</p>
            </div>

            {/* 노드 플로우 */}
            <div className="space-y-3">
              {currentFlow.nodes.map((node, idx) => {
                const isHighlight = node.highlight;
                const isError = node.isError;

                return (
                  <div key={node.id}>
                    {/* 노드 카드 */}
                    <div
                      className={`border-border group relative overflow-hidden rounded-xl border p-4 transition-all ${
                        isHighlight
                          ? 'border-primary'
                          : isError
                            ? 'border-red-500/50 bg-red-50/50 dark:bg-red-950/20'
                            : 'bg-depth-1'
                      }`}
                    >
                      {/* 배경 그라디언트 */}
                      <div
                        className={`${node.color} absolute right-0 top-0 h-full w-24 opacity-5 blur-2xl transition-opacity group-hover:opacity-10`}
                      />

                      <div className="relative flex items-start gap-4">
                        {/* 아이콘 - w-5 h-5 급은 size 20 적용 */}
                        <div
                          className={`${node.color} flex-shrink-0 rounded-lg p-2.5 text-white shadow-sm`}
                        >
                          <Icon name={node.icon} size={20} />
                        </div>

                        {/* 내용 */}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-foreground text-base font-bold">{node.label}</h4>
                            {isHighlight && (
                              <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-semibold">
                                핵심
                              </span>
                            )}
                            {isError && (
                              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                예외 처리
                              </span>
                            )}
                          </div>
                          <p className="text-muted-foreground text-xs leading-relaxed">
                            {node.description}
                          </p>
                        </div>

                        {/* 레이어 번호 */}
                        <div className="text-muted-foreground flex-shrink-0 font-mono text-xs">
                          {node.layer}
                        </div>
                      </div>
                    </div>

                    {/* 화살표 - h-5 w-5 급은 size 20 적용 */}
                    {idx < currentFlow.nodes.length - 1 && (
                      <div className="flex justify-center py-2">
                        <Icon name="arrowDown" size={20} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 용어 정의 */}
            {currentFlow.terms && currentFlow.terms.length > 0 && (
              <div className="border-border bg-depth-2 space-y-3 rounded-xl border p-5">
                <h4 className="text-foreground flex items-center gap-2 text-sm font-bold">
                  <Icon name="code2" />
                  핵심 용어
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  {currentFlow.terms.map((term) => (
                    <div key={term.term} className="space-y-1">
                      <div className="bg-primary/10 text-primary inline-block rounded-md px-2 py-1 font-mono text-xs font-bold">
                        {term.term}
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {term.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 하단 요약 */}
        <div className="bg-depth-1/50 grid gap-4 rounded-xl p-6 backdrop-blur-sm sm:grid-cols-3">
          <div className="space-y-1">
            <div className="text-foreground text-sm font-semibold">✓ 전체 흐름 파악</div>
            <p className="text-muted-foreground text-xs">
              요청부터 응답까지 각 레이어의 역할을 이해합니다
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-foreground text-sm font-semibold">✓ 에러 시나리오 대비</div>
            <p className="text-muted-foreground text-xs">
              예외 상황에서도 안정적으로 동작하도록 설계합니다
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-foreground text-sm font-semibold">✓ 최적화 포인트 인지</div>
            <p className="text-muted-foreground text-xs">
              각 단계에서 성능 개선 가능한 지점을 찾아냅니다
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}