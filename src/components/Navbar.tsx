import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Wrench, User, Plus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import profileImg from "@/assets/hero-profile.png";
import { useTheme } from "@/hooks/use-theme-mode";

const navItems = [
  { icon: Briefcase, id: "work", label: "Work" },
  { icon: Wrench, id: "services", label: "Services" },
  { icon: User, id: "about", label: "About" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { mode } = useTheme();
  const isSpidy = mode === "spidy";
  const [hoveredTab, setHoveredTab] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative flex items-center p-1.5 rounded-full pointer-events-auto"
      >
        {/* --- LIQUID GLASS BACKGROUND STACK --- */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-full">
          {/* Animated Refraction Blobs */}
          <div className={`absolute -top-5 -left-5 w-20 h-20 rounded-full blur-2xl opacity-40 animate-liquid-flow ${isSpidy ? 'bg-red-600' : 'bg-blue-400'}`} />
          <div className={`absolute -bottom-5 -right-5 w-20 h-20 rounded-full blur-2xl opacity-40 animate-liquid-flow delay-1000 ${isSpidy ? 'bg-slate-800' : 'bg-purple-400'}`} />

          {/* The Main Glass Layer */}
          <div className={`
            absolute inset-0 backdrop-blur-[24px] saturate-[1.8] border transition-all duration-500 rounded-full
            ${isSpidy
              ? 'bg-red-950/20 border-red-500/30 shadow-[0_0_40px_rgba(220,38,38,0.15)]'
              : 'bg-white/40 border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)]'
            }
          `} />
        </div>

        {/* --- NAV CONTENT --- */}
        <div className="relative z-10 flex items-center gap-1 sm:gap-2 px-1">

          {/* Profile Circle */}
          <button
            onClick={() => navigate("/")}
            className="group relative flex items-center justify-center p-1"
          >
            <div className={`
              relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 transition-all duration-500
              ${isSpidy ? 'border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'border-white/80 group-hover:border-primary'}
            `}>
              <img
                src={profileImg}
                alt="Prasanna"
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isSpidy ? 'grayscale-[0.2]' : ''}`}
              />
            </div>
          </button>

          {/* Links with Liquid Hover Pill */}
          <nav className="flex items-center relative py-1 md:px-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`
                  relative px-2 sm:px-4 py-2 rounded-full text-[9px] md:text-xs font-black uppercase tracking-[0.1em] md:tracking-[0.15em] transition-colors duration-300
                  ${isSpidy
                    ? (hoveredTab === item.id ? 'text-white' : 'text-white/40')
                    : (hoveredTab === item.id ? 'text-slate-900' : 'text-slate-500')
                  }
                `}
              >
                <span className="relative z-20">{item.label}</span>

                {/* Magnetic Hover Background */}
                <AnimatePresence>
                  {hoveredTab === item.id && (
                    <motion.div
                      layoutId="liquid-nav"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                      className={`absolute inset-0 z-10 rounded-full shadow-inner ${isSpidy ? 'bg-red-600/20 border border-red-500/30' : 'bg-black/5 border border-black/5'
                        }`}
                    />
                  )}
                </AnimatePresence>
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="ml-1 sm:ml-2 pl-1 sm:pl-2 border-l border-white/20">
            <button
              onClick={() => scrollTo("contact")}
              className={`
                relative flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-widest overflow-hidden transition-all group
                ${isSpidy
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/40'
                  : 'bg-slate-900 text-white hover:bg-black shadow-lg'
                }
              `}
            >
              <span className="relative z-10">HIRE</span>
              <Plus size={12} className="relative z-10 group-hover:rotate-90 transition-transform duration-500 hidden sm:block" />

              {/* Glass Shine Effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] z-0"
              />
            </button>
          </div>
        </div>

        {/* Spidy "Energy Core" Underline */}
        {isSpidy && (
          <motion.div
            layoutId="spidy-core"
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-red-600 blur-[1px] shadow-[0_0_8px_#dc2626]"
          />
        )}
      </motion.div>
    </div>
  );
};

export default Navbar;