import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '' }) {
  const domRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const el = domRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      // Start fading gently when top passes -80px, but keep opacity high (min 0.75) so it never disappears
      if (rect.top < -80) {
        const scrollPastThreshold = Math.abs(rect.top + 80);
        const fadeDistance = rect.height;
        const fadeRatio = Math.min(1, scrollPastThreshold / fadeDistance);

        const currentScale = Math.max(0.95, 1 - fadeRatio * 0.05);
        const currentOpacity = Math.max(0.75, 1 - fadeRatio * 0.25);

        setScale(currentScale);
        setOpacity(currentOpacity);
      } else {
        // 100% visible and full scale when inside viewport
        setScale(1);
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        opacity: opacity,
        transform: `scale(${scale})`,
        transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
        willChange: 'transform, opacity'
      }}
      className={`scroll-reveal ${className}`}
    >
      {children}
    </div>
  );
}
