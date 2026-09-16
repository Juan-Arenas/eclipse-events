import React, { useState, useRef } from 'react';

export default function Interactive3DTitle() {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth 3D mouse parallax tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotY = (mouseX / (rect.width / 2)) * 18;
    const rotX = -(mouseY / (rect.height / 2)) * 18;

    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;

    setRotate({ x: rotX, y: rotY });
    setLightPos({ x: percentX, y: percentY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setLightPos({ x: 50, y: 50 });
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
      className="relative cursor-pointer select-none py-2 my-2 max-w-5xl mx-auto flex flex-col items-center justify-center overflow-visible"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Rotatable Stage */}
      <div
        className="relative transition-transform duration-200 ease-out flex flex-col items-center justify-center w-full"
        style={{
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)`,
          transformStyle: 'preserve-3d'
        }}
      >

        {/* Ambient Neon Backlight Glow */}
        <div 
          className="absolute inset-0 bg-[#ff0033]/25 blur-[100px] rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.9 : 0.6,
            transform: 'translateZ(-50px)'
          }}
        ></div>

        {/* Dynamic Specular Light Flare */}
        <div
          className="absolute inset-0 pointer-events-none rounded-full transition-opacity duration-300 z-20 mix-blend-screen"
          style={{
            background: `radial-gradient(circle 320px at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 0, 51, 0.15) 50%, transparent 80%)`,
            opacity: isHovered ? 1 : 0.4
          }}
        ></div>

        {/* 1. SEAMLESS EMBEDDED HIGH-RES 3D LOGO */}
        <div className="relative w-full max-w-3xl aspect-[16/9] flex items-center justify-center overflow-hidden rounded-3xl">
          
          <img
            src="/images/eclipse_logo_3d.jpg"
            alt="ECLIPSE EVENTS 3D Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_45px_rgba(255,0,51,0.65)] transition-transform duration-300"
            style={{
              maskImage: 'radial-gradient(ellipse at center, black 65%, transparent 98%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 65%, transparent 98%)',
              filter: 'drop-shadow(0 20px 45px rgba(255, 0, 51, 0.75)) contrast(1.08) brightness(1.05)'
            }}
          />

          {/* Red Spark Overlay Particles */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#07070a] via-transparent to-[#07070a]/40 z-10"></div>
        </div>

        {/* 2. FOREGROUND FLOATING 3D DIAMONDS WITH DEPTH */}
        <div
          className="absolute -left-2 sm:left-4 top-8 w-12 h-12 sm:w-20 sm:h-20 pointer-events-none z-30 animate-bounce"
          style={{
            transform: `translateZ(100px) rotate(${rotate.y * 1.5 - 10}deg)`,
            animationDuration: '3.8s'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_15px_30px_rgba(255,255,255,0.8)]">
            <defs>
              <linearGradient id="diamondGrad3D" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#f1f5f9" />
                <stop offset="65%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            <polygon points="50,5 95,35 50,95 5,35" fill="url(#diamondGrad3D)" stroke="#ffffff" strokeWidth="2.5" />
            <polygon points="50,5 5,35 50,35" fill="#ffffff" opacity="0.8" />
            <polygon points="50,5 95,35 50,35" fill="#e2e8f0" opacity="0.5" />
            <polygon points="50,35 95,35 50,95" fill="#64748b" opacity="0.6" />
          </svg>
        </div>

        <div
          className="absolute -right-2 sm:right-4 bottom-10 w-10 h-10 sm:w-16 sm:h-16 pointer-events-none z-30 animate-bounce"
          style={{
            transform: `translateZ(120px) rotate(${rotate.y * -1.8 + 15}deg)`,
            animationDuration: '4.5s'
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_15px_30px_rgba(255,0,51,0.8)]">
            <polygon points="50,5 95,35 50,95 5,35" fill="url(#diamondGrad3D)" stroke="#ffffff" strokeWidth="2.5" />
            <polygon points="50,5 5,35 50,35" fill="#ffffff" opacity="0.8" />
            <polygon points="50,35 95,35 50,95" fill="#334155" opacity="0.7" />
          </svg>
        </div>

        {/* 3. MIRAGE FLOOR REFLECTION UNDERNEATH */}
        <div 
          className="relative -mt-16 w-full max-w-2xl pointer-events-none opacity-30 filter blur-[2.5px] transform scale-y-[-0.75] overflow-hidden"
          style={{
            transform: 'scaleY(-0.75) translateZ(-40px)',
            maskImage: 'linear-gradient(to bottom, rgba(255, 0, 51, 0.9) 0%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(255, 0, 51, 0.9) 0%, transparent 60%)'
          }}
        >
          <img
            src="/images/eclipse_logo_3d.jpg"
            alt="Reflection"
            className="w-full h-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
}
