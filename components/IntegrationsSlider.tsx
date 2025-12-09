"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Wildberries", img: "/logos/wb.png" },
  { name: "Ozon", img: "/logos/ozon.png" },
  { name: "Яндекс.Маркет", img: "/logos/ym.png" },
  { name: "AliExpress", img: "/logos/aliexpress.png" },
  { name: "СберМаркет", img: "/logos/sber.png" },
];

export default function IntegrationsSlider() {
  const radius = 260; // радиус окружности
  const itemSize = 140; // размер плитки

  return (
    <section className="py-28 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-5xl font-black text-[#21004B] mb-20">
          Интеграции FF24
        </h2>

        {/* 3D контейнер */}
        <div
          className="
            mx-auto relative
            w-[600px] h-[400px]
            perspective-[1200px]
            flex items-center justify-center
          "
        >
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {logos.map((logo, i) => {
              const angle = (i / logos.length) * Math.PI * 2;

              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={i}
                  className="
                    absolute top-1/2 left-1/2
                    bg-white rounded-2xl shadow-xl
                    flex items-center justify-center
                    border border-[#21004B]/10
                  "
                  style={{
                    width: itemSize,
                    height: itemSize,
                    marginLeft: -itemSize / 2,
                    marginTop: -itemSize / 2,
                    transform: `
                      translate3d(${x}px, 0, ${z}px)
                    `,
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  <img
                    src={logo.img}
                    alt={logo.name}
                    className="w-28 h-auto object-contain"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
