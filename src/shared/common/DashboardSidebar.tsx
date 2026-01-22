'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { navItems } from '@/shared/common/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/Accordion';
import {
  BookOpen,
  Briefcase,
  FlaskConical,
  LayoutDashboard,
  Menu,
  Moon,
  NotebookPen,
  Sun,
  UserRound,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLayoutMode } from '@/shared/providers/LayoutModeProvider';
import { useSupabaseSession } from '@/hooks/useSupabaseSession';
import { useTheme } from '@/shared/providers/ThemeProvider';

function isActiveHref(pathname: string, searchParams: URLSearchParams, href?: string) {
  if (!href) return false;
  const url = new URL(href, 'http://localhost');

  if (url.pathname !== pathname) return false;

  for (const [key, value] of url.searchParams.entries()) {
    if (searchParams.get(key) !== value) return false;
  }

  return true;
}

const SIDEBAR_COLLAPSED_KEY = 'dashboard_sidebar_collapsed';

export function DashboardSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { toggle } = useLayoutMode();
  const { user, role } = useSupabaseSession();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
      queueMicrotask(() => setCollapsed(saved === '1'));
    } catch {
      // 생략
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0');
    } catch {
      // 생략
    }
  }, [collapsed]);

  const groups = useMemo(() => {
    return navItems.filter((g) => g.label !== 'Home');
  }, []);

  const activeAccordionGroupLabel = useMemo(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    for (const group of groups) {
      const hasChildren = Boolean(group.children?.length);
      if (!hasChildren) continue;

      if (isActiveHref(pathname, currentParams, group.href)) return group.label;
      for (const child of group.children ?? []) {
        if (isActiveHref(pathname, currentParams, child.href)) return group.label;
      }
    }
    return null;
  }, [groups, pathname, searchParams]);

  const firstAccordionGroupLabel = useMemo(() => {
    return groups.find((g) => Boolean(g.children?.length))?.label;
  }, [groups]);

  const [openGroup, setOpenGroup] = useState<string | undefined>(
    activeAccordionGroupLabel ?? firstAccordionGroupLabel
  );

  useEffect(() => {
    if (!activeAccordionGroupLabel) return;
    queueMicrotask(() => setOpenGroup(activeAccordionGroupLabel));
  }, [activeAccordionGroupLabel]);

  const groupIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'about':
        return <UserRound className="h-4 w-4" />;
      case 'portfolio':
        return <Briefcase className="h-4 w-4" />;
      case 'guide':
        return <BookOpen className="h-4 w-4" />;
      case 'note':
        return <NotebookPen className="h-4 w-4" />;
      case 'playground':
        return <FlaskConical className="h-4 w-4" />;
      // case 'work':
      //   return <Briefcase className="h-4 w-4" />;
      default:
        return <UserRound className="h-4 w-4" />;
    }
  };

  const iconButtonClassName =
    'flex h-9 w-9 items-center justify-center rounded-xl text-icon-primary transition hover:bg-depth-2 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30';

  return (
    <aside
      className={[
        'border-border bg-depth-1/75 sticky top-0 hidden h-dvh flex-col border-r backdrop-blur lg:flex',
        collapsed ? 'w-[92px]' : 'w-[280px]',
      ].join(' ')}
    >
      {/* Top bar */}
      <div
        className={[
          'flex items-center gap-3 px-5 py-4',
          collapsed ? 'justify-center' : 'justify-between',
        ].join(' ')}
      >
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Daeya Logo"
              width={26}
              height={14}
              style={{ width: 'auto', height: 'auto' }}
            />
            <span className="text-text-primary text-lg font-bold">Daeya</span>
          </Link>
        )}

        <div className="flex items-center gap-2">
          {!collapsed && (
            <>
              <button
                type="button"
                onClick={toggle}
                className={iconButtonClassName}
                title="헤더 레이아웃으로 전환"
              >
                <LayoutDashboard className="h-4.5 w-4.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={iconButtonClassName}
                title="테마 전환"
              >
                {!mounted ? (
                  <div className="h-4.5 w-4.5" />
                ) : theme === 'dark' ? (
                  <Sun className="h-4.5 w-4.5" />
                ) : (
                  <Moon className="h-4.5 w-4.5" />
                )}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className={iconButtonClassName}
            title={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
          >
            <Menu className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {!collapsed && <div className="bg-border/70 mx-5 h-px" />}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <Accordion
          type="single"
          collapsible
          value={openGroup}
          onValueChange={setOpenGroup}
          className="flex flex-col gap-2"
        >
          {groups.map((group) => {
            const currentParams = new URLSearchParams(searchParams.toString());
            const groupHasChildren = Boolean(group.children?.length);
            const groupActive =
              isActiveHref(pathname, currentParams, group.href) ||
              (group.children ?? []).some((c) => isActiveHref(pathname, currentParams, c.href));

            if (collapsed) {
              return (
                <button
                  key={group.label}
                  type="button"
                  title={group.label}
                  onClick={() => {
                    if (groupHasChildren) {
                      setCollapsed(false);
                      setOpenGroup(group.label);
                      if (!groupActive) {
                        const target = group.children?.[0]?.href ?? group.href;
                        if (target) router.push(target);
                      }
                      return;
                    }
                    if (group.href) window.location.href = group.href;
                  }}
                  className={[
                    'flex w-full items-center justify-center rounded-xl border border-transparent px-3 py-3 transition',
                    groupActive
                      ? 'bg-primary-100 text-primary'
                      : 'text-text-default hover:bg-depth-2',
                  ].join(' ')}
                >
                  {groupIcon(group.label)}
                </button>
              );
            }

            if (!groupHasChildren) {
              return (
                <Link
                  key={group.label}
                  href={group.href ?? '#'}
                  className={[
                    'flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition',
                    groupActive
                      ? 'bg-primary-100 text-primary'
                      : 'text-text-default hover:bg-depth-2',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'inline-flex h-7 w-7 items-center justify-center',
                      groupActive ? 'text-primary' : 'text-icon-primary',
                    ].join(' ')}
                  >
                    {groupIcon(group.label)}
                  </span>
                  <span className="font-semibold">{group.label}</span>
                </Link>
              );
            }

            return (
              <AccordionItem key={group.label} value={group.label} className="border-none">
                <AccordionTrigger
                  className={[
                    'hover:bg-depth-2 rounded-xl px-3 py-2 text-sm hover:no-underline',
                    groupActive ? 'text-text-primary' : 'text-text-default',
                  ].join(' ')}
                >
                  <span
                    className="flex flex-1 items-center gap-2"
                    onClick={(e) => {
                      // "Icon/label click" should navigate (not toggle).
                      // Chevron click should only toggle.
                      e.stopPropagation();
                      const target = group.children?.[0]?.href ?? group.href;
                      if (target && !groupActive) router.push(target);
                    }}
                  >
                    <span
                      className={[
                        'inline-flex h-7 w-7 items-center justify-center',
                        groupActive ? 'text-primary' : 'text-icon-primary',
                      ].join(' ')}
                    >
                      {groupIcon(group.label)}
                    </span>
                    <span className="font-semibold">{group.label}</span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pb-2">
                  <div className="space-y-1 pl-10">
                    {(group.children ?? []).map((child) => {
                      const active = isActiveHref(pathname, currentParams, child.href);
                      return (
                        <Link
                          key={child.label}
                          href={child.href ?? '#'}
                          className={[
                            'flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition',
                            active
                              ? 'bg-brand-secondary text-primary'
                              : 'text-text-default hover:bg-depth-2',
                          ].join(' ')}
                        >
                          <span>{child.label}</span>
                          {child.badge ? (
                            <span className="bg-brand-secondary text-primary rounded-full px-2 py-0.5 text-[10px] font-semibold">
                              {child.badge}
                            </span>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </nav>

      <div className="border-border border-t px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-depth-3 text-icon-primary flex h-10 w-10 items-center justify-center rounded-full">
            <UserRound className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-md text-text-primary truncate leading-[17px]">
                {user?.email ? user.email.split('@')[0] : 'Guest'}
              </p>
              <p className="text-text-default truncate text-xs tracking-[0.01em]">
                {role ? `role: ${role}` : 'not signed in'}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
