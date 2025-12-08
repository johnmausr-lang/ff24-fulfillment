// src/components/ui/animated-buttons/order-truck-button.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Package, Check, Truck } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type State = 'idle' | 'loading' | 'success' | 'done';

export function OrderTruckButton({
  onClick,
  text = "Создать заказ",
  loadingText = "Отправляем в МойСклад...",
  successText = "Заказ создан!",
  className,
}: {
  onClick: () => Promise<void>;
  text?: string;
  loadingText?: string;
  successText?: string;
  className?: string;
}) {
  const [state, setState] = useState<State>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;
    setState('loading');
    try {
      await onClick();
      setState('success');
      setTimeout(() => setState('done'), 3000);
    } catch {
      setState('idle');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={state !== 'idle'}
      className={cn(
        "relative h-14 px-8 rounded-xl font-medium text-white overflow-hidden",
        "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400",
        "shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-60",
        className
      )}
    >
      <div className="absolute inset-0 bg-zinc-900">
        <motion.div
          className="h-full bg-gradient-to-r from-zinc-800 to-zinc-900"
          animate={{ x: state === 'loading' ? "0%" : "-100%" }}
          transition={{ duration: 2.4, ease: "easeIn" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.span key="idle" className="relative z-10 flex items-center gap-3">
            <Truck className="w-5 h-5" />
            {text}
          </motion.span>
        )}
        {state === 'loading' && (
          <motion.div key="loading" className="relative z-10">
            <TruckLoadingAnimation />
          </motion.div>
        )}
        {(state === 'success' || state === 'done') && (
          <motion.span key="success" className="relative z-10 flex items-center gap-3">
            <Check className="w-6 h-6" />
            {successText}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

// Анимация грузовика
function TruckLoadingAnimation() {
  return (
    <motion.div
      initial={{ x: -140 }}
      animate={{ x: 240 }}
      transition={{ duration: 2.6, ease: [0.4, 0, 0.1, 1] }}
      className="flex items-center justify-center"
    >
      <svg width="90" height="50" viewBox="0 0 90 50" className="drop-shadow-2xl">
        <rect x="10" y="16" width="52" height="24" rx="4" fill="#1f2937" stroke="#374151" strokeWidth="2"/>
        <rect x="58" y="18" width="30" height="20" rx="4" fill="#ef4444"/>
        <rect x="62" y="22" width="22" height="12" rx="2" fill="#991b1b"/>
        <rect x="64" y="24" width="18" height="8" rx="1" fill="#1f2937" opacity="0.6"/>
        <circle cx="22" cy="42" r="6" fill="#0f172a"/><circle cx="50" cy="42" r="6" fill="#0f172a"/>
        <circle cx="22" cy="42" r="3" fill="#374151"/><circle cx="50" cy="42" r="3" fill="#374151"/>
        <motion.rect x="20" y="20" width="18" height="16" rx="2" fill="#f59e0b" stroke="#d97706"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        />
      </svg>
    </motion.div>
  );
}
