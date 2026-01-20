import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Github, FileText, ImageOff } from 'lucide-react';
import { Text } from '@/components/ui/Text';
import { FadeUp } from '@/components/motion/FadeUp';
import { PROJECTS } from '@/entities/project/model/projects';

const cardClassName = 'rounded-3xl bg-depth-1 shadow-sm ring-1 ring-border';

const FOCUS_POINTS = [
  {
    title: '제품 성과 중심',
    description: '성과 지표를 통해 개선 효과를 정량적으로 설명합니다.',
  },
  {
    title: '협업과 문서화',
    description: '디자인-개발 간 의사결정을 문서로 남겨 속도를 높입니다.',
  },
  {
    title: '유지보수 가능한 구조',
    description: '컴포넌트 설계와 테스트 전략으로 변경에 강한 구조를 만듭니다.',
  },
];

const PROCESS = [
  {
    step: '문제 정의',
    detail: '데이터/피드백을 기반으로 핵심 문제를 정리합니다.',
  },
  {
    step: '해결 전략',
    detail: '우선순위와 기술 부채를 고려한 로드맵을 설계합니다.',
  },
  {
    step: '실행과 측정',
    detail: '개선 후 지표를 모니터링하며 성과를 검증합니다.',
  },
];

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  return (
    <article className={['p-6 transition', cardClassName].join(' ')}>
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
          <Text.Overline className="text-primary">Case Study</Text.Overline>
          <Text.H3 className="text-foreground mt-2">{project.title}</Text.H3>
          <Text.Body14 className="text-muted-foreground mt-2">{project.summary}</Text.Body14>
        </div>

        <div className="bg-depth-2 grid gap-3 rounded-2xl p-4 text-sm">
          <div>
            <Text.Caption className="text-muted-foreground">역할</Text.Caption>
            <Text.S14.Bold className="text-foreground mt-1">{project.role}</Text.S14.Bold>
          </div>
          <div>
            <Text.Caption className="text-muted-foreground">기간</Text.Caption>
            <Text.S14.Bold className="text-foreground mt-1">{project.period}</Text.S14.Bold>
          </div>
          <div>
            <Text.Caption className="text-muted-foreground">팀</Text.Caption>
            <Text.S14.Bold className="text-foreground mt-1">{project.team}</Text.S14.Bold>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-depth-2 text-foreground rounded-full px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {project.highlights?.map((highlight) => (
            <div key={highlight} className="text-muted-foreground flex gap-2 text-sm">
              <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <span
              key={`${metric.label}-${metric.value}`}
              className="text-primary border-primary/30 bg-primary/10 rounded-full border px-3 py-1 text-xs font-semibold"
            >
              {metric.label} {metric.value}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          {project.links.caseStudy && (
            <Link
              href={project.links.caseStudy}
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition"
            >
              상세 보기 <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
          {project.links.github && (
            <Link
              href={project.links.github}
              target="_blank"
              className="text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </Link>
          )}
          {project.links.live && (
            <Link
              href={project.links.live}
              target="_blank"
              className="text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Live
            </Link>
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
            <Text.Overline className="text-primary">Portfolio</Text.Overline>
            <Text.H2 className="text-foreground mt-3 text-3xl lg:text-4xl">
              문제를 정의하고, 성과로 증명한 프론트엔드 프로젝트
            </Text.H2>
            <Text.Body16 className="text-muted-foreground mt-4">
              서비스 맥락과 사용자 흐름을 이해한 뒤, 설계-구현-검증까지 책임지는 방식으로 일합니다.
              아래 프로젝트는 성과, 역할, 기술 선택 이유를 중심으로 정리했습니다.
            </Text.Body16>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-primary border-primary bg-primary-100 rounded-full border px-4 py-2 text-sm font-semibold">
                성능 최적화
              </span>
              <span className="text-primary border-primary bg-primary-100 rounded-full border px-4 py-2 text-sm font-semibold">
                디자인 시스템
              </span>
              <span className="bg-depth-2 text-foreground rounded-full px-4 py-2 text-sm font-semibold">
                협업 경험
              </span>
              <span className="bg-depth-2 text-foreground rounded-full px-4 py-2 text-sm font-semibold">
                코드 품질
              </span>
            </div>
          </div>
        </section>
      </FadeUp>

      <section className="space-y-6">
        <FadeUp delay={0.1}>
          <div>
            <Text.H2 className="text-foreground">주요 프로젝트</Text.H2>
            <Text.Body14 className="text-muted-foreground mt-2">
              실제 성과와 기술적 판단을 중심으로 정리했습니다
            </Text.Body14>
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

      <section className="grid gap-6 lg:grid-cols-2">
        <FadeUp delay={0.2}>
          <div className={['p-8', cardClassName].join(' ')}>
            <Text.H3 className="text-foreground">프론트엔드에서 집중하는 가치</Text.H3>
            <div className="mt-6 space-y-4">
              {FOCUS_POINTS.map((point) => (
                <div key={point.title} className="bg-depth-2 rounded-2xl p-4">
                  <Text.S14.Bold className="text-foreground">{point.title}</Text.S14.Bold>
                  <Text.Caption className="text-muted-foreground mt-2">
                    {point.description}
                  </Text.Caption>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className={['p-8', cardClassName].join(' ')}>
            <Text.H3 className="text-foreground">작업 방식</Text.H3>
            <div className="mt-6 space-y-4">
              {PROCESS.map((item) => (
                <div key={item.step} className="bg-depth-2 flex gap-4 rounded-2xl p-4">
                  <div className="bg-primary/10 text-primary h-10 w-10 rounded-xl text-center text-sm font-semibold leading-10">
                    {item.step[0]}
                  </div>
                  <div>
                    <Text.S14.Bold className="text-foreground">{item.step}</Text.S14.Bold>
                    <Text.Caption className="text-muted-foreground mt-1">
                      {item.detail}
                    </Text.Caption>
                  </div>
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
              <Text.H3 className="text-foreground">더 자세한 내용을 공유할게요</Text.H3>
              <Text.Body14 className="text-muted-foreground mt-2">
                이력서와 상세 기록을 함께 보시면 프로젝트 전반을 빠르게 이해하실 수 있습니다.
              </Text.Body14>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/resume.pdf"
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
