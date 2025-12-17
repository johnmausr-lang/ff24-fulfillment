"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.toLowerCase().trim();
    
    if (!cleanEmail.includes("@")) {
      toast.error("Введите корректный Email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Добро пожаловать, ${data.name}!`);
        window.location.replace("/dashboard");
      } else if (res.status === 404) {
        // Если клиента нет, отправляем на регистрацию
        toast.info("Email не найден. Пожалуйста, зарегистрируйтесь.");
        router.push(`/register?email=${encodeURIComponent(cleanEmail)}`);
      } else {
        toast.error(data.error || "Ошибка входа");
      }
    } catch (err) {
      toast.error("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F051D] flex items-center justify-center p-6 relative overflow-hidden">
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
            <div className="relative group">
              <Mail 
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#D9FF00] transition-colors pointer-events-none" 
                size={20} 
              />
              <input 
                type="email"
                required
                placeholder="Ваш Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // pl-14 ПРЕДОТВРАЩАЕТ НАЛОЖЕНИЕ ТЕКСТА НА ИКОНКУ
                className="w-full bg-[#0F051D] border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-[#D9FF00] transition-all text-white font-medium"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-[#D9FF00] text-black font-black py-5 rounded-2xl uppercase italic flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(217,255,0,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Войти в систему <ArrowRight size={20} /></>}
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-slate-600 uppercase font-bold tracking-widest leading-relaxed">
            Автоматическая проверка доступа
          </p>
        </div>
      </motion.div>
    </div>
  );
}
