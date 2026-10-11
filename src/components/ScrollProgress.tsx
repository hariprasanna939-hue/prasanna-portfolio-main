import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 32,
    mass: 0.25,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[70] pointer-events-none bg-slate-200/40 backdrop-blur-xs">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-[#3978F6] via-[#60A5FA] to-[#818CF8] shadow-[0_0_8px_rgba(57,120,246,0.5)] origin-left"
      />
    </div>
  );
};
