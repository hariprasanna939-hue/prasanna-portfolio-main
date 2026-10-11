import React, { useState, useEffect } from 'react';
import { MotionConfig, AnimatePresence } from 'framer-motion';
import { HeroAssets, preloadHero } from './lib/heroAssets';
import { startLenis, stopLenis } from './lib/lenis';
import { ScrollTrigger } from './lib/gsap';
import { prefersReducedMotion } from './lib/motion';

import { Loader } from './components/Loader';
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
  const [assets, setAssets] = useState<HeroAssets | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  // 1. Preload Hero Assets and pipe progress
  useEffect(() => {
    let unmounted = false;
    preloadHero((p) => {
      if (!unmounted) setProgress(p);
    }).then((loadedAssets) => {
      if (!unmounted) {
        setAssets(loadedAssets);
      }
    });

    return () => {
      unmounted = true;
    };
  }, []);

  // 2. Start Lenis once assets exist and motion is allowed
  useEffect(() => {
    if (!assets) return;

    if (!prefersReducedMotion()) {
      startLenis();
    }

    return () => {
      stopLenis();
    };
  }, [assets]);

  // 3. Refresh ScrollTrigger when fonts and window finish loading
  useEffect(() => {
    if (!assets) return;

    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [assets]);

  const handleLoaderFinish = () => {
    setShowLoader(false);
  };

  const handleLoaderExitComplete = () => {
    document.documentElement.classList.remove('is-loading');
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  };

  return (
    <MotionConfig reducedMotion="user">
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <AnimatePresence onExitComplete={handleLoaderExitComplete}>
        {showLoader && (
          <Loader
            progress={progress}
            ready={assets !== null}
            onFinish={handleLoaderFinish}
          />
        )}
      </AnimatePresence>

      {assets && (
        <>
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
        </>
      )}
    </MotionConfig>
  );
};

export default App;
