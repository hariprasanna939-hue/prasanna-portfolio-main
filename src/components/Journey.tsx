import React from 'react';
import { journey } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-28 md:py-36 px-6 md:px-12 bg-[#1A1A1A] text-white relative">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel>Development Journey</SectionLabel>
        <MaskText
          text="From code to product thinking"
          className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white leading-[1.15] tracking-tight mb-24 md:mb-32"
        />

        <div className="relative max-w-5xl">
          <ol className="relative flex flex-col gap-12 md:gap-16">
            {journey.map((step, idx) => {
              const isLast = idx === journey.length - 1;

              return (
                <li
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-[13rem_2.5rem_1fr] items-start gap-4 md:gap-8 relative"
                >
                  {/* Left: Step Title Pill (md: text-right) */}
                  <Reveal delay={0} className="md:text-right pt-2">
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#2A2A2A] text-xs font-mono font-bold text-[#FF5C35] border border-white/5 shadow-sm">
                      {step.title}
                    </span>
                  </Reveal>

                  {/* Middle: Luminous Timeline Node and Glass Line */}
                  <div className="hidden md:flex flex-col items-center self-stretch relative pt-3">
                    {/* Node Dot */}
                    <div
                      className={`w-4 h-4 rounded-full z-10 shrink-0 ${
                        isLast
                          ? 'bg-[#FF5C35] shadow-[0_0_14px_rgba(255,92,53,0.8)] ring-4 ring-[#1A1A1A]'
                          : 'border-2 border-white/20 bg-[#2A2A2A]'
                      }`}
                    />
                    {/* Line downwards */}
                    {!isLast && (
                      <div className="w-[2px] bg-gradient-to-b from-[#FF5C35]/40 via-white/10 to-transparent absolute top-7 bottom-[-4rem]" />
                    )}
                  </div>

                  {/* Right: Step Description in Dark Card */}
                  <Reveal delay={0.08} className="flex-1">
                    <div
                      className="p-6 sm:p-8 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl transition-all duration-300 hover:border-white/10"
                    >
                      {isLast ? (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF5C35] font-bold block mb-2">
                            Current Architectural Horizon
                          </span>
                          <p className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-bold text-white leading-tight tracking-tight">
                            {step.text}
                          </p>
                        </div>
                      ) : (
                        <p className="text-[15px] md:text-base text-white/70 font-normal leading-relaxed">
                          {step.text}
                        </p>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
