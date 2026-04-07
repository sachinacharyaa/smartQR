import { useEffect, useRef, useState } from 'react';

const logos = [
  'Greenpeace',
  'Hilton',
  'McDonalds',
  'RedBull',
  'Atlas Copco',
  'Toyota',
  'Cisco',
  'Coca-Cola',
  'Walmart'
];

export default function TrustedBy({ onOpenStories }) {
  const [items, setItems] = useState(logos);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
      if (trackRef.current) trackRef.current.style.transform = 'translateX(0px)';
      return undefined;
    }

    const speed = 24; // px per second

    const step = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      offsetRef.current -= (speed * delta) / 1000;

      const track = trackRef.current;
      const first = track?.querySelector('.trusted__logo');
      if (track && first) {
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || '0');
        const width = first.getBoundingClientRect().width + gap;

        while (offsetRef.current <= -width) {
          offsetRef.current += width;
          setItems((prev) => {
            const [head, ...rest] = prev;
            return [...rest, head];
          });
        }

        track.style.transform = `translateX(${offsetRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="trusted">
      <div className="trusted__header">
        <p className="trusted__title">Trusted by 1,000+ teams globally</p>
        <button className="btn btn--alt trusted__cta" onClick={onOpenStories}>Read customer success stories</button>
      </div>
      <div className="trusted__logos" aria-label="Trusted by">
        <div className="trusted__logos-track" ref={trackRef}>
          {items.map((logo) => (
            <span className="trusted__logo" key={logo}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
