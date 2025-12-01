import React from 'react';
import Link from 'next/link';
import Logo from './Logo';

const navLinks = [
  { name: 'Преимущества', href: '#advantages' },
  { name: 'Процесс', href: '#process' },
  { name: 'Интеграции', href: '#integrations' },
  { name: 'Контакты', href: '#contacts' },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Логотип */}
        <Logo />

        {/* Навигация (для десктопа) */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-content hover:text-primary transition-colors duration-200 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Кнопки CTA и ЛК */}
        <div className="flex items-center space-x-4">
          {/* Главный CTA: Рассчитать стоимость (акцентный цвет) */}
          <Link 
            href="#calculator"
            className="neon-button hidden sm:inline-block" // Используем класс из global.css
          >
            Рассчитать стоимость
          </Link>
          
          {/* Кнопка Личный Кабинет */}
          <Link 
            href="/login"
            className="px-4 py-2 text-primary border border-primary/30 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
          >
            Личный кабинет
          </Link>

          {/* Добавить позже: Mobile Menu Button */}
        </div>

      </div>
    </header>
  );
};

export default Header;
