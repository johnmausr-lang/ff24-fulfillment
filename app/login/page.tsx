// app/login/page.tsx
"use client";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Логика: POST на /api/auth/login с проверкой email в МойСклад
    console.log("Вход для:", email);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#F8FAFC]">
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex justify-center mb-8">
          <Image src="/logo-ff24.png" alt="FF24 Logo" width={180} height={60} priority />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-[#3A1C5F] mb-2">Личный кабинет</h1>
        <p className="text-slate-500 text-center mb-8 text-sm">
          Введите Email, указанный при регистрации
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 ml-1">
              Email адрес
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#D9FF00] focus:border-[#3A1C5F] transition-all outline-none"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3A1C5F] hover:bg-[#2A1445] text-white font-bold py-3 rounded-xl transition-all transform active:scale-[0.98] shadow-lg shadow-purple-200"
          >
            {loading ? "Проверка..." : "Войти в систему"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Нет доступа? Обратитесь к вашему менеджеру FF24
          </p>
        </div>
      </div>
    </div>
  );
}
