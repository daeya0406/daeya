'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems } from './navigation';
import { Button, ButtonNowrap } from '@/shared/ui/Button';
import { useTheme, type Theme } from '@/shared/providers/ThemeProvider';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  return (
    <header className="border-border bg-depth-1/80 sticky left-0 top-0 z-50 border-b backdrop-blur lg:hidden">
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

          <MobileMenu mounted={mounted} theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </header>
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
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      queueMicrotask(() => panelRef.current?.focus());
    } else if (wasOpenRef.current) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  const toggleExpand = (label: string) =>
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));

  return (
    <div className="flex items-center gap-1">
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

      <Button
        ref={menuButtonRef}
        onClick={() => setOpen(true)}
        variant="none"
        size="icon"
        className="h-10 w-10"
      >
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

      {typeof document !== 'undefined'
        ? createPortal(
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="fixed inset-0 z-[9999]"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="mobile-menu-title"
                >
                  <motion.button
                    type="button"
                    aria-label="메뉴 닫기"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/45"
                    onClick={() => setOpen(false)}
                  />
                  <motion.aside
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="border-border bg-depth-1/95 absolute right-0 top-0 h-dvh w-[calc(100vw-100px)] max-w-[400px] border-l shadow-2xl backdrop-blur"
                    ref={panelRef}
                    tabIndex={-1}
                  >
                    <div className="flex items-center justify-between border-b border-border px-4 py-4">
                      <span id="mobile-menu-title" className="text-foreground text-sm font-semibold">
                        메뉴
                      </span>
                      <ButtonNowrap
                        onClick={() => setOpen(false)}
                        variant="none"
                        size="icon"
                        className="h-9 w-9"
                      >
                        <X className="h-4 w-4" />
                      </ButtonNowrap>
                    </div>

                    <div className="flex flex-col gap-1 p-3">
                      {navItems.map((item) => {
                        const active = item.href && pathname.startsWith(item.href.split('?')[0]);
                        const hasChildren = Boolean(item.children?.length);
                        const isExpanded = expanded[item.label];
                        return (
                          <div key={item.label} className="rounded-lg">
                            {hasChildren ? (
                              <button
                                type="button"
                                onClick={() => toggleExpand(item.label)}
                                className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                                  active
                                    ? 'bg-depth-2 text-foreground'
                                    : 'text-muted-foreground hover:bg-depth-2 hover:text-foreground'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  {item.icon ? (
                                    <item.icon
                                      className={`h-4 w-4 ${
                                        active ? 'text-primary' : 'text-muted-foreground'
                                      }`}
                                    />
                                  ) : null}
                                  {item.label}
                                  {item.badge && (
                                    <span className="bg-primary-100 text-primary rounded-full px-2 text-[10px] font-semibold">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                />
                              </button>
                            ) : (
                              <Link
                                href={item.href ?? '#'}
                                onClick={() => setOpen(false)}
                                className={`flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition ${
                                  active
                                    ? 'bg-depth-2 text-foreground'
                                    : 'text-muted-foreground hover:bg-depth-2 hover:text-foreground'
                                }`}
                              >
                                {item.icon ? (
                                  <item.icon
                                    className={`h-4 w-4 ${
                                      active ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                                  />
                                ) : null}
                                {item.label}
                                {item.badge && (
                                  <span className="bg-primary-100 text-primary rounded-full px-2 text-[10px] font-semibold">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            )}

                            <AnimatePresence>
                              {hasChildren && isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.16, ease: 'easeOut' }}
                                  className="flex flex-col gap-1 px-3 pb-3"
                                >
                                  {item.children?.map((child) => (
                                    <Link
                                      key={child.label}
                                      href={child.href ?? '#'}
                                      className="text-muted-foreground hover:bg-depth-2 hover:text-foreground rounded-md px-3 py-2 text-sm transition"
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
                  </motion.aside>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}
