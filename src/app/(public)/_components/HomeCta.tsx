'use client';

import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { FadeUp } from '@/shared/motion/FadeUp';
import { CopyTextButton } from '@/shared/common/CopyTextButton';
import { PROFILE } from '@/entities/profile/model/profile';
import { cardClassName } from './constants';

export function HomeCta() {
  return (
    <FadeUp delay={0.5}>
      <section className={['p-12 text-center lg:p-16', cardClassName].join(' ')}>
        <h2 className="text-foreground mb-4 text-3xl font-bold">함께 할 수 있을까요?</h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
          책임감을 갖고 나아갈 수 있도록 함께하겠습니다.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CopyTextButton
            text={PROFILE.email}
            toastMessage="이메일을 복사했어요"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold shadow-lg transition"
          >
            <Icon name="mail" size={20} /> 이메일 보내기
          </CopyTextButton>
          <Link
            href={PROFILE.links.resume}
            className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border bg-white/50 px-8 py-4 text-base font-semibold backdrop-blur-sm transition"
          >
            <Icon name="fileText" size={20} /> 이력서 다운로드
          </Link>
        </div>
      </section>
    </FadeUp>
  );
}
