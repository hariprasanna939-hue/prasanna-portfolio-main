import React from "react";
import { useTheme } from "@/hooks/use-theme-mode";
import { motion } from "framer-motion";

const SpiderWebTrail = () => {
    const { mode } = useTheme();

    if (mode !== "spidy") return null;

    return (
        <div className="fixed top-0 right-0 w-32 h-full z-[90] pointer-events-none overflow-hidden block">
            {/* The Main Web Line with Cinematic Red Glow */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute right-12 top-0 w-[1px] bg-white/30 shadow-[0_0_15px_rgba(220,38,38,0.5),0_0_30px_rgba(220,38,38,0.3)] z-10"
            />

            {/* Intricate Web Pattern SVG - Minimalist Red */}
            <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 100 1000" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="webGradientRed" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                <path d="M100 0 C 80 50, 40 100, 100 150 C 60 200, 20 250, 100 300 C 70 350, 30 400, 100 450 C 60 500, 20 550, 100 600 C 80 650, 40 700, 100 750 C 60 800, 20 850, 100 900 C 80 950, 40 1000, 100 1050"
                    stroke="url(#webGradientRed)" fill="none" strokeWidth="0.5" />
            </svg>

            {/* Subtle Red Particle-like Pulse along the web */}
            <motion.div
                animate={{
                    y: [0, 1000],
                    opacity: [0, 1, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute right-[46px] w-1 h-32 bg-gradient-to-b from-transparent via-red-500/50 to-transparent"
            />
        </div>
    );
};

export default SpiderWebTrail;
