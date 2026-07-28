"use server";

import { track } from "@/lib/analytics";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("display_name") ?? "").trim();

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName || undefined } },
  });

  if (error) {
    track("core_action_fail", { action: "signup", reason: error.message });
    return { error: error.message };
  }
  track("signup");

  // Confirm email이 켜져 있으면 세션이 없음 → 회의 페이지로내면 로그인으로 튕김
  if (!data.session) {
    return {
      error:
        "가입은 됐지만 이메일 확인이 필요해요. Supabase Authentication → Providers → Email에서 Confirm email을 끄거나, 메일함의 확인 링크를 열어주세요.",
    };
  }

  redirect("/meetings/new");
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    track("core_action_fail", { action: "login", reason: error.message });
    const msg =
      error.message === "Email not confirmed"
        ? "이메일 확인이 아직 안 됐어요. Supabase에서 Confirm email을 끄거나, 확인 메일의 링크를 열어주세요."
        : error.message === "Invalid login credentials"
          ? "이메일 또는 비밀번호가 맞지 않아요."
          : error.message;
    return { error: msg };
  }
  track("login");
  const next = String(formData.get("next") ?? "/meetings/new");
  redirect(next.startsWith("/") ? next : "/meetings/new");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
