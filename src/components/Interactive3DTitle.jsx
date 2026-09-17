import React, { useRef, useEffect } from 'react';

export default function Interactive3DTitle() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {
        // Autoplay may be deferred until user interaction
      });
    }
  }, []);

  return (
    <div className="relative w-full max-w-3xl sm:max-w-4xl mx-auto flex items-center justify-center my-3 select-none overflow-hidden rounded-2xl bg-black border border-[#ff0033]/40 shadow-[0_0_45px_rgba(255,0,51,0.35)]">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="ECLIPSE EVENTS 3D Video"
        className="w-full h-auto object-contain rounded-2xl max-h-[50vh] sm:max-h-[60vh]"
      >
        <source src="/Eclipse.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
