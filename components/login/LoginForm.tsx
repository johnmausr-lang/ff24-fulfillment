"use client";

import { useState } from "react";

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
    <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md border">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Вход в личный кабинет
      </h1>

      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Введите email"
          className="border rounded-lg px-4 py-3 text-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 text-xl rounded-lg font-semibold hover:opacity-90 transition"
        >
          Войти
        </button>
      </div>
    </div>
  );
}
