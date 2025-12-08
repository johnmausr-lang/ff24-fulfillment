// components/ui/animated-buttons/base-animated-button.tsx

"use client";   // ← ЭТА СТРОКА — ВСЁ, ЧТО НУЖНО!

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";  // ← useState теперь виден
import { cn } from "@/lib/utils";

type State = 'idle' | 'loading' | 'success';

interface BaseAnimatedButtonProps {
  onClick: () => Promise<void>;
  idleContent: ReactNode;
  loadingContent: ReactNode;
  successContent: ReactNode;
  className?: string;
}

export function BaseAnimatedButton({
  onClick,
  idleContent,
  loadingContent,
  successContent,
  className,
}: BaseAnimatedButtonProps) {
  const [state, setState] = useState<State>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;
    setState('loading');
    try {
      await onClick();
      setState('success');
      setTimeout(() => setState('idle'), 3000);
    } catch {
      setState('idle');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={state !== 'idle'}
      className={cn(
        "relative h-14 px-8 rounded-xl font-medium text-white overflow-hidden shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-60",
        "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400",
        className
      )}
    >
      {/* ... остальной код без изменений */}
      <div className="absolute inset-0 bg-zinc-900">
        <motion.div
          className="h-full bg-gradient-to-r from-zinc-800 to-zinc-900"
          animate={{ x: state === 'loading' ? "0%" : "-100%" }}
          transition={{ duration: 2.4, ease: "easeIn" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {state === 'idle' && <motion.div key="idle" className="relative z-10 flex items-center justify-center gap-3">{idleContent}</motion.div>}
        {state === 'loading' && <motion.div key="loading" className="relative z-10">{loadingContent}</motion.div>}
        {state === 'success' && <motion.div key="success" className="relative z-10 flex items-center justify-center gap-3">{successContent}</motion.div>}
      </AnimatePresence>
    </button>
  );
}
