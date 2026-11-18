import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { HeroAssets, preloadHero } from './lib/heroAssets';
import { startLenis, stopLenis } from './lib/lenis';
import { ScrollTrigger } from './lib/gsap';
import { prefersReducedMotion } from './lib/motion';

import { Cursor } from './components/Cursor';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Marquee } from './components/Marquee';
import { Passion } from './components/Passion';
import { Beyond } from './components/Beyond';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { CaseStudies } from './components/CaseStudies';
import { Journey } from './components/Journey';
import { Tools } from './components/Tools';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [assets, setAssets] = useState<HeroAssets>({
    mode: 'static',
    portrait: null,
    frames: [],
  });

  // 1. Immediately reset scroll position to top (Hero) and start Lenis & background assets
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    document.documentElement.classList.remove('is-loading');

    let lenis: ReturnType<typeof startLenis> | null = null;
    if (!prefersReducedMotion()) {
      lenis = startLenis();
      lenis.scrollTo(0, { immediate: true });
    }

    let unmounted = false;
    preloadHero(() => {}).then((loadedAssets) => {
      if (!unmounted && loadedAssets) {
        setAssets(loadedAssets);
      }
    });

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
      if (window.scrollY === 0 && lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    });

    const handleLoad = () => {
      window.scrollTo(0, 0);
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);
    window.addEventListener('pageshow', handleLoad);

    return () => {
      unmounted = true;
      stopLenis();
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('pageshow', handleLoad);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#top" className="skip-link">
        Skip to content
      </a>

      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero assets={assets} />
        <About />
        <Marquee />
        <Passion />
        <Beyond />
        <Skills />
        <Projects />
        <CaseStudies />
        <Journey />
        <Tools />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
};

export default App;
