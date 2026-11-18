import React, { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  bootcampDescription,
  bootcampItems,
  eventDescription,
  eventItems,
  hackathonDescription,
  hackathonItems,
  israelIndiaHackathonDescription,
  israelIndiaHackathonItems,
  MediaItem,
  sih25Description,
  sih25Items,
} from '../data/site';

export type Activity = {
  id: string;
  eyebrow: string;
  title: string;
  code: string;
  description: string;
  items: MediaItem[];
};

export const activities: Activity[] = [
  {
    id: 'event',
    eyebrow: 'Startup event',
    title: 'FounderX Global\nStartup Summit',
    code: 'FX/26',
    description: eventDescription,
    items: eventItems,
  },
  {
    id: 'bootcamp',
    eyebrow: 'Innovation & entrepreneurship',
    title: 'IDE\nBootcamp',
    code: 'IDE/26',
    description: bootcampDescription,
    items: bootcampItems,
  },
  {
    id: 'hackathon',
    eyebrow: 'Smart India Hackathon',
    title: 'Belt Forge\nHackathon',
    code: 'SIH/26',
    description: hackathonDescription,
    items: hackathonItems,
  },
  {
    id: 'sih-25',
    eyebrow: 'Smart India Hackathon',
    title: 'Crypto Core\nBest Team',
    code: 'SIH/25',
    description: sih25Description,
    items: sih25Items,
  },
  {
    id: 'israel-india-hackathon-2026',
    eyebrow: 'Global innovators',
    title: 'Israel–India\nHackathon',
    code: 'GIIH/26',
    description: israelIndiaHackathonDescription,
    items: israelIndiaHackathonItems,
  },
];

