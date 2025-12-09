"use client";

import { useState } from "react";
import TruckButton from "@/components/ui/TruckButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (data.success) window.location.href = "/dashboard";
    else alert("Пользователь не найден");
  }

  return (
    <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-purple-100">
      <h1 className="text-4xl font-black mb-8 text-gray-900">Вход в личный кабинет</h1>

      <div className="flex flex-col gap-6">
        <input
          type="email"
          placeholder="Введите email"
          className="border rounded-xl px-6 py-4 text-lg shadow-inner focus:outline-none focus:ring-4 focus:ring-purple-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TruckButton onClick={handleLogin} />
      </div>
    </div>
  );
}
