"use client";

import { motion } from "framer-motion";

export default function TruckButtonPrimary({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="
        relative w-full py-5 px-14
        rounded-full font-bold text-2xl
        bg-gradient-to-r from-[#21004B] to-[#4B2C82]
        text-[#D7FF00]
        shadow-[0_8px_40px_rgba(33,0,75,0.45)]
        overflow-hidden
        flex items-center justify-center
      "
    >
      {/* Анимированный грузовик */}
      <motion.div
        initial={{ x: -140, rotate: -6 }}
        animate={{ x: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="absolute left-6"
      >
        <svg width="55" height="32" viewBox="0 0 80 50" fill="none">
          <rect width="55" height="24" rx="6" fill="#21004B" />
          <rect y="12" width="40" height="24" rx="6" fill="#4B2C82" />
          <circle cx="20" cy="40" r="8" fill="#D7FF00" />
          <circle cx="45" cy="40" r="8" fill="#D7FF00" />
        </svg>
      </motion.div>

      {/* Текст */}
      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
}
