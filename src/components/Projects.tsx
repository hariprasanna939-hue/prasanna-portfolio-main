import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { stackedProjects, StackedProject } from '../data/projects';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLElement | null)[]>([]);
  const scrimRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Responsive breakpoint tracking for sticky top offsets
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.innerHeight < 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP ScrollTrigger for smooth progressive scale & layered depth across all 9 cards
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const total = stackedProjects.length;

      for (let i = 0; i < total - 1; i++) {
        const nextCard = cardRefs.current[i + 1];
        const currentInner = innerRefs.current[i];
        const currentScrim = scrimRefs.current[i];

        if (!nextCard || !currentInner) continue;

        // Subtle scale down as subsequent cards stack over it
        const targetScale = Math.max(0.88, 1 - (total - i) * 0.014);

        gsap.to(currentInner, {
          scale: targetScale,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top bottom',
            end: 'top top+=140',
            scrub: true,
          },
        });

        if (currentScrim) {
          gsap.to(currentScrim, {
            opacity: 0.38,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom',
              end: 'top top+=140',
              scrub: true,
            },
          });
        }
      }

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [isMobile]);

  // Dynamic sticky top offsets configured for 9 cards
  const baseTop = isMobile ? 24 : 80;
  const tabOffset = isMobile ? 8 : 20;

  return (
    <section
      id="work"
      ref={containerRef}
      className="py-16 sm:py-24 lg:py-32 px-3 sm:px-6 lg:px-12 bg-[#EDF0F3] relative font-sans text-[#111215] transition-colors duration-500 overflow-visible"
    >
      <div className="max-w-[1340px] mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-10 sm:mb-20 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DEE2E6] border border-black/5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#111215] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF5C35] animate-pulse" />
            <span>Selected Work · 09 Live Deployments</span>
          </div>

          <h2 className="text-[clamp(1.9rem,5vw,4.5rem)] font-extrabold text-[#111215] tracking-tight font-sans leading-[1.08] mb-3 sm:mb-4">
            Featured projects &amp; systems architecture.
          </h2>

          <p className="text-xs sm:text-base text-[#4A4D55] font-normal leading-relaxed max-w-xl">
            A curated stack of 9 production platforms, enterprise AI solutions, and full-stack systems.
            Scroll down to explore each project card in the layered sequence.
          </p>
        </div>

        {/* Stacked Cards Track: Exact Fixed Order 01 to 09 */}
        <div className="relative flex flex-col pb-16 sm:pb-36">
          {stackedProjects.map((project: StackedProject, idx: number) => {
            const total = stackedProjects.length;

            return (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="stacked-card-wrapper sticky w-full mb-[8vh] sm:mb-[16vh] last:mb-0 flex justify-center"
                style={{
                  top: `${baseTop + idx * tabOffset}px`,
                  zIndex: idx + 1,
                }}
              >
                {/* Physical Card Panel */}
                <article
                  ref={(el) => (innerRefs.current[idx] = el)}
                  className="stacked-card-inner w-full max-w-[1260px] rounded-[22px] sm:rounded-[36px] bg-[#0B0C0E] text-[#F9FAFB] border border-white/10 p-5 sm:p-9 lg:p-12 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden group/card transform-gpu will-change-transform"
                  style={{
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Dark Scrim overlay for layered depth when covered */}
                  <div
                    ref={(el) => (scrimRefs.current[idx] = el)}
                    className="absolute inset-0 bg-black pointer-events-none opacity-0 transition-opacity duration-300 z-30"
                  />

                  {/* Top-edge subtle highlight reflection */}
                  <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* Card Header Tab Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/10 relative z-10">
                    {/* Index & Category */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#18191E] border border-white/10 text-[11px] sm:text-xs font-mono font-bold text-white/90">
                        0{project.index} / 0{total}
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase text-[#FF5C35]">
                        {project.category}
                      </span>
                    </div>

                    {/* Status Badge & External Action */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      {project.badge && (
                        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18191E] border border-white/5 text-[11px] font-medium text-white/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          <span>{project.badge}</span>
                        </div>
                      )}

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live link for ${project.title}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors min-h-[32px]"
                        >
                          <span>Live Link</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Main Card Content Grid (12 Columns) */}
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center pt-5 sm:pt-8">
                    {/* Left Column: Title, Description, Tech Chips, CTA (7 Cols) */}
                    <div className="flex flex-col items-start lg:col-span-7">
                      <h3 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.14] mb-3 sm:mb-4">
                        {project.title}
                      </h3>

                      <div className="text-white/80 text-xs sm:text-sm lg:text-base font-normal leading-relaxed mb-4 sm:mb-6 flex items-start gap-2">
                        <Sparkles size={16} className="text-[#FF5C35] shrink-0 mt-0.5 sm:mt-1" />
                        <p>{project.description}</p>
                      </div>

                      {/* Verified Technology Tags */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-8">
                          {project.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#181A20] border border-white/10 text-[11px] sm:text-xs font-mono font-medium text-white/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA Action Button */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit live website for ${project.title}`}
                            className="group/btn bg-[#FF5C35] hover:bg-[#ff7251] text-white rounded-full flex items-center p-1.5 pr-6 sm:pr-7 gap-3 sm:gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(255,92,53,0.3)] min-h-[44px]"
                          >
                            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex justify-center items-center text-[#FF5C35] group-hover/btn:scale-95 transition-transform duration-300 shrink-0">
                              <ArrowUpRight size={17} strokeWidth={2.5} />
                            </div>
                            <span className="font-bold text-xs sm:text-sm tracking-wide">
                              Visit Live Platform
                            </span>
                          </a>
                        )}

                        {project.caseStudyUrl && (
                          <a
                            href={project.caseStudyUrl}
                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium text-white/80 hover:text-white transition-all border border-white/10 min-h-[44px]"
                          >
                            <span>Case Study</span>
                            <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Genuine High-Resolution Website Preview (5 Cols) */}
                    <div className="w-full lg:col-span-5">
                      <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] max-h-[220px] sm:max-h-none w-full rounded-[16px] sm:rounded-[22px] overflow-hidden bg-[#16181D] border border-white/10 shadow-2xl group/visual">
                        <img
                          src={project.image}
                          alt={`Live website screenshot of ${project.title}`}
                          loading="lazy"
                          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/visual:scale-105"
                        />

                        {/* Subtle Glass Inner Border Overlay */}
                        <div className="absolute inset-0 pointer-events-none rounded-[16px] sm:rounded-[22px] ring-1 ring-inset ring-white/10" />
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        {/* Bottom Archive Panel */}
        <div className="pt-6 text-center">
          <div className="inline-block p-6 sm:p-8 rounded-[24px] bg-[#0B0C0E] text-white border border-white/10 shadow-xl max-w-lg w-full">
            <h4 className="text-base sm:text-lg font-bold text-white mb-2">
              Ready to architect something remarkable?
            </h4>
            <p className="text-xs sm:text-sm text-white/60 font-normal mb-5">
              Explore open repositories, system prototypes, and architectural experiments.
            </p>
            <a
              href="https://github.com/hariprasanna939-hue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF5C35] hover:bg-[#ff7251] text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md"
            >
              <span>Explore GitHub Repositories</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
