/**
 * Hero Section Configuration
 *
 * This configuration supports a 360° scroll-turntable frame sequence
 * with an automatic fallback to a high-fidelity static 3D tilt portrait
 * if frames are missing, slow to load, or if reduced-motion is requested.
 */

export const HERO = {
  portrait: '/images/portrait.webp',
  background: '/images/hero-bg.webp',
  frames: {
    dir: '/hero-frames',
    prefix: 'frame_',
    ext: 'webp',
    digits: 4,
  },
  mobileFrameStep: 2,
  scrollScreens: {
    desktop: 4,
    mobile: 3,
  },
  loadTimeoutMs: 15000,
} as const;

/**
 * Builds the URL for frame index n (1-indexed).
 * Example: frameUrl(1) -> '/hero-frames/frame_0001.webp'
 */
export const frameUrl = (n: number): string => {
  const padded = String(n).padStart(HERO.frames.digits, '0');
  return `${HERO.frames.dir}/${HERO.frames.prefix}${padded}.${HERO.frames.ext}`;
};
