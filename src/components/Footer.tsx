import React from 'react';
import { profile, socials } from '../data/site';
import { SocialIcon } from './Icons';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/80 py-12 md:py-16 px-6 md:px-12 bg-white/70 backdrop-blur-xl shadow-xs relative z-10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        {/* Left Column: Name in Display Type */}
        <div>
          <span className="text-xl font-bold tracking-tight text-fg font-sans block">
            {profile.name}
          </span>
          <p className="text-xs text-muted font-mono mt-1">
            Product Architect &amp; Systems Engineer
          </p>
        </div>

        {/* Center Column: Colophon */}
        <div className="text-center">
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            Architected with Apple Liquid Glass rigor + human empathy
          </p>
        </div>

        {/* Right Column: Social Glass Pills & Copyright */}
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
                  className="w-9 h-9 rounded-full glass-pill border border-white/95 flex items-center justify-center text-slate-500 hover:text-accent hover:border-accent transition-colors shadow-xs"
                  aria-label={social.label}
                >
                  <SocialIcon id={social.id} className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <span className="text-xs text-slate-400 font-mono select-none">
            &copy; 2026
          </span>
        </div>
      </div>
    </footer>
  );
};
