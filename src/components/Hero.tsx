import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { profile } from '../data/site';
import { HeroAssets } from '../lib/heroAssets';
import { gsap } from '../lib/gsap';
import { scrollToId } from '../lib/lenis';
import { prefersReducedMotion } from '../lib/motion';

interface HeroProps {
  assets: HeroAssets | null;
}

const NAME_CHARS = 'PRASANNA HARI'.split('');

export const Hero: React.FC<HeroProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLHeadingElement>(null);
  const nameLineRef = useRef<HTMLDivElement>(null);
  const curvedDomeRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const isReduced = prefersReducedMotion();

      // Calculate distance from vertical center down to the bottom
      const calculateBottomOffset = () => {
        const heroHeight = sectionRef.current?.clientHeight || window.innerHeight;
        const textHeight = giantTextRef.current?.clientHeight || 230;
        return Math.max(0, heroHeight / 2 - textHeight / 2 + heroHeight * 0.02);
      };

      if (isReduced) {
        if (curvedDomeRef.current) curvedDomeRef.current.style.display = 'none';
        const bottomY = calculateBottomOffset();
        gsap.set(portraitRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          transformOrigin: 'bottom center',
        });
        gsap.set(
          [
            leftContentRef.current,
            rightContentRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
          }
        );
        if (giantTextRef.current) {
          gsap.set(giantTextRef.current, { y: bottomY, opacity: 1 });
        }
        return;
      }

      // Initial state: Start centered vertically with y = 0
      if (giantTextRef.current) {
        gsap.set(giantTextRef.current, { y: 0 });
      }

      const tl = gsap.timeline();

      // 1. Curved Dome Sweep Transition
      if (curvedDomeRef.current) {
        tl.fromTo(
          curvedDomeRef.current,
          { yPercent: 85, opacity: 0.95 },
          { yPercent: -25, opacity: 0, duration: 1.35, ease: 'power3.out' },
          0
        );
      }

      // 2. Letters Mask Reveal (Continuous PRASANNA HARI in Center)
      const letters = nameLineRef.current?.querySelectorAll('.hero-letter-inner');
      if (letters && letters.length > 0) {
        tl.fromTo(
          letters,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.035,
            ease: 'power4.out',
            clearProps: 'transform,opacity',
          },
          0.1
        );
      }

      // 3. AFTER INTRO: Smoothly glides from CENTER down to BELOW
      if (giantTextRef.current) {
        tl.to(
          giantTextRef.current,
          {
            y: calculateBottomOffset,
            duration: 1.25,
            ease: 'power3.inOut',
          },
          1.38
        );
      }

      // 4. Portrait Entrance (enters in front of the giant text, perfectly centered)
      tl.fromTo(
        portraitRef.current,
        { y: 80, opacity: 0, scale: 0.96, transformOrigin: 'bottom center' },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', transformOrigin: 'bottom center' },
        1.65
      )
      // 5. Left Column Content Fade In
      .fromTo(
        leftContentRef.current?.children ? Array.from(leftContentRef.current.children) : [],
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power2.out' },
        1.9
      )
      // 6. Right Column Content Fade In
      .fromTo(
        rightContentRef.current?.children ? Array.from(rightContentRef.current.children) : [],
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: 'power2.out' },
        2.0
      );

      tl.play();

      const handleResize = () => {
        if (tl.progress() >= 1 && giantTextRef.current) {
          gsap.set(giantTextRef.current, { y: calculateBottomOffset() });
        }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, section);

    return () => ctx.revert();
  }, []);

  const placeholderImage = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><path d="M150,800 Q150,450 300,450 Q450,450 450,800 Z" fill="%232A2A2A" opacity="0.95"/><circle cx="300" cy="300" r="110" fill="%232A2A2A" opacity="0.95"/><text x="300" y="550" fill="white" font-family="sans-serif" font-size="22" font-weight="bold" text-anchor="middle">YOUR TRANSPARENT</text><text x="300" y="590" fill="white" font-family="sans-serif" font-size="22" font-weight="bold" text-anchor="middle">PHOTO CUTOUT HERE</text></svg>`;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full bg-[#1A1A1A] text-white overflow-hidden flex flex-col justify-center font-sans"
    >
      {/* 1. CURVED TRANSITION DOME */}
      <div
        ref={curvedDomeRef}
        aria-hidden="true"
        className="hero-curved-dome pointer-events-none absolute inset-x-0 bottom-0 h-full z-0 overflow-hidden flex items-end justify-center"
      >
        <div className="w-[160vw] h-[95%] rounded-t-[50%_100%] bg-gradient-to-t from-[#111111] via-[#171718] to-[#1f1f22] border-t border-white/[0.08] shadow-[0_-20px_60px_rgba(0,0,0,0.85)]" />
      </div>

      {/* 2. GIANT HERO TYPOGRAPHY: BIG, CONTINUOUS PRASANNA HARI (EDGE TO EDGE FILLING LEFT & RIGHT SPACE) */}
      <h1
        ref={giantTextRef}
        aria-label="PRASANNA HARI"
        className="hero-name-container absolute inset-x-0 top-1/2 -translate-y-1/2 w-full flex items-center justify-center z-0 select-none pointer-events-none font-hero-condensed uppercase text-white leading-none whitespace-nowrap transform-gpu will-change-transform"
      >
        <span className="sr-only">PRASANNA HARI</span>

        <div
          ref={nameLineRef}
          aria-hidden="true"
          className="w-full flex items-baseline justify-center overflow-hidden px-0.5 text-[clamp(3.5rem,21.8vw,35rem)] font-bold tracking-tight text-white drop-shadow-[0_8px_36px_rgba(0,0,0,0.9)]"
        >
          {NAME_CHARS.map((char, i) => (
            <span
              key={`char-${i}`}
              className={`inline-block overflow-hidden relative ${
                char === ' ' ? 'w-[0.24em]' : ''
              }`}
            >
              {char === ' ' ? (
                <span>&nbsp;</span>
              ) : (
                <span className="hero-letter-inner inline-block transform-gpu will-change-transform will-change-opacity">
                  {char}
                </span>
              )}
            </span>
          ))}
        </div>
      </h1>

      {/* 3. CENTER PORTRAIT (Guaranteed 100% Horizontal Centering) */}
      <div
        className="absolute inset-x-0 bottom-0 h-full w-full flex justify-center items-end pointer-events-none z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          ref={portraitRef}
          src="/images/prasanna-cutout.png"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('prasanna-cutout.png')) {
              target.src = '/images/prasanna-cutout.webp';
            } else if (target.src.includes('prasanna-cutout.webp')) {
              target.src = placeholderImage;
            }
          }}
          alt={profile.name}
          className="w-auto h-[60dvh] sm:h-[75dvh] md:h-[84dvh] lg:h-[88dvh] max-h-[calc(100dvh-4.5rem)] object-contain object-bottom pointer-events-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)] transform-gpu will-change-transform will-change-opacity origin-bottom"
        />
      </div>

      {/* 4. CONTENT WRAPPER */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 h-full flex items-center pt-24 sm:pt-28 pb-16 lg:py-0">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-8 sm:gap-12 lg:gap-0 lg:-mt-[5vh]">
          
          {/* LEFT COLUMN: Status Pill & Headline */}
          <div ref={leftContentRef} className="max-w-[420px] lg:w-1/3">
            <div className="flex items-center gap-2.5 bg-[#2A2A2A] rounded-full px-3.5 py-1.5 mb-4 sm:mb-6 w-fit border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#FF5C35] animate-pulse" />
              <span className="text-[11px] text-white/80 font-medium tracking-wide">
                Available for Work
              </span>
            </div>
            
            <h2 className="text-[clamp(1.75rem,3.4vw,3.2rem)] text-white font-semibold leading-[1.16] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {profile.heroHeadline || "Engineering systems. Elevating human experience."}
            </h2>
          </div>

          {/* RIGHT COLUMN: Bio & CTA Button */}
          <div ref={rightContentRef} className="max-w-[340px] lg:w-1/3 flex flex-col lg:items-start self-end lg:self-auto text-left">
            <p className="text-white/80 text-[14px] sm:text-[15px] mb-6 sm:mb-8 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {profile.heroSub || `Bridging the chasm between deep AI algorithms, resilient distributed backends, and cinematic, high-performance web applications.`}
            </p>
            
            <button
              onClick={() => scrollToId('work')}
              className="group bg-[#FF5C35] hover:bg-[#ff7251] text-white rounded-full flex items-center p-1.5 pr-6 gap-4 transition-all duration-300 hover:-translate-y-0.5 min-h-[44px]"
            >
              <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center text-[#FF5C35] group-hover:scale-95 transition-transform duration-300">
                <ArrowRight size={18} strokeWidth={2.5} />
              </div>
              <span className="font-medium text-sm tracking-wide">
                See my works
              </span>
            </button>
          </div>

        </div>
      </div>
      
    </section>
  );
};
