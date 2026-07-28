import '@/app/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { cookies } from 'next/headers';
import Script from 'next/script';
import type { ReactNode } from 'react';

import { AppShell } from '@/shared/common/AppShell';
import { LayoutModeProvider } from '@/shared/providers/LayoutModeProvider';
import { ReactQueryProvider } from '@/shared/providers/ReactQueryProvider';
import { ThemeProvider, type Theme } from '@/shared/providers/ThemeProvider';
export const metadata = {
  title: {
    default: 'Daeya',
    template: '%s · Daeya',
  },
  description: '퍼블리싱 경험 기반 프론트엔드 개발자 김정대 포트폴리오',
  icons: {
    icon: '/daeya-favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get('theme')?.value;
  const initialTheme: Theme = cookieTheme === 'dark' ? 'dark' : 'light';

  return (
    <html
      lang="ko"
      suppressHydrationWarning
      data-theme={initialTheme}
      className={initialTheme === 'dark' ? 'dark' : undefined}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="relative flex min-h-[100dvh] flex-col transition-colors">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] opacity-[0.028] mix-blend-overlay dark:opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id=GTM-K4ZBPZRZ';
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-K4ZBPZRZ');
            `,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4ZBPZRZ"
                height="0" width="0" style="display:none;visibility:hidden">
              </iframe>
            `,
          }}
        />
        <ThemeProvider initialTheme={initialTheme}>
          <LayoutModeProvider>
            <ReactQueryProvider>
              <AppShell>{children}</AppShell>
              <Analytics />
            </ReactQueryProvider>
          </LayoutModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
