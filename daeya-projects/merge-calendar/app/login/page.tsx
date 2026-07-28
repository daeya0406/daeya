"use client";

import { signIn, signUp } from "@/app/auth-actions";
import { CtaButton, PhoneShell } from "@/components/ui";
import { useState, useTransition } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <PhoneShell title={mode === "login" ? "로그인" : "가입"}>
      <h2 className="text-[22px] font-bold">
        {mode === "login" ? "주최자 로그인" : "주최자 가입"}
      </h2>
      <p className="mt-2 text-[15px] text-toss-muted">
        회의를 만들고 확정하려면 계정이 필요해요
      </p>

      <form
        className="mt-8 space-y-3"
        action={(fd) => {
          setError(null);
          startTransition(async () => {
            const res = mode === "login" ? await signIn(fd) : await signUp(fd);
            if (res?.error) setError(res.error);
          });
        }}
      >
        {mode === "signup" ? (
          <label className="field-card">
            <span className="text-[13px] font-semibold text-toss-faint">이름</span>
            <input
              name="display_name"
              className="field-input"
              placeholder="김다연"
              autoComplete="name"
            />
          </label>
        ) : null}
        <label className="field-card">
          <span className="text-[13px] font-semibold text-toss-faint">이메일</span>
          <input
            name="email"
            type="email"
            required
            className="field-input"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>
        <label className="field-card">
          <span className="text-[13px] font-semibold text-toss-faint">비밀번호</span>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="field-input"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
        </label>
        <input type="hidden" name="next" value="/meetings/new" />
        {error ? <p className="text-[14px] text-toss-red">{error}</p> : null}
        <CtaButton type="submit" disabled={pending}>
          {pending ? "처리 중…" : mode === "login" ? "로그인" : "가입하기"}
        </CtaButton>
      </form>

      <button
        type="button"
        className="mt-6 w-full text-center text-[15px] font-semibold text-toss-blue"
        onClick={() => {
          setError(null);
          setMode((m) => (m === "login" ? "signup" : "login"));
        }}
      >
        {mode === "login" ? "계정이 없나요? 가입" : "이미 있나요? 로그인"}
      </button>
    </PhoneShell>
  );
}
