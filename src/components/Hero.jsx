import React from 'react';
import { Ticket, Sparkles, MapPin, Zap } from 'lucide-react';

export default function Hero({ onExplore, onSpotlightFinca }) {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden py-12 sm:py-16 bg-metallic-dark">
      
      {/* Background Neon Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff0033]/20 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
          <Zap className="w-4 h-4 text-[#ff0033] animate-pulse" />
          <span>Plataforma Oficial de Boletería & Eventos VIP</span>
        </div>

        {/* 3D Main Title with Mirage (Efecto Espejismo Limpio) */}
        <div className="mirage-container select-none mb-14">
          
          {/* Main 3D Title */}
          <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-none">
            <span className="text-3d-chrome">ECLIPSE </span>
            <span className="text-3d-neon-red">EVENTS</span>
          </h1>

          {/* Mirage Reflection (Espejismo) */}
          <div className="mirage-reflection hidden sm:block" aria-hidden="true">
            <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-none">
              <span className="text-[#cbd5e1]">ECLIPSE </span>
              <span className="text-[#ff0033]">EVENTS</span>
            </h1>
          </div>

        </div>

        {/* CTA Buttons (Under Mirage Reflection with clean clearance) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 z-10">
          <button
            onClick={onExplore}
            className="btn-neon-red px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center gap-3 text-white shadow-[0_0_30px_rgba(255,0,51,0.6)]"
          >
            <Ticket className="w-5 h-5" />
            <span>Explorar Próximo Evento</span>
          </button>

          <button
            onClick={onSpotlightFinca}
            className="btn-silver px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider flex items-center gap-3"
          >
            <MapPin className="w-5 h-5 text-[#ff0033]" />
            <span>Galería Sede Secreta</span>
          </button>
        </div>

        {/* User Quote - Positioned DOWN below buttons to avoid mirage overlap */}
        <div className="max-w-2xl mx-auto mb-10 px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
          <p className="font-heading font-medium text-lg sm:text-xl text-slate-200 tracking-wide italic">
            “Vive la noche. Compra tu entrada. Sé parte del evento.”
          </p>
        </div>

        {/* Live Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl w-full mx-auto pt-6 border-t border-white/10 text-slate-300">
          <div className="flex flex-col items-center">
            <span className="font-heading font-black text-3xl text-white">100%</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Acceso QR Seguro</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading font-black text-3xl text-[#ff0033] drop-shadow-[0_0_10px_rgba(255,0,51,0.5)]">VIP</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Palcos Exclusivos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading font-black text-3xl text-white">5.000+</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Asistentes Felices</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-heading font-black text-3xl text-slate-200">4.9★</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest mt-1">Valoración Fans</span>
          </div>
        </div>

      </div>
    </section>
  );
}
