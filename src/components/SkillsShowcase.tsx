import { motion } from "framer-motion";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Tailwind",
  "Framer Motion",
  "AI Integration",
];

const duplicatedSkills = [...skills, ...skills];

interface SkillsShowcaseProps {
  fullscreen?: boolean;
}

const SkillsShowcase: React.FC<SkillsShowcaseProps> = ({ fullscreen = false }) => {
  const wrapperClass = fullscreen
    ? "fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black z-[100]"
    : "relative min-h-[400px] md:min-h-[600px] overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] py-20";

  return (
    <section className={`${wrapperClass} px-4 md:px-12 lg:px-24`}>
      {/* Background Decor */}
      {!fullscreen && (
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        </div>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-[1400px] mx-auto items-center gap-12 lg:gap-20 relative z-10">

        {/* LEFT SIDE: Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <h2
            className="font-black text-white leading-[0.85] tracking-tighter"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              textShadow: "0 0 40px rgba(255,255,255,0.1)",
            }}
          >
            THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/50 to-white/10 uppercase italic">
              Skills
            </span>
          </h2>
          <p className="text-white/30 font-bold uppercase tracking-[0.4em] text-[10px] mt-6 ml-1">Engineering Excellence.</p>
        </motion.div>

        {/* RIGHT SIDE: FAST ANIMATION */}
        <div className="relative h-[300px] md:h-[450px] lg:h-[550px] w-full flex items-center justify-center overflow-hidden">

          {/* Fades */}
          <div className="pointer-events-none absolute top-0 left-0 w-full h-32 bg-gradient-to-bottom from-[#050505] via-[#050505]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 bg-gradient-to-top from-[#050505] via-[#050505]/80 to-transparent z-20" />

          {/* Center Highlight Ring */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
            <div className="w-[85%] md:w-[70%] h-20 md:h-24 border border-white/10 bg-white/[0.02] backdrop-blur-3xl rounded-[32px] shadow-[0_0_100px_rgba(255,255,255,0.05)]" />
          </div>

          {/* FAST Scrolling Track */}
          <motion.div
            className="flex flex-col items-center gap-8 md:gap-12 z-10"
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: fullscreen ? 2.8 : 4.5, // 🔥 EXPLOSIVE SPEED for Landing Intro
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="whitespace-nowrap px-8 py-3 rounded-full border border-white/5 bg-white/[0.01]"
                initial={{ opacity: 0.1, scale: 0.8 }}
                animate={{
                  opacity: [0.1, 1, 0.1],
                  scale: [0.8, fullscreen ? 1.4 : 1.25, 0.8],
                  filter: ["blur(4px)", "blur(0px)", "blur(4px)"],
                }}
                transition={{
                  duration: fullscreen ? 1.5 : 2.5, // 🔥 FASTER PULSE IN FULLSCREEN
                  repeat: Infinity,
                  delay: (index % skills.length) * (fullscreen ? 0.1 : 0.2),
                  ease: "easeInOut",
                }}
                style={{
                  color: "white",
                  fontSize: "clamp(1.2rem, 4vw, 2.5rem)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  textShadow: "0 10px 40px rgba(0,0,0,0.5)",
                }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsShowcase;