import React from "react";
import { useTheme } from "@/hooks/use-theme-mode";
import { motion } from "framer-motion";

const ThemeToggle = () => {
    const { mode, toggleMode } = useTheme();

    return (
        <div className="fixed top-8 right-8 z-[110]">
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9, rotate: -5 }}
                onClick={toggleMode}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all duration-500 overflow-hidden border-2 relative group ${mode === "spidy"
                    ? "bg-red-600 border-red-400 ring-4 ring-red-500/20"
                    : "bg-white border-black/10 backdrop-blur-xl"
                    }`}
            >
                <div className="relative w-full h-full flex items-center justify-center z-10 p-1 transition-all duration-500">
                    <motion.div
                        initial={false}
                        className="flex flex-col items-center"
                    >
                        <svg viewBox="0 0 24 24" className={`w-8 h-8 md:w-9 md:h-9 fill-current filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-500 ${mode === 'spidy' ? 'text-white scale-110' : 'text-black opacity-80'
                            }`}>
                            {/* Iconic Spiderman Spider Symbol */}
                            <path d="M12 2L11 5L8 4L9 7L6 7L9 9L5 11L9 12L5 13L9 15L6 15L8 18L11 17L12 20L13 17L16 18L14 15L19 15L15 13L19 13L15 12L19 11L15 9L18 7L15 7L16 4L13 5L12 2Z" />
                            <circle cx="12" cy="11.5" r="1.5" />
                            <circle cx="12" cy="14" r="1.8" />
                        </svg>
                        <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] mt-0.5 transition-colors duration-500 ${mode === 'spidy' ? 'text-white' : 'text-black/40'
                            }`}>
                            {mode === 'spidy' ? 'ACTIVE' : 'SPIDY'}
                        </span>
                    </motion.div>
                </div>

                {/* Animated web lines on hover/active */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${mode === 'spidy' ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'}`}>
                    <svg viewBox="0 0 100 100" className="w-full h-full stroke-white" fill="none" strokeWidth="0.5">
                        <circle cx="50" cy="50" r="10" />
                        <circle cx="50" cy="50" r="20" />
                        <circle cx="50" cy="50" r="35" />
                        <line x1="50" y1="0" x2="50" y2="100" />
                        <line x1="0" y1="50" x2="100" y2="50" />
                        <line x1="15" y1="15" x2="85" y2="85" />
                        <line x1="85" y1="15" x2="15" y2="85" />
                    </svg>
                </div>

                {/* Pulse effect for Spidy mode */}
                {mode === "spidy" && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-red-500 rounded-full z-0"
                    />
                )}
            </motion.button>
        </div>
    );
};

export default ThemeToggle;
