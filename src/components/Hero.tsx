import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { profile } from '../data/site';
import { HeroAssets } from '../lib/heroAssets';
import { gsap } from '../lib/gsap';
import { scrollToId } from '../lib/lenis';

interface HeroProps {
  assets: HeroAssets | null;
}

export const Hero: React.FC<HeroProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const giantTextRef = useRef<HTMLHeadingElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Giant Text Animation
      tl.fromTo(
        giantTextRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
      )
      // Portrait Entrance
      .fromTo(
        portraitRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      // Left Content Fade In
      .fromTo(
        leftContentRef.current?.children ? Array.from(leftContentRef.current.children) : [],
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        '-=0.6'
      )
      // Right Content Fade In
      .fromTo(
        rightContentRef.current?.children ? Array.from(rightContentRef.current.children) : [],
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        '-=0.7'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Extract first name for the giant background text
  const firstName = profile.name.split(' ')[0];

  // A custom transparent SVG placeholder so you can see the layering effect perfectly
  const placeholderImage = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><path d="M150,800 Q150,450 300,450 Q450,450 450,800 Z" fill="%232A2A2A" opacity="0.95"/><circle cx="300" cy="300" r="110" fill="%232A2A2A" opacity="0.95"/><text x="300" y="550" fill="white" font-family="sans-serif" font-size="22" font-weight="bold" text-anchor="middle">YOUR TRANSPARENT</text><text x="300" y="590" fill="white" font-family="sans-serif" font-size="22" font-weight="bold" text-anchor="middle">PHOTO CUTOUT HERE</text></svg>`;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full bg-[#1A1A1A] text-white overflow-hidden flex flex-col justify-center font-sans"
    >
      {/* 1. GIANT BACKGROUND TEXT (Behind the portrait) */}
      <h1
        ref={giantTextRef}
        className="absolute bottom-[-3%] left-0 w-full text-center text-[24vw] font-bold tracking-tighter text-white leading-none z-0 select-none pointer-events-none"
      >
        {firstName}
      </h1>

      {/* 2. CENTER PORTRAIT (Transparent Cutout Layer) */}
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
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto h-[74vh] sm:h-[82vh] md:h-[86vh] lg:h-[90vh] xl:h-[92vh] max-h-[calc(100svh-5rem)] sm:max-h-[calc(100svh-6.5rem)] object-contain object-bottom z-10 pointer-events-none drop-shadow-[0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-300"
      />

      {/* 3. CONTENT WRAPPER */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 h-full flex items-center pb-20 lg:pb-0">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-12 lg:gap-0 lg:-mt-[5vh]">
          
          {/* LEFT COLUMN: Status Pill & Headline */}
          <div ref={leftContentRef} className="max-w-[420px] lg:w-1/3">
            
            {/* Exactly matched Status Pill */}
            <div className="flex items-center gap-2.5 bg-[#2A2A2A] rounded-full px-3.5 py-1.5 mb-6 w-fit border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#FF5C35] animate-pulse" />
              <span className="text-[11px] text-white/80 font-medium tracking-wide">
                Available for Work
              </span>
            </div>
            
            {/* Main Headline */}
            <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] text-white font-semibold leading-[1.15] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {profile.heroHeadline || "Brand & UI/UX Designer based in London"}
            </h2>
          </div>

          {/* RIGHT COLUMN: Bio & CTA Button */}
          <div ref={rightContentRef} className="max-w-[340px] lg:w-1/3 flex flex-col lg:items-start self-end lg:self-auto text-left">
            
            {/* Subtext Paragraph */}
            <p className="text-white/80 text-[15px] mb-8 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              {profile.heroSub || `Hi, I'm ${profile.name} – a UI/UX and brand designer passionate about creating seamless digital experiences that connect and convert.`}
            </p>
            
            {/* Exactly matched Primary CTA Button */}
            <button
              onClick={() => scrollToId('work')}
              className="group bg-[#FF5C35] hover:bg-[#ff7251] text-white rounded-full flex items-center p-1.5 pr-6 gap-4 transition-all duration-300 hover:-translate-y-0.5"
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