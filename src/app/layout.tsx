import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "퍼펙토익 · PerfecTOEIC — 토익 LC·RC 실전 학습",
  description:
    "파트·빈출 유형별 실전 문제, 4개국 원어민 리스닝, AI 대결, 레벨 진단까지. 한 문제씩 완성하는 토익 만점 학습 앱, 퍼펙토익.",
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
