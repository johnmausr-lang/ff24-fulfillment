// app/login/page.tsx
"use client";

import { useState } from "react";
import { TruckFullscreenLoader } from "@/components/ui/truck-fullscreen-loader";
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
        const data = await res.json();
        toast.error(data.message || "Ошибка входа");
      }
    } catch {
      toast.error("Сервер недоступен");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center p-4">
        <div className="relative z-10 max-w-6xl w-full">
          <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-3xl">
            {/* Грузчик + коробка */}
            <div className="relative bg-gradient-to-br from-purple-800 to-orange-700 p-16 flex items-end justify-center">
              <div className="relative">
                {/* Коробка FF24 */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl shadow-2xl transform rotate-6 hover:rotate-12 transition-all duration-700">
                  <div className="absolute inset-0 bg-black/20 rounded-3xl" />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-white text-center">
                      <div className="text-8xl font-black tracking-tighter">FF24</div>
                      <div className="text-3xl font-bold mt-2">ФУЛФИЛМЕНТ</div>
                    </div>
                  </div>
                </div>

                {/* Грузчик */}
                <div className="absolute -bottom-20 -right-20 scale-150">
                  <svg width="400" height="500" viewBox="0 0 400 500" fill="none">
                    {/* Каска */}
                    <ellipse cx="200" cy="100" rx="80" ry="50" fill="#1e293b"/>
                    <rect x="120" y="85" width="160" height="30" rx="15" fill="#fbbf24"/>
                    
                    {/* Лицо */}
                    <circle cx="200" cy="140" r="50" fill="#fdbcb4"/>
                    
                    {/* Униформа — фиолетовый + жёлтый */}
                    <rect x="100" y="200" width="200" height="280" rx="30" fill="#4b59ff"/>
                    <rect x="100" y="200" width="200" height="100" rx="30" fill="#6366f1"/>
                    <rect x="130" y="230" width="140" height="220" rx="20" fill="#4b59ff"/>
                    
                    {/* Логотип FF24 на груди */}
                    <text x="200" y="320" fontSize="60" fill="white" fontWeight="bold" textAnchor="middle">FF24</text>
                    
                    {/* Руки */}
                    <rect x="60" y="250" width="60" height="180" rx="30" fill="#fdbcb4"/>
                    <rect x="280" y="250" width="60" height="180" rx="30" fill="#fdbcb4"/>
                    
                    {/* Ноги */}
                    <rect x="140" y="460" width="60" height="80" rx="30" fill="#1e293b"/>
                    <rect x="200" y="460" width="60" height="80" rx="30" fill="#1e293b"/>
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 text-white text-center">
                <h1 className="text-6xl font-black mb-4">ВХОД В КАБИНЕТ</h1>
                <p className="text-2xl opacity-90">Только для сотрудников FF24</p>
              </div>
            </div>

            {/* Форма входа */}
            <div className="bg-white p-16 flex flex-col justify-center">
              <form onSubmit={handleLogin} className="space-y-10">
                <div>
                  <label className="block text-3xl font-bold text-purple-900 mb-6">
                    Ваш email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-8 py-5 text-xl border-4 border-purple-600 rounded-3xl focus:outline-none focus:border-orange-500 transition-all"
                    placeholder="ivan@ff24.ru"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white font-bold text-2xl py-6 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  {loading ? "Входим..." : "Войти в кабинет"}
                </button>
              </form>

              <p className="text-center text-gray-600 mt-10 text-lg">
                Нет доступа? Напишите <a href="mailto:support@ff24.ru" className="text-purple-600 font-bold underline">support@ff24.ru</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <TruckFullscreenLoader isLoading={loading} message="Открываем ваш кабинет..." />
    </>
  );
}
