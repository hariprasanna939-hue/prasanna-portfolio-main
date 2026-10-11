import React from 'react';
import { Layers, Cpu, Server, Cloud } from 'lucide-react';
import { skillGroups } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

const categoryIcons: Record<string, React.ReactNode> = {
  Development: <Layers size={18} className="text-accent" />,
  'AI / ML & Intelligence': <Cpu size={18} className="text-accent" />,
  'Architecture & Systems': <Server size={18} className="text-accent" />,
  'Cloud & Design': <Cloud size={18} className="text-accent" />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-28 md:py-36 px-6 md:px-12 bg-bg relative">
      <div className="max-w-[1600px] mx-auto">
        <SectionLabel>Core Competencies</SectionLabel>
        <MaskText
          text="What I work with"
          className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold text-fg leading-none mb-16 md:mb-24"
        />

        {/* 2x2 Responsive VisionOS Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillGroups.map((group, idx) => {
            const icon = categoryIcons[group.title] || (
              <Layers size={18} className="text-accent" />
            );

            return (
              <Reveal key={group.title} delay={idx * 0.08} className="h-full">
                <div className="p-7 sm:p-9 rounded-3xl glass-card border border-white/95 shadow-glass h-full flex flex-col justify-between group hover:border-white hover:shadow-glass-lg transition-all duration-300">
                  {/* Category Header */}
                  <div>
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-line/60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl glass-pill flex items-center justify-center border border-white/95 shadow-xs group-hover:scale-105 transition-transform">
                          {icon}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-muted font-bold block">
                            Category 0{idx + 1}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-fg tracking-tight">
                            {group.title}
                          </h3>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-accent glass-pill border border-white/95 shadow-xs">
                        {group.items.length} Techs
                      </span>
                    </div>

                    {/* Interactive Liquid Glass Chips */}
                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 rounded-xl glass-pill text-xs sm:text-sm font-semibold text-slate-800 border border-white/95 shadow-xs hover:border-accent/40 hover:text-accent hover:shadow-sm hover:scale-[1.03] transition-all duration-200 cursor-default select-none flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Specular Accent */}
                  <div className="pt-6 mt-6 border-t border-line/50 flex items-center justify-between text-xs font-mono text-muted">
                    <span className="tracking-wide">Liquid Architecture Stack</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
