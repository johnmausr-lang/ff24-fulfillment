import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Mail, Phone } from 'lucide-react'; // Иконки из lucide-react

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/20 pb-10">
          
          {/* Колонка 1: Лого и Слоган */}
          <div>
            {/* Перекрашиваем логотип для белого фона */}
            <Link href="/" className="flex items-center group mb-4">
                <div className="flex flex-col">
                    <div className="flex items-center text-4xl font-extrabold text-white">
                        <span className="tracking-tighter">FF</span>
                        <div className="relative flex items-center ml-[-8px]">
                            <svg 
                                className="w-10 h-10 text-accent" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <polyline points="16 17 21 12 16 7" className="stroke-accent/90" />
                                <line x1="4" y1="12" x2="21" y2="12" />
                            </svg>
                            <span className="ml-[-8px] tracking-tighter z-10">24</span>
                        </div>
                    </div>
                    <span className="text-xs tracking-widest uppercase mt-[-8px] text-white/70">
                        Фулфилмент
                    </span>
                </div>
            </Link>
            <p className="text-sm text-white/70">
              Ваш надежный партнер для маркетплейсов. Быстро. Точно. Прозрачно.
            </p>
          </div>

          {/* Колонка 2: Навигация */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-bold text-lg mb-1 uppercase tracking-wider">Услуги</h4>
            <Link href="#advantages" className="text-white/70 hover:text-accent transition-colors">Преимущества</Link>
            <Link href="#process" className="text-white/70 hover:text-accent transition-colors">Процесс работы</Link>
            <Link href="#integrations" className="text-white/70 hover:text-accent transition-colors">Интеграции</Link>
          </div>

          {/* Колонка 3: Помощь */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-bold text-lg mb-1 uppercase tracking-wider">Информация</h4>
            <Link href="/login" className="text-white/70 hover:text-accent transition-colors">Личный кабинет</Link>
            <Link href="/privacy" className="text-white/70 hover:text-accent transition-colors">Политика приватности</Link>
            <Link href="/terms" className="text-white/70 hover:text-accent transition-colors">Условия использования</Link>
          </div>

          {/* Колонка 4: Контакты */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-bold text-lg mb-1 uppercase tracking-wider">Контакты</h4>
            <a href="tel:+74950000000" className="flex items-center text-white/70 hover:text-accent transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              +7 (495) 000-00-00
            </a>
            <a href="mailto:info@ff24.ru" className="flex items-center text-white/70 hover:text-accent transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              info@ff24.ru
            </a>
          </div>

        </div>
        
        <div className="text-center pt-6 text-white/50 text-sm">
          &copy; {new Date().getFullYear()} ФФ24 Фулфилмент. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
