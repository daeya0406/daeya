import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp } from '@/shared/motion/FadeUp';
import { cardClassName } from './constants';

export function HomeWhy() {
  return (
    <FadeUp delay={0.45}>
      <section className={['overflow-hidden', cardClassName].join(' ')}>
        <div className="grid lg:grid-cols-2">
          <div className="from-primary/5 bg-gradient-to-br to-transparent p-8 lg:p-12">
            <div className="text-primary mb-3 text-sm font-semibold uppercase tracking-wider">
              Why Work With Me
            </div>
            <h2 className="text-foreground mb-6 text-3xl font-bold">
              이런 개발자를
              <br />
              찾고 계신가요?
            </h2>
            <ul className="space-y-4">
              {[
                '디자인 시스템을 구축해서 팀 생산성을 높일 수 있는',
                '기술 선택에 근거를 제시할 수 있는',
                '사용자 경험을 개선할 수 있는',
                '문서화로 인수인계를 쉽게 만들 수 있는',
              ].map((text) => (
                <li key={text} className="flex gap-2">
                  <span className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  <span className="text-foreground">{text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="text-primary mt-8 inline-flex items-center gap-2 font-semibold transition hover:gap-3"
            >
              더 자세히 알아보기 <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex flex-col justify-center space-y-8 p-8 lg:p-12">
            {[
              { metric: '5년 + 퍼블리싱', label: '빠른 마크업 세팅 속도' },
              { metric: '프로젝트 경험', label: '웹표준접근성 기반 경력 5년' },
              { metric: '~ing', label: '꾸준한 성능 개선' },
            ].map((item) => (
              <div key={item.label} className="border-primary border-l-4 pl-6">
                <div className="text-primary text-2xl font-bold">{item.metric}</div>
                <div className="text-muted-foreground mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FadeUp>
  );
}
