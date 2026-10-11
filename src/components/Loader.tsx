import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/site';
import { EASE } from '../lib/motion';

interface LoaderProps {
  progress: number;
  ready: boolean;
  onFinish: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ progress, ready, onFinish }) => {
  const [shown, setShown] = useState<number>(0);
  const [minElapsed, setMinElapsed] = useState<boolean>(false);
  const onFinishCalled = useRef<boolean>(false);

  // Enforce a minimum 2s on screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinElapsed(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Compute target percentage (capped at 95 until ready)
  const targetPercent = Math.min(
    100,
    ready ? 100 : Math.min(95, Math.round(progress * 100))
  );

  // Tick displayed percentage every 30ms
  useEffect(() => {
    const interval = setInterval(() => {
      setShown((prev) => {
        if (prev >= targetPercent) return prev;
        const gap = targetPercent - prev;
        const step = Math.max(1, Math.ceil(gap * 0.12));
        return Math.min(targetPercent, prev + step);
      });
    }, 30);
    return () => clearInterval(interval);
  }, [targetPercent]);

  // Trigger onFinish when ready, minElapsed, and shown >= 100
  useEffect(() => {
    if (ready && minElapsed && shown >= 100 && !onFinishCalled.current) {
      onFinishCalled.current = true;
      onFinish();
    }
  }, [ready, minElapsed, shown, onFinish]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#F5F7FB] text-fg select-none px-6 relative overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {/* Ambient background light orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#DDEBFF]/60 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#DCD8FF]/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 glass-panel p-8 sm:p-12 rounded-3xl max-w-xl w-full flex flex-col items-center text-center shadow-glass-lg border-white/90">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="text-[clamp(1.9rem,6vw,3.8rem)] font-bold tracking-tight text-fg leading-none"
        >
          {profile.name}
        </motion.h1>

        {/* Portfolio subtitle */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="mt-3 text-[11px] sm:text-xs font-bold uppercase tracking-[0.4em] text-accent font-mono"
        >
          LIQUID GLASS PORTFOLIO
        </motion.span>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          className="mt-3 text-xs sm:text-sm text-muted font-medium max-w-md"
        >
          {profile.role}
        </motion.p>

        {/* Progress Bar & Percentage */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
          className="mt-10 flex flex-col items-center gap-3 w-full"
        >
          <div className="w-48 sm:w-64 h-[3px] bg-slate-200/80 rounded-full overflow-hidden relative shadow-inner">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3978F6] to-[#60A5FA] shadow-[0_0_8px_rgba(57,120,246,0.5)] transition-transform duration-75 ease-out origin-left"
              style={{
                width: '100%',
                transform: `scaleX(${shown / 100})`,
              }}
            />
          </div>
          <span className="font-mono text-xs text-muted font-semibold tabular-nums">
            {shown}%
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
