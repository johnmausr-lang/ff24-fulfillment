// app/login/page.tsx
"use client";

import { useState } from "react";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Введите email");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Добро пожаловать в FF24!");
        window.location.href = "/dashboard";
      } else {
        toast.error("Ошибка входа");
      }
    } catch {
      toast.error("Сервер недоступен");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4 overflow-hidden">
        {/* Фон с лёгкой анимацией */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-orange-500 animate-pulse" />
        </div>

        {/* Главный контейнер — грузчик + коробка + форма */}
        <div className="relative z-10 max-w-5xl w-full">
          <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Левая часть — грузчик и коробка */}
            <div className="relative bg-gradient-to-br from-purple-700 to-orange-600 p-12 flex flex-col justify-end">
              {/* Коробка с надписью FF24 */}
              <div className="relative">
                <div className="bg-amber-700 border-8 border-amber-900 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-6 transition-all duration-500">
                  <div className="text-white text-center">
                    <div className="text-6xl font-black tracking-tighter">FF24</div>
                    <div className="text-2xl font-bold mt-2">ФУЛФИЛМЕНТ</div>
                  </div>
                </div>

                {/* Грузчик — SVG в фирменной униформе */}
                <div className="absolute -bottom-10 -right-10 transform scale-150">
                  <svg width="300" height="400" viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Каска */}
                    <ellipse cx="150" cy="80" rx="60" ry="40" fill="#1e293b" />
                    <rect x="90" y="70" width="120" height="20" rx="10" fill="#fbbf24" />
                    
                    {/* Лицо */}
                    <circle cx="150" cy="110" r="40" fill="#fdbcb4" />
                    
                    {/* Униформа — фиолетовый + оранжевый */}
                    <rect x="80" y="160" width="140" height="200" rx="20" fill="#4b59ff" />
                    <rect x="80" y="160" width="140" height="80" rx="20" fill="#6366f1" />
                    <rect x="100" y="180" width="100" height="160" rx="15" fill="#4b59ff" />
                    
                    {/* Логотип FF24 на груди */}
                    <text x="150" y="240" fontSize="40" fill="white" fontWeight="bold" textAnchor="middle">FF24</text>
                    
                    {/* Руки */}
                    <rect x="60" y="200" width="40" height="120" rx="20" fill="#fdbcb4" />
                    <rect x="200" y="200" width="40" height="120" rx="20" fill="#fdbcb4" />
                    
                    {/* Ноги */}
                    <rect x="100" y="340" width="50" height="60" rx="25" fill="#1e293b" />
                    <rect x="150" y="340" width="50" height="60" rx="25" fill="#1e293b" />
                  </svg>
                </div>
              </div>

              {/* Текст под коробкой */}
              <div className="mt-32 text-white text-center">
                <h1 className="text-5xl font-black mb-4">ВХОД В ЛИЧНЫЙ КАБИНЕТ</h1>
                <p className="text-xl opacity-90">Только для сотрудников FF24</p>
              </div>
            </div>

            {/* Правая часть — форма входа */}
            <div className="bg-white dark:bg-gray-900 p-12 flex flex-col justify-center">
              <form onSubmit={handleLogin} className="space-y-8">
                <div>
                  <label className="block text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Введите ваш email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-purple-600 rounded-2xl focus:outline-none focus:border-orange-500 transition-all"
                    placeholder="ivan@ff24.ru"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white font-bold text-xl py-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {loading ? "Вход..." : "Войти в кабинет"}
                </Button>
              </form>

              <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
                Нет доступа? Напишите <a href="mailto:support@ff24.ru" className="text-purple-600 font-bold">support@ff24.ru</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <TruckFullscreenLoader isLoading={loading} message="Открываем личный кабинет..." />
    </>
  );
}
