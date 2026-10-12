import React from 'react';
import { tools } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

export const Tools: React.FC = () => {
  return (
    <section id="tools" className="py-20 md:py-28 px-6 md:px-12 bg-[#1A1A1A] text-white relative">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel>Technical Stack</SectionLabel>
        <MaskText
          text="Everyday toolkit"
          className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white leading-[1.15] tracking-tight mb-16 md:mb-20"
        />

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {tools.map((tool, idx) => (
              <div
                key={tool.name}
                className="p-6 sm:p-8 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl flex flex-col justify-between min-h-[13rem] md:min-h-[15rem] transition-all duration-300 group hover:-translate-y-1.5 hover:border-white/10 cursor-default select-none relative overflow-hidden"
              >
                {/* Ambient Top Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C35]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF5C35]/15 transition-colors duration-500" />

                {/* Top-right Index Pill */}
                <div className="flex justify-between items-center w-full relative z-10">
                  <span className="w-2 h-2 rounded-full bg-[#FF5C35]/60 group-hover:bg-[#FF5C35] group-hover:scale-125 transition-all" />
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2A2A2A] text-xs font-mono font-bold text-[#FF5C35] border border-white/5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom Title & Usage */}
                <div className="relative z-10 mt-6">
                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-[#FF5C35] transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50 font-medium leading-relaxed">
                    {tool.use}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
