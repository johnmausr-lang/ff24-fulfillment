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
      toast.error("Сервер авторизации недоступен");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#F1F5F9]">
      <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-slate-100">
        <div className="h-3 bg-[#D9FF00]" />
        
        <div className="p-10 md:p-14">
          <div className="flex justify-center mb-12 transform hover:scale-105 transition-transform">
            <Image 
              src="/logo-ff24.png" 
              alt="FF24 Logo" 
              width={220} 
              height={80} 
              priority 
              className="h-auto w-auto"
            />
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-[#3A1C5F] tracking-tight italic">ЛИЧНЫЙ КАБИНЕТ</h1>
            <div className="h-1 w-12 bg-[#D9FF00] mx-auto mt-2 rounded-full" />
            <p className="text-slate-500 mt-4 text-sm font-medium">Введите почту вашего аккаунта МойСклад</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="partner@example.com"
                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 px-6 py-4 text-lg transition-all focus:border-[#3A1C5F] focus:ring-4 focus:ring-[#D9FF00]/40 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-[#3A1C5F] py-5 text-lg font-black uppercase tracking-widest text-white transition-all hover:bg-[#2A1445] active:scale-[0.97] disabled:opacity-70 shadow-xl shadow-purple-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-3" />
                  ПРОВЕРКА...
                </div>
              ) : (
                "ВОЙТИ В СИСТЕМУ"
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Powered by FF24 Technology & MoySklad API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
