import { useEffect, useState } from 'react';

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0] || null);
  const key = ids.join(',');

  useEffect(() => {
    const elements = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;

    const visible = new Map();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (visible.size > 0) {
          const topId = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
          setActive(topId);
        }
      },
      { threshold: [0.1, 0.25, 0.5], rootMargin: '-15% 0px -55% 0px' }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [key]);

  return active;
}
