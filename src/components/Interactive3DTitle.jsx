import React from 'react';

export default function Interactive3DTitle() {
  return (
    <div className="relative w-full max-w-3xl sm:max-w-4xl mx-auto flex items-center justify-center my-3 select-none overflow-hidden rounded-2xl bg-black border border-[#ff0033]/40 shadow-[0_0_45px_rgba(255,0,51,0.35)]">
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-label="ECLIPSE EVENTS 3D Video"
        className="w-full h-auto object-contain rounded-2xl max-h-[50vh] sm:max-h-[60vh]"
      >
        <source src="/Eclipse.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
