import React from 'react';
import { Ticket, Sparkles, MapPin, Zap } from 'lucide-react';
import Interactive3DTitle from './Interactive3DTitle';

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

        {/* Interactive 3D Main Title (Matching Reference Image) */}
        <div className="mb-8 w-full">
          <Interactive3DTitle />
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
            onClick={onExplore}
            className="btn-silver px-8 py-4 rounded-2xl text-sm font-bold uppercase tracking-wider flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 text-[#ff0033]" />
            <span>Ver Boletas & Precios</span>
          </button>
        </div>

        {/* User Quote / Slogan */}
        <div className="max-w-2xl mx-auto mb-10 px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
          <p className="font-heading font-black text-xl sm:text-2xl text-white tracking-widest uppercase">
            Entradas Limitadas
          </p>
        </div>

        {/* Live Rating / Reviews Bar */}
        <div className="flex justify-center max-w-md w-full mx-auto pt-6 border-t border-white/10 text-slate-300">
          <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
            <span className="font-heading font-black text-3xl text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">4.9★</span>
            <div className="text-left">
              <span className="text-xs font-black text-white uppercase tracking-wider block">VALORACIÓN FANS</span>
              <span className="text-[10px] text-slate-400 font-mono block">Reseñas y experiencia 100% positiva</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
