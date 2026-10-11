import React from 'react';
import { passions, passionText, passionQuote } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

export const Passion: React.FC = () => {
  return (
    <section id="passion" className="py-28 md:py-36 px-6 md:px-12 bg-bg relative">
      <div className="max-w-[1600px] mx-auto">
        <SectionLabel>Passion &amp; Philosophy</SectionLabel>
        <MaskText
          text="Core drivers & principles"
          className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold text-fg leading-none mb-16"
        />

        {/* Numbered Liquid Glass Cards */}
        <div className="flex flex-col gap-4 my-16">
          {passions.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="group p-6 md:p-8 rounded-2xl glass-card border border-white/90 shadow-glass flex items-center gap-6 md:gap-10 transition-all duration-300 hover:scale-[1.01] hover:shadow-glass-lg cursor-default">
                <span className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-xs font-mono text-accent font-bold tracking-wider shrink-0 shadow-xs border border-white/95">
                  0{idx + 1}
                </span>
                <span className="text-[clamp(1.6rem,4vw,3.2rem)] font-bold text-fg tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 12-Column Shaping Design Thinking Row */}
        <Reveal
          delay={0.1}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-16 border-t border-line/70 mb-20"
        >
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-wider font-mono font-bold text-accent block">
              Architectural Synthesis
            </span>
            <p className="text-xs uppercase tracking-wider2 font-bold text-muted font-mono mt-1">
              How passions shape my architecture
            </p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-normal">
              {passionText}
            </p>
          </div>
        </Reveal>

        {/* VisionOS Frosted Blockquote Panel */}
        <Reveal delay={0.2} className="pt-8">
          <blockquote className="p-8 sm:p-14 rounded-3xl glass-panel border border-white/95 shadow-glass-lg max-w-5xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#DDEBFF]/40 rounded-full blur-3xl pointer-events-none" />
            <p className="text-[clamp(1.85rem,4.5vw,3.8rem)] font-normal italic font-serif leading-[1.18] text-slate-900 relative z-10">
              &ldquo;{passionQuote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-accent" />
              <span className="text-xs font-mono uppercase tracking-wider text-muted font-bold">
                Design Axiom
              </span>
            </div>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
};
