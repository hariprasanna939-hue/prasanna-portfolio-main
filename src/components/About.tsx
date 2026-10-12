import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import { profile, resumeUrl } from '../data/site';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';
import { scrollToId } from '../lib/lenis';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-28 md:py-36 px-6 md:px-12 bg-[#1A1A1A] relative overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Exactly matched Section Label Pill (Matches Hero Status Pill) */}
        <div className="flex items-center gap-2.5 bg-[#2A2A2A] rounded-full px-3.5 py-1.5 mb-8 w-fit border border-white/5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#FF5C35]" />
          <span className="text-[11px] text-white/80 font-medium tracking-wide uppercase">
            About Me
          </span>
        </div>

        {/* Lead Headline */}
        <MaskText
          text={profile.aboutLead}
          className="text-[clamp(2.2rem,5vw,4.4rem)] font-bold text-white leading-[1.12] tracking-tight max-w-5xl mb-16"
        />

        {/* 12-Column Asymmetric Dark Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 border-t border-white/10">
          
          {/* Left Column (5 Cols): Brand Pillars & Trajectory Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-10">
            <Reveal delay={0.1} className="space-y-8">
              
              {/* Brand Pillars Capsules */}
              <div className="flex flex-wrap gap-2.5">
                {profile.brand.map((pillar, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-full text-xs font-mono font-medium tracking-wide bg-[#2A2A2A] text-white/80 border border-white/5 shadow-sm hover:text-white hover:bg-[#333333] transition-colors cursor-default"
                  >
                    {pillar}
                  </span>
                ))}
              </div>

              {/* Trajectory Specifications Dark Panel */}
              <div className="p-7 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl space-y-5 relative overflow-hidden">
                {/* Subtle top glare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#FF5C35] font-bold block mb-1.5">
                    Current Focus
                  </span>
                  <p className="text-white/90 font-medium text-[15px]">
                    {profile.niche}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1.5">
                    Base of Operations
                  </span>
                  <p className="text-white/90 font-medium text-[15px]">
                    {profile.location}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1.5">
                    Target Trajectory
                  </span>
                  <p className="text-white/90 font-medium text-[15px]">
                    {profile.goalRole}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Actions (Matched to Hero Buttons) */}
            <Reveal delay={0.2} className="flex flex-wrap items-center gap-4 pt-4">
              {/* Primary CTA matched to Hero */}
              <a
                href={resumeUrl}
                download="Resume.pdf"
                className="group bg-[#FF5C35] hover:bg-[#ff7251] text-white rounded-full flex items-center p-1.5 pr-6 gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(255,92,53,0.2)]"
              >
                <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center text-[#FF5C35] group-hover:scale-95 transition-transform duration-300">
                  <Download size={16} strokeWidth={2.5} />
                </div>
                <span className="font-medium text-sm tracking-wide">
                  Download Resume
                </span>
              </a>
              
              {/* Secondary Ghost CTA */}
              <button
                onClick={() => scrollToId('contact')}
                className="group bg-[#2A2A2A] hover:bg-[#333333] border border-white/5 text-white rounded-full flex items-center px-6 py-3 gap-3 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="font-medium text-sm tracking-wide">Get in Touch</span>
                <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
              </button>
            </Reveal>
          </div>

          {/* Right Column (7 Cols): Narrative Story & Mission Card */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {profile.story.map((paragraph, idx) => (
                <Reveal key={idx} delay={0.12 * (idx + 1)}>
                  <p className="text-[16px] md:text-[17px] text-white/70 leading-relaxed font-normal">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Dark Layered Mission Panel */}
            <Reveal delay={0.4} className="p-8 sm:p-10 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl mt-4 relative overflow-hidden group">
              {/* Colored Ambient Glow replacing the old blue blur */}
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#FF5C35]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#FF5C35]/20 transition-colors duration-700" />
              
              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#FF5C35] font-bold block mb-4">
                  Core Mission
                </span>
                <p className="text-lg sm:text-xl text-white italic font-medium leading-relaxed drop-shadow-sm">
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