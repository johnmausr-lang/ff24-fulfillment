// components/public/PublicFooter.tsx
import Link from 'next/link';
import { Zap, Mail, Phone } from 'lucide-react';

export default function PublicFooter() {
    return (
        <footer className="bg-gray-950 border-t border-gray-800 py-10">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-400">
                
                {/* Колонка 1: Лого и Описание */}
                <div>
                    <Link href="/" className="flex items-center space-x-2 text-white text-2xl font-bold mb-4">
                        <Zap className="h-6 w-6 text-accent-DEFAULT" />
                        <span>FF24</span>
                    </Link>
                    <p className="text-sm">
                        Технологичный фулфилмент для E-commerce. Интеграция с Мой Склад и полная автоматизация логистики.
                    </p>
                </div>

                {/* Колонка 2: Быстрые ссылки */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Продукты</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/services" className="hover:text-accent-DEFAULT transition-colors">Фулфилмент</Link></li>
                        <li><Link href="/pricing" className="hover:text-accent-DEFAULT transition-colors">Тарифы</Link></li>
                        <li><Link href="/dashboard" className="hover:text-accent-DEFAULT transition-colors">Личный Кабинет</Link></li>
                    </ul>
                </div>

                {/* Колонка 3: Поддержка */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Поддержка</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/faq" className="hover:text-accent-DEFAULT transition-colors">FAQ</Link></li>
                        <li><Link href="/contact" className="hover:text-accent-DEFAULT transition-colors">Связаться с нами</Link></li>
                        <li><Link href="/terms" className="hover:text-accent-DEFAULT transition-colors">Условия использования</Link></li>
                    </ul>
                </div>

                {/* Колонка 4: Контакты */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Контакты</h3>
                    <p className="flex items-center text-sm space-x-2">
                        <Mail className="h-4 w-4 text-accent-DEFAULT" />
                        <span>info@ff24.ru</span>
                    </p>
                    <p className="flex items-center text-sm space-x-2 mt-2">
                        <Phone className="h-4 w-4 text-accent-DEFAULT" />
                        <span>+7 (495) 123-45-67</span>
                    </p>
                </div>
            </div>

            {/* Копирайт */}
            <div className="container mx-auto px-4 text-center mt-10 border-t border-gray-800 pt-6">
                <p className="text-xs text-gray-500">
                    &copy; {new Date().getFullYear()} FF24. Все права защищены.
                </p>
            </div>
        </footer>
    );
}
