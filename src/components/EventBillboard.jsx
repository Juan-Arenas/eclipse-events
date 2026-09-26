import React from 'react';
import { Calendar, Clock, MapPin, Ticket, Sparkles, Lock, Music, Zap, Image as ImageIcon, Flame, Tag, CheckCircle2, ShieldCheck, Users } from 'lucide-react';
import { FINCA_PHOTOS } from '../data/initialData';
import ScrollReveal from './ScrollReveal';

export default function EventBillboard({ monthlyEvent, onSelectEvent, onOpenGallery, isDemoZeroMode }) {
  if (!monthlyEvent) return null;

  return (
    <section id="cartelera-eventos" className="py-8 bg-metallic-dark relative border-t border-white/10">
      
      {/* Background Red Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#ff0033]/15 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Event Showcase & Direct Ticket Purchase Card (BUYING FIRST AS REQUESTED) */}
        <div className="bg-metallic-card rounded-[36px] border-2 border-white/15 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
          
          {/* Column 1: Poster Showcase (Lg: 6 cols) - Slide In from Left */}
          <ScrollReveal direction="slide-left" duration={1100} once={false} className="lg:col-span-6 h-full">
            <div className="relative flex flex-col justify-center p-6 sm:p-8 bg-gradient-to-b from-[#141422] to-[#0a0a0f] h-full">
            
            {/* Poster Header */}
            <div className="relative h-80 sm:h-full min-h-[340px] rounded-3xl overflow-hidden border border-white/15 shadow-xl group">
              <img
                src={monthlyEvent.image}
                alt={monthlyEvent.title}
                loading="lazy"
                className="w-full h-full object-cover transform-gpu md:group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16]/40 via-transparent to-black/30"></div>

              {/* Promo Stock Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#ff0033] text-white text-xs font-black uppercase tracking-wider shadow-[0_0_12px_rgba(255,0,51,0.7)] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 animate-pulse" /> OFERTA 20 COMPRADORES
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase">
                {monthlyEvent.category}
              </div>
            </div>

            </div>
          </ScrollReveal>

          {/* Column 2: Event Details, Pricing & Direct Ticket Purchase (Lg: 6 cols) - Slide In from Right */}
          <ScrollReveal direction="slide-right" duration={1100} delay={120} once={false} className="lg:col-span-6 h-full">
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#12121a] to-[#0a0a0f] border-t lg:border-t-0 lg:border-l border-white/10 h-full">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                <span className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#ff0033]" /> {monthlyEvent.formattedDate}
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-bold uppercase">
                  +18 Años
                </span>
              </div>

              {/* TICKETS INFO */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 via-black/60 to-purple-500/10 border border-purple-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-purple-400" /> TICKETS OFICIALES
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                  {/* NORMAL */}
                  <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                    <Ticket className="w-4 h-4 text-slate-300 mb-1" />
                    <span className="text-[10px] text-slate-400 block font-bold">ENTRADA NORMAL</span>
                  </div>

                  {/* VIP */}
                  <div className="bg-black/60 p-2.5 rounded-xl border border-[#ff0033]/30 flex flex-col items-center text-center">
                    <Zap className="w-4 h-4 text-[#ff0033] mb-1" />
                    <span className="text-[10px] text-[#ff0033] block font-bold">ENTRADA VIP</span>
                  </div>

                  {/* 2X1 MUJERES */}
                  <div className="bg-black/60 p-2.5 rounded-xl border border-pink-500/30 flex flex-col items-center text-center">
                    <Users className="w-4 h-4 text-pink-400 mb-1" />
                    <span className="text-[10px] text-pink-400 block font-bold">2x1 MUJERES</span>
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

              {/* LOCATION */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff0033]" /> Finca Mi Terrenito
                  </span>
                </div>
                <a href="https://www.google.com/maps/place/Finca+Mi+Terrenito/@4.9158519,-75.6294989,756m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e477f0030099ba3:0x4518ed58d1ca7593!8m2!3d4.9158519!4d-75.626924!16s%2Fg%2F11xmksv4dm?entry=ttu&g_ep=EgoyMDI2MDkyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="text-[11px] text-emerald-400 font-bold underline block mt-1">
                  Ver ubicación en Google Maps
                </a>
              </div>

            </div>

            {/* DIRECT BUY BUTTON FIRST */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <button
                onClick={() => { window.location.href = "https://api.underaccess.com/functions/v1/comprar?org=eclipseevents&event=eclipse-fest&r=ef5f0e8e-169b-4a8e-a187-8c43c6f82b5b"; }}
                className="w-full btn-neon-red py-4 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,0,51,0.6)]"
              >
                <Ticket className="w-5 h-5" />
                <span>COMPRAR BOLETAS</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Boletería Segura con Código QR Oficial</span>
              </div>
            </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
