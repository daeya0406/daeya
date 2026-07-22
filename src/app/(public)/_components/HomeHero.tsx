import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { CopyTextButton } from '@/shared/common/CopyTextButton';
import { HOME_HERO } from '@/entities/home/model/home';
import { PROFILE } from '@/entities/profile/model/profile';

export function HomeHero() {
  return (
    <section className="mx-auto max-w-3xl pt-8 text-center lg:pt-16">
      <p className="text-muted-foreground mb-4 text-sm font-medium tracking-wide">{PROFILE.role}</p>

      <h1 className="text-foreground mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
        {PROFILE.name}
        <span className="text-muted-foreground font-medium"></span>
      </h1>

      <p className="text-foreground mb-6 text-xl font-medium leading-snug lg:text-2xl">
        {HOME_HERO.headline}
      </p>

      <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-base leading-relaxed lg:text-lg">
        {HOME_HERO.subheadline}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/portfolio"
          className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition"
        >
          프로젝트 보기
          <Icon name="arrowUpRight" size={18} />
        </Link>
        <Link
          href="/about"
          className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition"
        >
          About
        </Link>
      </div>

      <div className="text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-5 text-sm">
        <CopyTextButton
          text={PROFILE.email}
          toastMessage="이메일을 복사했어요"
          className="hover:text-foreground inline-flex items-center gap-2 transition"
        >
          <Icon name="mail" size={16} /> {PROFILE.email}
        </CopyTextButton>
        <Link
          href={PROFILE.links.github}
          target="_blank"
          className="hover:text-foreground inline-flex items-center gap-2 transition"
        >
          <Icon name="github" size={16} /> GitHub
        </Link>
        <Link
          href={PROFILE.links.publishingPortfolio}
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground inline-flex items-center gap-2 transition"
        >
          <Icon name="externalLink" size={16} /> 퍼블리싱
        </Link>
      </div>
    </section>
  );
}
