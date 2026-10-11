import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border border-white/95 text-accent text-[11px] font-mono font-bold tracking-wider uppercase shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="whitespace-nowrap">{children}</span>
      </span>
    </div>
  );
};
