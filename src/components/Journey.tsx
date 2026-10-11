import React from 'react';
import { journey } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-28 md:py-36 px-6 md:px-12 bg-bg relative">
      <div className="max-w-[1600px] mx-auto">
        <SectionLabel>Development Journey</SectionLabel>
        <MaskText
          text="From code to product thinking"
          className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold text-fg leading-none mb-24 md:mb-32"
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
                    <span className="inline-block px-3.5 py-1 rounded-full glass-pill text-xs font-mono font-bold text-accent border border-white/95 shadow-xs">
                      {step.title}
                    </span>
                  </Reveal>

                  {/* Middle: Luminous Timeline Node and Glass Line */}
                  <div className="hidden md:flex flex-col items-center self-stretch relative pt-3">
                    {/* Node Dot */}
                    <div
                      className={`w-4 h-4 rounded-full z-10 shrink-0 ${
                        isLast
                          ? 'bg-gradient-to-tr from-[#3978F6] to-[#60A5FA] shadow-[0_0_14px_rgba(57,120,246,0.7)] ring-4 ring-white'
                          : 'border-2 border-slate-300 bg-white shadow-xs'
                      }`}
                    />
                    {/* Line downwards */}
                    {!isLast && (
                      <div className="w-[2px] bg-gradient-to-b from-[#3978F6]/30 via-slate-200 to-transparent absolute top-7 bottom-[-4rem]" />
                    )}
                  </div>

                  {/* Right: Step Description in VisionOS Glass Card */}
                  <Reveal delay={0.08} className="flex-1">
                    <div
                      className={`p-6 sm:p-8 rounded-2xl ${
                        isLast
                          ? 'glass-panel border border-white/95 shadow-glass-lg'
                          : 'glass-card border border-white/90 shadow-glass'
                      } transition-all duration-300`}
                    >
                      {isLast ? (
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold block mb-1">
                            Current Architectural Horizon
                          </span>
                          <p className="text-[clamp(1.4rem,2.8vw,2.2rem)] font-bold text-fg leading-tight tracking-tight">
                            {step.text}
                          </p>
                        </div>
                      ) : (
                        <p className="text-base md:text-lg text-slate-700 font-normal leading-relaxed">
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
