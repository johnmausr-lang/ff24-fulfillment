import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./global.css";
import Header from "@/components/Header"; // Импорт Header
import Footer from "@/components/Footer"; // Импорт Footer

// Настройка шрифта Manrope
const manrope = Manrope({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: "ФФ24: Фулфилмент. Быстрее. Точнее. Надежнее.",
  description: "Фулфилмент для Wildberries, Ozon, Яндекс.Маркет. Быстрый и надежный сервис фулфилмента в Москве и регионах.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={manrope.className}>
      <body>
        <Header /> {/* Размещаем Header */}
        <main>{children}</main>
        <Footer /> {/* Размещаем Footer */}
      </body>
    </html>
  );
}
