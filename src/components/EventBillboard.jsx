import React from 'react';
import { Calendar, Clock, MapPin, Ticket, Sparkles, Lock, Music, Zap, Image as ImageIcon, Flame, Tag, CheckCircle2, ShieldCheck, Users, Navigation, MessageCircle } from 'lucide-react';
import { FINCA_PHOTOS, GOOGLE_MAPS_LINK, WHATSAPP_BUY_MESSAGE, WHATSAPP_NUMBER, UNDERACCESS_BUY_LINK } from '../data/initialData';
import ScrollReveal from './ScrollReveal';

export default function EventBillboard({ monthlyEvent, onSelectEvent, onOpenGallery, isDemoZeroMode }) {
  if (!monthlyEvent) return null;

  return (
    <section id="cartelera-eventos" className="py-8 bg-metallic-dark relative border-t border-white/10">
      
      {/* Background Red Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#ff0033]/15 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Event Showcase & Direct Ticket Purchase Card */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16]/60 via-transparent to-black/30"></div>

              {/* Promo Stock Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#ff0033] text-white text-xs font-black uppercase tracking-wider shadow-[0_0_12px_rgba(255,0,51,0.7)] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 animate-pulse" /> SÁBADO 28 DE NOVIEMBRE
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase">
                {monthlyEvent.category}
              </div>

              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-white/15">
                <p className="text-white font-heading font-black text-lg leading-tight">
                  {monthlyEvent.title}
                </p>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#ff0033]" />
                  {monthlyEvent.venue || "Finca Hotel Villa Luisa"}
                </p>
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
                  <Calendar className="w-4 h-4 text-[#ff0033]" /> {monthlyEvent.formattedDate || "Sábado, 28 de Noviembre, 2026"}
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-bold uppercase">
                  +18 Años
                </span>
              </div>

              {/* TICKETS INFO */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 via-black/60 to-purple-500/10 border border-purple-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Ticket className="w-4 h-4 text-purple-400" /> LOCALIDADES & ENTRADAS
                  </span>
                  <span className="text-[10px] text-purple-300 font-mono">Disponibilidad en Vivo</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                  {/* NORMAL */}
                  <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                    <Ticket className="w-4 h-4 text-slate-300 mb-1" />
                    <span className="text-[10px] text-slate-400 block font-bold">ENTRADA NORMAL</span>
                    <span className="text-xs text-white font-black mt-1">$25.000 COP</span>
                  </div>

                  {/* VIP */}
                  <div className="bg-black/60 p-2.5 rounded-xl border border-[#ff0033]/30 flex flex-col items-center text-center">
                    <Zap className="w-4 h-4 text-[#ff0033] mb-1" />
                    <span className="text-[10px] text-[#ff0033] block font-bold">ENTRADA VIP</span>
                    <span className="text-xs text-white font-black mt-1">$35.000 COP</span>
                  </div>

                  {/* 2X1 MUJERES */}
                  <div className="bg-black/60 p-2.5 rounded-xl border border-pink-500/30 flex flex-col items-center text-center">
                    <Users className="w-4 h-4 text-pink-400 mb-1" />
                    <span className="text-[10px] text-pink-400 block font-bold">2x1 MUJERES</span>
                    <span className="text-xs text-white font-black mt-1">$40.000 COP</span>
                  </div>
                </div>
              </div>

              {/* Lineup */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest block mb-1.5">
                  EXPERIENCIA & PRODUCCIÓN OFICIAL
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

              {/* OFFICIAL VERIFIED VENUE & GOOGLE MAPS */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff0033]" /> {monthlyEvent.venue || "Finca Hotel Villa Luisa"}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Sede Oficial
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  📍 {monthlyEvent.unlockedAddress || "Vereda El Lembo, Santa Rosa de Cabal, Risaralda"}
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <a 
                    href={GOOGLE_MAPS_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-xs font-bold transition-all shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cómo llegar (Abrir en Google Maps)</span>
                  </a>
                  <button
                    onClick={onOpenGallery}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-bold transition-all"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#ff0033]" />
                    <span>Ver Fotografías de la Finca</span>
                  </button>
                </div>
              </div>

            </div>

            {/* ACTION BUTTONS (ONLINE PURCHASE + DIRECT WHATSAPP) */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <a
                href={UNDERACCESS_BUY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-neon-red py-4 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,0,51,0.6)] cursor-pointer"
              >
                <Ticket className="w-5 h-5" />
                <span>COMPRAR BOLETAS EN LÍNEA</span>
              </a>

              <a
                href={WHATSAPP_BUY_MESSAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>COMPRAR / RESERVAR POR WHATSAPP ({WHATSAPP_NUMBER})</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Boletería Segura con Código QR Oficial & Atención WhatsApp</span>
              </div>
            </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}

