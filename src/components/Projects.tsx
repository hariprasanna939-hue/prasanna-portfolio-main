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
    <section id="work" className="py-28 md:py-36 px-6 md:px-12 bg-bg relative">
      <div className="max-w-[1600px] mx-auto">
        <SectionLabel>Selected Work</SectionLabel>
        <MaskText
          text="Featured projects"
          className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold text-fg leading-none mb-20 md:mb-28"
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
                <article className="p-6 sm:p-10 lg:p-12 rounded-3xl glass-panel border border-white/95 shadow-glass-lg relative overflow-hidden group">
                  {/* Atmospheric background light mesh inside project card */}
                  <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#DDEBFF]/35 rounded-full blur-3xl pointer-events-none group-hover:bg-[#DCD8FF]/35 transition-colors duration-700" />

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
                          className="block relative aspect-[4/3] w-full overflow-hidden rounded-2xl glass-card border border-white/90 shadow-glass group/visual"
                        >
                          {/* 01 / 04 Number Pill */}
                          <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full glass-pill border border-white/95 text-xs font-mono font-bold text-accent shadow-xs">
                            0{project.index} / 0{projects.length}
                          </div>

                          {/* Status Pill in Visual */}
                          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full glass-pill border border-white/95 text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
                            <div className="w-full h-full flex items-center justify-center p-8 bg-slate-50/50">
                              <Wireframe kind={project.wire} />
                            </div>
                          )}

                          {/* Soft Specular Inner Border */}
                          <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/60" />
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
                      <div className="inline-flex items-center px-3.5 py-1 rounded-full glass-pill border border-white/90 text-xs font-mono font-bold uppercase tracking-wider text-accent mb-4 shadow-xs">
                        {project.category}
                      </div>

                      <h3 className="text-[clamp(1.85rem,3.8vw,3rem)] font-bold text-fg tracking-tight leading-tight mb-4 transition-transform duration-300 group-hover:translate-x-1">
                        {project.title}
                      </h3>

                      <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
                        {project.summary}
                      </p>

                      {/* Metadata Table in Translucent Glass */}
                      <dl className="w-full p-4 sm:p-5 rounded-2xl glass-card border border-white/90 shadow-xs divide-y divide-line/60 mb-6 text-xs">
                        <div className="py-2 grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] items-baseline">
                          <dt className="text-muted uppercase tracking-wider font-semibold font-mono">
                            Type
                          </dt>
                          <dd className="text-fg font-medium">{project.type}</dd>
                        </div>

                        <div className="py-2 grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] items-baseline">
                          <dt className="text-muted uppercase tracking-wider font-semibold font-mono">
                            Role · Team
                          </dt>
                          <dd className="text-fg font-medium">
                            {project.role} · {project.team}
                          </dd>
                        </div>

                        <div className="py-2 grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] items-baseline">
                          <dt className="text-muted uppercase tracking-wider font-semibold font-mono">
                            Duration
                          </dt>
                          <dd className="text-fg font-medium">
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
                              className="px-3 py-1 rounded-lg glass-pill text-xs font-mono font-medium text-slate-700 border border-white/90 shadow-xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Button */}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost gap-2 text-xs group/btn shadow-xs hover:border-accent hover:text-accent hover:shadow-glass"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>View on GitHub</span>
                        <ArrowUpRight
                          size={15}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"
                        />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Footer Link in Glass Card */}
        <div className="pt-8 text-center">
          <div className="inline-block p-4 sm:p-6 rounded-2xl glass-card border border-white/90 shadow-glass">
            <a
              href="https://github.com/hariprasanna939-hue"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-700 hover:text-accent transition-colors underline underline-offset-8 inline-flex items-center gap-2"
            >
              <span>Explore all open repositories on GitHub · {profile.name}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
