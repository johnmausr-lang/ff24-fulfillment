// app/layout.tsx — SERVER COMPONENT (БЕЗ use client!)
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import GlobalLoaderProvider from "@/components/providers/global-loader-provider";
import DashboardWrapper from "./dashboard/DashboardWrapper";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "ФФ24: Фулфилмент",
  description: "Быстрее. Точнее. Надежнее.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GlobalLoaderProvider>
            <DashboardWrapper>
              {children}
            </DashboardWrapper>
            <Toaster position="bottom-right" richColors />
          </GlobalLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