const activitySummary = (description: string) => {
  const copy = description
    .replace(/\*\*/g, '')
    .replace(/^[^\n]*:\s*/, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return copy.length > 210 ? `${copy.slice(0, 207).trimEnd()}…` : copy;
};

const GalleryGrid: React.FC<{
  activity: Activity;
  onOpen: (index: number) => void;
}> = ({ activity, onOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => setActiveIndex(0), [activity.id]);

  return (
    <div
      className="beyond-editorial-grid"
      aria-label={`${activity.title.replace('\n', ' ')} photo gallery (${activity.items.length} photos)`}
    >
      {activity.items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <motion.button
            type="button"
            key={`${activity.id}-${index}-${item.src}`}
            className="beyond-editorial-tile"
            onMouseEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => onOpen(index)}
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.45,
              delay: reducedMotion ? 0 : Math.min(index * 0.05, 0.35),
              ease: [0.22, 1, 0.36, 1],
            }}
            aria-label={`Open photo ${index + 1} of ${activity.items.length}: ${item.alt}`}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            <motion.span
              className="beyond-editorial-wash"
              animate={{ opacity: isActive ? 0 : 0.65 }}
              transition={{ duration: 0.25 }}
            />
            <span className="beyond-editorial-count">
              {String(index + 1).padStart(2, '0')} / {String(activity.items.length).padStart(2, '0')}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export const Beyond: React.FC = () => {
  const [selected, setSelected] = useState<{ activity: Activity; index: number } | null>(null);
  const dialogTitleId = useId();

  useEffect(() => {
    if (!selected) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null);
      } else if (event.key === 'ArrowLeft') {
        setSelected((curr) => {
          if (!curr) return null;
          const prevIndex = (curr.index - 1 + curr.activity.items.length) % curr.activity.items.length;
          return { activity: curr.activity, index: prevIndex };
        });
      } else if (event.key === 'ArrowRight') {
        setSelected((curr) => {
          if (!curr) return null;
          const nextIndex = (curr.index + 1) % curr.activity.items.length;
          return { activity: curr.activity, index: nextIndex };
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  const activeItem = selected ? selected.activity.items[selected.index] : null;

  return (
    <section id="activities" className="beyond-editorial" aria-label="Past activities">
      <div className="beyond-editorial-rail" aria-hidden="true">
        <span>PAST ACTIVITIES</span>
        <span>SELECTED ARCHIVE</span>
      </div>

      {activities.map((activity, index) => (
        <article className="beyond-editorial-story" id={activity.id} key={activity.id}>
          <div className="beyond-editorial-copy">
            <div className="beyond-editorial-topline">
              <span>{activity.eyebrow}</span>
              <span>{activity.code}</span>
            </div>
            <h2>
              {activity.title.split('\n').map((line) => (
                <React.Fragment key={line}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>
            <p>{activitySummary(activity.description)}</p>
            <div className="beyond-editorial-actions">
              <button
                className="beyond-editorial-link"
                type="button"
                onClick={() => setSelected({ activity, index: 0 })}
              >
                Browse gallery <span aria-hidden="true">↗</span>
              </button>
              <span className="beyond-editorial-badge">
                {activity.items.length} {activity.items.length === 1 ? 'photo' : 'photos'}
              </span>
            </div>
            <div className="beyond-editorial-footer">
              <span>
                {String(index + 1).padStart(2, '0')} / {String(activities.length).padStart(2, '0')}
              </span>
              <span>{activity.items.length} Photos</span>
            </div>
          </div>
          <GalleryGrid
            activity={activity}
            onOpen={(photoIndex) => setSelected({ activity, index: photoIndex })}
          />
        </article>
      ))}

      <AnimatePresence>
        {selected && activeItem && (
          <motion.div
            className="beyond-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="beyond-lightbox-backdrop"
              aria-label="Close image preview"
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="beyond-lightbox-content"
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Header */}
              <div className="beyond-lightbox-header">
                <div className="beyond-lightbox-meta">
                  <span className="beyond-lightbox-eyebrow">{selected.activity.eyebrow}</span>
                  <span className="beyond-lightbox-divider">/</span>
                  <span className="beyond-lightbox-code">{selected.activity.code}</span>
                </div>
                <div className="beyond-lightbox-header-right">
                  <span className="beyond-lightbox-counter">
                    {String(selected.index + 1).padStart(2, '0')} /{' '}
                    {String(selected.activity.items.length).padStart(2, '0')}
                  </span>
                  <button
                    className="beyond-lightbox-close"
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label="Close image preview"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Main Image View with Prev/Next buttons */}
              <div className="beyond-lightbox-body">
                {selected.activity.items.length > 1 && (
                  <button
                    type="button"
                    className="beyond-lightbox-nav beyond-lightbox-prev"
                    onClick={() =>
                      setSelected({
                        activity: selected.activity,
                        index:
                          (selected.index - 1 + selected.activity.items.length) %
                          selected.activity.items.length,
                      })
                    }
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                )}

                <motion.img
                  key={activeItem.src}
                  src={activeItem.src}
                  alt={activeItem.alt}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18 }}
                />

                {selected.activity.items.length > 1 && (
                  <button
                    type="button"
                    className="beyond-lightbox-nav beyond-lightbox-next"
                    onClick={() =>
                      setSelected({
                        activity: selected.activity,
                        index: (selected.index + 1) % selected.activity.items.length,
                      })
                    }
                    aria-label="Next image"
                  >
                    ›
                  </button>
                )}
              </div>

              {/* Footer info & thumbnails */}
              <div className="beyond-lightbox-footer">
                <h3 id={dialogTitleId} className="beyond-lightbox-caption">
                  {activeItem.alt}
                </h3>

                {/* Thumbnails Filmstrip */}
                {selected.activity.items.length > 1 && (
                  <div className="beyond-lightbox-thumbs" aria-label="Image thumbnails">
                    {selected.activity.items.map((item, idx) => (
                      <button
                        type="button"
                        key={`${item.src}-${idx}`}
                        className={`beyond-lightbox-thumb ${idx === selected.index ? 'is-active' : ''}`}
                        onClick={() => setSelected({ activity: selected.activity, index: idx })}
                        aria-label={`Go to photo ${idx + 1}`}
                      >
                        <img src={item.src} alt="" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
