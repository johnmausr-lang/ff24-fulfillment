"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Очистка ввода
    const cleanEmail = email.toLowerCase().trim();
    
    console.log("🚀 [FRONTEND] Попытка входа с email:", cleanEmail);
    
    if (!cleanEmail.includes("@")) {
      toast.error("Пожалуйста, введите корректный адрес почты");
      return;
    }

    setLoading(true);
    try {
      console.log("📡 [FRONTEND] Отправка запроса на /api/auth/login...");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      console.log("📊 [FRONTEND] Статус ответа API:", res.status);
      const data = await res.json();
      console.log("📦 [FRONTEND] Получены данные:", data);

      if (res.ok) {
        // Успешный вход или автоматическая регистрация
        toast.success(`Добро пожаловать, ${data.name || "пользователь"}!`);
        console.log("🚀 [FRONTEND] Перенаправление в Dashboard через replace...");
        
        // Используем replace для очистки истории и принудительного обновления сессии
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 800);
        
      } else {
        // Ошибка (например, если API упал или вернул 500)
        console.error("❌ [FRONTEND] Ошибка входа:", data.error);
        toast.error(data.error || "Ошибка доступа. Попробуйте позже.");
      }
    } catch (err) {
      console.error("🔥 [FRONTEND] Критическая ошибка запроса:", err);
      toast.error("Ошибка соединения с сервером. Проверьте интернет.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F051D] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Декоративный фон (Neon Blur) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D9FF00] blur-[150px] opacity-10 rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#7000FF] blur-[120px] opacity-10 rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-[#1A0B2E] border border-white/10 rounded-[2.5rem] p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-[#D9FF00]/10 rounded-2xl text-[#D9FF00] mb-6 shadow-[0_0_20px_rgba(217,255,0,0.1)]">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
              Вход в <span className="text-[#D9FF00]">FF24</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
              Личный кабинет клиента
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <Mail 
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#D9FF00] transition-colors" 
                size={20} 
              />
              <input 
                type="email"
                required
                placeholder="Ваш Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0F051D] border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-[#D9FF00] focus:ring-1 focus:ring-[#D9FF00]/30 transition-all text-white font-medium placeholder:text-slate-600"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#D9FF00] text-black font-black py-5 rounded-2xl uppercase italic flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(217,255,0,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-xl"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Войти в систему <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5">
            <p className="text-center text-[10px] text-slate-600 uppercase font-bold tracking-[0.15em] leading-relaxed">
              Автоматическая регистрация <br/> для новых пользователей
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
