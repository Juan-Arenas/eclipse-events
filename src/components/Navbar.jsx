import React, { useState, useRef } from 'react';
import { Sparkles, Ticket, QrCode, MapPin, Calendar } from 'lucide-react';

export default function Navbar({ 
  onNavigate, 
  activeSection, 
  ticketCount, 
  openTicketsModal, 
  openQRModal,
  onTriggerSecretAuth
}) {
  const [starClicks, setStarClicks] = useState(0);
  const clickTimerRef = useRef(null);

  const handleStarClick = () => {
    const newCount = starClicks + 1;
    setStarClicks(newCount);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (newCount === 3) {
      setStarClicks(0);
      onTriggerSecretAuth();
    } else {
      clickTimerRef.current = setTimeout(() => {
        setStarClicks(0);
      }, 1500);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08080c]/90 border-b border-white/10 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand with Secret 3-Click Star */}
          <div className="flex items-center gap-3">
            <div 
              onClick={handleStarClick}
              title="Eclipse Events VIP"
              className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#ff0033] via-[#ff3355] to-slate-200 p-[2px] shadow-[0_0_20px_rgba(255,0,51,0.5)] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <div className="w-full h-full bg-[#08080c] rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-radial from-red-600/30 to-transparent animate-pulse"></div>
                <Sparkles className={`w-5 h-5 text-[#ff0033] transition-transform ${starClicks > 0 ? 'scale-125 rotate-45' : 'group-hover:scale-110'}`} />
              </div>

              {/* Secret click feedback counter */}
              {starClicks > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff0033] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-ping">
                  {starClicks}
                </span>
              )}
            </div>

            <div 
              onClick={() => onNavigate('hero')}
              className="flex flex-col cursor-pointer"
            >
              <span className="font-heading font-black text-2xl tracking-wider text-white flex items-center gap-1.5">
                ECLIPSE <span className="text-[#ff0033] drop-shadow-[0_0_12px_rgba(255,0,51,0.7)]">EVENTS</span>
              </span>
              <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-semibold">
                VIP Nightlife & Ticketing
              </span>
            </div>
          </div>

          {/* Center Public Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            <button
              onClick={() => onNavigate('cartelera')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all ${
                activeSection === 'cartelera' 
                  ? 'bg-[#ff0033] text-white shadow-[0_0_15px_rgba(255,0,51,0.5)]' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#ff0033]" /> Próximo Evento del Mes
              </span>
            </button>

            <button
              onClick={() => onNavigate('finca')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all ${
                activeSection === 'finca' 
                  ? 'bg-[#ff0033] text-white shadow-[0_0_15px_rgba(255,0,51,0.5)]' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Galería Finca
              </span>
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Mis Entradas */}
            <button
              onClick={openTicketsModal}
              className="btn-neon-red px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 relative shadow-lg"
            >
              <Ticket className="w-4 h-4" />
              <span>Mis Entradas</span>
              {ticketCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-[#ff0033] font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-[#08080c]">
                  {ticketCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
