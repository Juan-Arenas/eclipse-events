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
              Ubicación privilegiada en la zona campestre del Eje Cafetero (Pereira). El escenario perfecto para macro-eventos, festivales de Halloween, piscina nocturna y palcos VIP.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenGallery}
              className="btn-neon-red px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Ver Fotos Reales de la Finca ({FINCA_PHOTOS.length})</span>
            </button>
          </div>
        </div>

        {/* Gallery Preview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {previewPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={onOpenGallery}
              className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#ff0033]/60 transition-all duration-300 shadow-xl"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity"></div>
              
              <div className="absolute top-3 left-3 bg-[#08080c]/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                {photo.category}
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-heading font-bold text-white text-base leading-snug group-hover:text-[#ff0033] transition-colors">
                  {photo.title}
                </h3>
                <p className="text-slate-300 text-xs line-clamp-1 mt-1 font-medium">
                  {photo.desc}
                </p>
              </div>

              {idx === 3 && (
                <div 
                  onClick={onOpenGallery}
                  className="absolute inset-0 bg-[#08080c]/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center group-hover:bg-[#ff0033]/90 transition-colors"
                >
                  <ImageIcon className="w-8 h-8 text-white mb-2" />
                  <span className="font-heading font-black text-xl text-white uppercase tracking-wider">
                    Ver Fotos Reales
                  </span>
                  <span className="text-xs text-slate-200 mt-1">Galería de la Finca ({FINCA_PHOTOS.length} Fotos)</span>
                </div>
              )}
            </div>
          ))}
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
                  <Navigation className="w-3.5 h-3.5 text-[#ff0033]" /> Zona Campestre (Pereira / Santa Rosa)
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
