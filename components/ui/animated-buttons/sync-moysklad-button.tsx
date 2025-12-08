'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Cloud, CloudDownload } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type State = 'idle' | 'loading' | 'success' | 'done';

export function SyncMoyskladButton({
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
        "relative h-14 px-8 rounded-xl font-medium text-white overflow-hidden shadow-lg hover:shadow-xl active:scale-95 transition-all disabled:opacity-60",
        "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400",
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
            <CloudDownload className="w-5 h-5" />
            Синхронизировать
          </motion.span>
        )}

        {state === 'loading' && (
          <motion.div key="loading" className="relative z-10 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cloud className="w-8 h-8 text-red-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -inset-4"
            >
              <div className="w-32 h-32 bg-red-500/20 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        )}

        {(state === 'success' || state === 'done') && (
          <motion.span key="success" className="relative z-10 flex items-center gap-3">
            <Check className="w-6 h-6" />
            Синхронизировано!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
