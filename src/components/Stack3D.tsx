import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  MotionValue,
} from 'framer-motion';
import { MediaItem } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { getLenis } from '../lib/lenis';

interface Stack3DProps {
  id: string;
  label: string;
  title: string;
  description: string;
  items: MediaItem[];
  landscape?: boolean;
  noBorder?: boolean;
}

interface Card3DProps {
  item: MediaItem;
  index: number;
  total: number;
  pos: MotionValue<number>;
  onSelect: (index: number) => void;
  noBorder?: boolean;
}

const renderDescription = (text: string) => {
  if (!text.includes('\n')) {
    return (
      <p className="text-base md:text-[1.05rem] text-slate-500 leading-relaxed font-normal mb-8">
        {text}
      </p>
    );
  }

  const sections = text.split('\n\n').filter((s) => s.trim().length > 0);

  return (
    <div className="space-y-6 mb-8 max-h-[55svh] overflow-y-auto pr-4 scrollbar-hide">
      {sections.map((section, idx) => {
        const lines = section.split('\n').map((l) => l.trim()).filter(Boolean);

        // 1. Headline callout (Soft, friendly badge)
        if (lines.length > 0 && lines[0].startsWith('Headline:')) {
          const headlineText = lines[0].replace(/^Headline:\s*/i, '');
          const bodyLines = lines.slice(1);
          return (
            <div key={idx} className="space-y-3">
              <div className="inline-flex items-center px-4 py-1.5 rounded-2xl text-xs font-bold tracking-wide bg-indigo-50 text-indigo-600 border border-indigo-100/50 shadow-sm">
                {headlineText}
              </div>
              {bodyLines.map((line, bIdx) => (
                <p key={bIdx} className="text-[15px] md:text-base text-slate-600 leading-relaxed font-normal">
                  {line}
                </p>
              ))}
            </div>
          );
        }

        // 2. Host / Location / Date metadata block (Modern, airy card)
        if (lines.some((l) => l.startsWith('📍') || l.startsWith('📅'))) {
          return (
            <div
              key={idx}
              className="p-4 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-2"
            >
              {lines.map((line, lIdx) => (
                <div key={lIdx} className="flex items-center gap-3 text-[13px] md:text-sm font-medium text-slate-700">
                  <span className="opacity-80">{line}</span>
                </div>
              ))}
            </div>
          );
        }

        // 3. Team block with Leader / Members / Mentor
        if (
          lines.some((l) => l.toLowerCase().includes('leader:') || l.toLowerCase().includes('mentor:')) ||
          (lines.length > 1 && lines[0].toLowerCase().includes('team:'))
        ) {
          return (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-3"
            >
              {lines.map((line, lIdx) => {
                if (line.toLowerCase().startsWith('members:') || line.toLowerCase().includes('members:')) {
                  const parts = line.split(':');
                  const label = parts[0] + ':';
                  const names = parts.slice(1).join(':').split(',').map((n) => n.trim()).filter(Boolean);
                  return (
                    <div key={lIdx} className="pt-2">
                      <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-2.5">
                        {label}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {names.map((name, nIdx) => (
                          <span
                            key={nIdx}
                            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-slate-100/80 text-slate-700 border border-slate-200/50 shadow-sm transition-transform hover:scale-105 cursor-default"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2" />
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <p key={lIdx} className="text-[13px] md:text-sm font-medium text-slate-600">
                    <span className="font-bold text-slate-900">{line.split(':')[0]}:</span>{' '}
                    {line.split(':').slice(1).join(':').trim()}
                  </p>
                );
              })}
            </div>
          );
        }

        // 4. Team Name callout badge
        if (lines.some((l) => l.toLowerCase().includes('team name:'))) {
          const teamLine = lines.find((l) => l.toLowerCase().includes('team name:'))!;
          const cleanTeamName = teamLine.replace(/\*\*/g, '').trim();
          const otherLines = lines.filter((l) => l !== teamLine);
          return (
            <div key={idx} className="space-y-3">
              <div className="inline-flex items-center px-4 py-1.5 rounded-2xl text-xs font-bold tracking-wide bg-sky-50 text-sky-600 border border-sky-100/50 shadow-sm">
                {cleanTeamName}
              </div>
              {otherLines.map((line, oIdx) => (
                <p key={oIdx} className="text-[15px] md:text-base text-slate-600 leading-relaxed font-normal">
                  {line.replace(/\*\*/g, '')}
                </p>
              ))}
            </div>
          );
        }

        // 5. Check if this is the simple team roster block
        if (lines.length > 1 && lines[0].toLowerCase().includes('team') && !lines.some((l) => l.includes(':'))) {
          const title = lines[0];
          const members = lines.slice(1);
          return (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <p className="text-[11px] uppercase tracking-widest font-bold text-slate-400 mb-3">
                {title}
              </p>
              <div className="flex flex-wrap gap-2">
                {members.map((member, mIdx) => (
                  <span
                    key={mIdx}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-white text-slate-700 border border-slate-100 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2" />
                    {member}
                  </span>
                ))}
              </div>
            </div>
          );
        }

        // 6. Bullet lists or Key Takeaways
        const hasBullets = lines.some(
          (l) => l.startsWith('•') || l.startsWith('* ') || l.startsWith('- ') || l.startsWith('✨')
        );
        if (hasBullets) {
          const heading =
            lines[0].startsWith('•') || lines[0].startsWith('* ') || lines[0].startsWith('- ') || lines[0].startsWith('✨')
              ? null
              : lines[0];
          const bulletLines = heading ? lines.slice(1) : lines;
          return (
            <div key={idx} className="space-y-3 bg-slate-50/50 p-5 rounded-3xl border border-slate-100/50">
              {heading && (
                <h4 className="text-[15px] md:text-base font-bold text-slate-800">
                  {heading.replace(/\*\*/g, '')}
                </h4>
              )}
              <div className="space-y-2.5">
                {bulletLines.map((line, bIdx) => {
                  const clean = line.replace(/^(?:•|\*|-|✨)\s*/, '').trim();
                  return (
                    <div
                      key={bIdx}
                      className="flex items-start gap-3 text-[14px] md:text-[15px] text-slate-600 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0 opacity-80" />
                      <span>{clean.replace(/\*\*/g, '')}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        // 7. Emoji feature section
        if (
          lines.length > 1 &&
          (lines[0].startsWith('🔍') ||
            lines[0].startsWith('💡') ||
            lines[0].startsWith('🎯'))
        ) {
          const heading = lines[0];
          const rest = lines.slice(1);
          return (
            <div key={idx} className="space-y-2">
              <h4 className="text-[15px] md:text-base font-bold text-slate-800 flex items-center gap-2">
                {heading}
              </h4>
              <div className="space-y-1.5 pl-1">
                {rest.map((line, rIdx) => {
                  const isBullet =
                    rIdx > 0 &&
                    rest.length > 2 &&
                    !line.toLowerCase().includes('engine that:');
                  return isBullet ? (
                    <div
                      key={rIdx}
                      className="flex items-start gap-2.5 text-[14px] md:text-[15px] text-slate-600 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0 opacity-80" />
                      <span>{line}</span>
                    </div>
                  ) : (
                    <p
                      key={rIdx}
                      className="text-[14px] md:text-[15px] text-slate-600 leading-relaxed"
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        }

        // 8. Clean paragraph
        const cleanedText = section.replace(/\*\*(.*?)\*\*/g, '\$1');
        return (
          <p
            key={idx}
            className="text-[15px] md:text-[1.05rem] text-slate-500 leading-relaxed font-normal"
          >
            {cleanedText}
          </p>
        );
      })}
    </div>
  );
};

const Card3D: React.FC<Card3DProps> = ({ item, index, total, pos, onSelect, noBorder = false }) => {
  // Fixed broken template literal math
  const y = useTransform(pos, (p) => `${(index - p) * 50}%`);
  
  const z = useTransform(pos, (p) => {
    const o = Math.abs(index - p);
    return -Math.min(o, 3) * 180; // Slightly softer depth
  });
  
  const rotateX = useTransform(pos, (p) => {
    const raw = -(index - p) * 20; // Gentler rotation
    return Math.max(-35, Math.min(35, raw));
  });
  
  const scale = useTransform(pos, (p) => {
    const o = Math.abs(index - p);
    return 1 - Math.min(o, 3) * 0.08;
  });
  
  const opacity = useTransform(pos, (p) => {
    const o = Math.abs(index - p);
    if (o < 0.6) return 1;
    if (o > 1.8) return 0;
    return 1 - (o - 0.6) / 1.2;
  });
  
  const shade = useTransform(pos, (p) => {
    const o = Math.abs(index - p);
    return Math.min(o, 1.6) * 0.25; // Brighter, less harsh shadows
  });
  
  const zIndex = useTransform(pos, (p) => {
    const o = Math.abs(index - p);
    return Math.round(100 - o * 10);
  });
  
  const pointerEvents = useTransform(pos, (p) => {
    const o = Math.abs(index - p);
    return o < 0.8 ? 'auto' : 'none';
  });

  const formattedIndex = String(index + 1).padStart(2, '0');
  const formattedTotal = String(total).padStart(2, '0');

  return (
    <motion.div
      style={{
        y,
        z,
        rotateX,
        scale,
        opacity,
        zIndex,
        pointerEvents,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
      }}
      onClick={() => onSelect(index)}
      className={`rounded-[32px] group transition-all duration-500 ease-out ${
        noBorder 
          ? 'border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]' 
          : 'bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)]'
      } overflow-hidden cursor-pointer select-none`}
    >
      {/* Blurred Backdrop - Gives the card an inner glow of its own image */}
      <img
        src={item.src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-3xl scale-150 opacity-30 pointer-events-none transition-opacity group-hover:opacity-40"
      />

      {/* Main Sharp Image */}
      <div
        className={`relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02] ${
          noBorder ? 'p-0' : 'p-6 md:p-8'
        }`}
      >
        <img
          src={item.src}
          alt={item.alt}
          className={`w-full h-full ${
            noBorder
              ? 'object-cover rounded-[32px]'
              : 'object-contain drop-shadow-xl rounded-[24px]'
          }`}
        />
      </div>

      {/* Soft Light Shade Overlay */}
      <motion.div
        style={{ opacity: shade }}
        className="absolute inset-0 bg-gradient-to-t from-slate-200/50 to-white/10 pointer-events-none z-20 mix-blend-multiply"
      />

      {/* Bottom Gradient Liquid Glass Caption */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 p-4 sm:p-6 flex items-end justify-between transition-all duration-500 ${
          noBorder
            ? 'bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent pt-12'
            : 'bg-gradient-to-t from-white/90 via-white/70 to-transparent pt-12'
        }`}
      >
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wide shadow-sm ${
            noBorder 
              ? 'bg-white/20 text-white backdrop-blur-md border border-white/20' 
              : 'bg-white/80 text-indigo-600 backdrop-blur-md border border-white'
          }`}
        >
          {formattedIndex} / {formattedTotal}
        </span>
        <span
          className={`text-[12px] md:text-[13px] truncate max-w-[70%] font-semibold tracking-wide ${
            noBorder ? 'text-white shadow-black/10 drop-shadow-md' : 'text-slate-800'
          }`}
        >
          {item.alt}
        </span>
      </div>
    </motion.div>
  );
};

export const Stack3D: React.FC<Stack3DProps> = ({
  id,
  label,
  title,
  description,
  items,
  landscape = false,
  noBorder = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const isReduced = useReducedMotion();

  const totalScreens = (items.length - 1) * 0.5 + 1;
  // Fixed broken template literal math
  const sectionHeight = `${totalScreens * 100}svh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const pos = useTransform(scrollYProgress, [0, 1], [0, items.length - 1]);

  useMotionValueEvent(pos, 'change', (latest) => {
    setActive(Math.round(latest));
  });

  const goTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const elementTop = rect.top + scrollTop;
    const scrollableDistance = rect.height - window.innerHeight;
    const progress = items.length > 1 ? index / (items.length - 1) : 0;
    const targetScroll = elementTop + progress * scrollableDistance;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetScroll, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  if (isReduced) {
    return (
      <section id={id} className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto bg-[#F8FAFC]">
        <SectionLabel>{label}</SectionLabel>
        <h2 className="text-[clamp(2.4rem,6vw,5rem)] font-extrabold tracking-tight text-slate-900 mb-6">
          {title}
        </h2>
        {renderDescription(description)}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {items.map((item, i) => (
            <div
              key={i}
              className={`rounded-[24px] overflow-hidden bg-white group hover:-translate-y-1 transition-transform duration-300 ${
                noBorder ? 'border-0 p-0 shadow-[0_8px_30px_rgb(0,0,0,0.06)]' : 'border border-slate-100 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
              }`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`w-full aspect-[4/3] ${
                  noBorder ? 'object-cover rounded-[24px]' : 'object-contain rounded-[16px]'
                }`}
              />
              <div className="pt-4 pb-1 px-2">
                <p className="text-[13px] font-medium text-slate-500">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={containerRef}
      style={{ height: sectionHeight }}
      className="relative bg-[#F8FAFC] selection:bg-indigo-100 selection:text-indigo-900"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center px-6 md:px-12 pt-28 lg:pt-24 pb-6">
        <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_auto] items-center gap-12 lg:gap-20">
          
          {/* Header & Pagination Column */}
          <div className="flex flex-col items-start max-w-xl relative z-20">
            <div className="mb-2">
              <SectionLabel>{label}</SectionLabel>
            </div>
            <h2 className="text-[clamp(2.2rem,4vw,4rem)] font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-6 drop-shadow-sm">
              {title}
            </h2>
            
            <div className="w-full">
              {renderDescription(description)}
            </div>

            {/* Pagination & Counter (Desktop >=md) */}
            <div className="hidden md:flex items-center gap-6 pt-6 border-t border-slate-200/60 w-full mt-4">
              <span className="text-[13px] font-mono font-bold tracking-widest text-slate-400">
                {String(active + 1).padStart(2, '0')} /{' '}
                {String(items.length).padStart(2, '0')}
              </span>

              <div className="flex items-center gap-2.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Jump to card ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-500 ease-out ${
                      active === i
                        ? 'w-10 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]'
                        : 'w-2.5 bg-slate-200 hover:bg-slate-300 hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3D Stack Stage */}
          <div className="flex justify-center items-center">
            <div
              className={`stack-stage relative ${
                landscape ? 'landscape' : ''
              }`}
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
              }}
            >
              {items.map((item, index) => (
                <Card3D
                  key={index}
                  item={item}
                  index={index}
                  total={items.length}
                  pos={pos}
                  onSelect={goTo}
                  noBorder={noBorder}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};