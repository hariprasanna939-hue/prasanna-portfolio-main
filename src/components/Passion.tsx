import React from 'react';
import { passions, passionText, passionQuote } from '../data/site';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

export const Passion: React.FC = () => {
  return (
    <section id="passion" className="py-28 md:py-36 px-6 md:px-12 bg-[#1A1A1A] relative font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Exactly matched Section Label Pill */}
        <div className="flex items-center gap-2.5 bg-[#2A2A2A] rounded-full px-3.5 py-1.5 mb-8 w-fit border border-white/5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#FF5C35]" />
          <span className="text-[11px] text-white/80 font-medium tracking-wide uppercase">
            Passion & Philosophy
          </span>
        </div>

        {/* Lead Headline */}
        <MaskText
          text="Core drivers & principles"
          className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold text-white leading-[1.05] mb-16 tracking-tight"
        />

        {/* Numbered Premium Dark Cards */}
        <div className="flex flex-col gap-5 my-16">
          {passions.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="group p-6 md:p-8 rounded-[24px] bg-[#111111] border border-white/5 shadow-lg flex items-center gap-6 md:gap-10 transition-all duration-300 hover:scale-[1.015] hover:bg-[#151515] hover:border-white/10 cursor-default">
                <span className="w-12 h-12 rounded-full bg-[#2A2A2A] flex items-center justify-center text-sm font-mono text-[#FF5C35] font-bold tracking-wider shrink-0 border border-white/5 shadow-inner">
                  0{idx + 1}
                </span>
                <span className="text-[clamp(1.6rem,4vw,3.2rem)] font-bold text-white tracking-tight transition-transform duration-300 group-hover:translate-x-2">
                  {item}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 12-Column Shaping Design Thinking Row */}
        <Reveal
          delay={0.1}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-16 border-t border-white/10 mb-20"
        >
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-[#FF5C35] block">
              Architectural Synthesis
            </span>
            <p className="text-xs uppercase tracking-widest font-bold text-white/40 font-mono mt-1.5">
              How passions shape my architecture
            </p>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg md:text-[1.1rem] text-white/70 leading-relaxed font-normal">
              {passionText}
            </p>
          </div>
        </Reveal>

        {/* Dark Layered Blockquote Panel */}
        <Reveal delay={0.2} className="pt-8">
          <blockquote className="p-8 sm:p-14 rounded-[32px] bg-[#111111] border border-white/5 shadow-2xl max-w-5xl relative overflow-hidden group">
            
            {/* Colored Ambient Glow */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#FF5C35]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#FF5C35]/20 transition-colors duration-700" />
            
            <p className="text-[clamp(1.85rem,4.5vw,3.8rem)] font-normal italic font-serif leading-[1.18] text-white relative z-10 drop-shadow-sm">
              &ldquo;{passionQuote}&rdquo;
            </p>
            
            <div className="mt-10 flex items-center gap-4 relative z-10">
              <span className="w-12 h-[2px] bg-[#FF5C35]" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/50 font-bold">
                Design Axiom
              </span>
            </div>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
};