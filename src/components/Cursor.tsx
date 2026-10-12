import React, { useEffect, useRef, useState } from 'react';

type CursorMode = 'default' | 'link' | 'view' | 'explore' | 'hidden';

export const Cursor: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState<string>('');

  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('input, textarea, select')) {
        setMode('hidden');
        setLabel('');
        return;
      }

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const val = cursorTarget.getAttribute('data-cursor');
        if (val === 'view') {
          setMode('view');
          setLabel('VIEW');
          return;
        }
        if (val === 'explore') {
          setMode('explore');
          setLabel('EXPLORE');
          return;
        }
        if (val === 'link') {
          setMode('link');
          setLabel('');
          return;
        }
      }

      if (target.closest('a, button, [role="button"]')) {
        setMode('link');
        setLabel('');
        return;
      }

      setMode('default');
      setLabel('');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // Smooth lerp RAF loop
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.2;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!enabled) return null;

  const isViewOrExplore = mode === 'view' || mode === 'explore';
  const isLink = mode === 'link';
  const isHidden = mode === 'hidden';

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[400] flex items-center justify-center rounded-full select-none transition-[width,height,background-color,border-color,opacity,box-shadow] duration-250 ease-out will-change-transform ${
        isHidden
          ? 'opacity-0 w-0 h-0'
          : isViewOrExplore
          ? 'w-[84px] h-[84px] bg-[#111111]/90 text-[#FF5C35] font-mono border border-white/10 backdrop-blur-md shadow-2xl'
          : isLink
          ? 'w-[42px] h-[42px] border border-[#FF5C35]/50 bg-[#FF5C35]/15 backdrop-blur-xs shadow-[0_0_12px_rgba(255,92,53,0.2)]'
          : 'w-[7px] h-[7px] bg-[#FF5C35] rounded-full shadow-[0_0_8px_rgba(255,92,53,0.8)]'
      }`}
    >
      {isViewOrExplore && (
        <span className="text-[10px] font-bold tracking-widest uppercase">
          {label}
        </span>
      )}
    </div>
  );
};
