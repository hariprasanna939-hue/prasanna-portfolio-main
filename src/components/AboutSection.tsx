import React from "react";
import { motion, Variants } from "framer-motion";
import { Download, Award, Briefcase, Cpu, GraduationCap, CheckCircle2, ShieldCheck } from "lucide-react";
import profileImg from "@/assets/about-profile.png";
import { useTheme } from "@/hooks/use-theme-mode";

// --- DATA ---
const experience = [
  {
    role: "Web Developer | Project Lead",
    company: "Production Platforms",
    description: "Designed, developed, and deployed live production web platforms. Led full lifecycle development including architecture and deployment.",
    icon: <Briefcase size={20} />,
  },
  {
    role: "Hackathon Team Lead",
    company: "Global Finalist",
    description: "Finalist at Israel–India Global Hackathon. Led system architecture, rapid prototyping, and technical presentations.",
    icon: <Award size={20} />,
  },
  {
    role: "Social Media Manager",
    company: "Programming Club",
    description: "Managed digital strategy and event promotions for the college programming community.",
    icon: <Cpu size={20} />,
  },
];

const timeline = [
  { role: "Hackathon Lead", duration: "2025 – Present" },
  { role: "Web Engineer", duration: "2025 – 2026" },
  { role: "Full Stack Developer", duration: "2025 – 2026" },
];

const skills = [
  { name: "AI-Powered Systems", level: "90%" },
  { name: "Full Stack Development", level: "95%" },
  { name: "Software Architecture", level: "85%" },
  { name: "Project Management", level: "80%" },
];

