import { redirect } from 'next/navigation';

/** 레거시 경로 — Note로 연결 */
export default function BlogPage() {
  redirect('/note');
}
