import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "일정 맞추기",
  description: "여러 사람 일정을 한 그리드에 겹쳐 회의 시간을 정해요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
