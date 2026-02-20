'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Icon } from '@/shared/ui/Icons';
import { CopyTextButton } from '@/shared/common/CopyTextButton';
import { HOME_HERO } from '@/entities/home/model/home';
import { PROFILE } from '@/entities/profile/model/profile';

const BASE_URL =
  'https://hurnvaxkciwzrvzpcfbs.supabase.co/storage/v1/object/public/scroll-animation';
const FRAME_COUNT = 100;

function getFrameUrl(index: number) {
  const frameNum = String(index).padStart(3, '0');
  const delay = index % 2 === 0 ? '0.06' : '0.07';
  return `${BASE_URL}/frame_${frameNum}_delay-${delay}s.webp`;
}

export function HomeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  // 이미지 프리로드
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = getFrameUrl(i);
      images.push(img);
    }

    imagesRef.current = images;

    // 첫 프레임 렌더링
    const firstImg = images[0];
    if (firstImg) {
      firstImg.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
          canvas.width = 480;
          canvas.height = 480;
          ctx.drawImage(firstImg, 0, 0, 480, 480);
        }
      };
    }
  }, []);

  // 스크롤 애니메이션
  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 1.5;
      const progress = Math.min(scrollY / maxScroll, 1);
      const frameIndex = Math.floor(progress * (FRAME_COUNT - 1));

      if (frameIndex === currentFrameRef.current) return;
      currentFrameRef.current = frameIndex;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const img = imagesRef.current[frameIndex];

      if (!canvas || !ctx || !img) return;

      // 이미지 로드 확인
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, 480, 480);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 렌더링

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[200vh]">
      <div className="top-30 sticky overflow-hidden lg:top-20 lg:h-[calc(100vh-80px)]">
        {/* 콘텐츠 */}
        <div className="relative flex h-auto items-center justify-center px-4 lg:h-full">
          <div className="mx-auto w-full max-w-6xl pt-0">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              {/* 왼쪽 - Canvas */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-depth-1 ring-border relative overflow-hidden rounded-3xl ring-1">
                  <canvas
                    ref={canvasRef}
                    width={480}
                    height={480}
                    className="block h-auto w-full"
                    style={{ maxWidth: '360px' }}
                  />

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white drop-shadow-2xl lg:text-8xl">
                      Scroll Motion
                    </h1>
                  </div>
                </div>
              </div>

              {/* 오른쪽 - 텍스트 */}
              <div className="text-center lg:text-left">
                <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                    <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  프론트엔드 개발자 포트폴리오
                </div>

                <h2 className="text-foreground mb-6 text-4xl font-bold leading-tight lg:text-5xl">
                  사용자 경험과 유지보수를
                  <br />
                  <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
                    함께 설계하는
                  </span>{' '}
                  개발자
                </h2>

                <p className="text-muted-foreground mb-10 text-lg leading-relaxed lg:text-xl">
                  {HOME_HERO.subheadline}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                  <Link
                    href="/portfolio"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20 group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold shadow-lg transition"
                  >
                    프로젝트 보기
                    <Icon
                      name="arrowUpRight"
                      size={20}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href="/about"
                    className="text-foreground hover:bg-muted border-border inline-flex items-center gap-2 rounded-xl border bg-white/50 px-8 py-4 text-base font-semibold backdrop-blur-sm transition"
                  >
                    자세히 알아보기
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm lg:justify-start">
                  <CopyTextButton
                    text={PROFILE.email}
                    toastMessage="이메일을 복사했어요"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition"
                  >
                    <Icon name="mail" /> {PROFILE.email}
                  </CopyTextButton>
                  <Link
                    href={PROFILE.links.github}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition"
                  >
                    <Icon name="github" /> GitHub
                  </Link>
                  <Link
                    href={PROFILE.links.publishingPortfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 transition"
                  >
                    <Icon name="externalLink" /> 퍼블리싱
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
