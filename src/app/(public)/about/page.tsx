'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { CopyTextButton } from '@/shared/common/CopyTextButton';
import { Icon } from '@/shared/ui/Icons';
import { CAREER_TIMELINE } from '@/entities/career/model/career';
import { Button } from '@/shared/ui/Button';
import { PROFILE } from '@/entities/profile/model/profile';
import {
  ABOUT_ADJACENT,
  ABOUT_LINKS,
  ABOUT_PRINCIPLES,
  ABOUT_STACK,
} from '@/entities/about/model/about';

const cardClassName = 'bg-depth-1 ring-border/50 rounded-2xl shadow-sm ring-1';
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

  return (
    <div className="mx-auto max-w-3xl space-y-14 lg:space-y-16">
      {/* 1. 누구인지 */}
      <header className="space-y-5">
        <div>
          <p className="text-muted-foreground mb-2 text-sm font-medium">{PROFILE.role}</p>
          <h1 className="text-foreground text-3xl font-bold tracking-tight lg:text-4xl">
            {PROFILE.name}
            <span className="text-muted-foreground font-medium"></span>
          </h1>
          <p className="text-foreground mt-4 text-lg font-medium leading-snug">
            퍼블리싱 경험으로 UI를 잡고, 프론트엔드로 이어가고 있습니다
          </p>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            5년+ 퍼블리싱으로 마크업·접근성·반응형을 빠르게 세팅하고, React·Next.js로 컴포넌트와
            상태까지 책임집니다.
          </p>
        </div>

        <dl className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <div className="flex gap-2">
            <dt>퍼블</dt>
            <dd className="text-foreground font-semibold">5년 이상</dd>
          </div>
          <div className="flex gap-2">
            <dt>FE</dt>
            <dd className="text-foreground font-semibold">1년 이상</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/portfolio"
            className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition"
          >
            FE 프로젝트 <Icon name="arrowUpRight" size={14} />
          </Link>
          <Link
            href={PROFILE.links.publishingPortfolio}
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
          >
            퍼블리싱 포트폴리오 <Icon name="externalLink" size={14} />
          </Link>
          <CopyTextButton
            text={PROFILE.email}
            toastMessage="이메일을 복사했어요"
            className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
          >
            <Icon name="mail" size={14} /> 이메일
          </CopyTextButton>
        </div>
      </header>

      {/* 2. 경력 (증거) */}
      <section className="space-y-5">
        <div>
          <h2 className="text-foreground text-xl font-bold">경력</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            실제로 맡았던 작업입니다.{' '}
            <Link
              href={PROFILE.links.publishingPortfolio}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              SI·퍼블리싱 작업물 전체 보기
            </Link>
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
              <div key={group.year} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-foreground text-sm font-bold">{group.year}</span>
                  <div className="bg-border h-px flex-1" />
                </div>

                <div className="space-y-3">
                  {entries.map(({ entry, key }) => (
                    <div key={key} className={['p-4 sm:p-5', cardClassName].join(' ')}>
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-foreground font-bold">{entry.client}</h3>
                          <p className="text-muted-foreground mt-0.5 text-sm">{entry.project}</p>
                          {entry.role && (
                            <span className="text-primary bg-primary/10 mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold">
                              {entry.role}
                            </span>
                          )}
                        </div>
                        <div className="text-muted-foreground shrink-0 text-sm">{entry.period}</div>
                      </div>

                      {entry.summary && (
                        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                          {entry.summary}
                        </p>
                      )}

                      {entry.highlights && entry.highlights.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {entry.highlights.map((highlight) => (
                            <li key={highlight} className="flex gap-2 text-sm">
                              <span className="bg-primary mt-2 h-1 w-1 shrink-0 rounded-full" />
                              <span className="text-foreground/90 leading-relaxed">
                                {highlight}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {entry.skills && entry.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {entry.skills.map((skill) => (
                            <span
                              key={skill}
                              className="bg-depth-2 text-muted-foreground rounded-full px-2.5 py-1 text-xs"
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
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setShowAllCareers((prev) => !prev)}>
              {showAllCareers ? (
                <>
                  접기 <Icon name="chevronUp" className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  경력 {careerKeys.length - INITIAL_CAREER_COUNT}개 더 보기
                  <Icon name="chevronDown" className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </section>

      {/* 3. 스택 + 원칙 (도구) */}
      <section className={['space-y-8 p-5 sm:p-6', cardClassName].join(' ')}>
        <div>
          <h2 className="text-foreground mb-4 text-xl font-bold">기술 스택</h2>
          <div className="space-y-4">
            {(
              [
                ['주력', ABOUT_STACK.primary, true],
                ['능숙', ABOUT_STACK.comfortable, false],
                ['학습 중', ABOUT_STACK.learning, false],
              ] as const
            ).map(([label, items, primary]) => (
              <div key={label}>
                <h3 className="text-muted-foreground mb-2 text-xs font-medium">{label}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className={
                        primary
                          ? 'bg-primary/10 text-primary ring-primary/20 rounded-full px-3 py-1 text-sm font-semibold ring-1'
                          : 'bg-depth-2 text-foreground rounded-full px-3 py-1 text-sm'
                      }
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border border-t pt-6">
          <h2 className="text-foreground mb-3 text-base font-bold">작업할 때</h2>
          <ol className="space-y-2.5">
            {ABOUT_PRINCIPLES.map((principle, idx) => (
              <li key={principle.title} className="flex gap-2.5 text-sm">
                <span className="text-primary w-4 shrink-0 font-bold">{idx + 1}</span>
                <span>
                  <span className="text-foreground font-semibold">{principle.title}</span>
                  <span className="text-muted-foreground"> — {principle.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. 확장 가능성 */}
      <section className="space-y-4">
        <div>
          <h2 className="text-foreground text-xl font-bold">확장 가능성</h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            기획·백엔드에 대해 알게된 부분을 확장 가능성으로 정리했습니다.
          </p>
        </div>

        <div className="space-y-3">
          {ABOUT_ADJACENT.map((item) => (
            <article key={item.title} className={['p-4 sm:p-5', cardClassName].join(' ')}>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-primary text-xs font-semibold">{item.tag}</span>
                <h3 className="text-foreground text-sm font-bold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition"
                  >
                    {link.label}
                    <Icon name="externalLink" size={12} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. 연락 */}
      <section className={['p-5 sm:p-6', cardClassName].join(' ')}>
        <h2 className="text-foreground text-lg font-bold">연락</h2>
        <p className="text-muted-foreground mb-4 mt-1 text-sm">협업·포지션 문의는 메일로 주세요</p>
        <div className="flex flex-wrap gap-2">
          <CopyTextButton
            text={PROFILE.email}
            toastMessage="이메일을 복사했어요"
            className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition"
          >
            <Icon name="mail" size={14} /> {PROFILE.email}
          </CopyTextButton>
          <Link
            href={PROFILE.links.resume}
            className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
          >
            <Icon name="fileText" size={14} /> 이력서
          </Link>
          {ABOUT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
            >
              {link.label}
              <Icon name="arrowUpRight" size={14} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
