import React from 'react';
import { Calendar, Clock, MapPin, Ticket, Sparkles, Lock, Music, Zap, Image as ImageIcon, Flame, Tag, CheckCircle2, ShieldCheck } from 'lucide-react';
import { FINCA_PHOTOS } from '../data/initialData';

export default function EventBillboard({ monthlyEvent, onSelectEvent, onOpenGallery, isDemoZeroMode }) {
  if (!monthlyEvent) return null;

  return (
    <section id="cartelera-eventos" className="py-8 bg-metallic-dark relative border-t border-white/10">
      
      {/* Background Red Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#ff0033]/15 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Event Showcase & Direct Ticket Purchase Card (BUYING FIRST AS REQUESTED) */}
        <div className="bg-metallic-card rounded-[36px] border-2 border-white/15 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
          
          {/* Column 1: Poster & Integrated Venue Photo Thumbnails (Lg: 6 cols) */}
          <div className="lg:col-span-6 relative flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-b from-[#141422] to-[#0a0a0f]">
            
            {/* Poster Header */}
            <div className="relative h-80 rounded-3xl overflow-hidden border border-white/15 shadow-xl mb-4 group">
              <img
                src={monthlyEvent.image}
                alt={monthlyEvent.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16] via-transparent to-black/40"></div>

              {/* Promo Stock Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#ff0033] text-white text-xs font-black uppercase tracking-wider shadow-[0_0_12px_rgba(255,0,51,0.7)] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 animate-pulse" /> OFERTA 20 COMPRADORES
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase">
                {monthlyEvent.category}
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] text-[#ff0033] font-mono font-bold uppercase tracking-widest block">
                  Ubicación en tu Entrada Digital
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase leading-none">
                  {monthlyEvent.title}
                </h3>
              </div>
            </div>

            {/* LOCKED GALLERY & LOCATION NOTICE (Visible only on ticket pass) */}
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#ff0033]" /> Galería Reales de la Sede
                </span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> EN TU BOLETA DIGITAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Para mantener la privacidad y confidencialidad del evento, la galería de fotos reales de las instalaciones y la ubicación GPS se activan únicamente en tu boleta digital tras confirmar tu entrada.
              </p>
            </div>

          </div>

          {/* Column 2: Event Details, Pricing & Direct Ticket Purchase (Lg: 6 cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#12121a] to-[#0a0a0f] border-t lg:border-t-0 lg:border-l border-white/10">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#ff0033]" /> {monthlyEvent.formattedDate}
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-xs font-bold uppercase">
                  +18 Años Obligatorio
                </span>
              </div>

              {/* EARLY BIRD PROMO DISCOUNT BADGES */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ff0033]/20 via-black/60 to-[#ff0033]/10 border border-[#ff0033]/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#ff0033] animate-bounce" /> PROMO DE PRUEBAS WOMPI $1 COP
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 font-bold">
                    Quedan 14/20 cupos
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  {/* GENERAL */}
                  <div className="bg-black/60 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-slate-400 block font-bold">BOLETA GENERAL</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="line-through text-slate-500 text-[11px]">$25.000</span>
                      <span className="font-heading font-black text-emerald-400 text-sm">
                        {isDemoZeroMode ? "$0 COP (DEMO)" : "$1 COP"}
                      </span>
                    </div>
                  </div>

                  {/* VIP */}
                  <div className="bg-black/60 p-2.5 rounded-xl border border-[#ff0033]/30">
                    <span className="text-[10px] text-[#ff0033] block font-bold">BOLETA VIP (+1 Cóctel)</span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="line-through text-slate-500 text-[11px]">$28.000</span>
                      <span className="font-heading font-black text-emerald-400 text-sm">
                        {isDemoZeroMode ? "$0 COP (DEMO)" : "$1 COP"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lineup */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest block mb-1.5">
                  ARTISTAS / LINEUP OFICIAL
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {monthlyEvent.lineup && monthlyEvent.lineup.map((artist, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Music className="w-3 h-3 text-[#ff0033]" />
                      {artist}
                    </span>
                  ))}
                </div>
              </div>

              {/* LOCATION TEASER */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff0033]" /> Ubicación del Evento (En Tu Boleta)
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> INFORMACIÓN EN TU ENTRADA
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  La dirección exacta y ubicación en GPS se activan en tu boleta digital tras recibir tu entrada.
                </p>
              </div>

            </div>

            {/* DIRECT BUY BUTTON FIRST */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <button
                onClick={onSelectEvent}
                className="w-full btn-neon-red py-4 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,0,51,0.6)]"
              >
                <Ticket className="w-5 h-5" />
                <span>COMPRAR BOLETAS / RESERVAR AHORA</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Boletería Segura con Asignación de Silla & QR</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
