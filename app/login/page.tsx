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
    const cleanEmail = email.toLowerCase().trim();
    
    console.log("🚀 [FRONTEND] Попытка входа с email:", cleanEmail);
    
    if (!cleanEmail.includes("@")) {
      toast.error("Введите корректный Email");
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
        toast.success(`Добро пожаловать, ${data.name}!`);
        console.log("🚀 [FRONTEND] Перенаправление в Dashboard...");
        
        // Используем жесткий редирект для гарантированного прохождения Middleware
        window.location.href = "/dashboard";
      } else {
        console.error("❌ [FRONTEND] Ошибка входа:", data.error);
        toast.error(data.error || "Ошибка входа");
      }
    } catch (err) {
      console.error("🔥 [FRONTEND] Критическая ошибка запроса:", err);
      toast.error("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F051D] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Фоновое свечение */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D9FF00] blur-[150px] opacity-10 rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-[#1A0B2E] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-[#D9FF00]/10 rounded-2xl text-[#D9FF00] mb-6">
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
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="email"
                required
                placeholder="Ваш Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0F051D] border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-[#D9FF00] transition-all text-white font-medium"
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#D9FF00] text-black font-black py-5 rounded-2xl uppercase italic flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(217,255,0,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Войти в систему <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-slate-600 uppercase font-bold tracking-widest leading-relaxed">
            Нет доступа? <br/> Обратитесь к вашему менеджеру
          </p>
        </div>
      </motion.div>
    </div>
  );
}
