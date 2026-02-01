'use client';

import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { FadeUp } from '@/shared/motion/FadeUp';
import { FEATURED_PROJECTS } from '@/entities/project/model/projects';
import { ProjectCard } from './ProjectCard';

export function HomeProjects() {
  return (
    <section className="space-y-8">
      <FadeUp delay={0.15}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
            Featured Work
          </div>
          <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">주요 프로젝트</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            실제 문제를 해결하고 성과를 만들어낸 프로젝트들입니다
          </p>
        </div>
      </FadeUp>

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2">
          {FEATURED_PROJECTS[0] && (
            <FadeUp delay={0.2} className="lg:col-span-2">
              <ProjectCard project={FEATURED_PROJECTS[0]} index={0} />
            </FadeUp>
          )}

          {FEATURED_PROJECTS.slice(1, 3).map((project, idx) => (
            <FadeUp key={project.id} delay={0.25 + idx * 0.05}>
              <ProjectCard project={project} index={idx + 1} />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <div className="mt-10 text-center">
            <Link
              href="/portfolio"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-base font-semibold transition"
            >
              전체 프로젝트 보기 ({FEATURED_PROJECTS.length}개)
              <Icon name="arrowUpRight" size={20} />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
