'use client';

import { useState } from 'react';
import { Tabs } from '@/shared/ui/Tabs';
import { Icon } from '@/shared/ui/Icons';
import type { IconName } from '@/shared/ui/Icons';

type FlowNode = {
  id: string;
  label: string;
  description: string;
  icon: IconName;
  highlight?: boolean;
  isError?: boolean;
};

type FlowDiagram = {
  id: string;
  title: string;
  description: string;
  nodes: FlowNode[];
  terms: { term: string; definition: string }[];
};

const FLOW_DIAGRAMS: FlowDiagram[] = [
  {
    id: 'api-flow',
    title: 'API 요청',
    description: '사용자 요청부터 응답까지의 흐름',
    nodes: [
      {
        id: 'user',
        label: 'User / Browser',
        description: 'HTTP Request (fetch)',
        icon: 'monitor',
      },
      {
        id: 'bff',
        label: 'BFF / API Server',
        description: 'Next API route / Node',
        icon: 'server',
      },
      {
        id: 'middleware',
        label: 'Middleware',
        description: '인증·로깅·레이트리밋, 헤더/쿠키 파싱',
        icon: 'shield',
        highlight: true,
      },
      {
        id: 'schema',
        label: 'Schema Validate',
        description: 'req.body·upstream 응답 스키마 검사',
        icon: 'checkCircle',
        highlight: true,
      },
      {
        id: 'upstream',
        label: 'Upstream Service',
        description: '외부 API / Auth / Payments / DB',
        icon: 'database',
        highlight: true,
      },
      {
        id: 'transform',
        label: 'BFF Transform',
        description: '필요 시 응답 형태 변환',
        icon: 'refreshCw',
      },
      {
        id: 'react',
        label: 'React Component',
        description: 'UI 렌더링',
        icon: 'code2',
      },
      {
        id: 'error-boundary',
        label: 'Error Boundary',
        description: '렌더 에러 시 fallback UI',
        icon: 'alertTriangle',
        isError: true,
      },
    ],
    terms: [
      { term: 'SCHEMA', definition: '요청/응답이 예상한 형태인지 검사' },
      { term: 'MIDDLEWARE', definition: '인증·로깅 등 공통 전처리 관문' },
      { term: 'ERROR BOUNDARY', definition: '렌더 에러 시 앱이 죽지 않게 fallback' },
      { term: 'UPSTREAM', definition: '호출하는 외부 API·서버·DB' },
    ],
  },
  {
    id: 'state-flow',
    title: '상태 관리',
    description: '액션부터 UI 업데이트까지',
    nodes: [
      {
        id: 'user-action',
        label: '사용자 액션',
        description: '클릭, 입력, 스크롤',
        icon: 'monitor',
      },
      {
        id: 'event-handler',
        label: 'Event Handler',
        description: 'onClick, onChange, onSubmit',
        icon: 'code2',
      },
      {
        id: 'state-decision',
        label: '상태 결정',
        description: 'UI / Server / Domain / Form / Control',
        icon: 'layers',
        highlight: true,
      },
      {
        id: 'state-update',
        label: '상태 업데이트',
        description: 'setState / mutation / dispatch',
        icon: 'refreshCw',
      },
      {
        id: 'reconciliation',
        label: 'Reconciliation',
        description: 'Virtual DOM 비교 후 DOM 반영',
        icon: 'zap',
        highlight: true,
      },
      {
        id: 'ui-render',
        label: 'UI 리렌더',
        description: '변경된 부분만 반영',
        icon: 'monitor',
      },
    ],
    terms: [
      { term: 'RECONCILIATION', definition: '변경분을 효율적으로 찾는 과정 (diffing)' },
      { term: 'STATE DECISION', definition: '5대 상태 스키마 중 어디에 둘지 결정' },
    ],
  },
  {
    id: 'error-flow',
    title: '에러 처리',
    description: '예외 발생 시 처리 흐름',
    nodes: [
      {
        id: 'error-source',
        label: '에러 발생',
        description: 'Upstream 500, Timeout, Network',
        icon: 'alertTriangle',
        isError: true,
      },
      {
        id: 'bff-catch',
        label: 'BFF Catch',
        description: 'try-catch로 잡기',
        icon: 'shield',
      },
      {
        id: 'transform-error',
        label: 'ApiError 변환',
        description: 'code·message 형태로 통일',
        icon: 'refreshCw',
        highlight: true,
      },
      {
        id: 'send-error',
        label: 'Front로 전송',
        description: 'JSON 에러 응답 (4xx/5xx)',
        icon: 'server',
      },
      {
        id: 'error-handling',
        label: 'UI 에러 처리',
        description: 'Toast / Error Page / Retry',
        icon: 'monitor',
      },
      {
        id: 'logging',
        label: 'Logging',
        description: 'Sentry 등으로 추적',
        icon: 'database',
      },
    ],
    terms: [
      { term: 'ApiError', definition: 'API 에러를 한 형태로 맞춘 객체' },
      { term: 'Error Boundary', definition: '렌더 에러를 잡아 fallback을 보여주는 컴포넌트' },
    ],
  },
];

const cardClassName = 'rounded-2xl bg-depth-1 shadow-sm ring-1 ring-border';

export default function FrontendFlowset() {
  const [selectedFlow, setSelectedFlow] = useState(FLOW_DIAGRAMS[0].id);
  const currentFlow = FLOW_DIAGRAMS.find((f) => f.id === selectedFlow) ?? FLOW_DIAGRAMS[0];

  return (
    <section className="mx-auto max-w-3xl space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-foreground text-3xl font-bold">FE Flowset</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          요청·상태·에러를 구현할 때 머릿속에 두는 흐름입니다.
        </p>
      </header>

      <Tabs.Root value={selectedFlow} onValueChange={setSelectedFlow}>
        <Tabs.List>
          {FLOW_DIAGRAMS.map((flow) => (
            <Tabs.Trigger key={flow.id} value={flow.id}>
              {flow.title}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value={currentFlow.id} className="mt-6 space-y-6">
          <div>
            <h2 className="text-foreground text-lg font-bold">{currentFlow.title}</h2>
            <p className="text-muted-foreground mt-1 text-sm">{currentFlow.description}</p>
          </div>

          <ol className="space-y-2">
            {currentFlow.nodes.map((node, idx) => (
              <li key={node.id} className={['p-4', cardClassName].join(' ')}>
                <div className="flex gap-3">
                  <span className="text-primary w-5 shrink-0 pt-0.5 text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Icon
                        name={node.icon}
                        size={16}
                        className={
                          node.isError ? 'text-muted-foreground' : 'text-primary'
                        }
                      />
                      <h3 className="text-foreground text-sm font-semibold">{node.label}</h3>
                      {node.highlight && (
                        <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold">
                          핵심
                        </span>
                      )}
                      {node.isError && (
                        <span className="bg-depth-2 text-muted-foreground rounded-full px-2 py-0.5 text-[10px] font-semibold">
                          예외
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {node.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {currentFlow.terms.length > 0 && (
            <div className={['p-5', cardClassName].join(' ')}>
              <h3 className="text-foreground mb-3 text-sm font-bold">용어</h3>
              <dl className="grid gap-3 sm:grid-cols-2">
                {currentFlow.terms.map((term) => (
                  <div key={term.term}>
                    <dt className="text-primary font-mono text-xs font-bold">{term.term}</dt>
                    <dd className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {term.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
