'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Icon } from '@/shared/ui/Icons';
import { CopyTextButton } from '@/shared/common/CopyTextButton';
import { HOME_HERO, HOME_INTRO } from '@/content/home';
import { PROFILE } from '@/content/profile';
import { Marquee } from '@/features/home/Marquee';
import { CodeTicker } from '@/features/home/CodeTicker';
import { Eyebrow } from '@/features/home/Eyebrow';
import { BezelCard } from '@/features/home/BezelCard';
import { SectionReveal } from '@/features/home/SectionReveal';
import { PrimaryCta } from '@/features/home/PrimaryCta';
import {
  getAllCodeSnippets,
  getCareerStats,
  getFeaturedDesignWorks,
  getFeaturedFrontendProjects,
  getFeaturedHobbyTeasers,
  getFeaturedPublishingProjects,
} from '@/content/registry';
import { Badge } from '@/shared/ui/Badge';

const CareerChart = dynamic(
  () => import('@/features/home/CareerChart').then((m) => m.CareerChart),
  { ssr: false, loading: () => <div className="bg-depth-2 h-40 animate-pulse rounded-2xl" /> }
);

const spring = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const };

export function HomeHero() {
  const stats = getCareerStats();

  return (
    <section className="relative">
      <div className="mesh-orb bg-primary/20 -right-20 -top-20 h-64 w-64" />
      <div className="mesh-orb bg-primary/10 -bottom-16 left-0 h-48 w-48" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="space-y-7"
        >
          <Eyebrow>{PROFILE.role}</Eyebrow>

          <div className="space-y-4">
            <h1 className="text-foreground text-balance text-4xl font-bold tracking-tight lg:text-6xl lg:leading-[1.1]">
              {PROFILE.name}
            </h1>
            <p className="text-foreground max-w-xl text-xl font-semibold leading-snug lg:text-2xl">
              {HOME_HERO.headline}
            </p>
            <p className="text-muted-foreground max-w-[65ch] text-base leading-relaxed lg:text-lg">
              {HOME_HERO.subheadline}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {HOME_HERO.badges.map((badge) => (
              <Badge key={badge} variant="subtle" size="sm">
                {badge}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <PrimaryCta href="/work/frontend">프로젝트 보기</PrimaryCta>
            <Link
              href="/me/profile"
              className="text-foreground hover:bg-depth-1 border-border inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-spring hover:scale-[1.02] active:scale-[0.98]"
            >
              {HOME_INTRO.profileCta}
            </Link>
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center gap-5 text-sm">
            <CopyTextButton
              text={PROFILE.email}
              toastMessage="이메일을 복사했어요"
              className="hover:text-foreground inline-flex items-center gap-2 transition-spring"
            >
              <Icon name="mail" size={16} /> {PROFILE.email}
            </CopyTextButton>
            <Link
              href={PROFILE.links.github}
              target="_blank"
              className="hover:text-foreground inline-flex items-center gap-2 transition-spring"
            >
              <Icon name="github" size={16} /> GitHub
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.08 }}>
          <BezelCard innerClassName="space-y-5 p-5 sm:p-6">
            <h2 className="text-foreground text-sm font-bold">{HOME_INTRO.statsTitle}</h2>
            <dl className="grid grid-cols-2 gap-3">
              {[
                { label: '총 경력', value: `${stats.years}년+` },
                { label: '프로젝트', value: `${stats.projects}` },
                { label: '클라이언트', value: `${stats.clients}` },
                { label: 'FE 프로젝트', value: `${stats.frontendProjects}` },
              ].map((item) => (
                <div key={item.label} className="bg-depth-2 rounded-xl p-4">
                  <dt className="text-muted-foreground text-xs">{item.label}</dt>
                  <dd className="text-foreground tabular-nums mt-1 text-2xl font-bold">{item.value}</dd>
                </div>
              ))}
            </dl>
            <CareerChart compact />
          </BezelCard>
        </motion.div>
      </div>
    </section>
  );
}

export function HomeWorkPreview() {
  const frontend = getFeaturedFrontendProjects()[0];
  const design = getFeaturedDesignWorks()[0];
  const publishing = getFeaturedPublishingProjects().slice(0, 2);

  return (
    <SectionReveal className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <Eyebrow>{HOME_INTRO.workTitle}</Eyebrow>
        <h2 className="text-foreground text-balance text-3xl font-bold tracking-tight lg:text-4xl">
          실제로 맡았던 작업
        </h2>
        <p className="text-muted-foreground max-w-[65ch] leading-relaxed">{HOME_INTRO.workDescription}</p>
      </div>

      <Marquee items={HOME_HERO.badges} />

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <BezelCard className="lg:col-span-7" innerClassName="flex h-full flex-col gap-5 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <Eyebrow>{HOME_INTRO.workLabels.frontend}</Eyebrow>
            {frontend && (
              <Link
                href={frontend.links.caseStudy ?? '/work/frontend'}
                className="text-primary text-xs font-semibold transition-spring hover:translate-x-0.5"
              >
                전체 보기 →
              </Link>
            )}
          </div>
          {frontend && (
            <div className="space-y-3">
              <h3 className="text-foreground text-xl font-bold">{frontend.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{frontend.summary}</p>
            </div>
          )}
          <CodeTicker snippets={getAllCodeSnippets()} className="mt-auto" />
        </BezelCard>

        <BezelCard className="lg:col-span-5" innerClassName="flex h-full flex-col gap-4 p-5 sm:p-6">
          <Eyebrow>{HOME_INTRO.workLabels.design}</Eyebrow>
          {design && (
            <>
              <h3 className="text-foreground text-lg font-bold leading-snug">{design.title}</h3>
              <p className="text-muted-foreground flex-1 text-sm leading-relaxed">{design.summary}</p>
              {design.links.prototype && (
                <a
                  href={design.links.prototype}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-spring hover:gap-2"
                >
                  프로토타입 보기 <Icon name="arrowUpRight" size={14} />
                </a>
              )}
            </>
          )}
        </BezelCard>

        <BezelCard className="lg:col-span-12" innerClassName="p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <Eyebrow>{HOME_INTRO.workLabels.publishing}</Eyebrow>
            <Link
              href="/work/publishing"
              className="text-primary text-xs font-semibold transition-spring hover:translate-x-0.5"
            >
              더 보기 →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {publishing.map((project) => (
              <a
                key={project.id}
                href={project.detailUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:bg-depth-2 group rounded-2xl p-4 transition-spring"
              >
                <p className="text-muted-foreground text-xs">{project.client}</p>
                <p className="text-foreground group-hover:text-primary mt-1 font-semibold transition-colors">
                  {project.title}
                </p>
                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">{project.summary}</p>
              </a>
            ))}
          </div>
        </BezelCard>
      </div>
    </SectionReveal>
  );
}

export function HomeCareerSection() {
  return (
    <SectionReveal className="space-y-8" delay={0.05}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <Eyebrow>{HOME_INTRO.careerTitle}</Eyebrow>
          <h2 className="text-foreground text-balance text-3xl font-bold tracking-tight">
            {HOME_INTRO.careerHeading}
          </h2>
          <p className="text-muted-foreground max-w-[65ch]">{HOME_INTRO.careerDescription}</p>
        </div>
        <Link
          href="/me/career"
          className="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-spring hover:gap-2"
        >
          전체 경력 <Icon name="arrowUpRight" size={14} />
        </Link>
      </div>
      <BezelCard innerClassName="p-5 sm:p-8">
        <CareerChart />
      </BezelCard>
    </SectionReveal>
  );
}

export function HomeHobbyTeaser() {
  const teasers = getFeaturedHobbyTeasers();

  return (
    <SectionReveal className="space-y-8" delay={0.05}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <Eyebrow>{HOME_INTRO.hobbyTitle}</Eyebrow>
          <h2 className="text-foreground text-balance text-3xl font-bold tracking-tight">
            실험과 정리
          </h2>
          <p className="text-muted-foreground max-w-[65ch]">{HOME_INTRO.hobbyDescription}</p>
        </div>
        <Link
          href="/hobby/playground"
          className="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-spring hover:gap-2"
        >
          {HOME_INTRO.hobbyLink} <Icon name="arrowUpRight" size={14} />
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teasers.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: index * 0.06 }}
          >
            <Link href={item.href} className="block h-full">
              <BezelCard className="h-full" innerClassName="group flex h-full flex-col p-5 transition-spring hover:scale-[1.01]">
                <p className="text-primary text-[11px] font-semibold tracking-[0.12em] uppercase">
                  {HOME_INTRO.hobbyCategories[item.category]}
                </p>
                <h3 className="text-foreground group-hover:text-primary mt-3 font-bold transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                  {item.description}
                </p>
              </BezelCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}

export function HomeCta() {
  return (
    <SectionReveal delay={0.05}>
      <div className="cta-panel ring-border/50 relative overflow-hidden rounded-[2rem] px-6 py-14 text-center ring-1 sm:px-10 sm:py-16">
        <div className="mesh-orb bg-primary/25 right-0 top-0 h-40 w-40" />
        <div className="relative space-y-4">
          <Eyebrow>{HOME_INTRO.ctaEyebrow}</Eyebrow>
          <h2 className="text-foreground text-balance text-2xl font-bold lg:text-3xl">
            함께 일하고 싶으시다면
          </h2>
          <p className="text-muted-foreground mx-auto max-w-lg text-sm leading-relaxed">
            {HOME_INTRO.ctaDescription}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <CopyTextButton
              text={PROFILE.email}
              toastMessage="이메일을 복사했어요"
              className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold shadow-[0_12px_40px_-12px_rgba(81,137,250,0.55)] transition-spring hover:scale-[1.02] active:scale-[0.98]"
            >
              <Icon name="mail" size={16} /> {PROFILE.email}
            </CopyTextButton>
            <Link
              href={PROFILE.links.resume}
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:bg-depth-1 border-border inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-spring hover:scale-[1.02] active:scale-[0.98]"
            >
              <Icon name="fileText" size={16} /> 이력서
            </Link>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
