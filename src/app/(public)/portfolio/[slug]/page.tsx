import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  ImageOff,
  Calendar,
  Users,
  Code2,
} from 'lucide-react';
import { FadeUp } from '@/shared/motion/FadeUp';
import { Badge } from '@/shared/ui/Badge';
import { PROJECTS } from '@/entities/project/model/projects';

const cardClassName = 'rounded-3xl bg-depth-1 shadow-sm ring-1 ring-border';
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
    <div className="mx-auto max-w-5xl space-y-16">
      <FadeUp>
        <div className="space-y-6">
          <Link
            href="/portfolio"
            className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm font-semibold transition"
          >
            <ArrowLeft className="h-4 w-4" /> 포트폴리오
          </Link>

          <div className={['overflow-hidden p-0', cardClassName].join(' ')}>
            <div className="bg-depth-2 relative aspect-[2/1] w-full overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="text-muted-foreground absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <ImageOff className="h-12 w-12 opacity-50" />
                  <span className="text-sm">프로젝트 대표 이미지 영역</span>
                </div>
              )}
            </div>

            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                <div>
                  <span className="text-primary text-xs font-semibold uppercase tracking-[0.08em]">
                    Case Study
                  </span>
                  <h2 className="text-foreground mt-2 text-2xl text-3xl font-bold lg:text-4xl">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground mt-4 text-lg font-normal leading-relaxed">
                    {caseStudy.overview || project.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-6">
                  {project.role && (
                    <div className="flex items-center gap-1">
                      <Code2 className="text-primary h-5 w-5" />
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs tracking-[0.01em]">
                          Role
                        </span>
                        <span className="text-md text-foreground font-bold leading-[17px]">
                          {project.role}
                        </span>
                      </div>
                    </div>
                  )}
                  {project.period && (
                    <div className="flex items-center gap-1">
                      <Calendar className="text-primary h-5 w-5" />
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs tracking-[0.01em]">
                          Period
                        </span>
                        <span className="text-md text-foreground font-bold leading-[17px]">
                          {project.period}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="subtle" size="lg">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {project.links.github && (
                    <Link
                      href={project.links.github}
                      target="_blank"
                      className="bg-depth-2 hover:bg-depth-3 text-foreground inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition"
                    >
                      <Github className="h-4 w-4" /> GitHub
                    </Link>
                  )}
                  {project.links.live && (
                    <Link
                      href={project.links.live}
                      target="_blank"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>

      {(caseStudy.responsibilities || caseStudy.features) && (
        <FadeUp delay={0.15}>
          <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
            <h2 className="text-foreground mb-6 text-2xl font-bold">주요 작업</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              {caseStudy.responsibilities && caseStudy.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-foreground mb-4 text-xl font-semibold">담당한 역할</h3>
                  <ul className="space-y-3">
                    {caseStudy.responsibilities.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                        <p className="text-md text-muted-foreground font-normal">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {caseStudy.features && caseStudy.features.length > 0 && (
                <div>
                  <h3 className="text-foreground mb-4 text-xl font-semibold">구현한 기능</h3>
                  <ul className="space-y-3">
                    {caseStudy.features.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                        <p className="text-md text-muted-foreground font-normal">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </FadeUp>
      )}

      {caseStudy.challenges && caseStudy.challenges.length > 0 && (
        <FadeUp delay={0.2}>
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="text-foreground text-2xl font-bold">기술적 시도와 문제 해결</h2>
              <p className="text-md text-muted-foreground mt-2 font-normal">
                프로젝트에서 해본 기술적 시도와 문제 해결 과정입니다
              </p>
            </div>

            <div className="space-y-6">
              {caseStudy.challenges.map((challenge, idx) => (
                <div key={challenge.title} className={['p-8 lg:p-10', cardClassName].join(' ')}>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-lg font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-foreground text-xl font-semibold">{challenge.title}</h3>
                        <p className="text-md text-muted-foreground mt-3 font-normal leading-relaxed">
                          {challenge.detail}
                        </p>
                      </div>
                    </div>

                    {/* 코드 or 다이어그램 영역 - 필요시 활성 */}
                    {challenge.code && (
                      <div className="bg-depth-2 mt-6 overflow-hidden rounded-2xl">
                        <div className="border-border/50 border-b px-4 py-2">
                          <span className="text-muted-foreground text-xs tracking-[0.01em]">
                            Code Example
                          </span>
                        </div>
                        <pre className="text-foreground overflow-x-auto p-4 text-sm">
                          <code>{challenge.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>
      )}

      {caseStudy.architecture && caseStudy.architecture.length > 0 && (
        <FadeUp delay={0.25}>
          <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
            <h2 className="text-foreground mb-6 text-2xl font-bold">아키텍처 & 기술 선택</h2>
            <ul className="space-y-3">
              {caseStudy.architecture.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  <p className="text-md text-muted-foreground font-normal">{item}</p>
                </li>
              ))}
            </ul>
          </section>
        </FadeUp>
      )}

      {caseStudy.learnings && caseStudy.learnings.length > 0 && (
        <FadeUp delay={0.3}>
          <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
            <h2 className="text-foreground mb-6 text-2xl font-bold">배운 점</h2>
            <div className="space-y-4">
              {caseStudy.learnings.map((learning) => (
                <div key={learning} className="bg-depth-2 rounded-2xl p-6">
                  <p className="text-md text-foreground font-normal leading-relaxed">{learning}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>
      )}

      <FadeUp delay={0.35}>
        <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
          <div className="flex flex-col items-center gap-6 text-center">
            <div>
              <h3 className="text-foreground text-xl font-semibold">더 많은 프로젝트 살펴보기</h3>
              <p className="text-md text-muted-foreground mt-2 font-normal">
                다른 프로젝트에서 어떤 문제를 해결했는지 확인해보세요
              </p>
            </div>
            <Link
              href="/portfolio"
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
            >
              전체 프로젝트 보기 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </FadeUp>
    </div>
  );
}
