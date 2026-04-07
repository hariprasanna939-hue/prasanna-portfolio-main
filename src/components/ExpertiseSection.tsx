import { Cpu, Layers, Zap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useTheme } from "@/hooks/use-theme-mode";

const items = [
  { icon: Layers, title: "Scalable Architecture", description: "Robust systems built for long-term growth." },
  { icon: Cpu, title: "AI-Driven Solutions", description: "LLM integrations and automation workflows." },
  { icon: Zap, title: "Performance First", description: "Enterprise-grade speed and optimization." },
];

const ExpertiseSection = () => {
  const { mode } = useTheme();
  const isSpidy = mode === "spidy";

  return (
    <section id="expertise" className="py-24">
      <div className="container-luxury">
        <AnimatedSection>
          <h2 className={`text-[clamp(2.5rem,8vw,5.5rem)] font-black tracking-tighter text-center mb-8 leading-none transition-colors duration-500 ${isSpidy ? 'text-white' : 'text-foreground'}`}>Core Expertise</h2>
          <p className={`text-center mb-16 max-w-md mx-auto transition-colors duration-500 ${isSpidy ? 'text-slate-400' : 'text-muted-foreground'}`}>
            Delivering exceptional results across every dimension of modern software.
          </p>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <div className={`card-luxury p-6 sm:p-8 lg:p-10 text-center transition-all duration-500 ${isSpidy ? 'bg-white/5 border-red-500/20 hover:border-red-500/50' : ''
                }`}>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 transition-colors duration-500 ${isSpidy ? 'bg-red-500/20 text-red-500' : 'bg-muted text-foreground'
                  }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-500 ${isSpidy ? 'text-white' : 'text-foreground'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-500 ${isSpidy ? 'text-slate-400' : 'text-muted-foreground'}`}>
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
