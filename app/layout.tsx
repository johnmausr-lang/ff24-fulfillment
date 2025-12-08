// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";                    // ← ОТ SONNER!
import GlobalLoaderProvider from "@/components/providers/global-loader-provider";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FF24 Fulfillment — Личный кабинет",
  description: "Фулфилмент для Wildberries, Ozon, Яндекс Маркет и МойСклад",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalLoaderProvider>
            {children}
            <Toaster position="bottom-center" richColors closeButton />
          </GlobalLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
