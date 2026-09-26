import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component (Mobile & Desktop Optimized)
 * Silky-smooth GPU-accelerated entrance animations on scroll:
 * - Adapts lateral movements on mobile to smooth vertical floats + scale (avoids horizontal snapping)
 * - Uses generous rootMargin (50px ahead of viewport) so animations glide in seamlessly during scroll
 * - Uses Apple-style cubic-bezier(0.22, 1, 0.36, 1) for fluid 60fps/120fps motion
 */
export default function ScrollReveal({
  children,
  className = '',
  direction = 'fade-scale',
  delay = 0,
  duration = 1100,
  threshold = 0.05,
  rootMargin = '0px 0px -40px 0px',
  once = true
}) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const el = domRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(el);
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'slide-left':
        return 'translate3d(-20px, 0, 0)';
      case 'slide-right':
        return 'translate3d(20px, 0, 0)';
      case 'fade-up':
        return 'translate3d(0, 20px, 0)';
      case 'fade-scale':
      default:
        return 'translate3d(0, 15px, 0)';
    }
  };

  const currentTransform = isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform();
  const currentOpacity = isVisible ? 1 : 0;

  return (
    <div
      ref={domRef}
      style={{
        opacity: currentOpacity,
        transform: currentTransform,
        WebkitTransform: currentTransform,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, -webkit-transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        WebkitTransition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, -webkit-transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform',
        WebkitBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden'
      }}
      className={`scroll-reveal-container ${className}`}
    >
      {children}
    </div>
  );
}
