import React, { useRef, useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { MediaItem } from '../data/site';
import { prefersReducedMotion } from '../lib/motion';

interface VerticalCarouselProps {
  title: string;
  items: MediaItem[];
}

export const VerticalCarousel: React.FC<VerticalCarouselProps> = ({
  title,
  items,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    setActiveIndex(idx);
  };

  const goTo = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const targetY = index * el.clientHeight;
    el.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeIndex > 0) goTo(activeIndex - 1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeIndex < items.length - 1) goTo(activeIndex + 1);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header with Title and Counter */}
      <div className="flex items-center justify-between border-b border-line/10 pb-4">
        <h3 className="text-xl font-semibold text-fg">{title}</h3>
        <span className="font-mono text-sm text-accent font-bold">
          {String(activeIndex + 1).padStart(2, '0')} /{' '}
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <div className="relative flex items-center gap-6">
        {/* Scroll Container */}
        <div
          ref={containerRef}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={title}
          onKeyDown={handleKeyDown}
          data-lenis-prevent
          className="h-[min(70svh,540px)] w-full overflow-y-auto snap-y snap-mandatory rounded-2xl bg-surface border border-line/15 focus:outline-none focus:ring-1 focus:ring-accent no-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="h-full w-full snap-start snap-always flex items-center justify-center p-6 relative"
              data-cursor="explore"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-contain drop-shadow-xl"
              />
              <div className="absolute bottom-4 left-6 right-6 text-xs text-muted truncate bg-bg/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-line/10">
                {item.alt}
              </div>
            </div>
          ))}
        </div>

        {/* Right-side Control Column */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full border border-line/15 bg-surface flex items-center justify-center text-fg hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronUp size={18} />
          </button>

          <div className="flex flex-col gap-2 py-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'h-6 bg-accent'
                    : 'h-2 bg-line/25 hover:bg-line/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === items.length - 1}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full border border-line/15 bg-surface flex items-center justify-center text-fg hover:border-accent hover:text-accent disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
