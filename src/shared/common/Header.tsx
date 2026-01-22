'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, ChevronDown, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems } from './navigation';
import { useSupabaseSession } from '@/hooks/useSupabaseSession';
import { supabase } from '@/lib/supabase';
import {
  DropdownOption,
  DropdownOptionContent,
  DropdownOptionItem,
  DropdownOptionTrigger,
} from '@/shared/ui/DropdownOption';
import { Button, ButtonNowrap } from '@/shared/ui/Button';
import { useLayoutMode } from '@/shared/providers/LayoutModeProvider';
import { useTheme, type Theme } from '@/shared/providers/ThemeProvider';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user } = useSupabaseSession();
  const { toggle: toggleLayout, effectiveMode } = useLayoutMode();

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const isActive = (href?: string) => {
    if (!href) return false;
    const clean = href.split('?')[0];
    return clean === '/' ? pathname === '/' : pathname.startsWith(clean);
  };

  return (
    <header className="border-border bg-depth-1/80 sticky left-0 top-0 z-50 border-b backdrop-blur">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Daeya Logo"
              width={32}
              height={17}
              style={{ width: 'auto', height: 'auto' }}
            />
            <span className="text-foreground text-lg font-bold">Daeya Portfolio</span>
          </Link>

          <div className="hidden items-center gap-6 text-sm md:flex">
            <DesktopNav items={navItems} isActive={isActive} />

            <div className="flex items-center gap-2">
              <Button
                onClick={toggleLayout}
                variant="none"
                size="icon"
                className="h-9 w-9"
                title={
                  effectiveMode === 'dashboard'
                    ? '헤더 레이아웃으로 전환'
                    : '대시보드 레이아웃으로 전환'
                }
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>

              <Button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                variant="none"
                size="icon"
                className="h-9 w-9"
              >
                {!mounted ? (
                  <div className="h-5 w-5" />
                ) : theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-300" />
                ) : (
                  <Moon className="text-foreground h-5 w-5" />
                )}
              </Button>
            </div>

            <AuthMenu userEmail={user?.email ?? null} />
          </div>

          <MobileMenu mounted={mounted} theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </header>
  );
}

function DesktopNav({
  items,
  isActive,
}: {
  items: typeof navItems;
  isActive: (href?: string) => boolean;
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  return (
    <nav className="flex gap-2">
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const active = isActive(item.href);
        const open = openLabel === item.label;

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => hasChildren && setOpenLabel(item.label)}
            onMouseLeave={() => hasChildren && setOpenLabel(null)}
          >
            <Link
              href={item.href ?? (hasChildren ? (item.children?.[0]?.href ?? '#') : '#')}
              className={`group flex items-center gap-1 rounded-md px-3 py-2 transition ${
                active
                  ? 'bg-depth-2 text-foreground'
                  : 'text-muted-foreground hover:bg-depth-2 hover:text-foreground'
              }`}
            >
              <span>{item.label}</span>
              {hasChildren && (
                <ChevronDown
                  className={`h-3.5 w-3.5 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
                />
              )}
              {item.badge && (
                <span className="bg-primary-100 text-primary rounded-full px-2 text-[10px] font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>

            <AnimatePresence>
              {hasChildren && open && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="border-border bg-depth-1/95 absolute left-0 top-full mt-0 min-w-[180px] rounded-lg border p-2 pt-3 shadow-lg backdrop-blur"
                >
                  {item.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href ?? '#'}
                      className="text-foreground hover:bg-depth-2 flex items-center justify-between rounded-md px-3 py-2 text-sm transition"
                    >
                      <span>{child.label}</span>
                      {child.badge && (
                        <span className="bg-primary-100 text-primary rounded-full px-2 text-[10px] font-semibold">
                          {child.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

function AuthMenu({ userEmail }: { userEmail: string | null }) {
  const [busy, setBusy] = useState(false);

  const logout = async () => {
    setBusy(true);
    await supabase.auth.signOut();
    setBusy(false);
  };

  if (!userEmail) {
    return (
      <Link
        href="/auth/login"
        className="border-border text-foreground hover:bg-depth-2 rounded-md border px-3 py-2 text-sm font-semibold transition"
      >
        로그인
      </Link>
    );
  }

  return (
    <DropdownOption>
      <DropdownOptionTrigger asChild>
        <ButtonNowrap
          aria-label="프로필 메뉴"
          className="border-border bg-depth-1 text-foreground hover:bg-depth-2 h-9 w-9 rounded-full border shadow-sm transition"
        >
          <User className="h-4 w-4" />
        </ButtonNowrap>
      </DropdownOptionTrigger>
      <DropdownOptionContent align="end" className="w-44">
        <DropdownOptionItem asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" /> 대시보드
          </Link>
        </DropdownOptionItem>
        <DropdownOptionItem disabled className="flex items-center gap-2 text-xs">
          {userEmail}
        </DropdownOptionItem>
        <DropdownOptionItem onClick={logout} disabled={busy} className="flex items-center gap-2">
          <LogOut className="h-4 w-4" /> 로그아웃
        </DropdownOptionItem>
      </DropdownOptionContent>
    </DropdownOption>
  );
}

function MobileMenu({
  mounted,
  theme,
  setTheme,
}: {
  mounted: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleExpand = (label: string) =>
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));

  return (
    <div className="flex items-center gap-1 md:hidden">
      <Button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        variant="none"
        size="icon"
        className="h-9 w-9"
      >
        {!mounted ? (
          <div className="h-5 w-5" />
        ) : theme === 'dark' ? (
          <Sun className="h-5 w-5 text-yellow-300" />
        ) : (
          <Moon className="text-foreground h-5 w-5" />
        )}
      </Button>

      <Button onClick={() => setOpen((v) => !v)} variant="none" size="icon" className="h-10 w-10">
        <span className="sr-only">메뉴 열기</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="border-border bg-depth-1 absolute left-0 top-full mt-0 w-full border-b border-t shadow-lg"
          >
            <div className="flex flex-col gap-1 p-2">
              {navItems.map((item) => {
                const active = item.href && pathname.startsWith(item.href.split('?')[0]);
                const hasChildren = Boolean(item.children?.length);
                const isExpanded = expanded[item.label];
                return (
                  <div
                    key={item.label}
                    className="hover:border-border/80 rounded-lg border border-transparent transition"
                  >
                    <button
                      type="button"
                      onClick={() => (hasChildren ? toggleExpand(item.label) : setOpen(false))}
                      className={
                        'text-foreground flex w-full items-center justify-between rounded-md px-4 py-3 text-left transition'
                      }
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="bg-primary-100 text-primary rounded-full px-2 text-[10px] font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      {hasChildren ? (
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      ) : null}
                    </button>

                    <AnimatePresence>
                      {hasChildren && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="flex flex-col gap-1 p-2"
                        >
                          {item.children?.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href ?? '#'}
                              className="text-foreground hover:bg-depth-2 rounded-md px-3 py-2 text-sm transition"
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
