import { useEffect } from 'react';

// Publishes the scroll position as --sy (px) on <html> so CSS can build parallax effects.
export function useScrollVars() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      document.documentElement.style.setProperty('--sy', Math.min(window.scrollY, 1200));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
}
