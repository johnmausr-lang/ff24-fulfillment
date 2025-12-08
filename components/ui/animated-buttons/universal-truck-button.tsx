'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Package } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type State = 'idle' | 'running' | 'success';

export function UniversalTruckButton({
  onClick,
  idleText = "Выполнить действие",
  successText = "Готово!",
  className,
}: {
  onClick: () => Promise<void>;
  idleText?: string;
  successText?: string;
  className?: string;
}) {
  const [state, setState] = useState<State>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;

    setState('running');
    try {
      await onClick();
      setState('success');
      // Автоматически возвращаем в idle через 10 сек (как в оригинале)
      setTimeout(() => setState('idle'), 10000);
    } catch (err) {
      setState('idle');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={state !== 'idle'}
      className={cn(
        "relative w-80 h-20 rounded-3xl overflow-hidden font-medium text-white shadow-2xl transition-all",
        "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400",
        "active:scale-95 disabled:opacity-70",
        className
      )}
    >
      {/* Дорога */}
      <div className="absolute inset-0 bg-zinc-900">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600"
          initial={{ x: "-100%" }}
          animate={state === 'running' ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 10, ease: "linear" }}
        />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-8 h-1 bg-white opacity-30"
            initial={{ x: -320 }}
            animate={state === 'running' ? { x: 320 } : { x: -320 }}
            transition={{ duration: 10, ease: "linear", delay: i * 0.15 }}
            style={{ left: `${i * 5}%` }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Idle */}
        {state === 'idle' && (
          <motion.div
            key="idle"
            className="relative z-10 flex h-full items-center justify-center gap-3 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Package className="w-6 h-6" />
            {idleText}
          </motion.div>
        )}

        {/* Running — ТОТ САМЫЙ ГРУЗОВИК ИЗ ТВОЕГО ФАЙЛА */}
        {state === 'running' && <TruckFullAnimation />}

        {/* Success */}
        {state === 'success' && (
          <motion.div
            key="success"
            className="relative z-10 flex h-full items-center justify-center gap-3 text-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Check className="w-8 h-8" />
            {successText}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

// Полная анимация грузовика — 1-в-1 как в твоём оригинале, но на React
function TruckFullAnimation() {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ x: [24, -224, -104, -164, 24] }}
        transition={{ duration: 10, times: [0, 0.3, 0.4, 0.6, 1], ease: "easeInOut" }}
        className="relative"
      >
        <svg width="300" height="80" viewBox="0 0 300 80">
          {/* Линии дороги */}
          <g className="lines">
            {[...Array(22)].map((_, i) => (
              <rect key={i} x={i * 15} y="38" width="6" height="3" fill="white" opacity="0.3" />
            ))}
          </g>

          {/* Грузовик */}
          <g className="truck">
            {/* Кузов */}
            <rect x="30" y="20" width="150" height="40" rx="4" fill="#1a1a1a" stroke="#333" />
            {/* Кабина */}
            <rect x="180" y="22" width="70" height="36" rx="6" fill="#ef4444" />
            <rect x="190" y="28" width="50" height="24" rx="3" fill="#991b1b" />
            <rect x="200" y="32" width="30" height="16" rx="2" fill="#1a1a1a" opacity="0.7" />

            {/* Фары */}
            <circle cx="245" cy="44" r="5" fill="#fbbf24">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1s" repeatCount="indefinite" />
            </circle>

            {/* Колёса */}
            <circle cx="60" cy="65" r="10" fill="#0f0f0f" stroke="#000" strokeWidth="3" />
            <circle cx="120" cy="65" r="10" fill="#0f0f0f" stroke="#000" strokeWidth="3" />
            <circle cx="60" cy="65" r="5" fill="#333" />
            <circle cx="120" cy="65" r="5" fill="#333" />

            {/* Коробка (груз) */}
            <motion.rect
              x="70"
              y="28"
              width="30"
              height="24"
              rx="4"
              fill="#f59e0b"
              stroke="#d97706"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: [0, 40, 112, 112], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 10, times: [0, 0.08, 0.25, 1] }}
            />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
