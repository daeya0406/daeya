'use client';

import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { Marquee } from '@/features/home/Marquee';
import { Eyebrow } from '@/features/home/Eyebrow';
import { SectionReveal } from '@/features/home/SectionReveal';
import { ProjectCard } from '@/features/work/ProjectCard';
import { FRONTEND_INTRO, FRONTEND_PROJECTS, FRONTEND_STACK } from '@/content/work/frontend';
import { PROFILE } from '@/content/profile';

const cardClassName = 'rounded-2xl bg-depth-1 shadow-sm ring-1 ring-border';

export default function FrontendWorkPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-14">
      <SectionReveal>
        <header className="max-w-2xl space-y-4">
          <Eyebrow>작업 · 프론트엔드</Eyebrow>
          <h1 className="text-foreground text-balance text-3xl font-bold tracking-tight lg:text-4xl">
            {FRONTEND_INTRO.title}
          </h1>
          <p className="text-muted-foreground max-w-[65ch] leading-relaxed">{FRONTEND_INTRO.description}</p>
        </header>
      </SectionReveal>

      <Marquee items={FRONTEND_STACK} />

      <div className="grid gap-6 lg:grid-cols-3">
        {FRONTEND_PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <section className={['px-6 py-8 lg:px-8', cardClassName].join(' ')}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-foreground text-lg font-bold">퍼블리싱 · 소개</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              SI·퍼블리싱 작업물은 퍼블리싱에서, 경력은 경력 페이지에서 볼 수 있습니다
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/work/publishing"
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition"
            >
              퍼블리싱 <Icon name="arrowUpRight" size={16} />
            </Link>
            <Link
              href={PROFILE.links.resume}
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold transition"
            >
              <Icon name="fileText" size={16} /> 이력서
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
