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

      // Only shrink and fade out when element's top is scrolling past top of screen (rect.top < -50)
      if (rect.top < -50) {
        const scrollPastTop = Math.abs(rect.top + 50);
        const fadeRatio = Math.min(1, scrollPastTop / (rect.height * 0.8));

        const currentScale = Math.max(0.85, 1 - fadeRatio * 0.15);
        const currentOpacity = Math.max(0.1, 1 - fadeRatio * 1.1);

        setScale(currentScale);
        setOpacity(currentOpacity);
      } else {
        // 100% visible and full scale when inside or entering viewport
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
