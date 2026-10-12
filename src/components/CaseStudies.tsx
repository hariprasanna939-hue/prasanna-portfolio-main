import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { EASE } from '../lib/motion';

export const CaseStudies: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(projects[0]?.id || '');
  const activeProject =
    projects.find((p) => p.id === activeId) || projects[0];

  return (
    <section id="case-studies" className="py-28 md:py-36 px-6 md:px-12 bg-[#1A1A1A] text-white relative">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel>Analytical Thinking</SectionLabel>
        <MaskText
          text="How I think through a project"
          className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white leading-[1.15] tracking-tight mb-16 md:mb-20"
        />

        {/* Dark Editorial Segmented Tablist */}
        <div
          role="tablist"
          aria-label="Project case studies"
          className="p-1.5 rounded-full bg-[#2A2A2A] border border-white/5 inline-flex flex-wrap gap-2 mb-16 shadow-lg"
        >
          {projects.map((p) => {
            const isSelected = p.id === activeProject.id;
            return (
              <button
                key={p.id}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${p.id}`}
                onClick={() => setActiveId(p.id)}
                className={`text-xs py-2 px-5 rounded-full font-medium transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#FF5C35] text-white shadow-md'
                    : 'bg-[#111111] text-white/70 hover:text-white border border-white/5'
                }`}
              >
                0{p.index} · {p.title}
              </button>
            );
          })}
        </div>

        {/* Case Study Tab Panel */}
        <div className="min-h-[32rem] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              id={`panel-${activeProject.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeProject.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
            >
              {/* Left 7 Cols: STAR Methodology in Dark Card */}
              <div className="lg:col-span-7 p-6 sm:p-9 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl">
                <div className="pb-4 mb-4 border-b border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#FF5C35]">
                    STAR Engineering Framework
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    Project 0{activeProject.index}
                  </span>
                </div>

                <dl className="divide-y divide-white/5">
                  <div className="py-5 flex flex-col gap-2">
                    <dt className="text-xs font-mono font-bold text-[#FF5C35] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]" />
                      01 · Situation
                    </dt>
                    <dd className="text-[15px] sm:text-base text-white/70 leading-relaxed font-normal">
                      {activeProject.case.situation}
                    </dd>
                  </div>

                  <div className="py-5 flex flex-col gap-2">
                    <dt className="text-xs font-mono font-bold text-[#FF5C35] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]" />
                      02 · Task
                    </dt>
                    <dd className="text-[15px] sm:text-base text-white/70 leading-relaxed font-normal">
                      {activeProject.case.task}
                    </dd>
                  </div>

                  <div className="py-5 flex flex-col gap-2">
                    <dt className="text-xs font-mono font-bold text-[#FF5C35] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]" />
                      03 · Action
                    </dt>
                    <dd className="text-[15px] sm:text-base text-white/70 leading-relaxed font-normal">
                      {activeProject.case.action}
                    </dd>
                  </div>

                  <div className="py-5 flex flex-col gap-2">
                    <dt className="text-xs font-mono font-bold text-[#FF5C35] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C35]" />
                      04 · Result
                    </dt>
                    <dd className="text-[15px] sm:text-base text-white/70 leading-relaxed font-normal">
                      {activeProject.case.result}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Right 5 Cols: Impact, User Flow & Emotion in Dark Panel */}
              <div className="lg:col-span-5 p-7 sm:p-9 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col gap-7">
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#FF5C35]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-white/50 block mb-2">
                    Who was affected
                  </span>
                  <p className="text-sm md:text-base text-white/90 leading-relaxed font-semibold">
                    {activeProject.case.affected}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/5">
                  <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-white/50 block mb-2">
                    User flow
                  </span>
                  <p className="text-lg md:text-xl font-bold text-white leading-snug tracking-tight">
                    {activeProject.case.userFlow}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/5">
                  <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-white/50 block mb-2">
                    Emotion the UI should create
                  </span>
                  <p className="text-base md:text-lg font-semibold text-[#FF5C35] leading-snug">
                    {activeProject.case.emotion}
                  </p>
                </div>

                {activeProject.case.validation && (
                  <div className="relative z-10 pt-5 border-t border-white/5">
                    <span className="text-[11px] uppercase tracking-widest font-mono font-bold text-white/50 block mb-2">
                      Validation status
                    </span>
                    <div className="p-4 rounded-[16px] bg-[#2A2A2A] border border-white/5">
                      <p className="text-xs md:text-sm text-white/80 leading-relaxed font-medium">
                        {activeProject.case.validation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
