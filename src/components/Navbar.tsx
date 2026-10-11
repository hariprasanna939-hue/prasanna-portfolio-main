import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profile, socials } from '../data/site';
import { scrollToId } from '../lib/lenis';
import { SocialIcon } from './Icons';

// Strict navigation array for About, Work, and Contact only
const customNavLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

const sectionToNav: Record<string, string> = {
  about: 'about',
  passion: 'about',
  Event: 'about',
  event: 'about',
  Bootcamp: 'about',
  bootcamp: 'about',
  hackathon: 'about',
  Hackathon: 'about',
  'sih-25': 'about',
  'israel-india-hackathon-2026': 'about',
  'Israel–India Global Innovators Hackathon 2026': 'about',
  drawing: 'about',
  sports: 'about',
  skills: 'skills',
  work: 'work',
  'case-studies': 'work',
  journey: 'about',
  tools: 'work',
  achievements: 'about',
  contact: 'contact',
};

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll position for minor visual tweaks
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 200) {
        setActiveNav('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for section activation
  useEffect(() => {
    const sectionIds = Object.keys(sectionToNav);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 200) {
            const mapped = sectionToNav[entry.target.id];
            if (mapped) setActiveNav(mapped);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock scroll and handle escape when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add('menu-open');
    } else {
      document.documentElement.classList.remove('menu-open');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.documentElement.classList.remove('menu-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const handleLinkClick = (id: string) => {
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => scrollToId(id), 60);
    } else {
      scrollToId(id);
    }
  };

  return (
    <>
      {/* Floating Unified Pill Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] px-4 sm:px-6 md:px-10 transition-all duration-500 pointer-events-none ${
          scrolled ? 'pt-4' : 'pt-6'
        }`}
      >
        {/* Unified Dark Pill Container */}
        <div className="max-w-[850px] mx-auto pointer-events-auto relative flex items-center justify-between p-2 rounded-full bg-[#111111]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          
          {/* Left: White Logo Circle & Name */}
          <button
            onClick={() => handleLinkClick('top')}
            className="group flex items-center gap-3 focus-visible:outline-none transition-transform hover:scale-[1.02] z-20"
            aria-label="Scroll to top"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white text-black shadow-sm transition-transform group-hover:scale-105">
              <span className="text-[15px] font-bold tracking-tight">
                {profile.logo}
              </span>
            </div>
            {/* Added Name Here */}
            <span className="text-[15px] font-semibold tracking-wide text-white hidden sm:block pr-2">
              Prasanna Hari
            </span>
          </button>

          {/* Center: Absolute Centered White Navigation Links */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 z-10">
            {customNavLinks.map((link) => {
              const isActive = activeNav === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-5 py-2.5 rounded-full text-[14px] transition-all duration-300 outline-none ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-white/70 hover:text-white font-medium hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: White Actions Button & Mobile Toggle */}
          <div className="flex items-center gap-2 z-20">
            <button
              onClick={() => handleLinkClick('contact')}
              className="hidden sm:inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-black text-[14px] font-semibold hover:bg-gray-200 transition-colors duration-300 shadow-sm"
            >
              Hire Me
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="lg:hidden w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Dark Premium Mobile Glass Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[55] lg:hidden">
            {/* Backdrop blur layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />

            {/* Floating Dark Glass Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-4 mt-24 mb-6 p-6 sm:p-8 rounded-[32px] bg-[#111111]/95 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col justify-between max-h-[calc(100svh-7rem)] overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                  <span className="text-xs uppercase font-mono tracking-widest font-bold text-white/50">
                    Navigation
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    {customNavLinks.length} Sections
                  </span>
                </div>

                <ul className="flex flex-col gap-2">
                  {customNavLinks.map((link, idx) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.04 * idx,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <button
                        onClick={() => handleLinkClick(link.id)}
                        className={`w-full text-left py-3 px-4 rounded-2xl transition-all flex items-center justify-between group ${
                          activeNav === link.id
                            ? 'bg-white/10 text-white font-semibold'
                            : 'text-white/60 hover:bg-white/5 hover:text-white font-medium'
                        }`}
                      >
                        <span className="text-xl sm:text-2xl tracking-tight">
                          {link.label}
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-white"
                        />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 pt-8 mt-6 border-t border-white/10">
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full py-4 text-center text-sm font-semibold text-black bg-white rounded-2xl hover:bg-gray-200 transition-colors shadow-lg"
                >
                  Hire Me · Start a Conversation
                </button>

                <div className="flex items-center justify-center gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target={social.id === 'email' ? undefined : '_blank'}
                      rel={social.id === 'email' ? undefined : 'noopener noreferrer'}
                      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-md"
                      aria-label={social.label}
                    >
                      <SocialIcon id={social.id} className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};