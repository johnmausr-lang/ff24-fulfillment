import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FF24 Fulfillment",
  description: "Личный кабинет клиента",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
