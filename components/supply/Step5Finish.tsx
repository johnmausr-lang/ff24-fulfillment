"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Step5Finish({ supplyId }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12">

      {/* Анимированные коробки */}
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="flex gap-6 mb-10"
      >
        <motion.div
          initial={{ rotate: -8 }}
          animate={{ rotate: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
          className="w-24 h-24 bg-[#21004B] text-white rounded-xl flex items-center justify-center shadow-xl text-xl font-bold"
        >
          FF24
        </motion.div>

        <motion.div
          initial={{ rotate: 8 }}
          animate={{ rotate: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
          className="w-24 h-24 bg-[#4B2C82] text-white rounded-xl flex items-center justify-center shadow-xl text-xl font-bold"
        >
          BOX
        </motion.div>
      </motion.div>

      {/* Уезжают в сторону */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "120%" }}
        transition={{ delay: 1.2, duration: 1.3, ease: "easeInOut" }}
        className="flex gap-6 absolute mt-[-80px]"
      >
        <div className="w-24 h-24 bg-[#21004B] rounded-xl shadow-xl" />
        <div className="w-24 h-24 bg-[#4B2C82] rounded-xl shadow-xl" />
      </motion.div>

      {/* Основной блок успеха */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="bg-white p-10 rounded-2xl shadow-xl border max-w-xl"
      >
        <h2 className="text-4xl font-black text-[#21004B] mb-4">
          Поставка создана!
        </h2>

        <p className="text-lg text-gray-600 mb-4">
          Ваша поставка успешно создана и передана на обработку FF24.
        </p>

        <div className="text-2xl font-bold text-[#4B2C82] mb-6">
          Номер поставки: {supplyId}
        </div>

        {/* Кнопки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Link
            href="/dashboard/supply/new"
            className="py-4 bg-[#21004B] text-white rounded-xl text-lg font-bold hover:opacity-90 transition"
          >
            Создать новую
          </Link>

          <Link
            href="/dashboard"
            className="py-4 bg-gray-200 rounded-xl text-lg font-bold hover:opacity-80 transition"
          >
            В личный кабинет
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
