"use client";

import { motion } from "framer-motion";

export default function TruckButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex items-center justify-center w-full py-4 rounded-xl text-white font-bold text-xl shadow-xl overflow-hidden bg-gradient-to-r from-purple-600 to-orange-500"
    >
      <motion.div
        initial={{ x: -220 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
        className="absolute left-3"
      >
        🚛
      </motion.div>

      <span className="relative z-10">Войти</span>
    </motion.button>
  );
}
