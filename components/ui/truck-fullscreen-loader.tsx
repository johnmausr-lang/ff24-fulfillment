'use client';

import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TruckFullscreenLoaderProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}

export function TruckFullscreenLoader({
  isLoading,
  message = "Обрабатываем ваш запрос...",
  className,
}: TruckFullscreenLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className={cn("fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm", className)}>
      {/* Основной контейнер */}
      <div className="relative w-full max-w-2xl">
        {/* Дорога */}
        <div className="absolute bottom-32 left-0 right-0 h-1 bg-gray-700" />
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-32 w-12 h-1 bg-white/40"
            initial={{ x: -400 }}
            animate={{ x: 400 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.12,
            }}
            style={{ left: `${i * 4.5}%` }}
          />
        ))}

        {/* ГРУЗОВИК — 1 в 1 как в твоём оригинале */}
        <motion.div
          animate={{
            x: [80, -280, -120, -200, 80],
          }}
          transition={{
            duration: 10,
            times: [0, 0.3, 0.4, 0.6, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <svg width="380" height="180" viewBox="0 0 380 180" className="drop-shadow-2xl">
            {/* Кузов */}
            <rect x="40" y="60" width="180" height="60" rx="8" fill="#1f1f1f" stroke="#333" strokeWidth="3"/>
            
            {/* Кабина — твой красный цвет */}
            <rect x="220" y="64" width="100" height="52" rx="10" fill="#ef4444"/>
            <rect x="240" y="74" width="60" height="36" rx="6" fill="#991b1b"/>
            <rect x="255" y="82" width="40" height="24" rx="4" fill="#1f1f1f" opacity="0.7"/>

            {/* Фары (мигают) */}
            <circle cx="312" cy="96" r="8" fill="#fbbf24">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.2s" repeatCount="indefinite"/>
            </circle>

            {/* Колёса */}
            <g stroke="#000" strokeWidth="4">
              <circle cx="90" cy="130" r="16" fill="#0f0f0f"/>
              <circle cx="170" cy="130" r="16" fill="#0f0f0f"/>
            </g>
            <circle cx="90" cy="130" r="8" fill="#333"/>
            <circle cx="170" cy="130" r="8" fill="#333"/>

            {/* КОРОБКА — подбирается и исчезает (как в оригинале) */}
            <motion.rect
              x="110" y="74" width="40" height="36" rx="6"
              fill="#f59e0b" stroke="#d97706" strokeWidth="3"
              initial={{ x: 0, opacity: 0 }}
              animate={{
                x: [0, 50, 140, 140],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 10,
                times: [0, 0.08, 0.25, 1],
                repeat: Infinity,
              }}
            />
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6] }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              <path d="M125 82 l20 0 M125 92 l20 0 M125 102 l20 0" stroke="#92400e" strokeWidth="2"/>
            </motion.g>
          </svg>
        </motion.div>
      </div>

      {/* Текст */}
      <div className="mt-12 text-center">
        <p className="text-2xl font-semibold text-white mb-2">{message}</p>
        <p className="text-red-400 flex items-center justify-center gap-2">
          <Package className="w-5 h-5 animate-bounce" />
          FF24 Fulfillment работает для вас
          <Package className="w-5 h-5 animate-bounce" style={{ animationDelay: "0.2s" }} />
        </p>
      </div>
    </div>
  );
}
