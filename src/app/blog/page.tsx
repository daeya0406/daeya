'use client';

import { Text } from '@/components/ui/Text';

const posts = [
  { title: 'React Query 패턴 정리', date: '2024-08-01', summary: '쿼리/뮤테이션 설계와 캐시 전략' },
  { title: 'RHF + Zod 폼 접근성', date: '2024-07-15', summary: 'aria wiring과 폼 메시지 패턴' },
  { title: 'Next.js 16 전환기록', date: '2024-06-10', summary: 'app router와 서버 액션 적용 메모' },
];

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <Text.H2 className="mb-6">Blog</Text.H2>
      <div className="space-y-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-xl border border-border bg-bg-depth-1 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Text.H4 className="mb-1">{post.title}</Text.H4>
            <Text.Caption className="block text-muted-foreground">{post.date}</Text.Caption>
            <p className="mt-1 text-sm text-foreground">{post.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
