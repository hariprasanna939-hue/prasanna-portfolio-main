import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Globe, Layers, Zap } from "lucide-react";
import { useTheme } from "@/hooks/use-theme-mode";

const projects = [
  {
    title: "Shree Andal AI",
    category: "Enterprise Solution",
    description: "A high-performance B2B SaaS dashboard featuring real-time data visualization and RBAC architecture.",
    tags: ["React", "Node.js", "Tailwind", "Chart.js"],
    link: "https://software.saaiss.in/",
    github: "#",
    color: "from-blue-500/20 to-cyan-500/20",
    spidyColor: "from-red-600/20 to-slate-900/20",
    size: "md:col-span-2 md:row-span-2",
    icon: <Globe size={20} />
  },
  {
    title: "DPDP AI Mapper",
    category: "LLM & Compliance",
    description: "Conversational AI for enterprise data privacy mapping.",
    tags: ["Next.js", "OpenAI", "Supabase"],
    link: "#",
    github: "#",
    color: "from-purple-500/20 to-pink-500/20",
    spidyColor: "from-red-900/40 to-black",
    size: "md:col-span-1 md:row-span-1",
    icon: <Zap size={20} />
  },
  {
    title: "Smart Health",
    category: "E-Commerce",
    description: "Multi-vendor healthcare ecosystem with automated inventory.",
    tags: ["React", "MongoDB", "Node.js"],
    link: "#",
    github: "#",
    color: "from-emerald-500/20 to-teal-500/20",
    spidyColor: "from-red-500/10 to-transparent",
    size: "md:col-span-1 md:row-span-1",
    icon: <Layers size={20} />
  },
];

const ProjectCard = ({ project, isSpidy, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative group overflow-hidden rounded-[2rem] border transition-all duration-700 ${project.size} ${isSpidy
          ? 'bg-[#0f0f0f] border-white/5 hover:border-red-500/40'
          : 'bg-white border-black/[0.03] hover:border-primary/20 shadow-sm hover:shadow-2xl'
        }`}
    >
      {/* Dynamic Gradient Background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${isSpidy ? project.spidyColor : project.color}`} />

      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-8">
            <div className={`p-3 rounded-2xl backdrop-blur-md transition-colors ${isSpidy ? 'bg-white/5 text-red-500' : 'bg-black/5 text-primary'
              }`}>
              {project.icon}
            </div>
            <div className="flex gap-3">
              <a href={project.github} className="text-muted-foreground hover:text-foreground transition-colors"><Github size={18} /></a>
              <a href={project.link} className="text-muted-foreground hover:text-foreground transition-colors"><ExternalLink size={18} /></a>
            </div>
          </div>

          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${isSpidy ? 'text-red-500/80' : 'text-primary/60'}`}>
            {project.category}
          </p>
          <h3 className={`text-2xl md:text-3xl font-bold tracking-tight mb-4 ${isSpidy ? 'text-white' : 'text-slate-900'}`}>
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
            {project.description}
          </p>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.filter(t => t).map(tag => (
              <span key={tag} className={`text-[9px] font-bold px-3 py-1 rounded-full border transition-all ${isSpidy ? 'border-white/10 text-white/50 bg-white/5' : 'border-black/5 text-black/40 bg-black/5'
                }`}>
                {tag}
              </span>
            ))}
          </div>

          <motion.a
            href={project.link}
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider group/btn ${isSpidy ? 'text-red-500' : 'text-primary'}`}
          >
            View Project
            <motion.span animate={{ x: hovered ? 5 : 0 }}>
              <ArrowUpRight size={14} />
            </motion.span>
          </motion.a>
        </div>
      </div>

      {/* Spidy Web Detail (Only in Spidy Mode) */}
      {isSpidy && (
        <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-red-600">
            <circle cx="50" cy="50" r="10" />
            <circle cx="50" cy="50" r="20" />
            <circle cx="50" cy="50" r="30" />
            <path d="M50 0V100M0 50H100M15 15L85 85M85 15L15 85" strokeWidth="0.5" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

const WorkSection = () => {
  const { mode } = useTheme();
  const isSpidy = mode === "spidy";

  return (
    <section id="work" className={`relative py-32 px-6 transition-colors duration-1000 ${isSpidy ? 'bg-black' : 'bg-[#fafafa]'}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 ${isSpidy ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-primary/5 text-primary border border-primary/10'
                }`}
            >
              Portfolio 2024
            </motion.div>
            <h2 className={`text-[clamp(3rem,10vw,5.5rem)] font-black tracking-tighter leading-[0.9] ${isSpidy ? 'text-white' : 'text-slate-900'}`}>
              Impactful <br />
              <span className="opacity-30">My Projects.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-xs font-medium leading-tight">
            Selected projects that merge clean architecture with intuitive UI.
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-full">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} isSpidy={isSpidy} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;