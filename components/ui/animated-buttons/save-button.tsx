'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Save } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function SaveButton({
  onClick,
  className,
}: {
  onClick: () => Promise<void>;
  className?: string;
}) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;
    setState('saving');
    try {
      await onClick();
      setState('saved');
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
        "relative h-14 px-8 rounded-xl font-medium text-white overflow-hidden shadow-lg hover:shadow-xl active:scale-95 transition-all",
        state === 'idle' && "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400",
        state === 'saving' && "bg-gradient-to-r from-orange-600 to-orange-500",
        state === 'saved' && "bg-gradient-to-r from-green-600 to-green-500",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.span key="idle" className="relative z-10 flex items-center gap-3">
            <Save className="w-5 h-5" />
            Сохранить настройки
          </motion.span>
        )}
        {state === 'saving' && (
          <motion.div key="saving" className="relative z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Save className="w-6 h-6" />
            </motion.div>
          </motion.div>
        )}
        {state === 'saved' && (
          <motion.span
            key="saved"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative z-10 flex items-center gap-3"
          >
            <Check className="w-6 h-6" />
            Сохранено!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
