import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal Component
 * Smooth entrance animations when scrolling down:
 * - 'fade-scale': Soft zoom in with opacity fade
 * - 'slide-left': Enters smoothly from the left with subtle scale
 * - 'slide-right': Enters smoothly from the right with subtle scale
 * - 'fade-up': Rises smoothly from below with subtle scale
 */
export default function ScrollReveal({
  children,
  className = '',
  direction = 'fade-scale',
  delay = 0,
  duration = 750,
  threshold = 0.12,
  once = true
}) {
  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Compute transform according to chosen direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'slide-left':
        return 'translateX(-45px) scale(0.95)';
      case 'slide-right':
        return 'translateX(45px) scale(0.95)';
      case 'fade-up':
        return 'translateY(35px) scale(0.96)';
      case 'fade-scale':
      default:
        return 'scale(0.92)';
    }
  };

  const currentTransform = isVisible ? 'translate(0, 0) scale(1)' : getInitialTransform();
  const currentOpacity = isVisible ? 1 : 0;

  return (
    <div
      ref={domRef}
      style={{
        opacity: currentOpacity,
        transform: currentTransform,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, transform'
      }}
      className={`scroll-reveal-container ${className}`}
    >
      {children}
    </div>
  );
}
