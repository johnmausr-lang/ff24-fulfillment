import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FF24 Fulfillment - Личный кабинет",
  description: "Технологичный фулфилмент для вашего бизнеса",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body
        className={`${inter.className} min-h-screen bg-[#F8FAFC] text-[#1E293B] antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
