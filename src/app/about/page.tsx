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
      <section className="rounded-3xl bg-white p-8 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:bg-slate-950/40 dark:ring-white/10">
        <Text.H2 as="h1" className="text-slate-900 dark:text-slate-50">
          About
        </Text.H2>
        <Text.Body14 className="mt-2 text-slate-600 dark:text-slate-300">
          아래 내용은 임시 텍스트입니다. 본문/수치/링크만 채우면 바로 제출용으로 쓸 수 있게
          구성했어요.
        </Text.Body14>

        <div className="mt-6 flex flex-wrap gap-2">
          <CopyTextButton
            text="you@example.com"
            toastMessage="이메일을 복사했어요"
            className="focus-visible:ring-primary/30 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-slate-50"
          >
            <Mail className="h-4 w-4" /> Email
          </CopyTextButton>
          <Link
            href="https://github.com/"
            target="_blank"
            className="focus-visible:ring-primary/30 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 dark:text-slate-200 dark:hover:bg-slate-800/60 dark:hover:text-slate-50"
          >
            <Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-3xl bg-white p-8 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:bg-slate-950/40 dark:ring-white/10">
            <Text.H3 className="text-slate-900 dark:text-slate-50">요약</Text.H3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-200">
              <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <Text.S14.Bold>문제 정의 → 해결 → 회고</Text.S14.Bold>
                <Text.Caption className="mt-1 text-slate-500 dark:text-slate-400">
                  기능 구현보다 “왜/어떻게”를 문서로 남기는 스타일입니다.
                </Text.Caption>
              </li>
              <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <Text.S14.Bold>UI Engineering</Text.S14.Bold>
                <Text.Caption className="mt-1 text-slate-500 dark:text-slate-400">
                  토큰/타이포/컴포넌트 API를 정리해서 팀 생산성을 높입니다.
                </Text.Caption>
              </li>
              <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/40">
                <Text.S14.Bold>성능/접근성</Text.S14.Bold>
                <Text.Caption className="mt-1 text-slate-500 dark:text-slate-400">
                  CLS/LCP, 키보드 네비게이션 같은 기본기를 챙깁니다.
                </Text.Caption>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:bg-slate-950/40 dark:ring-white/10">
            <Text.H3 className="text-slate-900 dark:text-slate-50">경험</Text.H3>
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
                <div key={x.title} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900/40">
                  <div className="flex items-baseline justify-between gap-4">
                    <Text.S16.Bold className="text-slate-900 dark:text-slate-50">
                      {x.title}
                    </Text.S16.Bold>
                    <Text.Caption className="text-slate-500 dark:text-slate-400">
                      {x.period}
                    </Text.Caption>
                  </div>
                  <Text.Body14 className="mt-2 text-slate-700 dark:text-slate-200">
                    {x.desc}
                  </Text.Body14>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-primary rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold dark:bg-slate-800 dark:text-slate-200">
                      {x.role}
                    </span>
                    {x.skills.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-black/5 dark:bg-slate-800/40 dark:text-slate-300 dark:ring-white/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {x.highlights.length ? (
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-200">
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
          <div className="rounded-3xl bg-white p-8 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:bg-slate-950/40 dark:ring-white/10">
            <Text.H3 className="text-slate-900 dark:text-slate-50">스킬</Text.H3>
            <Text.Caption className="mt-2 text-slate-500 dark:text-slate-400">
              보유 스택을 “주력/경험/관심”으로 나누면 면접에서 설명하기 좋아요.
            </Text.Caption>

            <div className="mt-5 space-y-4">
              {[
                { label: '주력', items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
                { label: '경험', items: ['React Query', 'Supabase', 'Storybook', 'Zod'] },
                { label: '관심', items: ['Design System', 'Accessibility', 'Performance'] },
              ].map((g) => (
                <div key={g.label}>
                  <Text.S14.Bold className="text-slate-900 dark:text-slate-50">
                    {g.label}
                  </Text.S14.Bold>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm shadow-black/5 ring-1 ring-black/5 dark:bg-slate-950/40 dark:ring-white/10">
            <Text.H3 className="text-slate-900 dark:text-slate-50">링크</Text.H3>
            <div className="mt-4 space-y-2">
              {[
                { label: '프로젝트', href: '/portfolio' },
                { label: '노트', href: '/note' },
                { label: '가이드', href: '/guide' },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-900"
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
