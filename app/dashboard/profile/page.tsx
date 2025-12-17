"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, MapPin, Fingerprint, ShieldAlert } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-[#D9FF00] animate-pulse uppercase font-black italic">Загрузка данных...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
          Мой <span className="text-[#D9FF00]">Профиль</span>
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">
          Данные вашей организации из системы МойСклад
        </p>
      </header>

      <div className="grid gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A0B2E] border border-white/10 rounded-[2.5rem] p-8 relative overflow-hidden"
        >
          {/* Декор */}
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <User size={120} className="text-white" />
          </div>

          <div className="space-y-8 relative z-10">
            {/* Основная инфо */}
            <div className="flex items-center gap-6 pb-8 border-b border-white/5">
              <div className="w-20 h-20 rounded-[2rem] bg-[#D9FF00] flex items-center justify-center text-black shadow-[0_0_30px_rgba(217,255,0,0.2)]">
                <User size={40} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white italic uppercase leading-none">{user.name}</h2>
                <span className="text-[#D9FF00] text-[10px] font-black uppercase tracking-[0.2em] mt-2 inline-block">Верифицированный клиент</span>
              </div>
            </div>

            {/* Сетка данных */}
            <div className="grid md:grid-cols-2 gap-8">
              <ProfileItem icon={<Mail size={18} />} label="Email" value={user.email} />
              <ProfileItem icon={<Phone size={18} />} label="Телефон" value={user.phone} />
              <ProfileItem icon={<Fingerprint size={18} />} label="ИНН" value={user.inn} />
              <ProfileItem icon={<MapPin size={18} />} label="Юридический адрес" value={user.legalAddress} />
            </div>

            {/* Плашка предупреждения */}
            <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/5 flex items-start gap-4">
              <ShieldAlert className="text-slate-500 shrink-0" size={24} />
              <p className="text-[11px] text-slate-500 uppercase font-bold leading-relaxed">
                Редактирование личных данных заблокировано. Если вы хотите изменить ИНН или юридический адрес, 
                пожалуйста, свяжитесь с вашим персональным менеджером или обновите данные в договоре.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-slate-500">
        <div className="text-[#D9FF00] opacity-70">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <div className="bg-[#0F051D] border border-white/5 p-4 rounded-2xl text-white font-bold text-sm">
        {value || "—"}
      </div>
    </div>
  );
}
