'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, Package } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type State = 'idle' | 'loading' | 'success' | 'done';

export function UploadButton({
  onClick,
  className,
}: {
  onClick: () => Promise<void>;
  className?: string;
}) {
  const [state, setState] = useState<State>('idle');

  const handleClick = async () => {
    if (state !== 'idle') return;
    setState('loading');
    try {
      await onClick();
      setState('success');
      setTimeout(() => setState('done'), 2800);
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
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.span key="idle" className="relative z-10 flex items-center gap-3">
            <Upload className="w-5 h-5" />
            Загрузить товары
          </motion.span>
        )}

        {state === 'loading' && (
          <motion.div key="loading" className="relative z-10 flex items-center justify-center gap-6">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: -40, opacity: 0 }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeIn",
                }}
              >
                <Package className="w-7 h-7 text-red-300" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {(state === 'success' || state === 'done') && (
          <motion.span key="success" className="relative z-10 flex items-center gap-3">
            <Check className="w-6 h-6" />
            Загружено!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
