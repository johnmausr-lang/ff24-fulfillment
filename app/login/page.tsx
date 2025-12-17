"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/lib/store";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Базовая очистка номера
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      toast.error("Введите корректный номер телефона");
      setLoading(false);
      return;
    }

    try {
      // Вызываем API авторизации
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      const data = await res.json();

      if (res.ok) {
        // Сохраняем телефон в глобальное состояние (Zustand)
        setUser(cleanPhone);
        
        toast.success("Вход выполнен!");
        
        // Важно: refresh обновляет куки в браузере для Middleware
        router.refresh();
        setTimeout(() => router.push("/dashboard"), 100);
      } else {
        toast.error(data.error || "Ошибка авторизации");
      }
    } catch (error) {
      toast.error("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A0B2E] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Декоративные градиенты */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D9FF00] blur-[150px] opacity-10 rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#3A1C5F] blur-[150px] opacity-30 rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full z-10"
      >
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black italic uppercase text-white tracking-tighter">
            FF24<span className="text-[#D9FF00]">.</span>LK
          </h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">
            Личный кабинет селлера
          </p>
        </div>

        <div className="bg-[#2A1445] rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest">
                Номер телефона
              </label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-[#1A0B2E] border-2 border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-[#D9FF00] transition-all text-lg font-bold"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#D9FF00] hover:scale-[1.02] active:scale-[0.98] text-[#1A0B2E] font-black py-6 rounded-2xl text-lg uppercase tracking-widest shadow-[0_10px_30px_rgba(217,255,0,0.2)] transition-all flex items-center justify-center gap-3 italic disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>Войти в кабинет <ArrowRight size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-4 text-slate-500">
            <ShieldCheck size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">
              Авторизация по номеру телефона
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
