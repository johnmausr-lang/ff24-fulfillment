'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- 1. ИМПОРТ useRouter
import { User, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Logo from '@/components/Logo'; 

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // <-- 2. ИНИЦИАЛИЗАЦИЯ

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // !!! Имитация запроса авторизации !!!
    setTimeout(() => {
      setIsLoading(false);
      
      // Имитация успешного входа
      if (email === 'client@ff24.ru' && password === 'test1234') {
        console.log('Успешный вход! Перенаправление...');
        
        // 3. АКТИВАЦИЯ ПЕРЕНАПРАВЛЕНИЯ
        router.push('/dashboard'); 
        
      } else {
        setError('Неверный логин или пароль. Попробуйте снова.');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-2xl border-t-4 border-primary">
        
        <div className="flex justify-center">
          <Logo />
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-extrabold text-content">
          Вход в Личный Кабинет
        </h2>
        <p className="mt-2 text-center text-sm text-content/70">
          Только для партнеров ФФ24. Контроль вашего фулфилмента 24/7.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {/* Поле Email/Логин */}
          <div>
            <label htmlFor="email" className="sr-only">Email или Логин</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-content rounded-lg focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Email или Логин"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Поле Пароль */}
          <div>
            <label htmlFor="password" className="sr-only">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-content rounded-lg focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-red-600 text-center font-medium p-2 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {/* Кнопка Входа */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`neon-button w-full flex justify-center items-center py-3 px-4 text-content font-bold rounded-lg 
                          ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Вход...
                </>
              ) : (
                <>
                  Войти в кабинет
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <Link 
            href="#restore" 
            className="font-medium text-primary hover:text-accent transition-colors"
          >
            Забыли пароль?
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
