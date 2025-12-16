// app/login/page.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import toast from 'react-hot-toast'; // Используем Sonner/toast

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Вход выполнен! Перенаправление...');
        router.push('/dashboard');
      } else {
        toast.error(data.error || 'Ошибка входа. Проверьте данные.');
      }
    } catch (error) {
      toast.error('Ошибка сети. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-primary-DEFAULT p-8 rounded-2xl shadow-neon border border-accent-DEFAULT/30">
        <div className="flex justify-center mb-6">
          <Zap className="h-10 w-10 text-accent-DEFAULT" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Вход в FF24 Dashboard</h1>
        <p className="text-center text-gray-400 mb-8">Используйте учетные данные вашей компании.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-accent-DEFAULT focus:ring-accent-DEFAULT"
              placeholder="your@company.ru"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-accent-DEFAULT focus:ring-accent-DEFAULT"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex justify-end text-sm">
            <Link href="/reset-password" className="text-gray-400 hover:text-accent-DEFAULT transition-colors">
              Забыли пароль?
            </Link>
          </div>

          <Button type="submit" className="w-full py-3 text-lg" disabled={isLoading}>
            {isLoading ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <p className="mt-8 text-center text-gray-400">
          Нет аккаунта?{' '}
          <Link href="/register" className="text-accent-DEFAULT hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
