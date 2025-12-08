"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TruckLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 300 }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex items-center"
      >
        <Image
          src="/truck-loading.png"
          alt="Loading"
          width={160}
          height={160}
          className="drop-shadow-xl"
        />
      </motion.div>
    </div>
  );
}
