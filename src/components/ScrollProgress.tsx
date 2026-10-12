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
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] pointer-events-none bg-white/5">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-[#FF5C35] shadow-[0_0_12px_rgba(255,92,53,0.8)] origin-left"
      />
    </div>
  );
};
