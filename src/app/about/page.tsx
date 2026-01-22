'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CopyTextButton } from '@/components/common/CopyTextButton';
import {
  Github,
  Mail,
  ArrowUpRight,
  Award,
  Code2,
  Users,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CAREER_TIMELINE } from '@/entities/career/model/career';
import { Button } from '@/components/ui/Button';
import { PROFILE } from '@/entities/profile/model/profile';
import {
  ABOUT_INTERESTS,
  ABOUT_LINKS,
  ABOUT_PRINCIPLES,
  ABOUT_STRENGTHS,
} from '@/entities/about/model/about';

const cardClassName = 'bg-depth-1 ring-border/50 rounded-3xl shadow-sm ring-1';

const INITIAL_CAREER_COUNT = 5;

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
    code: Code2,
    zap: Zap,
    users: Users,
    award: Award,
  };

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <section className={['overflow-hidden p-0', cardClassName].join(' ')}>
        <div className="grid lg:grid-cols-[1.5fr_0.5fr]">
          {/* 왼쪽 */}
          <div className="p-8 lg:p-12">
            <h1 className="text-foreground text-3xl font-bold lg:text-4xl">
              사용자 경험과 유지보수를 함께 설계하는
              <br />
              프론트엔드 개발자 김정대입니다
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed lg:text-lg">
              "왜 이렇게 만들었나요?"에 명확하게 답할 수 있는 개발을 지향합니다. 디자인 시스템, 성능
              최적화, 그리고 팀 생산성 향상에 관심이 많습니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <CopyTextButton
                text={PROFILE.email}
                toastMessage="이메일을 복사했어요"
                className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition"
              >
                <Mail className="h-4 w-4" /> 이메일 보내기
              </CopyTextButton>
              <Link
                href={PROFILE.links.github}
                target="_blank"
                className="bg-depth-2 hover:bg-depth-3 text-foreground inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition"
              >
                <Github className="h-4 w-4" /> GitHub
              </Link>
              <Link
                href="/portfolio"
                className="bg-depth-2 hover:bg-depth-3 text-foreground inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition"
              >
                프로젝트 보기 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* 오른쪽 */}
          <div className="bg-primary-100 flex flex-col justify-center space-y-6 p-8 lg:p-12">
            <div>
              <div className="text-muted-foreground text-sm font-medium">
                {PROFILE.career.total.label}
              </div>
              <div className="text-foreground mt-1 text-xl font-bold">
                {PROFILE.career.total.description}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm font-medium">
                {PROFILE.career.frontend.label}
              </div>
              <div className="text-foreground mt-1 text-xl font-bold">
                {PROFILE.career.frontend.value ?? '-'}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
        <h2 className="text-foreground mb-8 text-2xl font-bold">장점</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_STRENGTHS.map((strength) => {
            const Icon = strengthIconMap[strength.icon as keyof typeof strengthIconMap] ?? Code2;

            return (
              <div key={strength.title} className="space-y-3">
                <div className="bg-primary/10 text-primary inline-flex rounded-xl p-3">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-foreground text-lg font-semibold">{strength.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {strength.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={['p-8 lg:p-10', cardClassName].join(' ')}>
          <h2 className="text-foreground mb-6 text-2xl font-bold">기술 스택</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
                <span className="bg-primary h-2 w-2 rounded-full" />
                주력 기술
              </h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'TypeScript', 'Next.js'].map((tech) => (
                  <span
                    key={tech}
                    className="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
                <span className="bg-depth-3 h-2 w-2 rounded-full" />
                능숙 (프로젝트 경험 있음)
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  ,
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
              <h3 className="text-foreground mb-3 flex items-center gap-2 text-sm font-semibold">
                <span className="bg-depth-3 h-2 w-2 rounded-full" />
                계속해서 학습 중
              </h3>
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

        <div className={['p-8 lg:p-10', cardClassName].join(' ')}>
          <h2 className="text-foreground mb-6 text-2xl font-bold">작업 기준</h2>

          <ul className="space-y-4">
            {ABOUT_PRINCIPLES.map((principle) => (
              <li key={principle.title} className="bg-depth-2 rounded-2xl p-5">
                <h3 className="text-foreground font-semibold">{principle.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{principle.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        <div className={['p-8', cardClassName].join(' ')}>
          <h2 className="text-foreground mb-4 text-xl font-bold">관심사</h2>
          <ul className="space-y-2 text-sm">
            {ABOUT_INTERESTS.map((interest) => (
              <li key={interest} className="text-muted-foreground flex gap-2">
                <span className="bg-primary mt-2 h-1 w-1 flex-shrink-0 rounded-full" />
                {interest}
              </li>
            ))}
          </ul>
        </div>

        <div className={['p-8', cardClassName].join(' ')}>
          <h2 className="text-foreground mb-4 text-xl font-bold">더 알아보기</h2>
          <div className="space-y-2">
            {ABOUT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="bg-depth-2 hover:bg-depth-3 text-foreground flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition"
              >
                {link.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
        <h2 className="text-foreground mb-8 text-2xl font-bold">경험</h2>
        <div className="space-y-8">
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
                <div className="text-primary text-sm font-semibold">{group.year}</div>
                <div className="grid gap-4">
                  {entries.map(({ entry, key }) => (
                    <div key={key} className="bg-depth-2 rounded-2xl p-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-1">
                          <div className="text-foreground text-base font-semibold">
                            {entry.client}
                          </div>
                          <div className="text-muted-foreground text-sm">{entry.project}</div>
                          {entry.role && (
                            <div className="text-primary text-xs font-semibold">{entry.role}</div>
                          )}
                        </div>
                        <div className="text-muted-foreground text-xs">{entry.period}</div>
                      </div>

                      {entry.summary && (
                        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                          {entry.summary}
                        </p>
                      )}

                      {entry.highlights && entry.highlights.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {entry.highlights.map((highlight) => (
                            <li key={highlight} className="text-foreground flex gap-3 text-sm">
                              <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {entry.skills && entry.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {entry.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-depth-3 text-foreground rounded-full px-3 py-1 text-xs font-medium"
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
          <div className="mt-6 flex justify-center">
            <Button variant="outline" size="sm" onClick={() => setShowAllCareers((prev) => !prev)}>
              {showAllCareers ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </section>

      <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
        <div className="text-center">
          <h2 className="text-foreground text-2xl font-bold">함께 일하고 싶으신가요?</h2>
          <p className="text-muted-foreground mt-2">기대 이상의 결과물로 보답하겠습니다.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <CopyTextButton
              text={PROFILE.email}
              toastMessage="이메일을 복사했어요"
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
            >
              <Mail className="h-4 w-4" /> 이메일 보내기
            </CopyTextButton>
            <Link
              href="/portfolio"
              className="bg-depth-2 hover:bg-depth-3 text-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
            >
              프로젝트 보기 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
