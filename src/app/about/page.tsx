import { Text } from '@/components/ui/Text';
import Link from 'next/link';
import { CopyTextButton } from '@/components/common/CopyTextButton';
import { Github, Mail, ArrowUpRight } from 'lucide-react';
import { getPublicExperiences } from '@/lib/supabase/api/portfolio';

export default async function AboutPage() {
  const experiencesRes = await Promise.allSettled([getPublicExperiences()]);
  const experiences = experiencesRes[0]?.status === 'fulfilled' ? experiencesRes[0].value : [];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-depth-1 p-8 shadow-sm shadow-black/5 ring-1 ring-primary/10">
        <Text.H2 as="h1" className="text-foreground">
          About
        </Text.H2>
        <Text.Body14 className="mt-2 text-muted-foreground">
          아래 내용은 임시 텍스트입니다. 본문/수치/링크만 채우면 바로 제출용으로 쓸 수 있게
          구성했어요.
        </Text.Body14>

        <div className="mt-6 flex flex-wrap gap-2">
          <CopyTextButton
            text="you@example.com"
            toastMessage="이메일을 복사했어요"
            className="inline-flex items-center gap-2 rounded-xl bg-depth-1 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-depth-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <Mail className="h-4 w-4" /> Email
          </CopyTextButton>
          <Link
            href="https://github.com/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-depth-1 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-depth-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-3xl bg-depth-1 p-8 shadow-sm shadow-black/5 ring-1 ring-primary/10">
            <Text.H3 className="text-foreground">요약</Text.H3>
            <ul className="mt-4 space-y-3 text-sm text-text-default">
              <li className="rounded-2xl bg-depth-2 p-4">
                <Text.S14.Bold>문제 정의 → 해결 → 회고</Text.S14.Bold>
                <Text.Caption className="mt-1 text-muted-foreground">
                  기능 구현보다 “왜/어떻게”를 문서로 남기는 스타일입니다.
                </Text.Caption>
              </li>
              <li className="rounded-2xl bg-depth-2 p-4">
                <Text.S14.Bold>UI Engineering</Text.S14.Bold>
                <Text.Caption className="mt-1 text-muted-foreground">
                  토큰/타이포/컴포넌트 API를 정리해서 팀 생산성을 높입니다.
                </Text.Caption>
              </li>
              <li className="rounded-2xl bg-depth-2 p-4">
                <Text.S14.Bold>성능/접근성</Text.S14.Bold>
                <Text.Caption className="mt-1 text-muted-foreground">
                  CLS/LCP, 키보드 네비게이션 같은 기본기를 챙깁니다.
                </Text.Caption>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-depth-1 p-8 shadow-sm shadow-black/5 ring-1 ring-primary/10">
            <Text.H3 className="text-foreground">경험</Text.H3>
            <div className="mt-4 space-y-3">
              {(experiences.length
                ? experiences.map((e) => ({
                    title: `${e.company}${e.team ? ` / ${e.team}` : ''}`,
                    period: `${e.start_date} – ${e.end_date ?? '현재'}`,
                    desc: e.summary ?? '(요약을 채워주세요)',
                    role: e.role,
                    highlights: e.highlights ?? [],
                    skills: e.skills ?? [],
                  }))
                : [
                    {
                      title: '회사/프로젝트 A',
                      period: 'YYYY.MM – YYYY.MM',
                      desc: '프로젝트 설명과 담당 업무(핵심 2~3개)',
                      role: 'Frontend',
                      highlights: ['성과/지표 1', '성과/지표 2'],
                      skills: ['React', 'Next.js'],
                    },
                  ]
              ).map((x) => (
                <div key={x.title} className="rounded-2xl bg-depth-2 p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <Text.S16.Bold className="text-foreground">
                      {x.title}
                    </Text.S16.Bold>
                    <Text.Caption className="text-muted-foreground">
                      {x.period}
                    </Text.Caption>
                  </div>
                  <Text.Body14 className="mt-2 text-foreground">
                    {x.desc}
                  </Text.Body14>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-primary rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold">
                      {x.role}
                    </span>
                    {x.skills.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-depth-2 px-3 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-primary/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {x.highlights.length ? (
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-foreground">
                      {x.highlights.slice(0, 5).map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-3xl bg-depth-1 p-8 shadow-sm shadow-black/5 ring-1 ring-primary/10">
            <Text.H3 className="text-foreground">스킬</Text.H3>
            <Text.Caption className="mt-2 text-muted-foreground">
              보유 스택을 “주력/경험/관심”으로 나누면 면접에서 설명하기 좋아요.
            </Text.Caption>

            <div className="mt-5 space-y-4">
              {[
                { label: '주력', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
                { label: '경험', items: ['React Query', 'Supabase', 'Storybook', 'Zod'] },
                { label: '관심', items: ['Design System', 'Accessibility', 'Performance'] },
              ].map((g) => (
                <div key={g.label}>
                  <Text.S14.Bold className="text-foreground">
                    {g.label}
                  </Text.S14.Bold>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-depth-2 px-3 py-1 text-xs font-semibold text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-depth-1 p-8 shadow-sm shadow-black/5 ring-1 ring-primary/10">
            <Text.H3 className="text-foreground">링크</Text.H3>
            <div className="mt-4 space-y-2">
              {[
                { label: '프로젝트', href: '/portfolio' },
                { label: '노트', href: '/note' },
                { label: '가이드', href: '/guide' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between rounded-2xl bg-depth-2 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-depth-3"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
