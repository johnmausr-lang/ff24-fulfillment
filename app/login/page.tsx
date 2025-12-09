"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email) return;
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const json = await res.json();
    setLoading(false);

    if (json.success) {
      window.location.href = "/dashboard";
    } else {
      alert("Пользователь не найден");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#D4FF00" }} // фирменный FF24 неоновый фон
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-center gap-12">

        {/* ГРУЗЧИК — единая композиция */}
        <div className="relative flex justify-center">
          <Image
            src="/illustrations/worker-ff24.png"
            alt="FF24 Worker"
            width={520}
            height={520}
            priority
            className="drop-shadow-2xl select-none"
          />
        </div>

        {/* ФОРМА АВТОРИЗАЦИИ */}
        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.18)]">
          <h1 className="text-4xl font-black text-[#21004B] mb-6 leading-tight">
            Вход в личный<br />кабинет
          </h1>

          {/* EMAIL INPUT */}
          <input
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 text-lg rounded-xl border border-gray-300 mb-6 focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* БРЕНДИРОВАННАЯ КНОПКА-ГРУЗОВИК */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="
              w-full py-4 rounded-xl text-white text-xl font-bold 
              flex items-center justify-center gap-3
              transition-all shadow-lg
              bg-gradient-to-r from-purple-600 to-orange-500
              hover:from-purple-700 hover:to-orange-600
              active:scale-[0.98]
            "
          >
            <span className="inline-flex items-center gap-2">
              <img
                src="/ui/truck-purple.png"
                alt="truck"
                className="w-8 h-8"
              />
            </span>

            {loading ? "Входим..." : "Войти"}
          </button>
        </div>
      </div>
    </div>
  );
}
