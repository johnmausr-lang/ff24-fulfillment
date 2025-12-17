"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Добро пожаловать, ${data.name || "клиент"}!`);
        router.push("/dashboard");
      } else {
        toast.error(data.error || "Ошибка входа");
      }
    } catch (error) {
      toast.error("Сервер МойСклад недоступен");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#F1F5F9]">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100">
        {/* Верхняя декоративная полоса в лимонном цвете */}
        <div className="h-2 bg-[#D9FF00]" />
        
        <div className="p-8 md:p-12">
          <div className="flex justify-center mb-10">
            <Image 
              src="/logo-ff24.png" 
              alt="FF24 Logo" 
              width={200} 
              height={70} 
              priority 
              className="h-auto w-auto"
            />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#3A1C5F]">Личный кабинет</h1>
            <p className="text-slate-500 mt-2">Введите Email для доступа к остаткам</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">
                Ваш Email
              </label>
              <input
                type="email"
                required
                placeholder="partner@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg transition-all focus:border-[#3A1C5F] focus:ring-4 focus:ring-[#D9FF00]/30 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full overflow-hidden rounded-2xl bg-[#3A1C5F] py-4 text-lg font-bold text-white transition-all hover:bg-[#2A1445] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-purple-200"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="mr-3 h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Сверяем данные...
                </span>
              ) : (
                "Войти в кабинет"
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-400">
              Данные синхронизированы с системой <span className="font-semibold">МойСклад</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
