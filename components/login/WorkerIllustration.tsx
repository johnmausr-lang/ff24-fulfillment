"use client";

import { motion } from "framer-motion";

export default function WorkerIllustration() {
  return (
    <div className="relative w-[420px] h-[480px] flex items-end justify-center">
      {/* персонаж */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-24"
      >
        <svg width="280" height="380" viewBox="0 0 300 450" fill="none">
          {/* тело */}
          <rect x="110" y="160" width="80" height="140" rx="20" fill="#6B46C1" />
          {/* руки */}
          <rect x="80" y="170" width="40" height="120" rx="20" fill="#F97316" />
          <rect x="180" y="170" width="40" height="120" rx="20" fill="#F97316" />
          {/* ноги */}
          <rect x="120" y="300" width="30" height="110" rx="12" fill="#6B46C1" />
          <rect x="160" y="300" width="30" height="110" rx="12" fill="#6B46C1" />
          {/* голова */}
          <circle cx="150" cy="120" r="55" fill="#FFD6B0" />
          {/* каска */}
          <rect x="105" y="70" width="90" height="35" rx="8" fill="#F97316" />
          <rect x="120" y="50" width="60" height="30" rx="8" fill="#F97316" />

          {/* глаза (мигание) */}
          <motion.ellipse
            cx="135"
            cy="120"
            rx="8"
            animate={{ ry: [8, 1, 8] }}
            transition={{ duration: 3, repeat: Infinity }}
            fill="#2D2D2D"
          />
          <motion.ellipse
            cx="165"
            cy="120"
            rx="8"
            animate={{ ry: [8, 1, 8] }}
            transition={{ duration: 3, repeat: Infinity }}
            fill="#2D2D2D"
          />
        </svg>
      </motion.div>

      {/* коробка */}
      <motion.div
        animate={{ rotate: [-1.2, 1.2, -1.2] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute bottom-0 bg-white rounded-xl border-4 border-orange-400 px-14 py-8 shadow-xl"
      >
        <p className="text-5xl font-black text-orange-500">FF24</p>
      </motion.div>
    </div>
  );
}
