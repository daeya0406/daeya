import { redirect } from 'next/navigation';

/** 레거시 경로 — 포트폴리오로 연결 */
export default function WorkPage() {
  redirect('/portfolio');
}
