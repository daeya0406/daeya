'use client';

import Image from 'next/image';
import { Icon } from '@/shared/ui/Icons';
import { Badge } from '@/shared/ui/Badge';
import { ImageMarquee } from '@/features/home/Marquee';
import {
  PUBLISHING_CI_LOGOS,
  PUBLISHING_INTRO,
  PUBLISHING_PROJECTS,
} from '@/content/work/publishing';

const cardClassName = 'bg-depth-1 ring-border/50 rounded-2xl shadow-sm ring-1';

function isPortraitThumb(src?: string) {
  return Boolean(src?.includes('/mobile/'));
}

export default function PublishingWorkPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12">
      <header className="max-w-2xl space-y-4">
        <p className="text-muted-foreground text-sm font-medium">작업 · 퍼블리싱</p>
        <h1 className="text-foreground text-3xl font-bold">{PUBLISHING_INTRO.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{PUBLISHING_INTRO.description}</p>
        <a
          href={PUBLISHING_INTRO.ctaHref}
          target="_blank"
          rel="noreferrer"
          className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition"
        >
          {PUBLISHING_INTRO.ctaLabel}
          <Icon name="externalLink" size={16} />
        </a>
      </header>

      <ImageMarquee images={PUBLISHING_CI_LOGOS} altPrefix="client" />

      <section className="space-y-6">
        <h2 className="text-foreground text-xl font-bold">프로젝트</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PUBLISHING_PROJECTS.map((project) => {
            const portrait = isPortraitThumb(project.image);

            return (
              <a
                key={project.id}
                href={project.detailUrl}
                target="_blank"
                rel="noreferrer"
                className={['group flex h-full flex-col overflow-hidden transition hover:shadow-md', cardClassName].join(
                  ' '
                )}
              >
                <div className="bg-depth-2 relative aspect-[16/10] shrink-0 overflow-hidden">
                  {project.image ? (
                    portrait ? (
                      <div className="absolute inset-x-8 top-3 bottom-0 sm:inset-x-10 sm:top-4">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain object-top drop-shadow-md transition-transform duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 15vw"
                        />
                      </div>
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )
                  ) : (
                    <div className="text-muted-foreground absolute inset-0 flex items-center justify-center">
                      <Icon name="imageOff" size={32} className="opacity-40" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs">
                      {project.client} · {project.period}
                    </p>
                    <h3 className="text-foreground group-hover:text-primary mt-1 text-lg font-bold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="subtle" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
