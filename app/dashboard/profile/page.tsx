"use client";

import { useState } from "react";
import { User, Building2, MapPin, Phone, Mail, Fingerprint, Save, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // Данные инициализируются на основе вашей модели ClientData
  const [profile, setProfile] = useState({
    full_name: "Иван Иванов",
    org_type: "ИП",
    inn: "770012345678",
    phone: "+7 (999) 000-00-00", // Санитизация будет на стороне API
    email: "client@example.com",
    address: "г. Москва, ул. Складская, д. 24",
  });

  const handleSave = () => {
    // Здесь будет вызов API для обновления данных
    console.log("Сохранение данных профиля согласно модели ClientData:", profile);
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#1A0B2E] min-h-screen text-white">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-[#D9FF00] leading-none">Профиль</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Управление данными контрагента</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[#D9FF00] bg-[#D9FF00]/10 px-4 py-2 rounded-full border border-[#D9FF00]/20">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-black uppercase">Аккаунт проверен</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Основная информация */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#2A1445] rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black italic uppercase mb-8 flex items-center gap-3">
              <Building2 className="text-[#D9FF00]" /> Юридические данные
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">ФИО / Наименование</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    className="w-full bg-[#1A0B2E] border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-[#D9FF00] transition-all"
                    value={profile.full_name}
                    onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">ИНН (поле из ClientData)</label>
                <div className="relative">
                  <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    className="w-full bg-[#1A0B2E] border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-[#D9FF00] transition-all"
                    value={profile.inn}
                    onChange={(e) => setProfile({...profile, inn: e.target.value})}
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">Юридический адрес</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input 
                    className="w-full bg-[#1A0B2E] border border-white/10 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-[#D9FF00] transition-all"
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2A1445] rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black italic uppercase mb-8 flex items-center gap-3">
              <Phone className="text-[#D9FF00]" /> Контакты
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">Телефон</label>
                <input 
                  className="w-full bg-[#1A0B2E] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#D9FF00] transition-all"
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">Email</label>
                <input 
                  className="w-full bg-[#1A0B2E] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#D9FF00] transition-all"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Сайдбар действий */}
        <div className="space-y-6">
          <div className="bg-[#D9FF00] rounded-[3rem] p-8 text-[#1A0B2E] shadow-[0_20px_50px_rgba(217,255,0,0.15)]">
            <h4 className="font-black italic uppercase text-lg mb-4 leading-tight">Сохранить изменения?</h4>
            <p className="text-sm font-bold opacity-70 mb-8 uppercase tracking-tighter">Все данные будут обновлены в системе фулфилмента</p>
            <Button 
              onClick={handleSave}
              className="w-full bg-[#1A0B2E] text-white hover:bg-black py-8 rounded-[2rem] font-black uppercase italic transition-all flex items-center justify-center gap-2"
            >
              <Save size={20} /> Обновить профиль
            </Button>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-[2rem] p-6">
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">Тип аккаунта</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#3A1C5F] rounded-2xl flex items-center justify-center text-[#D9FF00] font-black italic">
                {profile.org_type}
              </div>
              <div>
                <p className="font-black uppercase italic text-sm">Селлер FF24</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">ID: 882410</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
