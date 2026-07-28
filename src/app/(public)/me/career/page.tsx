'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Icon } from '@/shared/ui/Icons';
import { Button } from '@/shared/ui/Button';
import { PROFILE } from '@/content/profile';
import { getCareerTimeline } from '@/content/registry';

const CareerChart = dynamic(
  () => import('@/features/home/CareerChart').then((m) => m.CareerChart),
  { ssr: false, loading: () => <div className="bg-depth-2 h-60 animate-pulse rounded-2xl" /> }
);

const cardClassName = 'bg-depth-1 ring-border/50 rounded-2xl shadow-sm ring-1';
const INITIAL_CAREER_COUNT = 6;

export default function CareerPage() {
  const [showAllCareers, setShowAllCareers] = useState(false);
  const timeline = getCareerTimeline();

  const careerKeys = useMemo(
    () =>
      timeline.flatMap((group) =>
        group.entries.map(
          (entry) => `${group.year}-${entry.client}-${entry.project}-${entry.period}`
        )
      ),
    [timeline]
  );

  const visibleCareerKeys = useMemo(() => {
    if (showAllCareers) return new Set(careerKeys);
    return new Set(careerKeys.slice(0, INITIAL_CAREER_COUNT));
  }, [careerKeys, showAllCareers]);

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header className="space-y-3">
        <p className="text-muted-foreground text-sm font-medium">소개 · 경력</p>
        <h1 className="text-foreground text-3xl font-bold tracking-tight lg:text-4xl">경력</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
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
      </header>

      <section className={['p-5 sm:p-6', cardClassName].join(' ')}>
        <h2 className="text-foreground mb-4 text-lg font-bold">연도별 프로젝트</h2>
        <CareerChart />
      </section>

      <div className="space-y-6">
        {timeline.map((group) => {
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
    </div>
  );
}
