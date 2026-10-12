import React from 'react';
import { marqueeWords } from '../data/site';

export const Marquee: React.FC = () => {
  const ariaLabelText = marqueeWords.join(', ');

  const renderRow = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center gap-10 shrink-0">
      {marqueeWords.map((word, idx) => (
        <span key={`${keyPrefix}-${idx}`} className="flex items-center gap-10">
          <span className="text-[clamp(1.75rem,4.2vw,3.5rem)] font-bold uppercase tracking-tight text-white/25 hover:text-white transition-colors duration-300 whitespace-nowrap select-none">
            {word}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5C35] shadow-[0_0_12px_rgba(255,92,53,0.7)] shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      role="img"
      aria-label={`Featured capabilities: ${ariaLabelText}`}
      className="w-full overflow-hidden border-y border-white/10 py-7 md:py-9 bg-[#111111] relative select-none"
    >
      <div className="marquee-track flex gap-10">
        {renderRow('row-1')}
        {renderRow('row-2')}
      </div>
    </div>
  );
};
