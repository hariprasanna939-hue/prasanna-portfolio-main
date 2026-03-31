import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme-mode";
import { Globe, ShieldCheck, Zap, Activity } from "lucide-react";

const ecosystems = [
  { name: "lydev.Studio", detail: "Luxury AI Architecture" },
  { name: "AmiesStack", detail: "Full-Stack Framework" },
  { name: "SmartCare", detail: "Emergency Response Logic" },
  { name: "AdvocateOS", detail: "Legal Automation Engine" },  
  { name: "IITM Research", detail: "R&D Collaboration" },
];

const TrustSection = () => {
  const { mode } = useTheme();
  const isSpidy = mode === "spidy";

  // Duplicate for seamless infinite scroll
  const duplicatedEcosystems = [...ecosystems, ...ecosystems];

  return (
    <section className="py-24 overflow-hidden relative">
      {/* Background Decor */}
      {!isSpidy && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>
      )}

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className={`flex items-center gap-2 px-4 py-1 rounded-full border text-[10px] font-black uppercase tracking-[0.3em] ${
              isSpidy ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-black/5 border-black/10 text-slate-500'
            }`}>
              <Activity size={12} className="animate-pulse" /> Live Technical Ecosystems
            </span>
          </div>
          <h3 className={`text-3xl md:text-5xl font-bold tracking-tighter max-w-2xl mx-auto leading-tight ${
            isSpidy ? 'text-white' : 'text-slate-900'
          }`}>
            Powering the next generation of <br/> 
            <span className={isSpidy ? 'text-red-500 italic' : 'opacity-40 italic'}>intelligent platforms.</span>
          </h3>
        </motion.div>

        {/* Infinite Refraction Scroll */}
        <div className="relative">
          {/* Edge Fades */}
          <div className={`absolute inset-y-0 left-0 w-32 z-20 pointer-events-none bg-gradient-to-r ${isSpidy ? 'from-[#050505] to-transparent' : 'from-[#fafafa] to-transparent'}`} />
          <div className={`absolute inset-y-0 right-0 w-32 z-20 pointer-events-none bg-gradient-to-l ${isSpidy ? 'from-[#050505] to-transparent' : 'from-[#fafafa] to-transparent'}`} />

          <div className="flex items-center overflow-hidden py-10">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="flex gap-6 sm:gap-10 whitespace-nowrap"
            >
              {duplicatedEcosystems.map((item, i) => (
                <div
                  key={i}
                  className={`
                    relative group flex flex-col items-start px-10 py-8 rounded-[2rem] border transition-all duration-700
                    ${isSpidy 
                      ? 'bg-neutral-900/50 border-white/5 hover:border-red-500/50 shadow-2xl' 
                      : 'bg-white border-black/5 hover:border-black/20 shadow-[0_10px_30px_rgba(0,0,0,0.02)]'
                    }
                  `}
                >
                  {/* Decorative Icon Hook */}
                  <div className={`mb-4 transition-transform duration-500 group-hover:scale-110 ${isSpidy ? 'text-red-500' : 'text-primary'}`}>
                    {i % 2 === 0 ? <Zap size={20} /> : <Globe size={20} />}
                  </div>

                  <span className={`
                    text-2xl font-bold tracking-tighter transition-all duration-300 mb-1
                    ${isSpidy ? 'text-white' : 'text-slate-900'}
                  `}>
                    {item.name}
                  </span>
                  
                  <span className={`text-[10px] uppercase font-bold tracking-widest opacity-40 ${isSpidy ? 'text-red-400' : 'text-slate-500'}`}>
                    {item.detail}
                  </span>

                  {/* Liquid Shine Overlay */}
                  <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
                    <motion.div 
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                      className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg]"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Technical Footer Detail */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 flex justify-center items-center gap-10"
        >
           <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${isSpidy ? 'text-white' : 'text-slate-900'}`}>
              <ShieldCheck size={14} /> Encrypted Data Pipelines
           </div>
           <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${isSpidy ? 'text-white' : 'text-slate-900'}`}>
              <Zap size={14} /> 99.9% Uptime SLA
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;