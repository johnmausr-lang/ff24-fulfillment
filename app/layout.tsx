// app/layout.tsx — финальная рабочая версия
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import GlobalLoaderProvider from "@/components/providers/global-loader-provider";
import DashboardSidebar from "./dashboard/DashboardSidebar"; // отдельный сайдбар

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "ФФ24: Фулфилмент",
  description: "Быстрее. Точнее. Надежнее.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <GlobalLoaderProvider>
            {/* Если мы в дашборде — показываем сайдбар, иначе — только контент */}
            <DashboardSidebar>
              {children}
            </DashboardSidebar>
            <Toaster position="bottom-right" richColors />
          </GlobalLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
