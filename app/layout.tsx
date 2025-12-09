// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./dashboard/dashboard.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import GlobalLoaderProvider from "@/components/providers/global-loader-provider";

import DashboardLayout from "./dashboard/layout";

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "FF24 Fulfillment — Личный кабинет",
  description: "Фулфилмент для Wildberries, Ozon, Яндекс Маркет и МойСклад",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GlobalLoaderProvider>
            {/* Автоопределение: если путь /dashboard/* — показываем дашборд с сайдбаром */}
            <DashboardLayout>
              {children}
            </DashboardLayout>
            <Toaster position="bottom-right" richColors closeButton />
          </GlobalLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
