import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

export const startLenis = (): Lenis => {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.15,
    smoothWheel: true,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

export const stopLenis = (): void => {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};

export const getLenis = (): Lenis | null => {
  return lenisInstance;
};

export const scrollToId = (id: string): void => {
  const cleanId = id.startsWith('#') ? id.slice(1) : id;
  const element = document.getElementById(cleanId);
  if (!element) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset: 0, duration: 1.4 });
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
