'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

// Утилита для форматирования телефона: +7 (999) 999-99-99
const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);

    if (digits.length === 0) return '';
    if (digits.length < 2) return `+${digits}`;
    if (digits.length <= 4) return `+${digits[0]} (${digits.slice(1)}`;
    if (digits.length <= 7) return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+${digits[0]} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
};

const LoginPage = () => {
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Нормализуем номер: оставляем только цифры
        const rawPhone = phone.replace(/\D/g, '');
        const normalized = `+${rawPhone}`;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: normalized }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Ошибка входа');

            // Сохраняем токен
            localStorage.setItem('authToken', data.token);

            // Переход в личный кабинет
            router.push('/dashboard');

        } catch (err) {
            setError((err as Error).message);
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
                        Введите номер телефона, привязанный к вашему аккаунту
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Номер телефона
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+7 (999) 000-00-00"
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={phone}
                            onChange={(e) => setPhone(formatPhone(e.target.value))}
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
                            isLoading
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition'
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
