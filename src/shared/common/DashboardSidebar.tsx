'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { navItems } from '@/shared/common/navigation';
import { Icon } from '@/shared/ui/Icons';
import type { IconName } from '@/shared/ui/Icons';
import { useEffect, useMemo, useState } from 'react';
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

function isGroupActive(
  pathname: string,
  searchParams: URLSearchParams,
  group: (typeof navItems)[number]
) {
  if (isActiveHref(pathname, searchParams, group.href)) return true;
  return (group.children ?? []).some((c) => isActiveHref(pathname, searchParams, c.href));
}

const SIDEBAR_COLLAPSED_KEY = 'dashboard_sidebar_collapsed';

export function DashboardSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
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
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? '1' : '0');
    } catch {}
  }, [collapsed]);

  const groups = useMemo(() => navItems.filter((g) => g.label !== 'Home'), []);
  const currentParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams]
  );

  const groupIcon = (label: string, icon?: IconName) => {
    if (icon) return <Icon name={icon} size={16} />;

    let iconName: IconName = 'userRound';
    switch (label.toLowerCase()) {
      case 'me':
        iconName = 'userRound';
        break;
      case 'work':
        iconName = 'briefcase';
        break;
      case 'hobby':
        iconName = 'flaskConical';
        break;
      default:
        iconName = 'userRound';
    }
    return <Icon name={iconName} size={16} />;
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
              width={29}
              height={16}
              style={{ width: '29px', height: '16px' }}
            />
            <span className="text-text-primary text-lg font-bold">Daeya</span>
          </Link>
        )}

        <div className="flex items-center gap-2">
          {!collapsed && (
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={iconButtonClassName}
              title="테마 전환"
            >
              {!mounted ? (
                <div className="h-4.5 w-4.5" />
              ) : (
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className={iconButtonClassName}
            title={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
          >
            <Icon name="menu" size={18} />
          </button>
        </div>
      </div>

      {!collapsed && <div className="bg-border/70 mx-5 h-px" />}

      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <div className={collapsed ? 'flex flex-col gap-2' : 'flex flex-col gap-6'}>
          {groups.map((group) => {
            const groupHasChildren = Boolean(group.children?.length);
            const groupActive = isGroupActive(pathname, currentParams, group);

            if (collapsed) {
              return (
                <button
                  key={group.label}
                  type="button"
                  title={group.label}
                  onClick={() => {
                    if (groupHasChildren) {
                      setCollapsed(false);
                      if (!groupActive) {
                        const target = group.children?.[0]?.href ?? group.href;
                        if (target) router.push(target);
                      }
                      return;
                    }
                    if (group.href) router.push(group.href);
                  }}
                  className={[
                    'flex w-full items-center justify-center rounded-xl border border-transparent px-3 py-3 transition',
                    groupActive
                      ? 'bg-primary-100 text-primary'
                      : 'text-text-default hover:bg-depth-2',
                  ].join(' ')}
                >
                  {groupIcon(group.label, group.icon)}
                </button>
              );
            }

            if (!groupHasChildren) {
              return (
                <div key={group.label} className="space-y-2">
                  <p className="text-muted-foreground px-3 text-[11px] font-medium tracking-[0.08em]">
                    {group.label}
                  </p>
                  <Link
                    href={group.href ?? '#'}
                    className={[
                      'flex items-center rounded-xl px-3 py-2 text-sm transition',
                      groupActive
                        ? 'bg-brand-secondary text-primary'
                        : 'text-text-default hover:bg-depth-2',
                    ].join(' ')}
                  >
                    {group.label}
                  </Link>
                </div>
              );
            }

            return (
              <div key={group.label} className="space-y-2">
                <p className="text-muted-foreground px-3 text-[11px] font-medium tracking-[0.08em]">
                  {group.label}
                </p>
                <div className="space-y-1">
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
              </div>
            );
          })}
        </div>
      </nav>

      <div className="border-border border-t px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-depth-3 text-icon-primary flex h-10 w-10 items-center justify-center rounded-full">
            <Icon name="userRound" size={20} />
          </div>
          {!collapsed &&
            (user?.email ? (
              <div className="min-w-0">
                <p className="text-md text-text-primary truncate leading-[17px]">
                  {user.email.split('@')[0]}
                </p>
                <p className="text-text-default truncate text-xs tracking-[0.01em]">
                  {role ? `role: ${role}` : 'signed in'}
                </p>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-text-primary hover:bg-depth-2 rounded-md px-3 py-2 text-sm font-semibold transition"
              >
                로그인
              </Link>
            ))}
        </div>
      </div>
    </aside>
  );
}
