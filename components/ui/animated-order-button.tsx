'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Package } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type OrderButtonState = 'idle' | 'loading' | 'success' | 'done';

export default function AnimatedOrderButton({
  onClick,
  disabled = false,
  className,
}: {
  onClick: () => Promise<void> | void;
  disabled?: boolean;
  className?: string;
}) {
  const [state, setState] = useState<OrderButtonState>('idle');

  const handleClick = async () => {
    if (state !== 'idle' || disabled) return;

    setState('loading');
    try {
      await onClick();
      setState('success');
      setTimeout(() => setState('done'), 3000);
    } catch (err) {
      setState('idle');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || state !== 'idle'}
      className={cn(
        "relative w-64 h-16 overflow-hidden rounded-2xl font-medium text-white transition-all",
        "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400",
        "shadow-lg hover:shadow-xl active:scale-95",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        state === 'loading' && "cursor-wait",
        className
      )}
    >
      {/* Фон прогресса (дорога) */}
      <div className="absolute inset-0 bg-zinc-900">
        <motion.div
          className="h-full bg-gradient-to-r from-zinc-800 to-zinc-900"
          initial={{ x: "-100%" }}
          animate={{ x: state === 'loading' ? "0%" : "-100%" }}
          transition={{ duration: 2.4, ease: "easeIn" }}
        />
      </div>

      {/* Текст и иконки */}
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex items-center justify-center gap-3 text-lg"
          >
            <Package className="w-5 h-5" />
            Создать заказ в МойСклад
          </motion.span>
        )}

        {state === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex items-center justify-center h-full"
          >
            {/* Грузовик */}
            <TruckAnimation />
          </motion.div>
        )}

        {(state === 'success' || state === 'done') && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex items-center justify-center gap-3 text-lg"
          >
            <Check className="w-6 h-6" />
            Заказ отправлен!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// Отдельный компонент грузовика — чистый SVG + Framer Motion
function TruckAnimation() {
  return (
    <motion.div
      initial={{ x: -120 }}
      animate={{ x: 220 }}
      transition={{
        duration: 2.6,
        ease: [0.4, 0, 0.1, 1],
      }}
      className="relative"
    >
      <svg width="84" height="48" viewBox="0 0 84 48" className="drop-shadow-2xl">
        {/* Кузов */}
        <motion.rect
          x="12" y="14" width="48" height="24" rx="4"
          fill="#1a1a1a"
          stroke="#333"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />

        {/* Красная кабина */}
        <rect x="52" y="16" width="28" height="20" rx="4" fill="#ef4444" />
        <rect x="56" y="20" width="20" height="12" rx="2" fill="#991b1b" />

        {/* Окно кабины */}
        <rect x="58" y="22" width="16" height="8" rx="1" fill="#1a1a1a" opacity="0.7" />

        {/* Фары */}
        <circle cx="78" cy="30" r="3" fill="#fbbf24" opacity="0.9">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* Колёса */}
        <g fill="#0f0f0f" stroke="#000" strokeWidth="3">
          <circle cx="24" cy="40" r="6" />
          <circle cx="48" cy="40" r="6" />
        </g>
        <g fill="#333">
          <circle cx="24" cy="40" r="3" />
          <circle cx="48" cy="40" r="3" />
        </g>

        {/* Коробка (груз) */}
        <motion.rect
          x="20" y="18" width="16" height="16" rx="2"
          fill="#f59e0b"
          stroke="#d97706"
          strokeWidth="2"
          initial={{ x: -40, y: -10, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
        <motion.path
          d="M24 22 l4 0 M24 26 l4 0 M24 30 l4 0"
          stroke="#92400e"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.3 }}
        />
      </svg>
    </motion.div>
  );
}
