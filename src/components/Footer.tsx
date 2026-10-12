import React from 'react';
import { profile, socials } from '../data/site';
import { SocialIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-12 md:py-16 px-6 md:px-12 bg-[#111111] text-white relative z-10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Left Column: Name in Display Type */}
        <div>
          <span className="text-xl font-bold tracking-tight text-white font-sans block">
            {profile.name}
          </span>
          <p className="text-xs text-white/50 font-mono mt-1">
            Product Architect &amp; Systems Engineer
          </p>
        </div>

        {/* Center Column: Colophon */}
        <div className="text-center">
          <p className="text-xs md:text-sm text-white/40 font-medium">
            Architected with precision, high-contrast editorial rigor &amp; human empathy
          </p>
        </div>

        {/* Right Column: Social Pills & Copyright */}
        <div className="flex items-center justify-center md:justify-end gap-6">
          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const isEmail = social.id === 'email';
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target={isEmail ? undefined : '_blank'}
                  rel={isEmail ? undefined : 'noopener noreferrer'}
                  className="w-9 h-9 rounded-full bg-[#2A2A2A] border border-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#FF5C35] hover:border-[#FF5C35] transition-colors shadow-sm"
                  aria-label={social.label}
                >
                  <SocialIcon id={social.id} className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <span className="text-xs text-white/40 font-mono select-none">
            &copy; 2026
          </span>
        </div>
      </div>
    </footer>
  );
};
