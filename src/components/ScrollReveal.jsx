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

      // Only shrink and fade out when more than 40% of element has scrolled off the top of screen
      const startThreshold = -(rect.height * 0.4);

      if (rect.top < startThreshold) {
        const scrollPastThreshold = Math.abs(rect.top - startThreshold);
        const fadeDistance = rect.height * 0.6;
        const fadeRatio = Math.min(1, scrollPastThreshold / fadeDistance);

        const currentScale = Math.max(0.92, 1 - fadeRatio * 0.08);
        const currentOpacity = Math.max(0.35, 1 - fadeRatio * 0.65);

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
