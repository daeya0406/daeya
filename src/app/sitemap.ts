import type { MetadataRoute } from 'next';
import { getFrontendProjects } from '@/content/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://daeya.dev';

  const staticRoutes = [
    '',
    '/me/profile',
    '/me/career',
    '/work/frontend',
    '/work/design',
    '/work/publishing',
    '/hobby/playground',
    '/hobby/note',
    '/hobby/guide',
    '/hobby/architecture',
    '/hobby/fe-flowset',
  ];

  const projectRoutes = getFrontendProjects().map((project) => `/work/frontend/${project.id}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
