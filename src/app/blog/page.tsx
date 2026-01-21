'use client';

const posts = [
  { title: 'React Query 패턴 정리', date: '2024-08-01', summary: '쿼리/뮤테이션 설계와 캐시 전략' },
  { title: 'RHF + Zod 폼 접근성', date: '2024-07-15', summary: 'aria wiring과 폼 메시지 패턴' },
  { title: 'Next.js 16 전환기록', date: '2024-06-10', summary: 'app router와 서버 액션 적용 메모' },
];

export default function BlogPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Blog</h2>
      <div className="space-y-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="rounded-xl border border-border bg-depth-1 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h4 className="text-2lg font-bold mb-1">{post.title}</h4>
            <span className="text-xs tracking-[0.01em] block text-muted-foreground">
              {post.date}
            </span>
            <p className="mt-1 text-sm text-foreground">{post.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
