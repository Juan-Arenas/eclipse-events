import React, { useState, useEffect, useRef } from 'react';

export default function Interactive3DTitle() {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate smooth max 22deg rotation
    const rotY = (mouseX / (rect.width / 2)) * 22;
    const rotX = -(mouseY / (rect.height / 2)) * 22;

    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer select-none perspective-1000 py-6 my-2"
      style={{ perspective: '1200px' }}
    >
      {/* Interactive 3D Rotatable Stage */}
      <div
        className="relative transition-transform duration-200 ease-out transform-style-3d flex flex-col items-center justify-center"
        style={{
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`,
          transformStyle: 'preserve-3d'
        }}
      >

        {/* 3D Floating Diamond Left */}
        <div
          className="absolute -left-4 sm:-left-12 top-4 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none z-30 animate-bounce"
          style={{
            transform: 'translateZ(90px) rotate(-15deg)',
            animationDuration: '3.5s'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(255,0,51,0.6)]">
            <defs>
              <linearGradient id="diamondGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e2e8f0" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>
            <polygon points="50,5 95,35 50,95 5,35" fill="url(#diamondGrad1)" stroke="#ffffff" strokeWidth="2" />
            <polygon points="50,5 5,35 50,35" fill="#ffffff" opacity="0.6" />
            <polygon points="50,5 95,35 50,35" fill="#cbd5e1" opacity="0.4" />
            <polygon points="50,35 95,35 50,95" fill="#64748b" opacity="0.5" />
          </svg>
        </div>

        {/* 3D Floating Diamond Right */}
        <div
          className="absolute -right-4 sm:-right-12 bottom-6 w-10 h-10 sm:w-14 sm:h-14 pointer-events-none z-30 animate-bounce"
          style={{
            transform: 'translateZ(110px) rotate(20deg)',
            animationDuration: '4.2s'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(255,255,255,0.7)]">
            <polygon points="50,5 95,35 50,95 5,35" fill="url(#diamondGrad1)" stroke="#ffffff" strokeWidth="2" />
            <polygon points="50,5 5,35 50,35" fill="#ffffff" opacity="0.7" />
            <polygon points="50,35 95,35 50,95" fill="#475569" opacity="0.6" />
          </svg>
        </div>

        {/* Glossy Red 3D Extruded Block Text Stack (Matching Reference Image) */}
        <div className="relative font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight uppercase leading-[0.82] text-center">
          
          {/* Top Line: ECLIPSE */}
          <div className="relative inline-block text-3d-glossy-crimson">
            ECLIPSE
          </div>

          <br />

          {/* Bottom Line: EVENTS */}
          <div className="relative inline-block text-3d-glossy-crimson">
            EVENTS
          </div>

        </div>

        {/* Mirage Floor Reflection underneath */}
        <div 
          className="absolute top-[92%] left-0 right-0 pointer-events-none opacity-25 filter blur-[2px] transform scale-y-[-0.85] mask-linear-fade"
          style={{
            transform: 'scaleY(-0.85) translateZ(-40px)',
            maskImage: 'linear-gradient(to bottom, rgba(255, 0, 51, 0.9) 0%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(255, 0, 51, 0.9) 0%, transparent 70%)'
          }}
        >
          <div className="font-heading font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight uppercase leading-[0.82] text-center text-[#ff0033]">
            ECLIPSE <br /> EVENTS
          </div>
        </div>

      </div>
    </div>
  );
}
