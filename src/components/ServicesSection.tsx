import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Code2, 
  Rocket, 
  Cpu, 
  BarChart3, 
  ChevronRight, 
  Zap,
  Sparkles
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme-mode";

const services = [
  { 
    title: "Custom Web Development", 
    description: "Premium web platforms built for scalability, high performance, and seamless user experiences.",
    icon: <Code2 size={32} />,
    tag: "Engineering"
  },
  { 
    title: "SaaS Product Engineering", 
    description: "End-to-end SaaS architecture from initial ideation to full-scale production deployment.", 
    icon: <Rocket size={32} />,
    tag: "Product"
  },
  { 
    title: "AI System Integration", 
    description: "Intelligent automation and AI-powered workflows to optimize your business operations.", 
    icon: <Cpu size={32} />,
    tag: "Intelligence"
  },
  { 
    title: "Technical Consulting", 
    description: "Strategic advisory for founders and CTOs to navigate complex technical roadmaps.", 
    icon: <BarChart3 size={32} />,
    tag: "Advisory"
  },
];

const ServiceCard = ({ s, i, isSpidy }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-8 md:p-12 border-b last:border-b-0 cursor-pointer transition-all duration-500 overflow-hidden ${
        isSpidy 
        ? 'border-white/10 hover:bg-red-500/[0.02]' 
        : 'border-black/[0.05] hover:bg-primary/[0.01]'
      }`}
    >
      {/* Background Animated Gradient */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`absolute inset-0 z-0 pointer-events-none opacity-20 ${
              isSpidy 
              ? 'bg-gradient-to-r from-red-600/20 to-transparent' 
              : 'bg-gradient-to-r from-primary/10 to-transparent'
            }`}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          {/* Service Number */}
          <span className={`text-xs font-black tracking-tighter opacity-20 ${isSpidy ? 'text-red-500' : 'text-primary'}`}>
            0{i + 1}
          </span>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded border transition-colors ${
                isSpidy ? 'border-red-500/30 text-red-500 bg-red-500/10' : 'border-black/10 text-primary bg-black/5'
              }`}>
                {s.tag}
              </span>
            </div>
            <h3 className={`text-3xl md:text-5xl font-bold tracking-tighter transition-all duration-500 ${
              isHovered 
              ? (isSpidy ? 'text-red-500 translate-x-4' : 'text-primary translate-x-4') 
              : (isSpidy ? 'text-white' : 'text-slate-900')
            }`}>
              {s.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-8 md:max-w-md">
          <p className={`text-sm md:text-base leading-relaxed transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-40'
          }`}>
            {s.description}
          </p>
          
          <div className={`hidden md:flex p-4 rounded-full border transition-all duration-500 ${
            isHovered 
            ? (isSpidy ? 'bg-red-600 border-red-600 text-white scale-110 shadow-[0_0_30px_rgba(220,38,38,0.4)]' : 'bg-primary border-primary text-white scale-110')
            : (isSpidy ? 'border-white/10 text-white/20' : 'border-black/10 text-black/20')
          }`}>
            <ArrowRight size={24} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const { mode } = useTheme();
  const isSpidy = mode === "spidy";

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className={`relative py-32 px-6 transition-colors duration-1000 ${isSpidy ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <Sparkles size={400} className={isSpidy ? 'text-red-600' : 'text-primary'} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`text-xs font-black tracking-[0.5em] uppercase mb-4 block ${isSpidy ? 'text-red-500' : 'text-primary'}`}
            >
              Expertise
            </motion.span>
            <h2 className={`text-6xl md:text-8xl font-bold tracking-tighter leading-[0.8] ${isSpidy ? 'text-white' : 'text-slate-900'}`}>
              Solu<span className="opacity-20 italic">tions.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-xs font-medium leading-tight">
            Comprehensive digital services designed to scale your vision into reality.
          </p>
        </header>

        {/* Dynamic Service List */}
        <div className="mb-32">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} isSpidy={isSpidy} />
          ))}
        </div>

        {/* Redesigned CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className={`relative overflow-hidden rounded-[3rem] p-12 md:p-24 text-center transition-all duration-700 ${
            isSpidy 
            ? 'bg-neutral-900 border border-white/5 shadow-2xl' 
            : 'bg-white border border-black/5 shadow-2xl'
          }`}>
            
            {/* CTA Background Anim */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${
              isSpidy ? 'from-red-600/10 via-transparent to-transparent' : 'from-primary/5 via-transparent to-transparent'
            }`} />

            <div className="relative z-10 space-y-10">
              <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center ${isSpidy ? 'bg-red-500/10 text-red-500' : 'bg-primary/5 text-primary'}`}>
                <Zap size={32} className="animate-pulse" />
              </div>
              
              <h3 className={`text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl mx-auto leading-none ${isSpidy ? 'text-white' : 'text-slate-900'}`}>
                Ready to elevate your <br/> <span className="opacity-40 font-light">digital presence?</span>
              </h3>

              <button
                onClick={scrollToContact}
                className={`group/btn relative inline-flex items-center gap-4 px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all ${
                  isSpidy 
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-[0_20px_50px_rgba(220,38,38,0.3)]' 
                  : 'bg-slate-900 text-white hover:bg-black shadow-xl'
                }`}
              >
                Start a Conversation
                <ChevronRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;