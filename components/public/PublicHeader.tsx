// components/public/PublicHeader.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap, Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function PublicHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: '/services', label: 'Услуги' },
        { href: '/pricing', label: 'Тарифы' },
        { href: '/dashboard', label: 'ЛКК', hideOnAuth: true }, // Ссылка для перехода в кабинет
    ];

    return (
        <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Логотип */}
                <Link href="/" className="flex items-center space-x-2 text-white text-2xl font-bold">
                    <Zap className="h-6 w-6 text-accent-DEFAULT" />
                    <span>FF24</span>
                </Link>

                {/* Основная навигация (Desktop) */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href}>
                            <span className={cn(
                                "text-gray-300 hover:text-accent-DEFAULT transition-colors text-lg",
                                pathname.startsWith(link.href) && 'text-accent-DEFAULT font-semibold'
                            )}>
                                {link.label}
                            </span>
                        </Link>
                    ))}
                    
                    {/* Кнопки входа/регистрации */}
                    <Link href="/login" passHref>
                        <Button variant="secondary" className="ml-4">Войти</Button>
                    </Link>
                    <Link href="/register" passHref>
                        <Button>Начать</Button>
                    </Link>
                </nav>

                {/* Меню для мобильных */}
                <button 
                    className="md:hidden text-white" 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Мобильное меню */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 border-t border-gray-800">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block py-2">
                            <span className="text-gray-300 hover:text-accent-DEFAULT transition-colors text-lg">
                                {link.label}
                            </span>
                        </Link>
                    ))}
                    <div className="pt-4 space-y-2">
                        <Link href="/login" passHref onClick={() => setIsOpen(false)}>
                            <Button variant="secondary" className="w-full">Войти</Button>
                        </Link>
                        <Link href="/register" passHref onClick={() => setIsOpen(false)}>
                            <Button className="w-full">Начать</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
