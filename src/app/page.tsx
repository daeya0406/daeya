import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { CopyTextButton } from '@/components/common/CopyTextButton';
import { ArrowUpRight, Github, Mail, FileText, ExternalLink, ImageOff } from 'lucide-react';
import { getPublicExperiences, getPublicStudyPosts } from '@/lib/supabase/api/portfolio';
import { FadeUp } from '@/components/motion/FadeUp';
import { FEATURED_PROJECTS } from '@/entities/project/model/projects';
import { HOME_HERO } from '@/entities/home/model/home';
import { PROFILE } from '@/entities/profile/model/profile';

const cardClassName = 'rounded-3xl bg-depth-1 shadow-sm ring-1 ring-border';

function ProjectCard({ project }: { project: (typeof FEATURED_PROJECTS)[0] }) {
  return (
    <Link
      href={project.links.caseStudy ?? '/portfolio'}
      className="group block transition-all duration-300 hover:scale-[1.02]"
    >
      <div className={['overflow-hidden p-6', cardClassName].join(' ')}>
        {/* 프로젝트 이미지 */}
        <div className="bg-depth-2 relative mb-6 aspect-video overflow-hidden rounded-2xl">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="text-muted-foreground absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm">
              <ImageOff className="h-8 w-8 opacity-70" />
              <span>No image</span>
            </div>
          )}
          <div className="absolute right-4 top-4 rounded-full bg-white/90 p-2 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            <ExternalLink className="h-4 w-4 text-gray-900" />
          </div>
        </div>

        {/* 프로젝트 정보 */}
        <div className="space-y-4">
          <div>
            <h3 className="text-foreground mb-2 text-xl font-semibold">{project.title}</h3>
            <p className="text-md text-muted-foreground font-normal">{project.summary}</p>
          </div>

          {/* 기술 스택 */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="subtle" size="md">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const [experiencesRes, postsRes] = await Promise.allSettled([
    getPublicExperiences(),
    getPublicStudyPosts(5),
  ]);

  const experiences = experiencesRes.status === 'fulfilled' ? experiencesRes.value : [];
  const posts = postsRes.status === 'fulfilled' ? postsRes.value : [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <FadeUp>
        <section className={['p-8 lg:p-12', cardClassName].join(' ')}>
          <div className="mx-auto max-w-4xl">
            <div className="flex items-start gap-6">
              <div className="bg-primary-100 text-primary flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl">
                <Image
                  src="/logo.png"
                  alt="Daeya"
                  width={40}
                  height={24}
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-foreground text-3xl font-bold lg:text-4xl">
                  {HOME_HERO.headline}
                </h1>
                <p className="text-md text-muted-foreground mt-4 text-base font-normal lg:text-lg">
                  {HOME_HERO.subheadline.split('\n').map((line, index) => (
                    <span key={`${line}-${index}`} className="block">
                      {line}
                    </span>
                  ))}
                </p>

                {/* 핵심 스킬 */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {HOME_HERO.badges.map((badge, index) => (
                    <Badge key={badge} variant={index < 2 ? 'outline' : 'subtle'} size="lg">
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* CTA 버튼들 */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/portfolio"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition"
                  >
                    프로젝트 보기 <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
                  >
                    소개 <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <CopyTextButton
                    text={PROFILE.email}
                    toastMessage="이메일을 복사했어요"
                    className="text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
                  >
                    <Mail className="h-4 w-4" /> 이메일
                  </CopyTextButton>
                  <Link
                    href={PROFILE.links.github}
                    target="_blank"
                    className="text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </Link>
                  <Link
                    href={PROFILE.links.resume}
                    className="text-foreground hover:bg-muted inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
                  >
                    <FileText className="h-4 w-4" /> 이력서
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Quick Stats */}
      <FadeUp delay={0.1}>
        <div className="grid gap-4 sm:grid-cols-3">
          {Object.values(PROFILE.career).map((stat) => {
            const value =
              'value' in stat && stat.value
                ? stat.value
                : stat.id === 'experience'
                  ? experiences.length > 0
                    ? `${experiences.length}년+`
                    : ('fallback' in stat ? stat.fallback ?? '' : '')
                : stat.id === 'study'
                  ? `${posts.length}`
                  : ('fallback' in stat ? stat.fallback ?? '' : '');

            return (
              <div key={stat.id} className={['p-6', cardClassName].join(' ')}>
                <span className="text-muted-foreground text-xs tracking-[0.01em]">
                  {stat.label}
                </span>
                <h2 className="text-foreground mt-2 text-2xl font-bold">{value}</h2>
                <p className="text-md text-muted-foreground mt-1 font-normal">{stat.description}</p>
              </div>
            );
          })}
        </div>
      </FadeUp>

      {/* Featured Projects */}
      <section className="space-y-6">
        <FadeUp delay={0.15}>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-foreground text-2xl font-bold">주요 프로젝트</h2>
              <p className="text-md text-muted-foreground mt-2 font-normal">
                경험을 쌓기위해 진행한 프로젝트들입니다.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="text-primary hover:text-primary/80 hidden items-center gap-1 text-sm font-semibold transition sm:flex"
            >
              전체 보기 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeUp>

        <div className="grid gap-6 lg:grid-cols-3">
          {FEATURED_PROJECTS.map((project, idx) => (
            <FadeUp key={project.id} delay={0.2 + idx * 0.05}>
              <ProjectCard project={project} />
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <Link
            href="/portfolio"
            className="text-primary hover:text-primary/80 flex items-center justify-center gap-1 text-sm font-semibold transition sm:hidden"
          >
            전체 프로젝트 보기 <ArrowUpRight className="h-4 w-4" />
          </Link>
        </FadeUp>
      </section>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <FadeUp delay={0.45}>
          <section className={['p-8', cardClassName].join(' ')}>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h3 className="text-foreground text-xl font-semibold">최근 학습 기록</h3>
                <p className="text-md text-muted-foreground mt-1 font-normal">
                  새롭게 배우고 정리한 내용들
                </p>
              </div>
              <Link
                href="/note"
                className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-semibold transition"
              >
                전체 보기 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {posts.slice(0, 5).map((post) => (
                <div
                  key={post.id}
                  className="bg-depth-2 hover:bg-depth-3 group rounded-2xl p-4 transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      {post.url ? (
                        <Link
                          href={post.url}
                          target="_blank"
                          className="text-foreground group-hover:text-primary font-semibold transition"
                        >
                          {post.title}
                        </Link>
                      ) : (
                        <div className="text-foreground font-semibold">{post.title}</div>
                      )}
                      {post.summary && (
                        <span className="text-muted-foreground mt-1 text-xs tracking-[0.01em]">
                          {post.summary}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-3">
                      {post.category && (
                        <Badge variant="subtle" size="md">
                          {post.category}
                        </Badge>
                      )}
                      <span className="text-muted-foreground whitespace-nowrap text-xs tracking-[0.01em]">
                        {post.published_at}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>
      )}

      {/* 강점 섹션 */}
      <FadeUp delay={0.5}>
        <section className={['p-8', cardClassName].join(' ')}>
          <h3 className="text-foreground mb-6 text-xl font-semibold">개발 철학</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-depth-2 rounded-2xl p-6">
              <div className="bg-primary/10 text-primary mb-4 inline-flex rounded-xl p-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span className="text-md text-foreground font-bold leading-[17px]">
                일관성 있는 설계
              </span>
              <span className="text-muted-foreground mt-2 text-xs tracking-[0.01em]">
                디자인 토큰과 컴포넌트 체계를 통해 확장 가능한 시스템을 만듭니다
              </span>
            </div>

            <div className="bg-depth-2 rounded-2xl p-6">
              <div className="bg-primary/10 text-primary mb-4 inline-flex rounded-xl p-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className="text-md text-foreground font-bold leading-[17px]">성능 최적화</span>
              <span className="text-muted-foreground mt-2 text-xs tracking-[0.01em]">
                번들 사이즈, 렌더링 성능, Core Web Vitals를 항상 고려합니다
              </span>
            </div>

            <div className="bg-depth-2 rounded-2xl p-6">
              <div className="bg-primary/10 text-primary mb-4 inline-flex rounded-xl p-3">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <span className="text-md text-foreground font-bold leading-[17px]">협업 중심</span>
              <span className="text-muted-foreground mt-2 text-xs tracking-[0.01em]">
                디자이너, 백엔드와의 원활한 소통을 위한 문서화에 신경씁니다
              </span>
            </div>
          </div>
        </section>
      </FadeUp>
    </div>
  );
}
