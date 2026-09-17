import React from 'react';
import { MapPin, Lock, Image as ImageIcon, Sparkles, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import { FINCA_PHOTOS } from '../data/initialData';
import ScrollReveal from './ScrollReveal';

export default function FincaSpotlight({ onOpenGallery, onSelectEvent }) {
  const previewPhotos = FINCA_PHOTOS.slice(0, 4);

  return (
    <section id="finca-terrenito" className="py-12 relative bg-[#0a0a0f] overflow-hidden border-t border-white/10">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#ff0033]/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Venue Specs & Location Notice - Slide Left (Specs) and Slide Right (Location Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-metallic-card p-8 rounded-3xl border border-white/10">
          
          {/* Specs - Slide Left */}
          <ScrollReveal direction="slide-left" duration={1100} once={false} className="lg:col-span-2">
            <div className="space-y-6">
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
          </ScrollReveal>

          {/* LOCATION NOTICE BOX - Slide Right */}
          <ScrollReveal direction="slide-right" duration={1100} delay={120} once={false} className="lg:col-span-1 h-full">
            <div className="bg-gradient-to-b from-[#141420] to-[#0a0a0f] p-6 rounded-2xl border-2 border-[#ff0033]/40 flex flex-col justify-between relative overflow-hidden shadow-2xl h-full">
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
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
