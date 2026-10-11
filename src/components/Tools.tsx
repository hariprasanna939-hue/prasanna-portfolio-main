import React from 'react';
import { tools } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

export const Tools: React.FC = () => {
  return (
    <section id="tools" className="py-20 md:py-28 px-6 md:px-12 bg-bg relative">
      <div className="max-w-[1600px] mx-auto">
        <SectionLabel>Technical Stack</SectionLabel>
        <MaskText
          text="Everyday toolkit"
          className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold text-fg leading-none mb-16 md:mb-20"
        />

        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {tools.map((tool, idx) => (
              <div
                key={tool.name}
                className="p-6 sm:p-8 rounded-3xl glass-card border border-white/95 shadow-glass flex flex-col justify-between min-h-[13rem] md:min-h-[15rem] transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-glass-lg hover:border-white cursor-default select-none relative overflow-hidden"
              >
                {/* Ambient Top Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#DDEBFF]/30 rounded-full blur-xl pointer-events-none group-hover:bg-[#DCD8FF]/40 transition-colors duration-500" />

                {/* Top-right Index Pill */}
                <div className="flex justify-between items-center w-full relative z-10">
                  <span className="w-2 h-2 rounded-full bg-accent/60 group-hover:bg-accent group-hover:scale-125 transition-all" />
                  <span className="px-2.5 py-0.5 rounded-full glass-pill text-xs font-mono font-bold text-accent shadow-xs border border-white/95">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom Title & Usage */}
                <div className="relative z-10 mt-6">
                  <h4 className="text-xl sm:text-2xl font-bold text-fg tracking-tight mb-2 group-hover:text-accent transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-muted font-medium leading-relaxed">
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
