import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE } from '../lib/motion';

interface MaskTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
}

export const MaskText: React.FC<MaskTextProps> = ({
  text,
  as = 'h2',
  className = '',
  delay = 0,
}) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const isInView = useInView(wrapperRef, {
    once: true,
    margin: '0px 0px -10% 0px',
  });

  const words = text.split(' ');
  const Tag = as;

  return (
    <Tag
      ref={wrapperRef as any}
      aria-label={text}
      className={`inline-block ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-1 -mb-1 mr-[0.28em] align-top"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%' }}
            animate={isInView ? { y: 0 } : { y: '115%' }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: delay + i * 0.05,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
