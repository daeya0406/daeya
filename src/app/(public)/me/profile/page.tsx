'use client';

import Link from 'next/link';
import { CopyTextButton } from '@/shared/common/CopyTextButton';
import { Icon } from '@/shared/ui/Icons';
import { PROFILE } from '@/content/profile';
import {
  ABOUT_ADJACENT,
  ABOUT_LINKS,
  ABOUT_PRINCIPLES,
  ABOUT_STACK,
  PROFILE_INTRO,
} from '@/content/about';

const cardClassName = 'bg-depth-1 ring-border/50 rounded-2xl shadow-sm ring-1';

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-14 lg:space-y-16">
      <header className="space-y-5">
        <div>
          <p className="text-muted-foreground mb-2 text-sm font-medium">{PROFILE.role}</p>
          <h1 className="text-foreground text-3xl font-bold tracking-tight lg:text-4xl">
            {PROFILE.name}
          </h1>
          <p className="text-foreground mt-4 text-lg font-medium leading-snug">
            {PROFILE_INTRO.headline}
          </p>
          <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">
            {PROFILE_INTRO.description}
          </p>
        </div>

        <dl className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-1 text-sm">
          {PROFILE_INTRO.stats.map((stat) => (
            <div key={stat.label} className="flex gap-2">
              <dt>{stat.label}</dt>
              <dd className="text-foreground font-semibold">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/work/frontend"
            className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition"
          >
            FE 프로젝트 <Icon name="arrowUpRight" size={14} />
          </Link>
          <Link
            href="/me/career"
            className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
          >
            경력 보기 <Icon name="arrowUpRight" size={14} />
          </Link>
          <CopyTextButton
            text={PROFILE.email}
            toastMessage="이메일을 복사했어요"
            className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
          >
            <Icon name="mail" size={14} /> 이메일
          </CopyTextButton>
        </div>
      </header>

      <section className={['space-y-8 p-5 sm:p-6', cardClassName].join(' ')}>
        <div>
          <h2 className="text-foreground mb-4 text-xl font-bold">기술 스택</h2>
          <div className="space-y-4">
            {(
              [
                ['주력', ABOUT_STACK.primary, true],
                ['능숙', ABOUT_STACK.comfortable, false],
                ['학습 중', ABOUT_STACK.learning, false],
              ] as const
            ).map(([label, items, primary]) => (
              <div key={label}>
                <h3 className="text-muted-foreground mb-2 text-xs font-medium">{label}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className={
                        primary
                          ? 'bg-primary/10 text-primary ring-primary/20 rounded-full px-3 py-1 text-sm font-semibold ring-1'
                          : 'bg-depth-2 text-foreground rounded-full px-3 py-1 text-sm'
                      }
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border border-t pt-6">
          <h2 className="text-foreground mb-3 text-base font-bold">작업할 때</h2>
          <ol className="space-y-2.5">
            {ABOUT_PRINCIPLES.map((principle, idx) => (
              <li key={principle.title} className="flex gap-2.5 text-sm">
                <span className="text-primary w-4 shrink-0 font-bold">{idx + 1}</span>
                <span>
                  <span className="text-foreground font-semibold">{principle.title}</span>
                  <span className="text-muted-foreground"> — {principle.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-foreground text-xl font-bold">확장 가능성</h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            기획·백엔드에 대해 알게된 부분을 확장 가능성으로 정리했습니다.
          </p>
        </div>

        <div className="space-y-3">
          {ABOUT_ADJACENT.map((item) => (
            <article key={item.title} className={['p-4 sm:p-5', cardClassName].join(' ')}>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-primary text-xs font-semibold">{item.tag}</span>
                <h3 className="text-foreground text-sm font-bold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition"
                  >
                    {link.label}
                    <Icon name="externalLink" size={12} />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={['p-5 sm:p-6', cardClassName].join(' ')}>
        <h2 className="text-foreground text-lg font-bold">연락</h2>
        <p className="text-muted-foreground mb-4 mt-1 text-sm">협업·포지션 문의는 메일로 주세요</p>
        <div className="flex flex-wrap gap-2">
          <CopyTextButton
            text={PROFILE.email}
            toastMessage="이메일을 복사했어요"
            className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition"
          >
            <Icon name="mail" size={14} /> {PROFILE.email}
          </CopyTextButton>
          <Link
            href={PROFILE.links.resume}
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
          >
            <Icon name="fileText" size={14} /> 이력서
          </Link>
          {ABOUT_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-foreground hover:bg-muted border-border inline-flex items-center gap-1 rounded-xl border px-4 py-2.5 text-sm font-semibold transition"
            >
              {link.label}
              <Icon name="arrowUpRight" size={14} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
