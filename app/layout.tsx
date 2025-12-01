import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./global.css";

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
        {/* Здесь будет Header */}
        <main>{children}</main>
        {/* Здесь будет Footer */}
      </body>
    </html>
  );
}
