"use client";

import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function submit() {
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = "/dashboard";
    } else {
      alert("Пользователь не найден");
    }

    setLoading(false);
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0F0F0F] to-[#1A0A00] overflow-hidden flex justify-center items-center">

      {/* 🔥 Грузчик — встроенный в сцену */}
      <Image
        src="/illustrations/worker-ff24.png"
        alt="FF24 Worker"
        width={480}
        height={480}
        className="
          absolute bottom-0 left-10
          drop-shadow-[0_0_35px_rgba(255,107,0,0.5)]
          z-10
          animate-float-slow
          pointer-events-none
        "
      />

      {/* 🔥 Анимация коробок */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="box box1"></div>
        <div className="box box2"></div>
        <div className="box box3"></div>
        <div className="box box4"></div>
      </div>

      {/* 🔥 Форма */}
      <div
        className="
          relative z-20 p-10 rounded-3xl
          bg-white/5 backdrop-blur-2xl
          border border-white/10 shadow-[0_0_40px_rgba(255,107,0,0.25)]
          w-[420px]
        "
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-[0_0_12px_rgba(255,107,0,0.35)]">
          Вход в FF24
        </h1>

        <label className="text-white/70 text-sm">Email</label>
        <input
          type="email"
          placeholder="example@mail.ru"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full mt-2 p-3 rounded-lg bg-black/30 text-white
            border border-white/10 outline-none
            focus:border-[#FF6B00] transition
          "
        />

        <button
          onClick={submit}
          disabled={loading}
          className="
            w-full mt-6 py-3 rounded-lg font-semibold text-black
            bg-gradient-to-r from-[#FF6B00] to-[#FF8C32]
            shadow-[0_0_20px_rgba(255,107,0,0.45)]
            hover:shadow-[0_0_32px_rgba(255,107,0,0.65)]
            hover:-translate-y-0.5 transition
          "
        >
          {loading ? "Загрузка..." : "Войти"}
        </button>
      </div>

      {/* 🔥 Лоадер */}
      {loading && <FF24Loader />}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  ЛОАДЕР FF24                               */
/* -------------------------------------------------------------------------- */

function FF24Loader() {
  return (
    <div className="
      fixed inset-0 bg-black/70 backdrop-blur-xl
      flex items-center justify-center
      z-50
    ">
      <div className="loader-boxes">
        <div className="lb lb1"></div>
        <div className="lb lb2"></div>
        <div className="lb lb3"></div>
      </div>
    </div>
  );
}
