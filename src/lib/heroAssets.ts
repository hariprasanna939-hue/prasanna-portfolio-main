import { HERO, frameUrl } from '../config/hero';
import { prefersReducedMotion, isMobileViewport } from './motion';

export interface HeroAssets {
  mode: 'static' | 'sequence';
  portrait: HTMLImageElement | null;
  frames: HTMLImageElement[];
}

export const loadImage = (src: string): Promise<HTMLImageElement | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const readFrameCount = async (): Promise<number | null> => {
  try {
    const response = await fetch(`${HERO.frames.dir}/manifest.json`, {
      cache: 'no-cache',
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (typeof data.count === 'number' && data.count > 1) {
      return data.count;
    }
    return null;
  } catch {
    return null;
  }
};

export const preloadHero = async (
  onProgress: (p: number) => void
): Promise<HeroAssets> => {
  onProgress(0.05);

  const [portrait] = await Promise.all([
    loadImage(HERO.portrait),
    loadImage(HERO.background),
  ]);

  onProgress(0.25);

  const staticFallback: HeroAssets = {
    mode: 'static',
    portrait,
    frames: [],
  };

  if (prefersReducedMotion()) {
    onProgress(1);
    return staticFallback;
  }

  const frameCount = await readFrameCount();
  if (!frameCount) {
    onProgress(1);
    return staticFallback;
  }

  // Build frame indices (step by HERO.mobileFrameStep on mobile, include last frame)
  const isMobile = isMobileViewport();
  const step = isMobile ? HERO.mobileFrameStep : 1;
  const indices: number[] = [];

  for (let i = 1; i <= frameCount; i += step) {
    indices.push(i);
  }
  if (indices[indices.length - 1] !== frameCount) {
    indices.push(frameCount);
  }

  const total = indices.length;
  let loaded = 0;

  const framePromises = indices.map(async (i) => {
    const img = await loadImage(frameUrl(i));
    loaded++;
    onProgress(0.25 + 0.75 * (loaded / total));
    return img;
  });

  const timeoutPromise = new Promise<'timeout'>((resolve) =>
    setTimeout(() => resolve('timeout'), HERO.loadTimeoutMs)
  );

  const result = await Promise.race([
    Promise.all(framePromises),
    timeoutPromise,
  ]);

  if (result === 'timeout') {
    onProgress(1);
    return staticFallback;
  }

  const frames = result as (HTMLImageElement | null)[];
  if (frames.some((f) => f === null)) {
    onProgress(1);
    return staticFallback;
  }

  onProgress(1);
  return {
    mode: 'sequence',
    portrait,
    frames: frames as HTMLImageElement[],
  };
};
