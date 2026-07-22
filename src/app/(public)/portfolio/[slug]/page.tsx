import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/shared/ui/Icons';
import { Badge } from '@/shared/ui/Badge';
import { PROJECTS } from '@/entities/project/model/projects';

const cardClassName = 'rounded-2xl bg-depth-1 shadow-sm ring-1 ring-border';

const CASE_STUDY_ALIASES: Record<string, string> = {
  'global-nomad': 'activity-bite',
};

const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const getProjectBySlug = (slug?: string | string[]) => {
  if (!slug) return undefined;
  const slugValue = Array.isArray(slug) ? slug[0] : slug;
  const decoded = decodeURIComponent(slugValue);
  const resolved = CASE_STUDY_ALIASES[decoded] ?? decoded;
  const normalized = normalizeSlug(resolved);
  return (
    PROJECTS.find((project) => project.id === resolved) ??
    PROJECTS.find((project) => project.id === normalized) ??
    PROJECTS.find((project) => project.links.caseStudy?.endsWith(`/${resolved}`)) ??
    PROJECTS.find((project) => project.links.caseStudy?.endsWith(`/${normalized}`)) ??
    PROJECTS.find((project) => normalizeSlug(project.title) === normalized)
  );
};

export function generateStaticParams() {
  const base = PROJECTS.map((project) => ({ slug: project.id }));
  return [...base, { slug: 'global-nomad' }];
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm">
          <span className="bg-primary mt-2 h-1 w-1 shrink-0 rounded-full" />
          <span className="text-muted-foreground leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function PortfolioCaseStudyPage({
  params,
}: {
  params: Promise<{ slug?: string | string[] }>;
}) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  if (!project) {
    notFound();
  }

  const caseStudy = project.caseStudy ?? {};
  const outcomes =
    caseStudy.outcomes ??
    project.metrics.map((metric) => ({ label: metric.label, value: metric.value }));

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <Link
        href="/portfolio"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm font-semibold transition"
      >
        <Icon name="arrowLeft" size={16} /> Portfolio
      </Link>

      <header className={['overflow-hidden', cardClassName].join(' ')}>
        <div className="bg-depth-2 relative aspect-[2/1] w-full overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="text-muted-foreground absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Icon name="imageOff" size={40} className="opacity-50" />
              <span className="text-sm">이미지 없음</span>
            </div>
          )}
        </div>

        <div className="space-y-5 p-6 lg:p-8">
          <div>
            <div className="text-muted-foreground mb-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {project.role && <span>{project.role}</span>}
              {project.period && <span>{project.period}</span>}
            </div>
            <h1 className="text-foreground text-3xl font-bold">{project.title}</h1>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              {caseStudy.overview || project.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="subtle" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition"
              >
                <Icon name="github" size={16} /> GitHub
              </Link>
            )}
            {project.links.live && (
              <Link
                href={project.links.live}
                target="_blank"
                rel="noreferrer"
                className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition"
              >
                <Icon name="externalLink" size={16} /> Live
              </Link>
            )}
          </div>
        </div>
      </header>

      {outcomes.length > 0 && (
        <section className={['p-6 lg:p-8', cardClassName].join(' ')}>
          <h2 className="text-foreground mb-4 text-lg font-bold">결과 · 역할</h2>
          <dl className="grid gap-3 sm:grid-cols-2">
            {outcomes.map((item) => (
              <div key={`${item.label}-${item.value}`} className="bg-depth-2 rounded-xl p-4">
                <dt className="text-muted-foreground text-xs">{item.label}</dt>
                <dd className="text-foreground mt-1 text-sm font-semibold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {(caseStudy.responsibilities?.length || caseStudy.features?.length) && (
        <section className={['p-6 lg:p-8', cardClassName].join(' ')}>
          <h2 className="text-foreground mb-5 text-lg font-bold">주요 작업</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {caseStudy.responsibilities && caseStudy.responsibilities.length > 0 && (
              <div>
                <h3 className="text-foreground mb-3 text-sm font-semibold">담당한 역할</h3>
                <BulletList items={caseStudy.responsibilities} />
              </div>
            )}
            {caseStudy.features && caseStudy.features.length > 0 && (
              <div>
                <h3 className="text-foreground mb-3 text-sm font-semibold">구현한 기능</h3>
                <BulletList items={caseStudy.features} />
              </div>
            )}
          </div>
        </section>
      )}

      {caseStudy.challenges && caseStudy.challenges.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-foreground text-lg font-bold">문제와 해결</h2>
          <div className="space-y-4">
            {caseStudy.challenges.map((challenge, idx) => (
              <div key={challenge.title} className={['p-5 lg:p-6', cardClassName].join(' ')}>
                <div className="flex gap-3">
                  <span className="text-primary w-5 shrink-0 text-sm font-bold">{idx + 1}</span>
                  <div className="min-w-0 flex-1 space-y-3">
                    <h3 className="text-foreground font-semibold">{challenge.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {challenge.detail}
                    </p>
                    {challenge.code && (
                      <pre className="bg-depth-2 text-foreground overflow-x-auto rounded-xl p-4 text-xs leading-relaxed">
                        <code>{challenge.code}</code>
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {caseStudy.architecture && caseStudy.architecture.length > 0 && (
        <section className={['p-6 lg:p-8', cardClassName].join(' ')}>
          <h2 className="text-foreground mb-4 text-lg font-bold">아키텍처 · 기술 선택</h2>
          <BulletList items={caseStudy.architecture} />
        </section>
      )}

      {caseStudy.learnings && caseStudy.learnings.length > 0 && (
        <section className={['p-6 lg:p-8', cardClassName].join(' ')}>
          <h2 className="text-foreground mb-4 text-lg font-bold">배운 점</h2>
          <BulletList items={caseStudy.learnings} />
        </section>
      )}

      <div className="flex justify-center pb-4">
        <Link
          href="/portfolio"
          className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-semibold"
        >
          전체 프로젝트 <Icon name="arrowUpRight" size={16} />
        </Link>
      </div>
    </div>
  );
}
