import Link from "next/link";
import { signOut } from "@/app/auth-actions";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {
    // env not configured yet
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      {user ? (
        <div className="mb-8 flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-[13px] shadow-sm">
          <span className="truncate text-toss-muted">
            <span className="font-semibold text-toss-blue">로그인됨</span>
            {" · "}
            {user.email}
          </span>
          <form action={signOut}>
            <button type="submit" className="font-semibold text-toss-faint">
              로그아웃
            </button>
          </form>
        </div>
      ) : null}

      <p className="text-[15px] font-semibold text-toss-blue">일정 맞추기</p>
      <h1 className="mt-3 text-[32px] font-bold leading-tight tracking-tight text-toss-ink">
        여러 사람 일정을
        <br />
        한눈에 맞추기
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-toss-muted">
        참석자는 언제 안 되는지만 입력하고, 주최자는 같은 타임테이블에 겹쳐 봐요.
      </p>
      <div className="mt-10 flex flex-col gap-3">
        {user ? (
          <Link
            href="/meetings/new"
            className="flex h-14 items-center justify-center rounded-2xl bg-toss-blue text-[17px] font-semibold text-white"
          >
            회의 만들기
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex h-14 items-center justify-center rounded-2xl bg-toss-blue text-[17px] font-semibold text-white"
          >
            주최자로 시작하기
          </Link>
        )}
        <p className="text-center text-[13px] text-toss-faint">
          참석자는 초대 링크로 바로 입력해요 (로그인 없음)
        </p>
      </div>
      <ol className="mt-14 space-y-3 text-[15px] text-toss-muted">
        <li>
          <span className="font-semibold text-toss-ink">1.</span> 회의 만들기
        </li>
        <li>
          <span className="font-semibold text-toss-ink">2.</span> 참석자 일정 입력
        </li>
        <li>
          <span className="font-semibold text-toss-ink">3.</span> 가능한 시간 · 확정
        </li>
      </ol>
    </div>
  );
}
