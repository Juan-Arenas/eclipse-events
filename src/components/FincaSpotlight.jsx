import React from 'react';
import { MapPin, Lock, Image as ImageIcon, Sparkles, ShieldCheck, CheckCircle2, Navigation, MessageCircle } from 'lucide-react';
import { FINCA_PHOTOS, GOOGLE_MAPS_LINK, WHATSAPP_INFO_MESSAGE, WHATSAPP_NUMBER } from '../data/initialData';
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
                <span>Instalaciones y Amenidades Oficiales</span>
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                Nuestra sede oficial en <strong>Finca Hotel Villa Luisa</strong> cuenta con amplias zonas verdes, arquitectura campestre de primer nivel, piscina tropical, show de luces láser y la logística ideal para la producción de eventos con aforo exclusivo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-[#ff0033] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Zonas Verdes</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Amplias áreas verdes y naturaleza en Santa Rosa de Cabal.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-[#ff0033] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Piscina</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Piscina campestre rodeada de naturaleza y áreas de descanso.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-[#ff0033] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Áreas Sociales & VIP</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Espacios de esparcimiento, palcos y áreas lounge exclusivas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-[#ff0033] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Parqueadero Privado Custodiado</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Control de acceso y estacionamiento privado para asistentes.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* LOCATION NOTICE BOX - Slide Right */}
          <ScrollReveal direction="slide-right" duration={1100} delay={120} once={false} className="lg:col-span-1 h-full">
            <div className="bg-gradient-to-b from-[#141420] to-[#0a0a0f] p-6 rounded-2xl border-2 border-emerald-500/40 flex flex-col justify-between relative overflow-hidden shadow-2xl h-full space-y-4">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
                SEDE OFICIAL CONFIRMADA
              </div>

              <div>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                
                <h4 className="font-heading font-black text-xl text-white mb-2">
                  Finca Hotel Villa Luisa
                </h4>

                <p className="text-slate-300 text-xs leading-relaxed mb-4">
                  Vive la experiencia en nuestras instalaciones campestres en Santa Rosa de Cabal, Risaralda, equipadas con todo lo necesario para un evento inolvidable.
                </p>

                <div className="p-3.5 bg-black/60 rounded-xl border border-white/10 text-xs text-slate-400 space-y-1.5">
                  <p className="flex items-center gap-1.5 text-white font-semibold">
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" /> Dirección Verificada:
                  </p>
                  <p className="text-[11px] text-slate-300 font-medium">
                    📍 Vereda El Lembo, Santa Rosa de Cabal, Risaralda, Colombia.
                  </p>
                  <p className="text-[10px] text-slate-400 pt-1">
                    Fácil acceso para vehículos particulares y transporte privado con vigilancia oficial.
                  </p>
                </div>
              </div>

              <div className="pt-2 space-y-2 text-center">
                <a 
                  href={GOOGLE_MAPS_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full text-xs text-white font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 py-3 rounded-xl border border-emerald-400/30 shadow-lg transition-all"
                >
                  <Navigation className="w-4 h-4 text-white" />
                  <span>CÓMO LLEGAR (GOOGLE MAPS)</span>
                </a>

                <a
                  href={WHATSAPP_INFO_MESSAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-xs text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 py-2.5 rounded-xl border border-emerald-500/30 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>MÁS INFORMACIÓN POR WHATSAPP</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>


        {/* Photos Grid */}
        <ScrollReveal direction="fade-up" duration={1100} delay={200} once={false}>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {previewPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="relative group rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] cursor-pointer"
                onClick={onOpenGallery}
              >
                <img src={photo.url} alt={photo.title} loading="lazy" className="w-full h-full object-cover transform-gpu md:group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <span className="text-[10px] font-bold uppercase text-[#ff0033] bg-[#ff0033]/20 px-2 py-0.5 rounded border border-[#ff0033]/40">{photo.category}</span>
                  <p className="text-white text-sm font-bold mt-1 leading-tight">{photo.title}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
