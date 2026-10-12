import React from 'react';
import { Layers, Cpu, Server, Cloud } from 'lucide-react';
import { skillGroups } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

const categoryIcons: Record<string, React.ReactNode> = {
  Development: <Layers size={18} className="text-[#FF5C35]" />,
  'AI / ML & Intelligence': <Cpu size={18} className="text-[#FF5C35]" />,
  'Architecture & Systems': <Server size={18} className="text-[#FF5C35]" />,
  'Cloud & Design': <Cloud size={18} className="text-[#FF5C35]" />,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-28 md:py-36 px-6 md:px-12 bg-[#1A1A1A] relative font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel>Core Competencies</SectionLabel>
        
        <MaskText
          text="What I work with"
          className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold text-white leading-none mb-16 md:mb-24 tracking-tight"
        />

        {/* 2x2 Responsive Dark Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skillGroups.map((group, idx) => {
            const icon = categoryIcons[group.title] || (
              <Layers size={18} className="text-[#FF5C35]" />
            );

            return (
              <Reveal key={group.title} delay={idx * 0.08} className="h-full">
                <div className="p-7 sm:p-9 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl h-full flex flex-col justify-between group hover:border-white/10 transition-all duration-300 relative overflow-hidden">
                  {/* Subtle Ambient Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5C35]/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-[#FF5C35]/10 transition-colors duration-500" />
                  
                  {/* Category Header */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#2A2A2A] border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                          {icon}
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF5C35] font-bold block mb-1">
                            Category 0{idx + 1}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                            {group.title}
                          </h3>
                        </div>
                      </div>

                      <span className="px-3.5 py-1 rounded-full text-xs font-mono font-medium text-white/80 bg-[#2A2A2A] border border-white/5">
                        {group.items.length} Techs
                      </span>
                    </div>

                    {/* Dark Editorial Chips */}
                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 rounded-full bg-[#2A2A2A] text-xs sm:text-sm font-medium text-white/80 border border-white/5 hover:text-white hover:bg-[#333333] hover:border-white/10 transition-colors cursor-default select-none flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40 tracking-widest uppercase">
                    <span>Liquid Architecture Stack</span>
                    <span className="w-2 h-2 rounded-full bg-[#FF5C35] animate-pulse" />
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
