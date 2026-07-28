import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description: '김정대 소개, 기술 스택, 작업 원칙',
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return children;
}
