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
    ? "fixed inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black"
    : "relative min-h-[500px] overflow-hidden flex items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black";

  return (
    <section className={`${wrapperClass} px-6 md:px-16`}>

      {/* 🔥 Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto items-center">

        {/* 🔥 LEFT SIDE HUGE HEADING */}
        <div className="flex items-center justify-center md:justify-start h-full z-20">
          <h2
            className="font-bold text-white leading-[0.9]"
            style={{
              fontSize: "clamp(4rem, 10vw, 10rem)", // 🔥 BIG TEXT
              textShadow: `
                0 0 20px rgba(255,255,255,0.2),
                0 0 60px rgba(255,255,255,0.15),
                0 0 120px rgba(255,255,255,0.1)
              `,
            }}
          >
            My <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Skills
            </span>
          </h2>
        </div>

        {/* 🔥 RIGHT SIDE ANIMATION */}
        <div className="relative h-[420px] flex items-center justify-center">

          {/* Ambient Glow */}
          {fullscreen && (
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[120px]" />
            </div>
          )}

          {/* Top Fade */}
          <div className="pointer-events-none absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-20" />

          {/* Bottom Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-20" />

          {/* Center Highlight */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
            <div
              className="border-y border-white/20 backdrop-blur-md rounded-xl"
              style={{
                width: fullscreen ? "50%" : "70%",
                height: fullscreen ? "90px" : "70px",
              }}
            />
          </div>

          {/* 🔥 Scrolling Skills */}
          <motion.div
            className="flex flex-col items-center gap-6 z-10"
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: 9,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {duplicatedSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="px-6 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10"
                initial={{ opacity: 0.3, scale: 0.85 }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.85, fullscreen ? 1.35 : 1.25, 0.85],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.25,
                  ease: "easeInOut",
                }}
                style={{
                  color: "white",
                  fontSize: fullscreen ? "2rem" : "1.5rem",
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                  textShadow: "0 0 20px rgba(255,255,255,0.35)",
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