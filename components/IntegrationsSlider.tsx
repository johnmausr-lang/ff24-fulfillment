"use client";

import { motion } from "framer-motion";

const integrations = [
  { name: "Wildberries", color: "#A200FF" },
  { name: "Ozon", color: "#0060FF" },
  { name: "Яндекс.Маркет", color: "#FFCC00" },
  { name: "AliExpress", color: "#FF2D00" },
];

export default function IntegrationsSlider() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-5xl font-black text-[#21004B] mb-16">
          Интеграции FF24
        </h2>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-16"
            animate={{ x: ["0%", "-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          >
            {integrations.map((item, i) => (
              <div
                key={i}
                className="text-3xl font-bold px-10 py-6 rounded-2xl shadow-xl"
                style={{ backgroundColor: item.color + "22" }}
              >
                {item.name}
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
