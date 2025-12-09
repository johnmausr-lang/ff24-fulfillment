"use client";

import { motion } from "framer-motion";

export default function TruckLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <motion.div
        animate={{ x: ["-120%", "120%"] }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="relative"
      >
        <svg width="80" height="40" viewBox="0 0 80 50" fill="none">
          <rect width="60" height="22" rx="6" fill="#21004B" />
          <rect y="10" width="45" height="22" rx="6" fill="#4B2C82" />
          <circle cx="22" cy="38" r="7" fill="#D7FF00" />
          <circle cx="45" cy="38" r="7" fill="#D7FF00" />
        </svg>
      </motion.div>

      <p className="mt-4 text-xl font-bold text-[#21004B]">
        Загружаем данные...
      </p>
    </div>
  );
}
