import React from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import { certifications, badges } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';

const brandFor = (label: string) => {
  if (/google/i.test(label)) return { brand: 'Google', className: 'brand-logo--google' };
  if (/nvidia/i.test(label)) return { brand: 'NVIDIA', className: 'brand-logo--nvidia' };
  if (/ibm/i.test(label)) return { brand: 'IBM', className: 'brand-logo--ibm' };
  if (/credly/i.test(label)) return { brand: 'Credly', className: 'brand-logo--credly' };
  return { brand: 'Verified', className: 'brand-logo--default' };
};

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-28 md:py-36 px-6 md:px-12 bg-[#1A1A1A] text-white relative">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel>Honors &amp; Credentials</SectionLabel>
        <MaskText
          text="Learning, on record"
          className="text-[clamp(2rem,4vw,3.5rem)] font-semibold text-white leading-[1.15] tracking-tight mb-24 md:mb-32"
        />

        {/* Block 1: Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 md:mb-32">
          {/* Left Column: Sticky Title + Count in Dark Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col items-start p-7 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl">
            <span className="text-[11px] uppercase font-mono tracking-widest font-bold text-[#FF5C35] mb-2">
              Verified Records
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
              Certifications
            </h3>
            <span className="text-7xl lg:text-8xl font-bold text-[#FF5C35] font-mono select-none leading-none">
              {String(certifications.length).padStart(2, '0')}
            </span>
          </div>

          {/* Right Column: 2-Col Grid of Dark Cards */}
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                {certifications.map((cert, idx) => (
                  <li
                    key={cert.title}
                    className="min-h-[11rem] rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-white/10 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-full bg-[#2A2A2A] border border-white/5 flex items-center justify-center text-[#FF5C35] text-xs font-mono font-bold shadow-sm">
                        {idx + 1}
                      </div>
                      <Award size={19} className="text-white/40 group-hover:text-[#FF5C35] transition-colors" />
                    </div>

                    <div className="mt-6">
                      <h4 className="font-bold text-base md:text-lg text-white tracking-tight leading-snug group-hover:text-[#FF5C35] transition-colors">
                        {cert.title}
                      </h4>
                      {cert.issuer && (
                        <p className="text-[11px] uppercase font-bold tracking-widest font-mono text-white/50 mt-2">
                          {cert.issuer}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Block 2: Digital Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-16 border-t border-white/10">
          {/* Left Column: Sticky Title + Count in Dark Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col items-start p-7 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl">
            <span className="text-[11px] uppercase font-mono tracking-widest font-bold text-[#FF5C35] mb-2">
              External Verification
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
              Verified Badges
            </h3>
            <span className="text-7xl lg:text-8xl font-bold text-[#FF5C35] font-mono select-none leading-none">
              {String(badges.length).padStart(2, '0')}
            </span>
          </div>

          {/* Right Column: 2-Col List of Badge Dark Links */}
          <div className="lg:col-span-8">
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {badges.map((badge, idx) => {
                  const info = brandFor(badge.label);
                  return (
                    <a
                      key={badge.label}
                      href={badge.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[20px] bg-[#111111] border border-white/5 shadow-2xl p-5 flex items-center justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 group select-none"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-[#2A2A2A] border border-white/5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <span className={`brand-logo ${info.className}`}>
                            {info.brand}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 font-bold block mb-0.5">
                            {info.brand} · Credential 0{idx + 1}
                          </span>
                          <span className="text-sm font-semibold text-white group-hover:text-[#FF5C35] transition-colors block truncate">
                            {badge.label}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="text-white/40 group-hover:text-[#FF5C35] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                      />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
