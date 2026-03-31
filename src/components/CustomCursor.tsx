import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "@/hooks/use-theme-mode";

const CustomCursor = () => {
    const { mode } = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0, active: false });

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for the outer ring (trailing effect)
    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const clickable = target.closest('button, a, .card-luxury, .cursor-pointer, [role="button"]');

            if (clickable) {
                setIsHovering(true);
                const rect = clickable.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                setMagneticPos({ x: centerX, y: centerY, active: true });
            } else {
                setIsHovering(false);
                setMagneticPos({ x: 0, y: 0, active: false });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    // If magnetic is active, target the spring to the center of the element instead of mouse
    useEffect(() => {
        if (magneticPos.active) {
            cursorX.set(magneticPos.x);
            cursorY.set(magneticPos.y);
        }
    }, [magneticPos, cursorX, cursorY]);

    const isSpidy = mode === "spidy";

    return (
        <>
            {/* Hide default cursor globally */}
            <style>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>

            {/* Main Cursor Dot */}
            <motion.div
                className={`custom-cursor fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] ${isSpidy ? "bg-red-500 shadow-[0_0_10px_#ef4444]" : "bg-black"
                    }`}
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Trailing Ring - Magnetic & Dynamic */}
            <motion.div
                className={`custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9998] ${isSpidy ? "" : "mix-blend-difference"
                    }`}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovering ? (isSpidy ? 60 : 50) : 30,
                    height: isHovering ? (isSpidy ? 60 : 50) : 30,
                    backgroundColor: isHovering
                        ? (isSpidy ? "rgba(239, 68, 68, 0.15)" : "rgba(255,255,255,1)")
                        : "transparent",
                    border: isHovering
                        ? (isSpidy ? "1px solid rgba(239, 68, 68, 0.5)" : "none")
                        : (isSpidy ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)"),
                }}
                animate={{
                    scale: isHovering ? 1.2 : 1,
                    rotate: isSpidy && isHovering ? [0, 90, 180, 270, 360] : 0
                }}
                transition={{
                    rotate: { repeat: Infinity, duration: 4, ease: "linear" },
                    default: { type: "spring", damping: 20, stiffness: 300 }
                }}
            >
                {/* Gravity Pull Effect Lines for Spidy Mode */}
                {isSpidy && isHovering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {[0, 45, 90, 135].map((angle) => (
                            <div
                                key={angle}
                                className="absolute w-full h-[1px] bg-red-500/20"
                                style={{ transform: `rotate(${angle}deg)` }}
                            />
                        ))}
                    </motion.div>
                )}
            </motion.div>

            {/* Soft Glow */}
            {(isHovering || isSpidy) && (
                <motion.div
                    className={`custom-cursor fixed top-0 left-0 rounded-full blur-3xl pointer-events-none z-[9997] ${isSpidy ? "w-64 h-64 bg-red-600/10" : "w-32 h-32 bg-black/5"
                        }`}
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
        </>
    );
};

export default CustomCursor;
