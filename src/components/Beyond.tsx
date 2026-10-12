import React, { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  bootcampDescription, bootcampItems, eventDescription, eventItems, hackathonDescription, hackathonItems,
  israelIndiaHackathonDescription, israelIndiaHackathonItems, MediaItem, sih25Description, sih25Items,
} from '../data/site';

type Activity = { id: string; eyebrow: string; title: string; code: string; description: string; items: MediaItem[] };

const activities: Activity[] = [
  { id: 'event', eyebrow: 'Startup event', title: 'FounderX Global\nStartup Summit', code: 'FX/26', description: eventDescription, items: eventItems },
  { id: 'bootcamp', eyebrow: 'Innovation & entrepreneurship', title: 'IDE\nBootcamp', code: 'IDE/26', description: bootcampDescription, items: bootcampItems },
  { id: 'hackathon', eyebrow: 'Smart India Hackathon', title: 'Belt Forge\nHackathon', code: 'SIH/26', description: hackathonDescription, items: hackathonItems },
  { id: 'sih-25', eyebrow: 'Smart India Hackathon', title: 'Crypto Core\nBest Team', code: 'SIH/25', description: sih25Description, items: sih25Items },
  { id: 'israel-india-hackathon-2026', eyebrow: 'Global innovators', title: 'Israel–India\nHackathon', code: 'GIIH/26', description: israelIndiaHackathonDescription, items: israelIndiaHackathonItems },
];

const activitySummary = (description: string) => {
  const copy = description.replace(/\*\*/g, '').replace(/^[^\n]*:\s*/, '').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
  return copy.length > 210 ? `${copy.slice(0, 207).trimEnd()}…` : copy;
};

const GalleryGrid: React.FC<{ activity: Activity; onOpen: (item: MediaItem) => void }> = ({ activity, onOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const visibleItems = activity.items.slice(0, 4);
  const galleryItems = visibleItems.length > 1 ? visibleItems : [...visibleItems, ...visibleItems];

  useEffect(() => setActiveIndex(0), [activity.id]);

  return <div className="beyond-editorial-grid" aria-label={`${activity.title.replace('\n', ' ')} photo gallery`}>
    {galleryItems.map((item, index) => {
      const isActive = index === activeIndex;
      return <motion.button type="button" key={`${activity.id}-${index}-${item.src}`} className="beyond-editorial-tile"
        onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => onOpen(item)}
        initial={reducedMotion ? false : { opacity: 0, y: 18 }} whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: reducedMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        aria-label={`Open image ${index + 1}: ${item.alt}`}>
        <img src={item.src} alt={item.alt} loading="lazy" />
        <motion.span className="beyond-editorial-wash" animate={{ opacity: isActive ? 0 : 0.78 }} transition={{ duration: 0.35 }} />
        <span className="beyond-editorial-count">{String(index + 1).padStart(2, '0')}</span>
      </motion.button>;
    })}
  </div>;
};

export const Beyond: React.FC = () => {
  const [selected, setSelected] = useState<{ item: MediaItem; activity: Activity } | null>(null);
  const dialogTitleId = useId();

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [selected]);

  return <section id="activities" className="beyond-editorial" aria-label="Past activities">
    <div className="beyond-editorial-rail" aria-hidden="true"><span>PAST ACTIVITIES</span><span>SELECTED WORK</span></div>
    {activities.map((activity, index) => <article className="beyond-editorial-story" id={activity.id} key={activity.id}>
      <div className="beyond-editorial-copy">
        <div className="beyond-editorial-topline"><span>{activity.eyebrow}</span><span>{activity.code}</span></div>
        <h2>{activity.title.split('\n').map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</h2>
        <p>{activitySummary(activity.description)}</p>
        <button className="beyond-editorial-link" type="button" onClick={() => setSelected({ item: activity.items[0], activity })}>View activity <span aria-hidden="true">↗</span></button>
        <div className="beyond-editorial-footer"><span>{String(index + 1).padStart(2, '0')} / {String(activities.length).padStart(2, '0')}</span><span>Archive</span></div>
      </div>
      <GalleryGrid activity={activity} onOpen={(item) => setSelected({ item, activity })} />
    </article>)}
    <AnimatePresence>{selected && <motion.div className="beyond-lightbox" role="dialog" aria-modal="true" aria-labelledby={dialogTitleId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="beyond-lightbox-backdrop" aria-label="Close image preview" onClick={() => setSelected(null)} />
      <motion.div className="beyond-lightbox-content" initial={{ scale: 0.97, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, y: 16 }} transition={{ duration: 0.28 }}>
        <button className="beyond-lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close image preview">×</button>
        <img src={selected.item.src} alt={selected.item.alt} /><div><p>{selected.activity.eyebrow}</p><h3 id={dialogTitleId}>{selected.item.alt}</h3></div>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </section>;
};
