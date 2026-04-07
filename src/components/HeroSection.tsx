import React from "react";
import { motion, Variants } from "framer-motion";
import { Linkedin, Github, Twitter, Instagram, ArrowUpRight, Zap } from "lucide-react";
import profileImg from "@/assets/hero-profile.png";
import AnimatedParticles from "./AnimatedParticles";
import { useTheme } from "@/hooks/use-theme-mode";

const HeroSection = () => {
  const { mode } = useTheme();
  const isSpidy = mode === "spidy";

  // Framer Motion Variants Definition
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <section className={`relative min-h-screen flex items-center pt-20 overflow-hidden transition-colors duration-700 ${isSpidy ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}>

      {/* Background Elements */}
      {isSpidy ? (
        <>
          <AnimatedParticles />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
          <div className="absolute bottom-[0%] left-[-5%] w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
        </>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-blue-400/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-purple-400/5 rounded-full blur-[120px]" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <span className={`h-[1px] w-12 ${isSpidy ? 'bg-red-500' : 'bg-slate-900'}`} />
              <span className={`text-xs font-black uppercase tracking-[0.4em] ${isSpidy ? 'text-red-500' : 'text-slate-900'}`}>
                {isSpidy ? 'Multiverse Engineer' : 'Product Architect'}
              </span>
            </motion.div>

            {/* Note: Ensure these use motion.h1 and motion.p */}
            <motion.h1
              variants={itemVariants}
              className={`text-[clamp(2.5rem,10vw,5.5rem)] font-black tracking-tighter leading-[0.9] mb-8 ${isSpidy ? 'text-white' : 'text-slate-900'}`}
            >
              Design that <br />
              <span className={`italic font-light opacity-40 ${isSpidy ? 'text-red-500' : ''}`}>Transforms</span> <br />
              Performance.
            </motion.h1>

            <motion.p variants={itemVariants} className={`text-lg md:text-xl leading-relaxed mb-10 max-w-xl ${isSpidy ? 'text-slate-400' : 'text-slate-600'}`}>
              I’m <span className={isSpidy ? 'text-white font-bold' : 'text-black font-bold'}>Prasanna Hari</span>.
              Engineering futuristic AI systems and high-end web platforms with a focus on minimalism and technical precision.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
              <motion.button
                variants={itemVariants}
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className={`group px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 ${isSpidy
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-[0_20px_40px_rgba(220,38,38,0.25)]'
                  : 'bg-slate-900 text-white hover:bg-black shadow-xl'
                  }`}
              >
                Explore Works <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>

              <motion.button
                variants={itemVariants}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] border transition-all ${isSpidy
                  ? 'border-red-500/40 text-white hover:bg-red-600/10'
                  : 'border-black/10 text-slate-900 hover:bg-black/5'
                  }`}
              >
                Send Signal
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {isSpidy && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '120%' }}
                  className="absolute left-1/2 -top-20 w-[1px] bg-gradient-to-b from-transparent via-red-500/50 to-transparent z-0"
                />
              )}

              <div className={`relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-2 transition-all duration-700 ${isSpidy
                ? 'border-red-500/30 shadow-[0_0_80px_rgba(220,38,38,0.2)] grayscale-[0.2]'
                : 'border-black/5 shadow-2xl rotate-3 hover:rotate-0'
                }`}>
                <img
                  src={profileImg}
                  alt="Prasanna Hari"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                {isSpidy && (
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 to-transparent pointer-events-none" />
                )}
              </div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -bottom-6 -left-6 p-6 rounded-2xl backdrop-blur-2xl border z-20 ${isSpidy ? 'bg-red-900/20 border-red-500/30 shadow-[0_0_20px_rgba(220,38,38,0.2)]' : 'bg-white border-black/5 shadow-xl'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isSpidy ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'}`}>
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest opacity-50 ${isSpidy ? 'text-red-500' : ''}`}>Experience</p>
                    <p className={`text-xl font-bold ${isSpidy ? 'text-white' : 'text-slate-900'}`}>1+ Year Pro</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM SOCIAL ISLAND */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-20"
        >
          <div className={`flex gap-8 px-10 py-5 rounded-full backdrop-blur-3xl border transition-all ${isSpidy
            ? 'bg-red-950/20 border-red-500/20 shadow-[0_0_40px_rgba(220,38,38,0.1)]'
            : 'bg-white/70 border-black/5 shadow-lg'
            }`}>
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/in/prasanna-hari-5486a3367" },
              { icon: Github, href: "https://github.com/hariprasanna939-hue" },
              { icon: Twitter, href: "#" },
              { icon: Instagram, href: "https://www.instagram.com/_.lym9xk/?hl=en" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 hover:scale-125 ${isSpidy ? 'text-white/40 hover:text-red-500' : 'text-slate-400 hover:text-slate-900'
                  }`}
              >
                <social.icon size={22} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;