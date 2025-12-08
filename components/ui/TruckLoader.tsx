"use client";

import { motion } from "framer-motion";
import "@/components/ui/truck.css";

export default function TruckLoader() {
  return (
    <div className="truck-loader-overlay">
      <div className="truck-loader-container">
        <motion.div
          className="truck-icon"
          animate={{ x: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          🚚
        </motion.div>

        <motion.div
          className="loader-bar"
          initial={{ width: "0%" }}
          animate={{ width: ["0%", "90%", "60%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        />

        <div className="loader-text">Загрузка…</div>
      </div>
    </div>
  );
}
