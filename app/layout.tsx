// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GlobalLoaderProvider } from "@/components/providers/global-loader-provider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FF24 Fulfillment — Личный кабинет",
  description: "Фулфилмент для Wildberries, Ozon, Яндекс Маркет и МойСклад",
  keywords: "фулфилмент, склад, маркетплейсы, мойсклад, wildberries, ozon",
  authors: [{ name: "FF24 Team" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        {/* 1. Тёмная тема */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 2. Глобальный грузовик-загрузчик (для useGlobalLoader.show/hide) */}
          <GlobalLoaderProvider>
            {/* 3. Основной контент */}
            {children}

            {/* 4. Уведомления */}
            <Toaster />
          </GlobalLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
