import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "토익넷 2.0 — TOEIC RC 실전 · AI 대결",
  description:
    "Part 5·6·7 기출 빈출 유형을 골라 집중 연습하고, AI 챌린저와 1:1 속도전으로 실력을 겨루는 토익 RC 학습 앱",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f6f6fb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
