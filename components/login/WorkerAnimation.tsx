"use client";

import { motion } from "framer-motion";

export default function WorkerAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {/* SVG WORKER */}
        <svg width="260" height="260" viewBox="0 0 300 300">
          <circle cx="150" cy="80" r="40" fill="#6b46c1" />
          <rect x="110" y="120" width="80" height="90" rx="15" fill="#6b46c1" />
          <rect x="90" y="130" width="30" height="80" rx="15" fill="#f97316" />
          <rect x="180" y="130" width="30" height="80" rx="15" fill="#f97316" />
          <rect x="115" y="210" width="30" height="70" rx="10" fill="#6b46c1" />
          <rect x="155" y="210" width="30" height="70" rx="10" fill="#6b46c1" />
          <circle cx="150" cy="65" r="30" fill="#ffddc0" />
          <rect x="120" y="40" width="60" height="20" rx="5" fill="#f97316" />
          <rect x="130" y="32" width="40" height="15" rx="4" fill="#f97316" />
        </svg>
      </motion.div>

      <motion.div
        className="mt-[-40px] bg-white shadow-lg border-2 border-orange-400 rounded-lg px-10 py-6 text-center"
        animate={{ rotate: [-1, 1, -1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <p className="text-3xl font-black text-orange-500">FF24</p>
      </motion.div>
    </motion.div>
  );
}
