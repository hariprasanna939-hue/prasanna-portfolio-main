import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import { profile, resumeUrl } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';
import { scrollToId } from '../lib/lenis';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-28 md:py-36 px-6 md:px-12 bg-bg relative">
      <div className="max-w-[1600px] mx-auto">
        <SectionLabel>About Me</SectionLabel>

        {/* Lead Headline */}
        <MaskText
          text={profile.aboutLead}
          className="text-[clamp(2.2rem,5vw,4.4rem)] font-bold text-fg leading-[1.12] tracking-tight max-w-5xl mb-16"
        />

        {/* 12-Column Asymmetric Glass Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-line/70">
          
          {/* Left Column (5 Cols): Brand Pillars & Trajectory Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <Reveal delay={0.1} className="space-y-6">
              {/* Brand Pillars Capsules */}
              <div className="flex flex-wrap gap-2.5">
                {profile.brand.map((pillar, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide glass-pill text-accent border border-white/95 shadow-xs hover:shadow-sm hover:scale-105 transition-all"
                  >
                    {pillar}
                  </span>
                ))}
              </div>

              {/* Trajectory Specifications Glass Panel */}
              <div className="p-6 sm:p-7 rounded-2xl glass-card border border-white/90 shadow-glass space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-muted font-mono font-bold block mb-1">
                    Current Focus
                  </span>
                  <p className="text-fg font-semibold text-base">
                    {profile.niche}
                  </p>
                </div>
                <div className="pt-3 border-t border-line/60">
                  <span className="text-[11px] uppercase tracking-wider text-muted font-mono font-bold block mb-1">
                    Base of Operations
                  </span>
                  <p className="text-fg font-semibold text-base">
                    {profile.location}
                  </p>
                </div>
                <div className="pt-3 border-t border-line/60">
                  <span className="text-[11px] uppercase tracking-wider text-muted font-mono font-bold block mb-1">
                    Target Trajectory
                  </span>
                  <p className="text-fg font-semibold text-base">
                    {profile.goalRole}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Actions */}
            <Reveal delay={0.2} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={resumeUrl}
                download="Resume.pdf"
                className="btn btn-primary gap-2 text-xs shadow-md hover:shadow-glass-glow"
              >
                <Download size={15} />
                <span>Download Resume</span>
              </a>
              <button
                onClick={() => scrollToId('contact')}
                className="btn btn-ghost text-xs group inline-flex items-center gap-1.5"
              >
                <span>Get in Touch</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-accent" />
              </button>
            </Reveal>
          </div>

          {/* Right Column (7 Cols): Narrative Story & Frosted Mission Card */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-base md:text-lg text-slate-700 leading-relaxed font-normal">
            {profile.story.map((paragraph, idx) => (
              <Reveal key={idx} delay={0.12 * (idx + 1)}>
                <p className="text-slate-700 leading-relaxed font-normal">{paragraph}</p>
              </Reveal>
            ))}

            {/* VisionOS Layered Mission Panel */}
            <Reveal delay={0.35} className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/95 shadow-glass-lg mt-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#DDEBFF]/50 rounded-full blur-2xl pointer-events-none group-hover:bg-[#DCD8FF]/50 transition-colors duration-700" />
              
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-wider font-mono text-accent font-bold block mb-3">
                  Core Mission
                </span>
                <p className="text-lg sm:text-xl text-fg italic font-medium leading-relaxed">
                  &ldquo;{profile.mission}&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};
