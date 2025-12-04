'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react'; // Импортируем иконку для кнопки

// Обратите внимание: убрана явная типизация : React.FC, 
// чтобы избежать Type error: Type '() => void' is not assignable to type 'FC<{}>'.
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Пароль не используется для МС, но оставим для формы
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Функция обработки авторизации
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // 1. Вызываем API-маршрут для аутентификации
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка аутентификации.');
            }

            // 2. Успешная авторизация, перенаправляем на дашборд
            router.push('/dashboard'); 

        } catch (err) {
            setError((err as Error).message || 'Произошла непредвиденная ошибка.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
                <div className="text-center mb-8">
                    <LogIn className="w-10 h-10 mx-auto text-indigo-600" />
                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                        Вход в FF24 Fulfillment
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Используйте ваш email для доступа к личному кабинету
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    {error && (
                        <div className="text-sm p-3 bg-red-100 text-red-700 rounded-lg border border-red-300">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white ${
                            isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <LogIn className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                Вход...
                            </span>
                        ) : (
                            'Войти'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
