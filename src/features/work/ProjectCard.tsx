import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { Badge } from '@/shared/ui/Badge';
import type { FrontendProject } from '@/content/schema';

const cardClassName = 'rounded-2xl bg-depth-1 shadow-sm ring-1 ring-border';

type ProjectCardProps = {
  project: FrontendProject;
  variant?: 'grid' | 'featured';
};

export function ProjectCard({ project, variant = 'grid' }: ProjectCardProps) {
  const href = project.links.caseStudy ?? '/work/frontend';

  if (variant === 'featured') {
    return (
      <Link href={href} className="group block h-full transition-colors">
        <div className={['flex h-full flex-col overflow-hidden', cardClassName].join(' ')}>
          <div className="bg-depth-2 relative aspect-[16/10] overflow-hidden">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 85vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="text-muted-foreground absolute inset-0 flex flex-col items-center justify-center gap-3">
                <Icon name="imageOff" size={40} className="opacity-50" />
                <span className="text-sm">프로젝트 스크린샷</span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col space-y-3 p-5 lg:p-6">
            <div className="flex-1">
              <h3 className="text-foreground group-hover:text-primary mb-2 text-lg font-bold transition-colors lg:text-xl">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="subtle" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="text-primary flex items-center gap-1.5 text-sm font-semibold">
              자세히 보기
              <Icon
                name="arrowUpRight"
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </div>
      </Link>
    );
  }

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
