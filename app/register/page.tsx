"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, Search, UserPlus, Building2 } from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: INN, 3: Full Form
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    inn: "",
    name: "",
    address: "",
    phone: ""
  });

  // Шаг 1: Проверка Email в МойСклад
  const checkEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/check-user?email=${formData.email}`);
      const data = await res.json();
      
      if (data.exists) {
        toast.success("Вы уже есть в системе! Переходим к логину.");
        router.push("/login");
      } else {
        toast.error("Email не найден. Давайте проверим вашу организацию.");
        setStep(2);
      }
    } catch (e) {
      toast.error("Ошибка проверки");
    } finally {
      setLoading(false);
    }
  };

  // Шаг 2: Проверка ИНН и подтягивание данных ФНС
  const checkINN = async () => {
    setLoading(true);
    try {
      // 1. Сначала ищем ИНН в МойСклад
      const msRes = await fetch(`/api/auth/check-user?inn=${formData.inn}`);
      const msData = await msRes.json();

      if (msData.exists) {
        toast.success("Организация найдена! Теперь вы можете войти.");
        setStep(1);
        return;
      }

      // 2. Если в МС нет, тянем данные из ФНС (DaData)
      const fnsRes = await fetch(`/api/auth/fetch-fns?inn=${formData.inn}`);
      const fnsData = await fnsRes.json();

      if (fnsData.success) {
        setFormData({
          ...formData,
          name: fnsData.data.name,
          address: fnsData.data.address
        });
        toast.success("Данные организации найдены в ФНС!");
        setStep(3);
      } else {
        toast.error("ИНН не найден. Введите данные вручную.");
        setStep(3);
      }
    } catch (e) {
      toast.error("Ошибка поиска ИНН");
    } finally {
      setLoading(false);
    }
  };

  // Шаг 3: Финальная регистрация (создание в МойСклад)
  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success("Регистрация успешна! Добро пожаловать в FF24.");
        router.push("/dashboard");
      } else {
        toast.error("Не удалось создать аккаунт.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#3A1C5F] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl">
        <div className="flex justify-center mb-8">
          <Image src="/logo-ff24.png" alt="FF24" width={150} height={50} />
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#3A1C5F] uppercase italic text-center">Проверка доступа</h2>
            <input 
              type="email" 
              placeholder="Ваш Email"
              className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 ring-[#D9FF00]"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <button 
              onClick={checkEmail}
              disabled={loading}
              className="w-full bg-[#3A1C5F] text-white font-black py-4 rounded-2xl flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />} ПРОДОЛЖИТЬ
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#3A1C5F] uppercase italic text-center">Проверка по ИНН</h2>
            <p className="text-sm text-slate-500 text-center">Мы не нашли ваш email. Введите ИНН вашей компании, чтобы мы проверили базу.</p>
            <input 
              type="text" 
              placeholder="ИНН организации"
              className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 ring-[#D9FF00]"
              value={formData.inn}
              onChange={(e) => setFormData({...formData, inn: e.target.value})}
            />
            <button 
              onClick={checkINN}
              disabled={loading}
              className="w-full bg-[#D9FF00] text-[#3A1C5F] font-black py-4 rounded-2xl flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Building2 size={20} />} ПРОВЕРИТЬ ИНН
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-[#3A1C5F] uppercase italic text-center">Регистрация</h2>
            <div className="space-y-3 text-sm">
              <input 
                type="text" 
                placeholder="Название компании"
                className="w-full p-3 bg-slate-50 border rounded-xl"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Телефон"
                className="w-full p-3 bg-slate-50 border rounded-xl"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
              <textarea 
                placeholder="Юридический адрес"
                className="w-full p-3 bg-slate-50 border rounded-xl h-20"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <button 
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-[#3A1C5F] text-white font-black py-4 rounded-2xl mt-4 flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <UserPlus size={20} />} СТАТЬ КЛИЕНТОМ FF24
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
