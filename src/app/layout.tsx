import '@/app/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { cookies } from 'next/headers';
import Script from 'next/script';
import type { ReactNode } from 'react';

import { AppShell } from '@/components/common/AppShell';
import { LayoutModeProvider } from '@/components/providers/LayoutModeProvider';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { ThemeProvider, type Theme } from '@/components/providers/ThemeProvider';
export const metadata = {
  title: 'Daeya Portfolio',
  description: '프론트엔드 개발자 김정대 포트폴리오',
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
      <body className="flex min-h-screen flex-col transition-colors">
        {/* GA 추가 Start */}
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
        {/* GA 추가 End */}
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
