"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Worker3D from "@/components/login/Worker3D";
import TruckButtonPrimary from "@/components/ui/buttons/TruckButtonPrimary";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    if (!email) return;

    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/dashboard");
    } else {
      alert("Пользователь не найден");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl w-full">

        {/* Левая часть — грузчик */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <Worker3D />

          <motion.div
            className="mt-4 bg-white rounded-2xl px-6 py-3 shadow-lg border-2 border-[#F97316]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-3xl font-black text-[#21004B]">FF24</span>
          </motion.div>
        </motion.div>

        {/* Правая часть — форма */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-10 border border-purple-200"
        >
          <h1 className="text-4xl font-black text-[#21004B] mb-6">
            Вход в личный кабинет
          </h1>

          <div className="flex flex-col gap-6">

            <input
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-5 py-4 rounded-xl bg-gray-100
                text-lg border border-gray-300
                focus:outline-none focus:ring-4 focus:ring-purple-300
              "
            />

            <TruckButtonPrimary onClick={handleLogin}>
              {loading ? "Загрузка..." : "Войти"}
            </TruckButtonPrimary>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
