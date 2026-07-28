import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: '/about', destination: '/me/profile', permanent: true },
      { source: '/portfolio', destination: '/work/frontend', permanent: true },
      { source: '/portfolio/:slug', destination: '/work/frontend/:slug', permanent: true },
      { source: '/work', destination: '/work/frontend', permanent: true },
      { source: '/playground', destination: '/hobby/playground', permanent: true },
      { source: '/note', destination: '/hobby/note', permanent: true },
      { source: '/guide', destination: '/hobby/guide', permanent: true },
      { source: '/architecture', destination: '/hobby/architecture', permanent: true },
      { source: '/fe-flowset', destination: '/hobby/fe-flowset', permanent: true },
      { source: '/blog', destination: '/hobby/note', permanent: true },
      { source: '/practice', destination: '/hobby/playground', permanent: true },
    ];
  },
};

export default nextConfig;
