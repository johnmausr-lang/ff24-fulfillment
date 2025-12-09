"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Worker3D() {
  return (
    <motion.div
      className="relative flex items-end justify-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Тонкая неоновая тень */}
      <motion.div
        className="absolute bottom-0 w-48 h-8 bg-[#21004B] opacity-20 rounded-full blur-xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Image
          src="/illustrations/worker-ff24.png"
          width={420}
          height={420}
          alt="FF24 Worker"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
