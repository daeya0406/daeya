'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { FEATURED_PROJECTS } from '@/entities/project/model/projects';
import { ProjectCard } from './ProjectCard';

const projects = FEATURED_PROJECTS.slice(0, 3);

export function HomeProjects() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const syncActiveIndex = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || el.children.length === 0) return;

    const first = el.children[0] as HTMLElement;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 0;
    const step = first.offsetWidth + gap;
    if (step <= 0) return;

    setActiveIndex(Math.round(el.scrollLeft / step));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncActiveIndex();
    el.addEventListener('scroll', syncActiveIndex, { passive: true });
    window.addEventListener('resize', syncActiveIndex);

    return () => {
      el.removeEventListener('scroll', syncActiveIndex);
      window.removeEventListener('resize', syncActiveIndex);
    };
  }, [syncActiveIndex]);

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    const target = el?.children[index] as HTMLElement | undefined;
    target?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <section className="space-y-8">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-foreground mb-3 text-2xl font-bold lg:text-3xl">주요 프로젝트</h2>
        <p className="text-muted-foreground text-base lg:text-lg">
          최근에 만든 프론트엔드 작업입니다
        </p>
      </div>

      <div className="mx-auto max-w-6xl">
        <div
          ref={scrollerRef}
          className={[
            'flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            'md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-4 md:pb-0',
          ].join(' ')}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="w-[85%] shrink-0 snap-center md:w-auto md:shrink md:snap-none"
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              aria-label={`${index + 1}번째 프로젝트`}
              aria-current={activeIndex === index}
              onClick={() => scrollToIndex(index)}
              className={[
                'h-2 rounded-full transition-all',
                activeIndex === index ? 'bg-primary w-6' : 'bg-border w-2 hover:bg-muted-foreground/40',
              ].join(' ')}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm font-semibold transition"
          >
            전체 프로젝트 보기
            <Icon name="arrowUpRight" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
