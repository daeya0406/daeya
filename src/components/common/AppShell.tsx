'use client';
import * as React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import TopButton from '@/components/common/TopButton';
import { Toaster } from 'sonner';
import { DashboardSidebar } from '@/components/common/DashboardSidebar';
import { useLayoutMode } from '@/components/providers/LayoutModeProvider';
export function AppShell({ children }: { children: React.ReactNode }) {
  const { effectiveMode } = useLayoutMode();
  if (effectiveMode === 'dashboard') {
    return (
      <>
        <div className="flex flex-1">
          <DashboardSidebar />
          <div className="bg-depth-2 min-w-0 flex-1 px-6 py-8">
            <main className="mx-auto w-full max-w-6xl">{children}</main>
          </div>
        </div>
        <Toaster position="bottom-right" richColors />
      </>
    );
  }
  return (
    <>
      <Header /> <main className="container mx-auto flex-1 px-4 py-8">{children}</main>
      <TopButton /> <Footer /> <Toaster position="bottom-right" richColors />
    </>
  );
}
