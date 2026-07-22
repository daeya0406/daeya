import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { Badge } from '@/shared/ui/Badge';
import { FEATURED_PROJECTS } from '@/entities/project/model/projects';
import { cardClassName } from './constants';

type ProjectCardProps = {
  project: (typeof FEATURED_PROJECTS)[0];
  index?: number;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={project.links.caseStudy ?? '/portfolio'}
      className="group block h-full transition-colors"
    >
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
            {project.tags.length > 3 && (
              <Badge variant="subtle" size="sm">
                +{project.tags.length - 3}
              </Badge>
            )}
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
