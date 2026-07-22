'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { Badge } from '@/shared/ui/Badge';
import { PROJECTS } from '@/entities/project/model/projects';
import { PORTFOLIO_INTRO } from '@/entities/portfolio/model/portfolio';
import { PROFILE } from '@/entities/profile/model/profile';

const cardClassName = 'rounded-2xl bg-depth-1 shadow-sm ring-1 ring-border';

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <article className={['flex h-full flex-col overflow-hidden', cardClassName].join(' ')}>
      <div className="bg-depth-2 relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm">
            <Icon name="imageOff" size={32} className="opacity-70" />
            <span>이미지 없음</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 lg:p-6">
        <div>
          <div className="text-muted-foreground mb-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
            {project.role && <span>{project.role}</span>}
            {project.period && <span>{project.period}</span>}
          </div>
          <h3 className="text-foreground text-xl font-bold">{project.title}</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{project.summary}</p>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <ul className="space-y-1.5">
            {project.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="text-muted-foreground flex gap-2 text-sm">
                <span className="bg-primary mt-2 h-1 w-1 shrink-0 rounded-full" />
                <span className="text-foreground/90 leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="subtle" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {project.links.caseStudy && (
            <Link
              href={project.links.caseStudy}
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition"
            >
              상세 보기 <Icon name="arrowUpRight" size={14} />
            </Link>
          )}
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold transition"
            >
              <Icon name="github" size={14} /> GitHub
            </Link>
          )}
          {project.links.live && (
            <Link
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold transition"
            >
              <Icon name="externalLink" size={14} /> Live
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <header className="max-w-2xl">
        <h1 className="text-foreground text-3xl font-bold">{PORTFOLIO_INTRO.title}</h1>
        <p className="text-muted-foreground mt-3 leading-relaxed">{PORTFOLIO_INTRO.description}</p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>

      <section className={['px-6 py-8 lg:px-8', cardClassName].join(' ')}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-foreground text-lg font-bold">퍼블리싱 · 소개</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              SI·퍼블리싱 작업물은 별도 포트폴리오에서, 경력·연락은 About에서 볼 수 있습니다
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={PROFILE.links.publishingPortfolio}
              target="_blank"
              rel="noreferrer"
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition"
            >
              퍼블리싱 포트폴리오 <Icon name="externalLink" size={16} />
            </Link>
            <Link
              href={PROFILE.links.resume}
              className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
            >
              <Icon name="fileText" size={16} /> 이력서
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
            >
              About <Icon name="arrowUpRight" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
