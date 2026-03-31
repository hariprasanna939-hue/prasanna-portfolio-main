import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme-mode";

const SpidermanParticles = () => {
    const { mode } = useTheme();
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        if (mode === "spidy") {
            const p = Array.from({ length: 40 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                duration: Math.random() * 20 + 10,
                delay: Math.random() * 5,
            }));
            setParticles(p);
        } else {
            setParticles([]);
        }
    }, [mode]);

    if (mode !== "spidy") return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-red-500/30"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        filter: "blur(1px)",
                    }}
                    animate={{
                        y: [0, -1000],
                        opacity: [0, 0.8, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

export default SpidermanParticles;
