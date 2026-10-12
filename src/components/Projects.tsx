import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects, profile } from '../data/site';
import { SectionLabel } from './SectionLabel';
import { MaskText } from './MaskText';
import { Reveal } from './Reveal';
import { Tilt3D } from './Tilt3D';
import { Wireframe } from './Wireframes';
import { GithubIcon } from './Icons';

export const Projects: React.FC = () => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImgError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="work" className="py-28 md:py-36 px-6 md:px-12 bg-[#1A1A1A] relative font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel>Selected Work</SectionLabel>
        
        <MaskText
          text="Featured projects"
          className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold text-white leading-none mb-20 md:mb-28 tracking-tight"
        />

        <div className="flex flex-col">
          {projects.map((project, idx) => {
            const isOdd = idx % 2 === 1;
            const hasError = imgErrors[project.id] || !project.image;

            return (
              <Reveal
                key={project.id}
                y={30}
                className="mb-16 md:mb-24 last:mb-12"
              >
                <article className="p-6 sm:p-10 lg:p-12 rounded-[32px] bg-[#111111] border border-white/5 shadow-2xl relative overflow-hidden group">
                  {/* Atmospheric orange glow inside project card */}
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FF5C35]/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#FF5C35]/20 transition-colors duration-700" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* Visual Column (7 Cols, Alternates Order on Desktop) */}
                    <div
                      className={`w-full lg:col-span-7 ${
                        isOdd ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <Tilt3D max={5} float={false} className="w-full">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="view"
                          aria-label={`View ${project.title} on GitHub`}
                          className="block relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-[#1A1A1A] border border-white/5 shadow-xl group/visual"
                        >
                          {/* 01 / 04 Number Pill */}
                          <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-[#2A2A2A] border border-white/5 text-xs font-mono font-bold text-white/80 shadow-md">
                            0{project.index} / 0{projects.length}
                          </div>

                          {/* Status Pill in Visual */}
                          <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-[#2A2A2A] border border-white/5 text-[11px] font-medium text-white/80 flex items-center gap-2 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-[#FF5C35] animate-pulse" />
                            <span>{project.status}</span>
                          </div>

                          {/* Image or Wireframe Fallback */}
                          {!hasError ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              onError={() => handleImgError(project.id)}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/visual:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-8 bg-[#151515]">
                              <Wireframe kind={project.wire} />
                            </div>
                          )}

                          {/* Soft Inner Border */}
                          <div className="absolute inset-0 pointer-events-none rounded-[24px] ring-1 ring-inset ring-white/5" />
                        </a>
                      </Tilt3D>
                    </div>

                    {/* Text Column (5 Cols) */}
                    <div
                      className={`flex flex-col items-start lg:col-span-5 ${
                        isOdd ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      {/* Category Pill */}
                      <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#2A2A2A] border border-white/5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#FF5C35] mb-4 shadow-sm">
                        {project.category}
                      </div>

                      <h3 className="text-[clamp(1.85rem,3.8vw,3rem)] font-bold text-white tracking-tight leading-tight mb-4 transition-transform duration-300 group-hover:translate-x-1">
                        {project.title}
                      </h3>

                      <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal mb-6">
                        {project.summary}
                      </p>

                      {/* Metadata Table in Dark Card */}
                      <dl className="w-full p-5 rounded-[20px] bg-[#1A1A1A] border border-white/5 shadow-inner divide-y divide-white/5 mb-6 text-xs">
                        <div className="py-2.5 grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] items-baseline">
                          <dt className="text-white/40 uppercase tracking-widest font-bold font-mono">
                            Type
                          </dt>
                          <dd className="text-white font-medium">{project.type}</dd>
                        </div>

                        <div className="py-2.5 grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] items-baseline">
                          <dt className="text-white/40 uppercase tracking-widest font-bold font-mono">
                            Role · Team
                          </dt>
                          <dd className="text-white font-medium">
                            {project.role} · {project.team}
                          </dd>
                        </div>

                        <div className="py-2.5 grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] items-baseline">
                          <dt className="text-white/40 uppercase tracking-widest font-bold font-mono">
                            Duration
                          </dt>
                          <dd className="text-white font-medium">
                            {project.duration}
                          </dd>
                        </div>
                      </dl>

                      {/* Tech Chips */}
                      {project.tech.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-3.5 py-1.5 rounded-full bg-[#2A2A2A] border border-white/5 text-xs font-mono font-medium text-white/80"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Primary CTA Button matching design system */}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn bg-[#FF5C35] hover:bg-[#ff7251] text-white rounded-full flex items-center p-1.5 pr-6 gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(255,92,53,0.2)]"
                      >
                        <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center text-[#FF5C35] group-hover/btn:scale-95 transition-transform duration-300">
                          <GithubIcon className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-sm tracking-wide">
                          View on GitHub
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 text-white/80"
                        />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Footer Link in Dark Panel */}
        <div className="pt-8 text-center">
          <div className="inline-block p-6 sm:p-8 rounded-[24px] bg-[#111111] border border-white/5 shadow-2xl">
            <a
              href="https://github.com/hariprasanna939-hue"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white/80 hover:text-white transition-colors underline underline-offset-8 inline-flex items-center gap-2"
            >
              <span>Explore all open repositories on GitHub · {profile.name}</span>
              <ArrowUpRight size={16} className="text-[#FF5C35]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
