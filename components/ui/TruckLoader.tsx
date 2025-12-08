"use client";

import { motion } from "framer-motion";
import "./truck.css";

export default function TruckLoader() {
  return (
    <motion.div
      className="truck-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="truck"
        animate={{ x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      />
      <div className="loading-text">Загрузка…</div>
    </motion.div>
  );
}
