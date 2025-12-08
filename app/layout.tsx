// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // ← файл лежит в app/globals.css

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import GlobalLoaderProvider from "@/components/providers/global-loader-provider"; // ← default export!

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalLoaderProvider>
            {children}
            <Toaster />
          </GlobalLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
