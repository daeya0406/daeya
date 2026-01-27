import {
  BookOpen,
  Briefcase,
  FlaskConical,
  Home,
  Layers,
  NotebookPen,
  UserRound,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type NavItem = {
  label: string;
  href?: string;
  badge?: string;
  children?: NavItem[];
  icon?: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: UserRound },
  { label: 'Architecture', href: '/architecture', icon: Layers },
  { label: 'Frontend', href: '/frontend', icon: Workflow },
  { label: 'Portfolio', href: '/portfolio', icon: Briefcase },
  {
    label: 'Guide',
    href: '/guide',
    icon: BookOpen,
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
    icon: NotebookPen,
    children: [
      { label: 'JS', href: '/note?tab=js' },
      { label: 'React', href: '/note?tab=react' },
      { label: 'Hooks', href: '/note?tab=hooks' },
      { label: 'TS', href: '/note?tab=ts' },
      { label: 'Next.js', href: '/note?tab=nextjs' },
      { label: 'Troubleshooting', href: '/note?tab=troubleshooting' },
    ],
  },
  {
    label: 'Playground',
    href: '/playground',
    icon: FlaskConical,
    children: [
      { label: 'Templates', href: '/playground?tab=templates' },
      { label: 'UI', href: '/playground?tab=ui' },
      { label: 'UX', href: '/playground?tab=ux' },
      { label: 'Plugin', href: '/playground?tab=plugin' },
      { label: 'Testing', href: '/playground?tab=testing', badge: 'New' },
    ],
  },
  // {
  //   label: 'Work',
  //   children: [
  //     { label: 'Portfolio', href: '/work?tab=portfolio', badge: 'Soon' },
  //     { label: 'Blog', href: '/work?tab=blog', badge: 'Soon' },
  //     { label: 'Dashboard', href: '/work?tab=dashboard', badge: 'Private' },
  //     { label: 'Cards', href: '/work?tab=cards' },
  //   ],
  // },
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
