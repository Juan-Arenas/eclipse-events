import React from 'react';
import { MapPin, Lock, Image as ImageIcon, Sparkles, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import { FINCA_PHOTOS } from '../data/initialData';

export default function FincaSpotlight({ onOpenGallery, onSelectEvent }) {
  const previewPhotos = FINCA_PHOTOS.slice(0, 4);

  return (
    <section id="finca-terrenito" className="py-12 relative bg-[#0a0a0f] overflow-hidden border-t border-white/10">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff0033]/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff0033]/10 border border-[#ff0033]/30 text-[#ff0033] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Sede Oficial de la Fiesta
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
              INSTALACIONES Y SEDE <span className="text-[#ff0033] drop-shadow-[0_0_15px_rgba(255,0,51,0.6)]">DEL FESTIVAL</span>
            </h2>
            <p className="text-slate-400 mt-2 text-base max-w-2xl">
              Sede campestre privada acondicionada con la mejor logística para macro-eventos, festivales de Halloween, piscina nocturna y palcos VIP.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSelectEvent}
              className="btn-neon-red px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Desbloquear Galería & Ubicación al Comprar</span>
            </button>
          </div>
        </div>

        {/* Confidential Venue Specs & Ticket Unlock Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#181826] via-[#0c0c14] to-[#141422] border-2 border-[#ff0033]/40 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#ff0033]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" /> ACCESO CONFIDENCIAL A LA GALERÍA
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase">
                FOTOS REALES DE LA SEDE Y MAPA GPS EN TU ENTRADA
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Por motivos de privacidad del predio y control de acceso exclusivo, la galería completa con todas las fotografías de la finca, la ubicación exacta y el mapa de llegada en GPS son <strong>visibles únicamente para las personas que adquieren su entrada</strong>.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center">
              <button
                onClick={onSelectEvent}
                className="w-full btn-neon-red py-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,51,0.5)]"
              >
                <span>COMPRAR BOLETA / VER MI ENTRADA</span>
              </button>
            </div>
          </div>
        </div>

        {/* Venue Specs & Location Notice */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-metallic-card p-8 rounded-3xl border border-white/10">
          
          {/* Specs */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-heading font-bold text-2xl text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-[#ff0033]" />
              <span>Instalaciones y Amenidades VIP</span>
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              Nuestra sede VIP cuenta con amplias zonas verdes, arquitectura moderna, piscina tropical temperada y la logística ideal para la producción de eventos con aforo exclusivo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#ff0033] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Escenario Neón Principal</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Estructura para montaje de luces láser y sonido envolvente.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#ff0033] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Piscina Nocturna VIP</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Iluminación LED subacuática y zona de camastros.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#ff0033] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Palcos Elevados</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Zonas reservadas con atención de mesero y botellas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-[#ff0033] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">Parqueadero Privado</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Estacionamiento custodiado con control de acceso QR.</p>
                </div>
              </div>
            </div>
          </div>

          {/* LOCATION NOTICE BOX */}
          <div className="bg-gradient-to-b from-[#141420] to-[#0a0a0f] p-6 rounded-2xl border-2 border-[#ff0033]/40 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 bg-[#ff0033] text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
              EN TU BOLETA
            </div>

            <div>
              <div className="w-12 h-12 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/40 text-[#ff0033] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              
              <h4 className="font-heading font-black text-xl text-white mb-2">
                Ubicación del Evento
              </h4>

              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Por organización de logística y control de aforo, la dirección exacta y enlace directo de navegación GPS <strong className="text-white">se incluyen ordenadamente en tu entrada digital</strong>.
              </p>

              <div className="p-3.5 bg-black/60 rounded-xl border border-white/10 text-xs text-slate-400 space-y-1">
                <p className="flex items-center gap-1.5 text-white font-semibold">
                  <Navigation className="w-3.5 h-3.5 text-[#ff0033]" /> Ubicación en tu Pase Digital
                </p>
                <p className="text-[11px] text-slate-400 pt-1">
                  📍 Al comprar tu entrada, tu Pase Digital QR revelará el nombre de la finca, la dirección exacta y la ruta directa a Google Maps.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-4 text-center">
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider block">
                ✓ Información completa de ruta en tu Pase Digital
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
