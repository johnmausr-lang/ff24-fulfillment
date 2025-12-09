"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
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
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="flex flex-col md:flex-row items-center gap-16 max-w-5xl w-full">

        {/* LEFT: CARTOON WORKER + BOX */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Worker Illustration */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg width="260" height="260" viewBox="0 0 300 300">
              {/* Body */}
              <circle cx="150" cy="80" r="40" fill="#6b46c1" />
              <rect x="110" y="120" width="80" height="90" rx="15" fill="#6b46c1" />

              {/* Arms */}
              <rect x="90" y="130" width="30" height="80" rx="15" fill="#f97316" />
              <rect x="180" y="130" width="30" height="80" rx="15" fill="#f97316" />

              {/* Legs */}
              <rect x="115" y="210" width="30" height="70" rx="10" fill="#6b46c1" />
              <rect x="155" y="210" width="30" height="70" rx="10" fill="#6b46c1" />

              {/* Head */}
              <circle cx="150" cy="65" r="30" fill="#ffddc0" />

              {/* Hat */}
              <rect x="120" y="40" width="60" height="20" rx="5" fill="#f97316" />
              <rect x="130" y="32" width="40" height="15" rx="4" fill="#f97316" />
            </svg>
          </motion.div>

          {/* FF24 Box */}
          <motion.div
            className="mt-[-40px] bg-white shadow-lg border-2 border-orange-400 rounded-lg px-10 py-6 text-center"
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <p className="text-3xl font-black text-orange-500">FF24</p>
          </motion.div>
        </motion.div>

        {/* RIGHT: LOGIN FORM */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md border"
        >
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Вход в личный кабинет
          </h1>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Введите email"
              className="border rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-purple-500 outline-none"
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
        </motion.div>
      </div>
    </div>
  );
}
