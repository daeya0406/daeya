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
import { FadeUp } from '@/components/motion/FadeUp';
import { Text } from '@/components/ui/Text';
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
                  <Text.Overline className="text-primary">Case Study</Text.Overline>
                  <Text.H2 className="text-foreground mt-2 text-3xl lg:text-4xl">
                    {project.title}
                  </Text.H2>
                  <Text.Body16 className="text-muted-foreground mt-4 text-lg leading-relaxed">
                    {caseStudy.overview || project.summary}
                  </Text.Body16>
                </div>

                <div className="flex flex-wrap gap-6">
                  {project.role && (
                    <div className="flex items-center gap-1">
                      <Code2 className="text-primary h-5 w-5" />
                      <div className="flex items-center gap-2">
                        <Text.Caption className="text-muted-foreground">Role</Text.Caption>
                        <Text.S14.Bold className="text-foreground">{project.role}</Text.S14.Bold>
                      </div>
                    </div>
                  )}
                  {project.period && (
                    <div className="flex items-center gap-1">
                      <Calendar className="text-primary h-5 w-5" />
                      <div className="flex items-center gap-2">
                        <Text.Caption className="text-muted-foreground">Period</Text.Caption>
                        <Text.S14.Bold className="text-foreground">{project.period}</Text.S14.Bold>
                      </div>
                    </div>
                  )}
                  {project.team && (
                    <div className="flex items-center gap-1">
                      <Users className="text-primary h-5 w-5" />
                      <div className="flex items-center gap-2">
                        <Text.Caption className="text-muted-foreground">Team</Text.Caption>
                        <Text.S14.Bold className="text-foreground">{project.team}</Text.S14.Bold>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-depth-2 text-foreground rounded-full px-4 py-2 text-sm font-medium"
                    >
                      {tag}
                    </span>
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
            <Text.H2 className="text-foreground mb-6">주요 작업</Text.H2>
            <div className="grid gap-8 lg:grid-cols-2">
              {caseStudy.responsibilities && caseStudy.responsibilities.length > 0 && (
                <div>
                  <Text.H3 className="text-foreground mb-4">담당한 역할</Text.H3>
                  <ul className="space-y-3">
                    {caseStudy.responsibilities.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                        <Text.Body14 className="text-muted-foreground">{item}</Text.Body14>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {caseStudy.features && caseStudy.features.length > 0 && (
                <div>
                  <Text.H3 className="text-foreground mb-4">구현한 기능</Text.H3>
                  <ul className="space-y-3">
                    {caseStudy.features.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                        <Text.Body14 className="text-muted-foreground">{item}</Text.Body14>
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
              <Text.H2 className="text-foreground">기술적 시도와 문제 해결</Text.H2>
              <Text.Body14 className="text-muted-foreground mt-2">
                프로젝트에서 해본 기술적 시도와 문제 해결 과정입니다
              </Text.Body14>
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
                        <Text.H3 className="text-foreground">{challenge.title}</Text.H3>
                        <Text.Body14 className="text-muted-foreground mt-3 leading-relaxed">
                          {challenge.detail}
                        </Text.Body14>
                      </div>
                    </div>

                    {/* 코드 or 다이어그램 영역 - 필요시 활성 */}
                    {challenge.code && (
                      <div className="bg-depth-2 mt-6 overflow-hidden rounded-2xl">
                        <div className="border-border/50 border-b px-4 py-2">
                          <Text.Caption className="text-muted-foreground">
                            Code Example
                          </Text.Caption>
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
            <Text.H2 className="text-foreground mb-6">아키텍처 & 기술 선택</Text.H2>
            <ul className="space-y-3">
              {caseStudy.architecture.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  <Text.Body14 className="text-muted-foreground">{item}</Text.Body14>
                </li>
              ))}
            </ul>
          </section>
        </FadeUp>
      )}

      {caseStudy.learnings && caseStudy.learnings.length > 0 && (
        <FadeUp delay={0.3}>
          <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
            <Text.H2 className="text-foreground mb-6">배운 점</Text.H2>
            <div className="space-y-4">
              {caseStudy.learnings.map((learning) => (
                <div key={learning} className="bg-depth-2 rounded-2xl p-6">
                  <Text.Body14 className="text-foreground leading-relaxed">{learning}</Text.Body14>
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
              <Text.H3 className="text-foreground">더 많은 프로젝트 살펴보기</Text.H3>
              <Text.Body14 className="text-muted-foreground mt-2">
                다른 프로젝트에서 어떤 문제를 해결했는지 확인해보세요
              </Text.Body14>
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
