'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CopyTextButton } from '@/shared/common/CopyTextButton';
import { Icon } from '@/shared/ui/Icons';
import { CAREER_TIMELINE } from '@/entities/career/model/career';
import { Button } from '@/shared/ui/Button';
import { PROFILE } from '@/entities/profile/model/profile';
import {
  ABOUT_INTERESTS,
  ABOUT_LINKS,
  ABOUT_PRINCIPLES,
  ABOUT_STRENGTHS,
} from '@/entities/about/model/about';
import { DevStandardsSection } from './_components';

const cardClassName = 'bg-depth-1 ring-border/50 rounded-3xl shadow-sm ring-1';

const INITIAL_CAREER_COUNT = 3;

export default function AboutPage() {
  const [showAllCareers, setShowAllCareers] = useState(false);

  const careerKeys = useMemo(
    () =>
      CAREER_TIMELINE.flatMap((group) =>
        group.entries.map(
          (entry) => `${group.year}-${entry.client}-${entry.project}-${entry.period}`
        )
      ),
    []
  );

  const visibleCareerKeys = useMemo(() => {
    if (showAllCareers) return new Set(careerKeys);
    return new Set(careerKeys.slice(0, INITIAL_CAREER_COUNT));
  }, [careerKeys, showAllCareers]);

 const strengthIconMap = {
  code: 'code2',
  zap: 'zap',
  users: 'users',
  award: 'award',
} as const;

  return (
    <div className="mx-auto max-w-5xl space-y-16 lg:space-y-24">
      {/* Hero */}
      <section className="relative">
        <div className="bg-primary/5 absolute -top-20 left-0 h-96 w-96 rounded-full blur-3xl" />

        <div className={['relative overflow-hidden p-0', cardClassName].join(' ')}>
          <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
            {/* 왼쪽 */}
            <div className="p-8 lg:p-12">
              <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                  <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
                </span>
                구직 중
              </div>

              <h1 className="text-foreground mb-6 text-3xl font-bold leading-tight lg:text-4xl">
                사용자 경험과 유지보수를
                <br />
                함께 설계하는 프론트엔드 개발자
              </h1>

              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  안녕하세요, 프론트엔드 개발자 <strong className="text-foreground">김정대</strong>
                  입니다.
                </p>
                <p>
                  단순히 프로젝트를 완성하는 것을 넘어서,{' '}
                  <strong className="text-foreground">디자인 시스템</strong>,{' '}
                  <strong className="text-foreground">성능 최적화</strong>, 그리고{' '}
                  <strong className="text-foreground">팀 생산성 향상</strong>에 관심이 많습니다.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <CopyTextButton
                  text={PROFILE.email}
                  toastMessage="이메일을 복사했어요"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-lg transition"
                >
                  <Icon name="mail" /> 이메일 보내기
                </CopyTextButton>
                <Link
                  href={PROFILE.links.github}
                  target="_blank"
                  className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition"
                >
                  <Icon name="github" /> GitHub
                </Link>
                <Link
                  href="/portfolio"
                  className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition"
                >
                  프로젝트 <Icon name="arrowUpRight" />
                </Link>
                <Link
                  href={PROFILE.links.publishingPortfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition"
                >
                  퍼블리싱 <Icon name="externalLink" />
                </Link>
              </div>
            </div>

            {/* 오른쪽 - 그라디언트 배경 */}
            <div className="from-primary/10 to-primary/5 flex flex-col justify-center space-y-8 bg-gradient-to-br p-8 lg:p-12">
              <div>
                <div className="text-muted-foreground mb-2 text-sm font-medium">총 경력</div>
                <div className="text-foreground text-4xl font-bold">
                  {PROFILE.career.total.description}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-2 text-sm font-medium">
                  프론트엔드 경력
                </div>
                <div className="text-foreground text-4xl font-bold">
                  {PROFILE.career.frontend.value ?? '신입'}
                </div>
              </div>
              <div className="border-border/50 border-t pt-6">
                <div className="text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="checkCircle2" className="text-primary" />
                    코드잇 프론트엔드 부트캠프 수료
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Icon name="checkCircle2" className="text-primary" />
                    기획, 디자인 협업 경험 다수
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 기준 */}
      <DevStandardsSection />

      <div className="space-y-6">
        {/* 강점 */}
        <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
          <div className="mb-10 text-center">
            <div className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
              What I Bring
            </div>
            <h2 className="text-foreground mb-4 text-3xl font-bold">제가 잘하는 것</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              팀에 실질적인 가치를 더할 수 있는 역량들입니다
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_STRENGTHS.map((strength, idx) => {
              const iconName = strengthIconMap[strength.icon as keyof typeof strengthIconMap] ?? 'code2';

              return (
                <div
                  key={strength.title}
                  className="border-border/50 to-depth-2 hover:border-primary/50 hover:shadow-primary/5 group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-white p-6 transition-all hover:shadow-lg"
                >
                  <div className="bg-primary/5 group-hover:bg-primary/10 absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full blur-2xl transition-all" />

                  <div className="relative space-y-3">
                    <div className="bg-primary/10 text-primary inline-flex rounded-xl p-3 transition-transform group-hover:scale-110">
                      <Icon name={iconName} className="h-6 w-6" />
                    </div>
                    <h3 className="text-foreground text-lg font-bold">{strength.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {strength.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 기술 스택 & 원칙 */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* 기술 스택 */}
          <div className={['p-8 lg:p-10', cardClassName].join(' ')}>
            <h2 className="text-foreground mb-8 text-2xl font-bold">기술 스택</h2>

            <div className="space-y-8">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                  <h3 className="text-foreground text-sm font-bold">주력 기술</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'TypeScript', 'Next.js'].map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary/10 text-primary ring-primary/20 rounded-full px-4 py-2 text-sm font-semibold ring-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="bg-depth-3 h-1.5 w-1.5 rounded-full" />
                  <h3 className="text-foreground text-sm font-bold">능숙</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Web Accessibility',
                    'Tailwind CSS',
                    'Design Systems',
                    'Zustand',
                    'Storybook',
                    'Framer Motion',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="bg-depth-2 text-foreground rounded-full px-4 py-2 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="bg-depth-3 h-1.5 w-1.5 rounded-full" />
                  <h3 className="text-foreground text-sm font-bold">학습 중</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React Query', 'Supabase', 'Zod', 'Radix', 'Core JS'].map((tech) => (
                    <span
                      key={tech}
                      className="bg-depth-2 text-muted-foreground rounded-full px-4 py-2 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 작업 원칙 */}
          <div className={['p-8 lg:p-10', cardClassName].join(' ')}>
            <h2 className="text-foreground mb-8 text-2xl font-bold">작업 원칙</h2>

            <div className="space-y-4">
              {ABOUT_PRINCIPLES.map((principle, idx) => (
                <div
                  key={principle.title}
                  className="bg-depth-2 hover:bg-depth-3 group rounded-2xl p-6 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-foreground mb-2 font-bold">{principle.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 관심사 & 링크 */}
        <section className="grid gap-6 sm:grid-cols-2">
          <div className={['p-8', cardClassName].join(' ')}>
            <h2 className="text-foreground mb-6 text-xl font-bold">관심 영역</h2>
            <ul className="space-y-3">
              {ABOUT_INTERESTS.map((interest) => (
                <li key={interest} className="flex gap-3">
                  <Icon name="checkCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0"/>
                  <span className="text-muted-foreground text-sm">{interest}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={['p-8', cardClassName].join(' ')}>
            <h2 className="text-foreground mb-6 text-xl font-bold">더 알아보기</h2>
            <div className="space-y-3">
              {ABOUT_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-depth-2 hover:bg-depth-3 text-foreground group flex items-center justify-between rounded-xl px-5 py-4 text-sm font-semibold transition"
                >
                  <span>{link.label}</span>
                  <Icon name="arrowUpRight" className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 경험 */}
      <section className="space-y-8">
        <div className="text-center">
          <div className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            Experience
          </div>
          <h2 className="text-foreground mb-4 text-3xl font-bold">경험</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            실제 문제를 해결하고 성과를 만들어낸 프로젝트들
          </p>
        </div>

        <div className="space-y-6">
          {CAREER_TIMELINE.map((group) => {
            const entries = group.entries
              .map((entry) => ({
                entry,
                key: `${group.year}-${entry.client}-${entry.project}-${entry.period}`,
              }))
              .filter(({ key }) => visibleCareerKeys.has(key));

            if (entries.length === 0) return null;

            return (
              <div key={group.year} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary rounded-xl px-4 py-2 text-sm font-bold">
                    {group.year}
                  </div>
                  <div className="bg-border h-px flex-1" />
                </div>

                <div className="grid gap-4">
                  {entries.map(({ entry, key }) => (
                    <div
                      key={key}
                      className={['group overflow-hidden p-6 lg:p-8', cardClassName].join(' ')}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 text-primary mt-1 rounded-lg p-2">
                              <Icon name="code2" />
                            </div>
                            <div>
                              <h3 className="text-foreground text-xl font-bold">{entry.client}</h3>
                              <div className="text-muted-foreground mt-1">{entry.project}</div>
                              {entry.role && (
                                <div className="text-primary bg-primary/10 mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold">
                                  {entry.role}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-muted-foreground flex-shrink-0 text-sm">
                          {entry.period}
                        </div>
                      </div>

                      {entry.summary && (
                        <p className="text-muted-foreground mt-4 leading-relaxed">
                          {entry.summary}
                        </p>
                      )}

                      {entry.highlights && entry.highlights.length > 0 && (
                        <div className="bg-depth-2 mt-6 space-y-3 rounded-2xl p-5">
                          <div className="text-foreground mb-3 text-sm font-semibold">
                            주요 성과
                          </div>
                          {entry.highlights.map((highlight) => (
                            <div key={highlight} className="flex gap-3">
                              <Icon name="checkCircle2" size={20} className="text-primary mt-0.5 flex-shrink-0"/>
                              <span className="text-foreground text-sm leading-relaxed">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {entry.skills && entry.skills.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {entry.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-depth-2 text-muted-foreground ring-border/50 rounded-full px-3 py-1 text-xs font-medium ring-1"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {careerKeys.length > INITIAL_CAREER_COUNT && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              size="full"
              onClick={() => setShowAllCareers((prev) => !prev)}
              className="group"
            >
              {showAllCareers ? (
                <>
                  접기{' '}
                  <Icon name="chevronUp" className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                </>
              ) : (
                <>
                  경력사항 {careerKeys.length - INITIAL_CAREER_COUNT}개 더 보기{' '}
                  <Icon name="chevronDown" className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </>
              )}
            </Button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className={['overflow-hidden p-0', cardClassName].join(' ')}>
        <div className="from-primary/5 via-primary/10 to-primary/5 bg-gradient-to-br p-10 text-center lg:p-16">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-foreground mb-4 text-3xl font-bold">함께 할 수 있을까요?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              책임감을 갖고 나아갈 수 있도록 함께하겠습니다.
              <br />
              기대 이상의 결과물로 보답하겠습니다.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <CopyTextButton
                text={PROFILE.email}
                toastMessage="이메일을 복사했어요"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold shadow-lg transition"
              >
                <Icon name="mail" size={20} /> 이메일 보내기
              </CopyTextButton>
              <Link
                href="/portfolio"
                className="text-foreground border-border group inline-flex items-center gap-2 rounded-xl border-2 bg-white/50 px-8 py-4 text-base font-semibold backdrop-blur-sm transition hover:bg-white/80"
              >
                프로젝트 보기{' '}
                <Icon name="arrowUpRight" size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link
                href={PROFILE.links.github}
                target="_blank"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition"
              >
                <Icon name="github" /> GitHub
                <Icon name="externalLink" size={12} />
              </Link>
              <Link
                href={PROFILE.links.resume}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition"
              >
                <Icon name="award" /> 이력서 다운로드
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
