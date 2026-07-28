# 일정 맞추기 (Merge Calendar)

주최자가 회의를 만들고, 참석자는 초대 링크로 불가/비선호만 입력한 뒤, 주최자가 히트맵에서 30분 단위로 확정하는 MVP입니다.

스택: **Next.js (App Router) + Supabase + Vercel** · Tailwind · 별도 Spring API 없음.

## 로컬 실행

1. Supabase 프로젝트 생성 후 SQL Editor에서 **순서대로** 실행:
   - `supabase/migrations/001_init.sql`
   - `supabase/migrations/002_invite_rpc.sql` ← 초대 링크(`/m/...`)에 필요
   - `supabase/migrations/003_availability_rpc.sql` ← 이미 제출한 일정 수정에 필요
2. Auth → Email provider ON, Confirm email은 로컬에선 OFF
3. env 설정:

```bash
cp .env.example .env.local
# URL / anon / service_role 채우기
```

4. 실행:

```bash
npm install
npm run dev
```

- 홈: http://localhost:3000  
- 주최자: `/login` → `/meetings/new`  
- 참석자: 회의 생성 후 보이는 `/m/[token]` 링크  

## Smoke

```bash
npm run smoke              # 슬롯 규칙 self-check
npm run smoke:local        # build + 서버 기동 + HTTP 스모크
# 또는 이미 서버가 떠 있으면
SMOKE_BASE_URL=http://127.0.0.1:3000 npm run smoke
```

체크: 홈 200 · 로그인 200 · `/meetings/new` → login 리다이렉트 · 슬롯 30분 규칙.

## 배포 (Vercel)

1. 이 레포를 Vercel에 연결  
2. 위 env 3~4개를 Production에 등록 (`SUPABASE_SERVICE_ROLE_KEY`는 서버 전용)  
3. Supabase Auth Redirect URL에 `https://YOUR_DOMAIN/auth/callback` 추가  

## 보안 체크리스트

- [ ] `service_role` / secret이 클라이언트 번들에 없음 (`NEXT_PUBLIC_` 금지)
- [ ] RLS 켜짐, 호스트는 본인 meeting만
- [ ] 참석자 쓰기는 서버(`service_role`)에서 invite token + 이름 검증 후만
- [ ] 클라이언트가 넘긴 `userId`를 권한 근거로 쓰지 않음 (세션 `auth.getUser()`)

## 제품 메모

- 호스트만 Auth · 참석자는 invite token + 이름
- 날짜 범위 · 하루 시간창 · 요일은 주최자가 설정
- 그리드 라벨은 1시간, 선택은 **30분** 단위
- UI/카피 플로우는 `참고/` HTML 프로토타입을 따름