const certifications = [
  "Google Digital Marketing Fundamentals",
  "Israel–India Global Hackathon Participant",
  "Smart India Hackathon Best Performance",
  "Hackshastra Delhi PPT Excellence",
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const AboutSection = () => {
  const { mode } = useTheme();
  const isSpidy = mode === "spidy";

  return (
    <section id="about" className={`relative py-32 overflow-hidden transition-colors duration-1000 ${isSpidy ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}>

      {/* HUD Background Element (Spidy Mode Only) */}
      {isSpidy && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent animate-scan" style={{ position: 'absolute' }} />
          <div className="absolute top-1/4 left-10 w-64 h-64 border border-red-500/20 rounded-full" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* LEFT: Profile Visuals */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Image Frame */}
              <div className={`relative z-10 overflow-hidden rounded-[3rem] aspect-[4/5] border-2 transition-all duration-700 ${isSpidy ? 'border-red-500/30 shadow-[0_0_60px_rgba(220,38,38,0.2)]' : 'border-black/5 shadow-2xl'
                }`}>
                <img
                  src={profileImg}
                  alt="Prasanna"
                  className={`w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105`}
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -bottom-8 -right-8 p-6 rounded-3xl backdrop-blur-2xl border z-20 hidden md:block ${isSpidy ? 'bg-red-600/10 border-red-500/30' : 'bg-white border-black/5 shadow-2xl'
                  }`}
              >
                <div className={`text-4xl font-bold tracking-tighter ${isSpidy ? 'text-red-500' : 'text-slate-900'}`}>10+</div>
                <div className="text-[10px] uppercase font-black opacity-50 tracking-widest leading-none">Projects Delivered</div>
              </motion.div>
            </motion.div>

            {/* Quick Education Card */}
            <div className={`mt-16 p-6 rounded-[2rem] border transition-all ${isSpidy ? 'bg-white/5 border-white/5' : 'bg-white border-black/[0.03]'}`}>
              <div className="flex gap-4 items-center">
                <div className={`p-3 rounded-2xl ${isSpidy ? 'bg-red-500/10 text-red-500' : 'bg-primary/5 text-primary'}`}>
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-40">Current Pursuing</p>
                  <p className={`text-sm font-bold ${isSpidy ? 'text-slate-200' : 'text-slate-800'}`}>B.Sc IT (1st Year) — Bharathiar University</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="visible"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              className="relative"
            >
              <motion.p variants={itemVariants} className={`text-xs font-black tracking-[0.4em] uppercase mb-4 ${isSpidy ? 'text-red-500' : 'text-primary'}`}>
                The Profile
              </motion.p>
              <motion.h2 variants={itemVariants} className={`text-6xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9] ${isSpidy ? 'text-white' : 'text-slate-900'}`}>
                Strategic. <br />
                <span className="opacity-30 italic font-light">Innovative.</span>
              </motion.h2>

              <motion.p variants={itemVariants} className={`text-lg leading-relaxed mb-10 max-w-xl ${isSpidy ? 'text-slate-400' : 'text-slate-600'}`}>
                Entrepreneurial leader focused on{" "}
                <span className={`font-bold ${isSpidy ? 'text-white' : 'text-slate-900'}`}>AI-powered automation</span>{" "}
                and scalable architecture. I transform complex engineering problems into minimalist, high-performance digital products.
              </motion.p>

              {/* Skills Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                {skills.map((skill, i) => (
                  <motion.div key={i} variants={itemVariants} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span className={isSpidy ? 'text-slate-300' : 'text-slate-700'}>{skill.name}</span>
                      <span className={isSpidy ? 'text-red-500' : 'text-primary'}>{skill.level}</span>
                    </div>
                    <div className={`h-[2px] w-full rounded-full ${isSpidy ? 'bg-white/10' : 'bg-black/5'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${isSpidy ? 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-primary'}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Experience Timeline */}
              <div className="space-y-6">
                <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-8 ${isSpidy ? 'text-red-500/50' : 'text-slate-400'}`}>Professional Path</h4>
                {experience.map((exp, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className={`group p-8 rounded-[2.5rem] border transition-all duration-500 ${isSpidy ? 'bg-white/5 border-white/5 hover:border-red-500/30' : 'bg-white border-black/[0.03] hover:shadow-2xl'
                      }`}
                  >
                    <div className="flex gap-6 items-start">
                      <div className={`p-4 rounded-2xl transition-all ${isSpidy ? 'bg-red-500/10 text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.1)]' : 'bg-black/5 text-primary'}`}>
                        {exp.icon}
                      </div>
                      <div>
                        <h5 className={`text-xl font-bold ${isSpidy ? 'text-white' : 'text-slate-900'}`}>{exp.role}</h5>
                        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${isSpidy ? 'text-red-500/60' : 'text-primary/60'}`}>{exp.company}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Certifications (Horizontal Scroll or Grid) */}
              <motion.div variants={itemVariants} className="mt-16">
                <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${isSpidy ? 'text-red-500/50' : 'text-slate-400'}`}>Certifications</h4>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert, i) => (
                    <span key={i} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-bold border ${isSpidy ? 'bg-red-500/5 border-red-500/20 text-red-100' : 'bg-black/5 border-transparent text-slate-700'
                      }`}>
                      <ShieldCheck size={14} className={isSpidy ? 'text-red-500' : 'text-primary'} /> {cert}
                    </span>
                  ))}
                </div>
              </motion.div>

              <div className="pt-24 relative z-50">
                <a
                  href="/Resume.pdf"
                  download="Resume.pdf"
                  className="inline-block relative z-[60]"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-12 py-6 rounded-full font-black text-[13px] uppercase tracking-[0.4em] flex items-center gap-4 transition-all duration-300 shadow-2xl ${isSpidy
                        ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/30'
                        : 'bg-slate-900 text-white hover:bg-black shadow-black/20'
                      }`}
                  >
                    Secure Resume <Download size={20} strokeWidth={3} />
                  </motion.div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Journey Timeline (Footer of Section) */}
      <div className={`max-w-7xl mx-auto px-6 mt-32 border-t pt-20 ${isSpidy ? 'border-red-500/10' : 'border-black/5'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className={`p-6 border-l-2 transition-colors ${isSpidy ? 'border-red-500/20 hover:border-red-500' : 'border-black/5 hover:border-primary'}`}
            >
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{item.duration}</p>
              <h6 className="text-lg font-bold mt-1">{item.role}</h6>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;