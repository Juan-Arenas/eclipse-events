import React from 'react';

export default function Interactive3DTitle() {
  return (
    <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center my-4 select-none overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_60px_rgba(255,0,51,0.25)]">
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-label="ECLIPSE EVENTS 3D Video"
        className="w-full h-auto object-cover rounded-3xl"
      >
        <source src="/Eclipse.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
