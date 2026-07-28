# Daeya Portfolio

Next.js 16 + React 19 기반 개인 포트폴리오입니다.

## 구조

| 1뎁스 | 경로 |
| --- | --- |
| **me** | `/me/profile`, `/me/career` |
| **work** | `/work/publishing`, `/work/design`, `/work/frontend` |
| **hobby** | `/hobby/playground`, `/hobby/note`, `/hobby/guide`, ... |

콘텐츠는 `src/content/`에서 관리하고, 페이지는 `src/features/` 컴포넌트를 조합합니다.

## 스택

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- Framer Motion, Recharts, Swiper
- Supabase (auth), React Query, Zustand

## 실행

```bash
pnpm install
pnpm dev
```

## 퍼블리싱 포트폴리오

SI·퍼블리싱 상세는 `public/publishing/` 정적 사이트에서 제공합니다.  
Next 앱의 `/work/publishing`은 랜딩·카드 뷰 역할입니다.
