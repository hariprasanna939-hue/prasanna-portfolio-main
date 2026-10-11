import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { prefersReducedMotion } from '../lib/motion';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
  float?: boolean;
  glow?: boolean;
  roundedFull?: boolean;
}

export const Tilt3D: React.FC<Tilt3DProps> = ({
  children,
  className = '',
  max = 10,
  float = true,
  glow = true,
  roundedFull = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const rawRx = useMotionValue(0);
  const rawRy = useMotionValue(0);

  const springConfig = { stiffness: 140, damping: 16, mass: 0.5 };
  const rx = useSpring(rawRx, springConfig);
  const ry = useSpring(rawRy, springConfig);

  const isReduced = prefersReducedMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || isReduced) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (e.clientY - rect.top) / rect.height - 0.5;

    rawRx.set(-offsetY * max * 2);
    rawRy.set(offsetX * max * 2);

    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x: gx, y: gy, opacity: 0.45 });
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && !isReduced) {
      setIsHovered(true);
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    rawRx.set(0);
    rawRy.set(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative select-none ${className}`}
      style={{ perspective: 1300 }}
    >
      <motion.div
        animate={
          float && !isHovered && !isReduced
            ? {
                rotateY: [-5, 5, -5],
                y: [0, -8, 0],
              }
            : {
                rotateY: 0,
                y: 0,
              }
        }
        transition={
          float && !isHovered && !isReduced
            ? {
                duration: 11,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : { duration: 0.3 }
        }
        style={{
          rotateX: isHovered ? rx : 0,
          rotateY: isHovered ? ry : undefined,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative"
      >
        {/* Blurred accent glow pushed back in Z */}
        {glow && (
          <div
            className={`absolute -inset-4 bg-accent/20 ${
              roundedFull ? 'rounded-full' : 'rounded-[2rem]'
            } blur-2xl pointer-events-none -z-10 transition-opacity duration-500`}
            style={{
              transform: 'translateZ(-70px)',
              opacity: isHovered ? 0.8 : 0.35,
            }}
          />
        )}

        {/* Card Face */}
        <div
          className={`w-full h-full ${
            roundedFull ? 'rounded-full' : 'rounded-3xl'
          } bg-surface/85 backdrop-blur-md shadow-glass-lg ring-1 ring-white/90 overflow-hidden relative`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {children}

          {/* Glare effect following pointer */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 340px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.95), transparent 70%)`,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
