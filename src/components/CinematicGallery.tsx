import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

interface GallerySlot {
  id: number;
  label: string;
  image: string | null;
  accent: string;
}

const slots: GallerySlot[] = [
  { id: 1, label: "Photo 01", image: null, accent: "#1a1a2e" },
  { id: 2, label: "Photo 02", image: null, accent: "#16213e" },
  { id: 3, label: "Photo 03", image: null, accent: "#0f3460" },
  { id: 4, label: "Photo 04", image: null, accent: "#1a1a2e" },
  { id: 5, label: "Photo 05", image: null, accent: "#0d0d1a" },
];

const tripleSlots = [...slots, ...slots, ...slots];

const CARD_W = 520;
const CARD_H = Math.round(CARD_W * (9 / 16));
const GAP = 28;
const STEP = CARD_W + GAP;
const TOTAL = slots.length * STEP;

// 🔥 CLEAN DEPTH (VISIBLE ALL)
function depthProps(dist: number) {
  const abs = Math.abs(dist);

  return {
    scale: abs === 0 ? 1.08 : 0.92, // slight difference only
    opacity: 1, // 🔥 FULL VISIBILITY
    blur: 0, // 🔥 NO BLUR
    zIndex: abs === 0 ? 10 : 5,
  };
}

const CinematicGallery: React.FC = () => {
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number | null>(null);

  // 🔥 FASTER SPEED
  const SPEED = 120;

  useEffect(() => {
    const tick = (time: number) => {
      if (!paused) {
        if (lastTimeRef.current !== null) {
          const delta = time - lastTimeRef.current;
          const next = x.get() - (SPEED * delta) / 1000;
          x.set(next % -TOTAL);
        }
        lastTimeRef.current = time;
      } else {
        lastTimeRef.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, x]);

  return (
    <section className="relative py-28 overflow-hidden bg-black select-none">

      {/* 🔥 BIG VISIBLE HEADING */}
      <div className="mb-16 px-6 md:px-16">
        <p className="text-white/40 text-sm tracking-[0.5em] uppercase mb-4">
          Gallery
        </p>

        <h2
          className="font-bold text-white leading-tight"
          style={{
            fontSize: "clamp(3rem, 6vw, 5rem)", // 🔥 BIGGER
            letterSpacing: "-0.02em",
            textShadow: "0 0 40px rgba(255,255,255,0.2)",
          }}
        >
          Moments
        </h2>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-20 bg-gradient-to-l from-black to-transparent" />

      {/* Gallery */}
      <div
        className="relative mx-auto overflow-visible"
        style={{
          height: CARD_H + 60,
          maxWidth: "100vw",
        }}
      >
        <motion.div
          className="absolute flex items-center"
          style={{
            x,
            left: `calc(50% - ${CARD_W / 2}px)`,
            gap: `${GAP}px`,
          }}
        >
          {tripleSlots.map((slot, i) => {
            const centerIdx = slots.length;
            const dist = i - centerIdx;

            const { scale, opacity, blur, zIndex } = depthProps(dist);

            return (
              <motion.div
                key={`${slot.id}-${i}`}
                onHoverStart={() => setPaused(true)}
                onHoverEnd={() => setPaused(false)}
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  flexShrink: 0,
                  borderRadius: 16,
                  overflow: "hidden",
                  zIndex,
                  scale,
                  opacity,
                  filter: `blur(${blur}px)`,
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3 },
                }}
              >
                {slot.image ? (
                  <img
                    src={slot.image}
                    alt={slot.label}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <PlaceholderCard label={slot.label} accent={slot.accent} />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// 🔥 CLEAN PLACEHOLDER (VISIBLE)
const PlaceholderCard: React.FC<{ label: string; accent: string }> = ({
  label,
  accent,
}) => {
  return (
    <div
      className="w-full h-full flex items-center justify-center text-white font-medium text-lg"
      style={{ background: accent }}
    >
      {label}
    </div>
  );
};

export default CinematicGallery;