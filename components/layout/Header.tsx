// components/layout/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Имя файла логотипа, который вы предоставили
const LOGO_SRC = "/logo-ff24.png"; 

export default function Header() {
  return (
    // Фиксированный хедер для наложения поверх 3D-сцены
    <header className="fixed top-0 left-0 w-full z-50 p-6 bg-transparent transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* Логотип */}
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src={LOGO_SRC} 
            alt="FF24 Fulfillment Logo" 
            width={40} 
            height={40} 
            className="rounded-lg shadow-md"
          />
          <span className="text-xl font-bold text-white tracking-widest">FF24</span>
        </Link>

        {/* Навигация */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/services" className="text-white hover:text-accent-DEFAULT transition-colors">Услуги</Link>
          <Link href="/pricing" className="text-white hover:text-accent-DEFAULT transition-colors">Тарифы</Link>
          <Link href="/integrations" className="text-white hover:text-accent-DEFAULT transition-colors">Интеграции</Link>
        </nav>

        {/* CTA (Личный Кабинет) */}
        <div className="flex items-center space-x-4">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/login">Личный Кабинет</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
