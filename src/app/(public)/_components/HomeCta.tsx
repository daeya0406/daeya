import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { CopyTextButton } from '@/shared/common/CopyTextButton';
import { PROFILE } from '@/entities/profile/model/profile';
import { cardClassName } from './constants';

export function HomeCta() {
  return (
    <section className={['px-6 py-10 text-center lg:px-10 lg:py-12', cardClassName].join(' ')}>
      <h2 className="text-foreground mb-2 text-xl font-bold lg:text-2xl">연락 · 이력서</h2>
      <p className="text-muted-foreground mx-auto mb-6 max-w-md text-sm lg:text-base">
        협업·포지션 관련 문의는 메일로 편하게 주세요
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <CopyTextButton
          text={PROFILE.email}
          toastMessage="이메일을 복사했어요"
          className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition"
        >
          <Icon name="mail" size={16} /> {PROFILE.email}
        </CopyTextButton>
        <Link
          href={PROFILE.links.resume}
          className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition"
        >
          <Icon name="fileText" size={16} /> 이력서
        </Link>
        <Link
          href="/about"
          className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition"
        >
          About
        </Link>
      </div>
    </section>
  );
}
