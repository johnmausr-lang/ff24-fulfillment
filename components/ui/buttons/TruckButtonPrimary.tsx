"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TruckButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function TruckButtonPrimary({ children, onClick }: TruckButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="
        w-full py-5 px-14 rounded-full font-bold text-xl
        text-white 
        bg-gradient-to-r from-[#21004B] to-[#4B2C82]
        shadow-[0_10px_40px_rgba(33,0,75,0.5)]
        relative overflow-hidden flex items-center justify-center
      "
    >
      {/* Анимированный грузовик */}
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: -40, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 70, damping: 12 }}
        className="absolute left-6"
      >
        <svg width="55" height="32" viewBox="0 0 80 50">
          <rect width="55" height="24" rx="6" fill="#21004B"/>
          <rect y="12" width="40" height="24" rx="6" fill="#4B2C82"/>
          <circle cx="20" cy="40" r="8" fill="#D7FF00"/>
          <circle cx="45" cy="40" r="8" fill="#D7FF00"/>
        </svg>
      </motion.div>

      {/* Текст кнопки */}
      <span className="z-10">{children}</span>
    </motion.button>
  );
}
