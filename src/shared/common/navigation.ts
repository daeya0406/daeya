import { IconName } from '@/shared/ui/Icons';

export type NavItem = {
  label: string;
  id?: string;
  href?: string;
  badge?: string;
  children?: NavItem[];
  icon?: IconName;
};

export const navItems: NavItem[] = [
  {
    label: 'me',
    href: '/me/profile',
    icon: 'userRound',
    children: [
      { id: 'profile', label: '소개', href: '/me/profile' },
      { id: 'career', label: '경력', href: '/me/career' },
    ],
  },
  {
    label: 'work',
    href: '/work/frontend',
    icon: 'briefcase',
    children: [
      { id: 'publishing', label: '퍼블리싱', href: '/work/publishing' },
      { id: 'frontend', label: '프론트엔드', href: '/work/frontend' },
      { id: 'design', label: '프로덕트 디자인', href: '/work/design' },
    ],
  },
  {
    label: 'hobby',
    href: '/hobby/guide',
    icon: 'flaskConical',
    children: [
      {
        id: 'guide',
        label: '디자인 시스템',
        href: '/hobby/guide',
        children: [
          { label: 'UI', href: '/hobby/guide?tab=ui' },
          { label: 'Font', href: '/hobby/guide?tab=font' },
          { label: 'Color', href: '/hobby/guide?tab=color' },
          // { label: 'Stack', href: '/hobby/guide?tab=stack' },
        ],
      },
      {
        id: 'playground',
        label: '실험실',
        href: '/hobby/playground',
        children: [
          { label: 'Templates', href: '/hobby/playground?tab=templates' },
          { label: 'UI', href: '/hobby/playground?tab=ui' },
          { label: 'UX', href: '/hobby/playground?tab=ux' },
          { label: 'Plugin', href: '/hobby/playground?tab=plugin' },
          { label: 'Testing', href: '/hobby/playground?tab=testing' },
        ],
      },
      {
        id: 'note',
        label: '노트',
        href: '/hobby/note',
        children: [
          { label: 'JS', href: '/hobby/note?tab=js' },
          { label: 'React', href: '/hobby/note?tab=react' },
          { label: 'Hooks', href: '/hobby/note?tab=hooks' },
          { label: 'TS', href: '/hobby/note?tab=ts' },
          { label: 'Next.js', href: '/hobby/note?tab=nextjs' },
          { label: 'Tailwind', href: '/hobby/note?tab=tailwind' },
          { label: 'Troubleshooting', href: '/hobby/note?tab=troubleshooting' },
        ],
      },
      // { id: 'architecture', label: '아키텍처', href: '/hobby/architecture', icon: 'layers' },
      // { id: 'fe-flowset', label: 'FE 플로우셋', href: '/hobby/fe-flowset', icon: 'workflow' },
    ],
  },
];

export function findNavItem(label: string, items: NavItem[] = navItems): NavItem | undefined {
  const needle = label.toLowerCase();
  for (const item of items) {
    const key = (item.id ?? item.label).toLowerCase();
    if (key === needle) return item;
    if (item.children?.length) {
      const found = findNavItem(label, item.children);
      if (found) return found;
    }
  }
  return undefined;
}

export function extractTabsFromNav(label: string) {
  const item = findNavItem(label);
  if (!item?.children) return [];

  return item.children.map((child) => {
    const url = new URL(child.href ?? '', 'http://localhost');
    const tab = url.searchParams.get('tab');
    return {
      key: tab ?? (child.id ?? child.label).toLowerCase(),
      label: child.label,
      href: child.href,
    };
  });
}
