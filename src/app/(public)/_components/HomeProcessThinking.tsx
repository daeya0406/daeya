'use client';

import { Lightbulb, Palette, Code2, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const PROCESS_STEPS = [
  {
    phase: '기획',
    icon: Lightbulb,
    color: 'bg-yellow-500',
    textColor: 'text-yellow-600',
    bgLight: 'bg-yellow-50',
    questions: ['목적이 명확한지?', '누가 사용하는지?', '어떤 기능이 필요한지?'],
    thinking: '요구사항을 구조화하고 우선순위를 정립합니다',
  },
  {
    phase: '디자인',
    icon: Palette,
    color: 'bg-pink-500',
    textColor: 'text-pink-600',
    bgLight: 'bg-pink-50',
    questions: ['불편함은 없는지?', '헷갈리는 요소?', '이질적인 것은?'],
    thinking: 'UX 관점에서 구현 가능성을 검토합니다',
  },
  {
    phase: '퍼블리싱',
    icon: Code2,
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    bgLight: 'bg-blue-50',
    questions: ['디자인 의도대로?', '반응형이 자연스러운지?', '웹표준・접근성은?'],
    thinking: '시맨틱하고 유지보수 가능한 구조를 만듭니다',
  },
  {
    phase: '프론트엔드',
    icon: Zap,
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    bgLight: 'bg-purple-50',
    questions: ['불필요한 렌더링은 없는지?', '상태 관리가 적절한지?', '확장 가능한 구조인지?'],
    thinking: '성능과 개발 경험을 동시에 고려합니다',
  },
];

export function HomeProcessThinking() {
  return (
    <section>
      <div className="section-card space-y-12">
        {/* 헤더 */}
        <div className="text-center">
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
            <CheckCircle2 className="h-4 w-4" />
            전체 프로세스를 생각합니다
          </div>
          <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-3xl">
            UI 구조와 사용자 흐름에 대한 이해를 바탕으로,
            <br />
            <span className="text-primary">의사결정 비용을 줄이는</span> 프론트엔드 개발자입니다.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm sm:text-base">
            디자인·기획·퍼블리싱 경험을 기반으로 UI 요구사항을 구조화하고,
            <br className="hidden sm:block" />
            구현 가능성과 유지보수를 고려한 기술 선택을 합니다
          </p>
        </div>

        <div className="relative">
          {/* 연결선(PC) */}
          <div className="border-border top-27 absolute left-0 right-0 hidden border-t-2 border-dashed lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div key={step.phase} className="group relative">
                  {/* 순서 표시 */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`${step.color} relative z-10 rounded-xl p-3 text-white shadow-lg transition-transform`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs font-medium">
                        STEP {idx + 1}
                      </div>
                      <h3 className="text-foreground text-lg font-bold">{step.phase}</h3>
                    </div>
                  </div>

                  {/* 질문 리스트 */}
                  <div className={`${step.bgLight} space-y-2 rounded-xl p-4`}>
                    {step.questions.map((q) => (
                      <div key={q} className="flex gap-1">
                        <span className={`${step.textColor} text-xs`}>•</span>
                        <p className="text-foreground text-xs font-medium leading-relaxed">{q}</p>
                      </div>
                    ))}
                  </div>

                  {/* 사고방식 */}
                  <div className="mt-3 rounded-lg bg-white/50 p-3 backdrop-blur-sm dark:bg-slate-800/50">
                    <p className="text-muted-foreground text-xs leading-relaxed">{step.thinking}</p>
                  </div>

                  {/* 화살표 (모바일) */}
                  {idx < PROCESS_STEPS.length - 1 && (
                    <ArrowRight className="text-muted-foreground mx-auto my-4 h-6 w-6 rotate-90 lg:hidden" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 요약 */}
        <div className="border-border bg-depth-2 space-y-4 rounded-2xl border p-6">
          <h3 className="text-foreground flex items-center gap-2 text-base font-bold">
            <Zap className="text-primary h-5 w-5" />
            이런 경험이 어떻게 도움이 될까요?
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-1">
              <div className="text-foreground text-sm font-semibold">✓ 소통 비용 절감</div>
              <p className="text-muted-foreground text-xs">
                디자이너·기획자와 같은 언어로 대화하며 요구사항을 정확히 이해합니다.
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-foreground text-sm font-semibold">✓ 구조화된 의사결정</div>
              <p className="text-muted-foreground text-xs">
                기술 선택 시 UX와 DX, 유지보수성을 균형있게 고려합니다.
              </p>
            </div>
            <div className="space-y-1">
              <div className="text-foreground text-sm font-semibold">✓ 검증된 결과물</div>
              <p className="text-muted-foreground text-xs">
                AI 도구도 활용하되, 전 과정의 맥락을 이해하고 결과를 검증합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
