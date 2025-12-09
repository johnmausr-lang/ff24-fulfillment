import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./dashboard/dashboard.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import GlobalLoaderProvider from "@/components/providers/global-loader-provider";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";
import DashboardShell from "@/components/dashboard/DashboardShell"; // новый компонент-обёртка

const inter = Inter({ subsets: ["latin", "cyrillic"] });

// ---------------------------------------------
// ✅ Тут теперь всё корректно — layout серверный
// ---------------------------------------------
export const metadata: Metadata = {
  title: "FF24 Fulfillment — Личный кабинет",
  description: "Фулфилмент для Wildberries, Ozon, Яндекс Маркет и МойСклад",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br 
        from-gray-50 to-gray-100 dark:from-black dark:to-gray-900`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalLoaderProvider>
            {/* Глобальный грузовик */}
            <TruckFullscreenLoader isLoading={false} message="Работаем для вас..." />

            {/* Весь дашборд перенесён в клиентский компонент */}
            <DashboardShell>{children}</DashboardShell>

            <Toaster position="bottom-right" richColors />
          </GlobalLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
