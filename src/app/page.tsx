import Image from 'next/image';
import Link from 'next/link';
import { Text } from '@/components/ui/Text';
import { CopyTextButton } from '@/components/common/CopyTextButton';
import { ArrowUpRight, Github, Mail, FileText } from 'lucide-react';
import {
  getPublicExperiences,
  getPublicStudyPosts,
  getPublicTasks,
} from '@/lib/supabase/api/portfolio';
import type { TaskStatus } from '@/types/task';
import { FadeUp } from '@/components/motion/FadeUp';
const cardClassName = 'rounded-3xl bg-depth-1 shadow-sm ring-1 ring-border';
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className={['flex flex-col gap-1 p-5', cardClassName].join(' ')}>
      <Text.Caption className="text-muted-foreground">{label}</Text.Caption>
      <Text.H3 className="text-foreground">{value}</Text.H3>
    </div>
  );
}
export default async function HomePage() {
  const [experiencesRes, tasksRes, postsRes] = await Promise.allSettled([
    getPublicExperiences(),
    getPublicTasks(),
    getPublicStudyPosts(12),
  ]);
  const experiences = experiencesRes.status === 'fulfilled' ? experiencesRes.value : [];
  const tasks = tasksRes.status === 'fulfilled' ? tasksRes.value : [];
  const posts = postsRes.status === 'fulfilled' ? postsRes.value : [];
  const byStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status).sort((a, b) => a.sort_order - b.sort_order);
  const todo = byStatus('todo');
  const doing = byStatus('doing');
  const done = byStatus('done');
  return (
    <div className="space-y-8">
      <FadeUp>
        <section className={['p-8', cardClassName].join(' ')}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 text-primary flex h-12 w-12 items-center justify-center rounded-2xl">
                <Image src="/logo.png" alt="Daeya" width={32} height={18} />
              </div>
              <div className="min-w-0">
                <Text.H2 as="h1" className="text-foreground">
                  프론트엔드 개발자 Daeya
                </Text.H2>
                <Text.Body14 className="text-muted-foreground mt-2">
                  디자인 시스템/성능/개발자 경험을 균형 있게 챙기며, 제품 완성도를 끌어올리는 것을
                  좋아합니다.
                </Text.Body14>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-primary border-primary bg-primary-100 rounded-full border px-3 py-1 text-xs font-semibold">
                    React
                  </span>
                  <span className="bg-depth-2 text-foreground rounded-full px-3 py-1 text-xs font-semibold">
                    Next.js
                  </span>
                  <span className="bg-depth-2 text-foreground rounded-full px-3 py-1 text-xs font-semibold">
                    TypeScript
                  </span>
                  <span className="bg-depth-2 text-foreground rounded-full px-3 py-1 text-xs font-semibold">
                    UI Engineering
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/about"
                className="focus-visible:ring-primary/30 text-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2"
              >
                About <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="bg-primary hover:bg-primary/90 focus-visible:ring-primary/40 text-primary-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2"
              >
                Projects <ArrowUpRight className="h-4 w-4" />
              </Link>
              <CopyTextButton
                text="you@example.com"
                toastMessage="이메일을 복사했어요"
                className="focus-visible:ring-primary/30 text-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2"
              >
                <Mail className="h-4 w-4" /> Email
              </CopyTextButton>
              <Link
                href="https://github.com/"
                target="_blank"
                className="focus-visible:ring-primary/30 text-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2"
              >
                <Github className="h-4 w-4" /> GitHub
              </Link>
              <Link
                href="/resume.pdf"
                className="focus-visible:ring-primary/30 text-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2"
              >
                <FileText className="h-4 w-4" /> Resume
              </Link>
            </div>
          </div>
        </section>
      </FadeUp>
      <FadeUp delay={0.05}>
        <section className="grid gap-3 md:grid-cols-3">
          <Stat label="경력/프로젝트" value={String(experiences.length)} />
          <Stat label="기술 스택" value="React · Next.js" />
          <Stat label="학습 기록" value={String(posts.length)} />
        </section>
      </FadeUp>
      <section className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <FadeUp delay={0.08}>
            <div className={['p-8', cardClassName].join(' ')}>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <Text.H3 className="text-foreground">진행 상황</Text.H3>
                  <Text.Body14 className="text-muted-foreground mt-1">
                    현재 포트폴리오를 대시보드 UI로 정리 중입니다. (내용은 추후 채워주세요)
                  </Text.Body14>
                </div>
                <div className="text-right">
                  <Text.Caption className="text-muted-foreground">이번 주 목표</Text.Caption>
                  <Text.H2 className="text-primary">25%</Text.H2>
                </div>
              </div>
              <div className="mt-6">
                <div className="bg-depth-2 h-4 w-full rounded-full">
                  <div className="bg-primary h-4 w-[25%] rounded-full" />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="bg-depth-2 rounded-2xl p-4">
                    <Text.Caption className="text-muted-foreground">오늘의 할 일</Text.Caption>
                    <Text.H3 className="text-foreground mt-1">20</Text.H3>
                  </div>
                  <div className="bg-depth-2 rounded-2xl p-4">
                    <Text.Caption className="text-muted-foreground">완료</Text.Caption>
                    <Text.H3 className="text-foreground mt-1">5</Text.H3>
                  </div>
                  <div className="bg-depth-2 rounded-2xl p-4">
                    <Text.Caption className="text-muted-foreground">다음 작업</Text.Caption>
                    <Text.Body14 className="text-foreground mt-1">Projects 섹션 채우기</Text.Body14>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className={['p-6', cardClassName].join(' ')}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Text.H3 className="text-foreground">할 일 보드</Text.H3>
                  <Text.Caption className="text-muted-foreground mt-1">
                    Supabase tasks 기반의 칸반(읽기 전용). 작성/드래그는 다음 단계에서 붙이면 돼요.
                  </Text.Caption>
                </div>
              </div>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {[
                  { title: '할 일', items: todo.map((t) => t.title) },
                  { title: '진행중', items: doing.map((t) => t.title) },
                  { title: '완료', items: done.map((t) => t.title) },
                ].map((col) => (
                  <div key={col.title} className="bg-depth-2 rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                      <Text.S14.Bold className="text-foreground">{col.title}</Text.S14.Bold>
                      <span className="bg-depth-3 text-foreground rounded-full px-2 py-0.5 text-[11px] font-semibold">
                        {col.items.length}
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {(col.items.length ? col.items : ['(표시할 항목이 없습니다)']).map((item) => (
                        <div
                          key={item}
                          className="bg-depth-1 text-foreground ring-border/60 rounded-2xl p-3 text-sm shadow-sm ring-1"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
        <div className="space-y-6 lg:col-span-4">
          <FadeUp delay={0.12}>
            <div className={['p-6', cardClassName].join(' ')}>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <Text.H3 className="text-foreground">학습 로그</Text.H3>
                  <Text.Caption className="text-muted-foreground mt-1">
                    Supabase `study_posts` 기반 테이블(읽기 전용)
                  </Text.Caption>
                </div>
                <Link
                  href="/note"
                  className="text-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold transition"
                >
                  Note <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="ring-border/60 mt-4 overflow-hidden rounded-2xl ring-1">
                <table className="w-full text-left text-sm">
                  <thead className="bg-depth-2 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Title</th>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-depth-1 text-foreground">
                    {(posts.length ? posts : []).slice(0, 8).map((p) => (
                      <tr key={p.id} className="border-border/70 border-t">
                        <td className="px-4 py-3">
                          {p.url ? (
                            <Link
                              href={p.url}
                              target="_blank"
                              className="font-semibold hover:underline"
                            >
                              {p.title}
                            </Link>
                          ) : (
                            <span className="font-semibold">{p.title}</span>
                          )}
                          {p.summary ? (
                            <div className="text-muted-foreground mt-1 text-xs"> {p.summary} </div>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">{p.category}</td>
                        <td className="px-4 py-3">{p.published_at}</td>
                      </tr>
                    ))}
                    {posts.length === 0 ? (
                      <tr>
                        <td className="text-muted-foreground px-4 py-6" colSpan={3}>
                          `study_posts`가 비어있어요. Supabase에 데이터 넣으면 여기가 채워집니다.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.14}>
            <div className={['p-6', cardClassName].join(' ')}>
              <Text.H3 className="text-foreground">하이라이트</Text.H3>
              <ul className="text-foreground mt-4 space-y-3 text-sm">
                <li className="bg-depth-2 rounded-2xl p-4">
                  <Text.S14.Bold>Design Tokens</Text.S14.Bold>
                  <Text.Caption className="text-muted-foreground mt-1">
                    컬러/타이포를 토큰으로 통일해서 유지보수성 확보
                  </Text.Caption>
                </li>
                <li className="bg-depth-2 rounded-2xl p-4">
                  <Text.S14.Bold>SSR / Hydration</Text.S14.Bold>
                  <Text.Caption className="text-muted-foreground mt-1">
                    클라이언트 컴포넌트 최소화 + 하이드레이션 이슈 대응
                  </Text.Caption>
                </li>
                <li className="bg-depth-2 rounded-2xl p-4">
                  <Text.S14.Bold>UX</Text.S14.Bold>
                  <Text.Caption className="text-muted-foreground mt-1">
                    네비게이션, 아코디언, active 상태 일관성
                  </Text.Caption>
                </li>
              </ul>
            </div>
          </FadeUp>
          <FadeUp delay={0.16}>
            <div className={['p-6', cardClassName].join(' ')}>
              <Text.H3 className="text-foreground">다음 단계</Text.H3>
              <Text.Body14 className="text-muted-foreground mt-2">
                아래 항목은 네가 직접 채우기 좋은 영역으로 남겨놨어요.
              </Text.Body14>
              <div className="text-foreground mt-4 space-y-2 text-sm">
                <div className="bg-depth-2 rounded-2xl p-4"> 프로젝트 3개 상세 작성 </div>
                <div className="bg-depth-2 rounded-2xl p-4"> 성과/지표 기반 스토리 추가 </div>
                <div className="bg-depth-2 rounded-2xl p-4">
                  기술 선택 근거(Trade-off) 정리
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
