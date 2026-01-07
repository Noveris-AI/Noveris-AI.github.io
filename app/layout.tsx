import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "关系修复助手 | 真诚道歉与沟通",
  description: "在严重惹伴侣生气后，生成真诚、负责、可执行的道歉与沟通方案。强调尊重边界、知情同意，禁止操控性话术。",
  keywords: ["道歉", "关系修复", "沟通", "真诚道歉", "情感建议"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
