import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ImageOff } from 'lucide-react';
import { Badge } from '@/shared/ui/Badge';
import { FEATURED_PROJECTS } from '@/entities/project/model/projects';
import { cardClassName } from './constants';

type ProjectCardProps = {
  project: (typeof FEATURED_PROJECTS)[0];
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={project.links.caseStudy ?? '/portfolio'} className="group block transition-all duration-300">
      <div className={['overflow-hidden', cardClassName].join(' ')}>
        <div className="bg-depth-2 relative aspect-[16/10] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="text-muted-foreground absolute inset-0 flex flex-col items-center justify-center gap-3">
              <ImageOff className="h-12 w-12 opacity-50" />
              <span className="text-sm">프로젝트 스크린샷</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute left-4 top-4">
            <Badge variant="outline" size="md" className="bg-white/90 backdrop-blur-sm">
              Project {index + 1}
            </Badge>
          </div>
        </div>

        <div className="space-y-4 p-6 lg:p-8">
          <div>
            <h3 className="text-foreground group-hover:text-primary mb-3 text-2xl font-bold transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="subtle" size="sm">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="subtle" size="sm">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>

          <div className="text-primary flex items-center gap-2 text-sm font-semibold">
            자세히 보기
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
