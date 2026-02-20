import { IconName } from '@/shared/ui/Icons';

export type NavItem = {
  label: string;
  href?: string;
  badge?: string;
  children?: NavItem[];
  icon?: IconName;
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'About', href: '/about', icon: 'userRound' },
  { label: 'Architecture', href: '/architecture', icon: 'layers' },
  { label: 'FE Flowset', href: '/fe-flowset', icon: 'workflow' },
  { label: 'Portfolio', href: '/portfolio', icon: 'briefcase' },
  {
    label: 'Guide',
    href: '/guide',
    icon: 'bookOpen',
    children: [
      { label: 'UI', href: '/guide?tab=ui' },
      { label: 'Font', href: '/guide?tab=font' },
      { label: 'Color', href: '/guide?tab=color' },
      { label: 'Stack', href: '/guide?tab=stack' },
    ],
  },
  {
    label: 'Note',
    href: '/note',
    icon: 'notebookPen',
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
    label: 'Playground',
    href: '/playground',
    icon: 'flaskConical',
    children: [
      { label: 'Templates', href: '/playground?tab=templates' },
      { label: 'UI', href: '/playground?tab=ui' },
      { label: 'UX', href: '/playground?tab=ux' },
      { label: 'Plugin', href: '/playground?tab=plugin' },
      { label: 'Testing', href: '/playground?tab=testing', badge: 'New' },
    ],
  },
];

export function findNavItem(label: string) {
  return navItems.find((item) => item.label.toLowerCase() === label.toLowerCase());
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
