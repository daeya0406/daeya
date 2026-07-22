import { redirect } from 'next/navigation';

/** 레거시 경로 — Playground로 연결 */
export default function PracticePage() {
  redirect('/playground');
}
