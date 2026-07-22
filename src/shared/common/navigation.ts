import { IconName } from '@/shared/ui/Icons';

export type NavItem = {
  label: string;
  href?: string;
  badge?: string;
  children?: NavItem[];
  icon?: IconName;
};

/** 채용용 내비: About → Portfolio → Lab */
export const navItems: NavItem[] = [
  { label: 'About', href: '/about', icon: 'userRound' },
  { label: 'Portfolio', href: '/portfolio', icon: 'briefcase' },
  {
    label: 'Lab',
    href: '/playground',
    icon: 'flaskConical',
    children: [
      {
        label: 'Playground',
        href: '/playground',
        children: [
          { label: 'Templates', href: '/playground?tab=templates' },
          { label: 'UI', href: '/playground?tab=ui' },
          { label: 'UX', href: '/playground?tab=ux' },
          { label: 'Plugin', href: '/playground?tab=plugin' },
          { label: 'Testing', href: '/playground?tab=testing' },
        ],
      },
      {
        label: 'Note',
        href: '/note',
        children: [
          { label: 'JS', href: '/note?tab=js' },
          { label: 'React', href: '/note?tab=react' },
          { label: 'Hooks', href: '/note?tab=hooks' },
          { label: 'TS', href: '/note?tab=ts' },
          { label: 'Next.js', href: '/note?tab=nextjs' },
          { label: 'Tailwind', href: '/note?tab=tailwind' },
          { label: 'Troubleshooting', href: '/note?tab=troubleshooting' },
        ],
      },
      {
        label: 'Guide',
        href: '/guide',
        children: [
          { label: 'UI', href: '/guide?tab=ui' },
          { label: 'Font', href: '/guide?tab=font' },
          { label: 'Color', href: '/guide?tab=color' },
          { label: 'Stack', href: '/guide?tab=stack' },
        ],
      },
      { label: 'Architecture', href: '/architecture', icon: 'layers' },
      { label: 'FE Flowset', href: '/fe-flowset', icon: 'workflow' },
    ],
  },
];

export function findNavItem(label: string, items: NavItem[] = navItems): NavItem | undefined {
  for (const item of items) {
    if (item.label.toLowerCase() === label.toLowerCase()) return item;
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
      key: tab ?? child.label.toLowerCase(),
      label: child.label,
      href: child.href,
    };
  });
}
