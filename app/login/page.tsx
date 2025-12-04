'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка аутентификации.');
            }

            // переход в учетку
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
                        Введите номер телефона
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Телефон
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            placeholder="+7914XXXXXXX"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 rounded-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        {isLoading ? 'Вход...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
