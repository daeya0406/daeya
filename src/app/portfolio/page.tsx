import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Github, FileText, ImageOff } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FadeUp } from '@/components/motion/FadeUp';
import { PROJECTS } from '@/entities/project/model/projects';
import { PORTFOLIO_CTA, PORTFOLIO_FOCUS_POINTS } from '@/entities/portfolio/model/portfolio';
import { PROFILE } from '@/entities/profile/model/profile';

const cardClassName = 'rounded-3xl bg-depth-1 shadow-sm ring-1 ring-border';

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <article className={['h-full p-6 transition', cardClassName].join(' ')}>
      <div className="bg-depth-2 relative mb-6 aspect-video overflow-hidden rounded-2xl">
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
            <ImageOff className="h-8 w-8 opacity-70" />
            <span>No image</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-primary text-xs font-semibold uppercase tracking-[0.08em]">
            Project
          </span>
          <h3 className="text-foreground text-xl font-semibold">{project.title}</h3>
          <p className="text-md text-muted-foreground mt-3 font-normal">{project.summary}</p>
        </div>

        <div className="bg-depth-2 grid gap-3 rounded-2xl p-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">역할</span>
            <span className="text-md text-foreground font-bold">{project.role}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">기간</span>
            <span className="text-md text-foreground font-bold">{project.period}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="subtle" size="md">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          {project.highlights?.map((highlight) => (
            <div key={highlight} className="text-muted-foreground flex items-center gap-2 text-sm">
              <span className="bg-primary h-1.5 w-1.5 flex-shrink-0 rounded-full" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <Badge key={`${metric.label}-${metric.value}`} variant="ghost" size="md">
              {metric.label} : {metric.value}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.links.caseStudy && (
            <Button asChild size="sm" className="rounded-xl">
              <Link href={project.links.caseStudy}>
                상세 보기 <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          )}
          {project.links.github && (
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href={project.links.github} target="_blank">
                <Github className="h-3.5 w-3.5" /> GitHub
              </Link>
            </Button>
          )}
          {project.links.live && (
            <Button asChild variant="outline" size="sm" className="rounded-xl">
              <Link href={project.links.live} target="_blank">
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  return (
    <div className="space-y-12">
      <FadeUp>
        <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
          <div className="max-w-3xl">
            <span className="text-primary text-xs font-semibold uppercase tracking-[0.08em]">
              Portfolio
            </span>
            <h2 className="text-foreground mt-3 text-2xl text-3xl font-bold lg:text-4xl">
              프로젝트 포트폴리오
            </h2>
            <p className="text-muted-foreground mt-4 text-lg font-normal">
              서비스 맥락과 사용자 흐름을 이해한 뒤, 설계-구현-검증까지 책임지는 방식으로 일합니다.
              아래 프로젝트는 성과, 역할, 기술 선택 이유를 중심으로 정리했습니다.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="outline" size="lg">
                성능 최적화
              </Badge>
              <Badge variant="subtle" size="lg">
                디자인 시스템
              </Badge>
              <Badge variant="subtle" size="lg">
                협업 경험
              </Badge>
              <Badge variant="subtle" size="lg">
                코드 품질
              </Badge>
            </div>
          </div>
        </section>
      </FadeUp>

      <section className="space-y-6">
        <FadeUp delay={0.1}>
          <div>
            <h2 className="text-foreground text-2xl font-bold">주요 프로젝트</h2>
            <p className="text-md text-muted-foreground mt-2 font-normal">
              실제 성과와 기술적 판단을 중심으로 정리했습니다
            </p>
          </div>
        </FadeUp>
        <div className="grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((project, idx) => (
            <FadeUp key={project.id} delay={0.15 + idx * 0.05}>
              <ProjectCard project={project} />
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="grid gap-6">
        <FadeUp delay={0.2}>
          <div className={['p-8', cardClassName].join(' ')}>
            <h3 className="text-foreground text-xl font-semibold">프로젝트에서의 강점</h3>
            <div className="mt-6 space-y-4">
              {PORTFOLIO_FOCUS_POINTS.map((point) => (
                <div
                  key={point.title}
                  className="bg-depth-2 text-primary flex items-center gap-2 rounded-2xl p-4"
                >
                  <span className="text-md text-foreground font-bold leading-[17px]">
                    {point.title}
                  </span>
                  <span className="text-muted-foreground text-xs tracking-[0.01em]">
                    {point.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      <FadeUp delay={0.3}>
        <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-foreground text-xl font-semibold">
                {PORTFOLIO_CTA.title}
              </h3>
              <p className="text-md text-muted-foreground mt-2 font-normal">
                {PORTFOLIO_CTA.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={PROFILE.links.resume}
                className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
              >
                <FileText className="h-4 w-4" /> 이력서
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
              >
                소개 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </FadeUp>
    </div>
  );
}
