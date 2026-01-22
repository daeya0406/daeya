'use client';

import Link from 'next/link';
import { ArrowUpRight, Github, Mail } from 'lucide-react';
import { CopyTextButton } from '@/shared/common/CopyTextButton';
import { HOME_HERO } from '@/entities/home/model/home';
import { PROFILE } from '@/entities/profile/model/profile';

export function HomeHero() {
  return (
    <section className="relative">
      <div className="bg-primary/10 absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl animate-float" />
      <div className="bg-primary/5 absolute -bottom-24 right-10 h-72 w-72 rounded-full blur-3xl animate-float-slow" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
            <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
          </span>
          프론트엔드 개발자 포트폴리오
        </div>

        <h1 className="text-foreground mb-6 text-4xl font-bold leading-tight lg:text-6xl">
          사용자 경험과 유지보수를
          <br />
          <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
            함께 설계하는
          </span>{' '}
          개발자
        </h1>

        <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg leading-relaxed lg:text-xl">
          {HOME_HERO.subheadline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/portfolio"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold shadow-lg transition"
          >
            프로젝트 보기
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border bg-white/50 px-8 py-4 text-base font-semibold backdrop-blur-sm transition"
          >
            자세히 알아보기
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          <CopyTextButton
            text={PROFILE.email}
            toastMessage="이메일을 복사했어요"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition"
          >
            <Mail className="h-4 w-4" /> {PROFILE.email}
          </CopyTextButton>
          <Link
            href={PROFILE.links.github}
            target="_blank"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition"
          >
            <Github className="h-4 w-4" /> GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
