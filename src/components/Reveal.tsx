import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';

interface RevealProps {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  y = 24,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: 0.8,
        ease: EASE,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
