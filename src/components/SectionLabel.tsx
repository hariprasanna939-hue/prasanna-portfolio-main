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
    <div className={`flex items-center gap-2.5 bg-[#2A2A2A] rounded-full px-3.5 py-1.5 mb-8 w-fit border border-white/5 shadow-md ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#FF5C35] animate-pulse" />
      <span className="text-[11px] text-white/80 font-medium tracking-wide uppercase">
        {children}
      </span>
    </div>
  );
};
