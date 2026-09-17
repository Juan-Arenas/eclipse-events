import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MapPin, Navigation, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, User, Calendar, Lock, Wine, Image as ImageIcon } from 'lucide-react';

export default function DigitalTicketPass({ ticket, onOpenGallery }) {
  if (!ticket) return null;

  const isVip = ticket.tierName?.toLowerCase().includes('vip');

  return (
    <div className="relative max-w-sm sm:max-w-md mx-auto my-4 text-left font-sans animate-fade-in select-none">
      
      {/* Outer Glow & Metallic Container (Classic Ticket Stub from TIKET 2.webp) */}
      <div className="relative bg-gradient-to-b from-[#181826] via-[#0c0c14] to-[#141422] border-2 border-[#ff0033]/60 rounded-[32px] p-6 sm:p-7 shadow-[0_0_50px_rgba(255,0,51,0.35)] overflow-hidden">
        
        {/* Ticket Side Stub Cutouts */}
        <div className="absolute top-[48%] -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#07070a] border-r-2 border-[#ff0033]/60 z-20"></div>
        <div className="absolute top-[48%] -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#07070a] border-l-2 border-[#ff0033]/60 z-20"></div>

        {/* 1. TOP SECTION: BRAND, SEAT & EVENT HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ff0033] flex items-center justify-center text-white shadow-[0_0_12px_rgba(255,0,51,0.8)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-heading font-black text-lg tracking-wider text-white block leading-none">
                ECLIPSE <span className="text-[#ff0033]">EVENTS</span>
              </span>
              <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase block mt-0.5">
                OFFICIAL DIGITAL PASS
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] text-slate-400 font-mono block uppercase">ACCESO</span>
            <span className="text-xs font-mono font-black text-[#ff0033] bg-black/90 px-3 py-1 rounded-lg border border-[#ff0033]/50 shadow-md">
              AFORO GENERAL
            </span>
          </div>
        </div>

        {/* Event Title & Benefits */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> CONFIRMADA
            </span>

            <span className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
              isVip
                ? 'bg-[#ff0033] text-white shadow-[0_0_12px_rgba(255,0,51,0.7)]'
                : 'bg-white/10 text-slate-200 border border-white/20'
            }`}>
              {ticket.tierName || "Boleta General"}
            </span>
          </div>

          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase leading-none tracking-tight pt-1">
            {ticket.eventTitle}
          </h3>

          <p className="text-xs text-slate-300 font-semibold flex items-center gap-1.5 pt-1">
            {isVip ? (
              <span className="text-amber-400 flex items-center gap-1">
                <Wine className="w-3.5 h-3.5 text-[#ff0033]" />
                Acceso Preferencial + Eclipse Drinks Adicional Incluido
              </span>
            ) : (
              <span className="text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                Acceso General al Evento
              </span>
            )}
          </p>
        </div>

        {/* Attendee Info Grid */}
        <div className="grid grid-cols-2 gap-2.5 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs mb-5">
          <div>
            <span className="text-[9px] text-slate-400 font-semibold block uppercase">Titular</span>
            <span className="font-bold text-white truncate block">{ticket.holderName}</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-semibold block uppercase">Cédula ID</span>
            <span className="font-mono font-bold text-slate-200 block">{ticket.holderDni}</span>
          </div>
        </div>

        {/* 2. CENTER SECTION (LA MITAD): HERO CENTERED QR CODE STUB */}
        <div className="relative border-y-2 border-dashed border-white/20 my-4 py-5 text-center">
          
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2 font-bold">
            ⚡ CÓDIGO QR DE ACCESO A PUERTA ⚡
          </span>

          {/* Glowing QR Card Box */}
          <div className="relative bg-white p-4 rounded-3xl inline-block text-center shadow-[0_0_35px_rgba(255,255,255,0.15)] border-4 border-slate-900 overflow-hidden">
            
            {ticket.status === 'USADA' && (
              <div className="absolute inset-0 bg-red-950/90 backdrop-blur-xs z-30 flex flex-col items-center justify-center p-3 animate-fade-in border-4 border-red-600">
                <span className="px-3 py-1.5 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-lg shadow-xl rotate-[-6deg]">
                  ⚠️ BOLETA DAÑADA / CONSUMIDA
                </span>
                <p className="text-[10px] font-mono text-red-200 mt-2 font-bold text-center">
                  INGRESADO EN PUERTA <br/>
                  {ticket.usedTimestamp || 'ACCESO REGISTRADO'}
                </p>
              </div>
            )}

            <div className="p-2 bg-[#f8fafc] rounded-2xl inline-block border border-slate-300 shadow-inner">
              <QRCodeSVG 
                value={ticket.qrHash}
                size={175}
                level="H"
                fgColor={ticket.status === 'USADA' ? "#991b1b" : "#08080c"}
                imageSettings={{
                  src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff0033' stroke='%23ffffff' stroke-width='2'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>",
                  x: undefined,
                  y: undefined,
                  height: 34,
                  width: 34,
                  excavate: true,
                }}
              />
            </div>

            {/* Barcode Graphic Lines */}
            <div className="pt-2 mt-2 border-t border-slate-200">
              <div className="h-8 w-full flex items-center justify-between px-2 gap-0.5 overflow-hidden opacity-90">
                {Array.from({ length: 44 }).map((_, i) => (
                  <div
                    key={i}
                    className={`${ticket.status === 'USADA' ? 'bg-red-700' : 'bg-black'} h-full rounded-sm`}
                    style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }}
                  ></div>
                ))}
              </div>
              <span className="font-mono text-[9px] text-slate-700 tracking-widest font-bold uppercase block mt-1">
                {ticket.qrHash}
              </span>
            </div>

          </div>

          <p className="text-[10px] text-slate-400 font-mono mt-2">
            Muestra este código en la entrada para escanearlo con la cámara.
          </p>

        </div>

        {/* 3. LOWER SECTION: UNLOCKED LOCATION & SECRET BACKUP */}
        <div className="bg-gradient-to-r from-[#ff0033]/20 via-black/80 to-[#ff0033]/15 p-4 rounded-2xl border-2 border-[#ff0033] mb-4 text-xs relative shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-[#ff0033] uppercase tracking-wider flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 animate-pulse" /> SEDE SECRETA REVELADA
            </span>
            <span className="text-[9px] font-mono text-slate-400">CONFIDENCIAL</span>
          </div>

          <h4 className="font-heading font-black text-base text-white">
            {ticket.venue || "Sede Campestre (En Tu Entrada Digital)"}
          </h4>

          <p className="text-[11px] text-slate-300 font-mono mt-0.5">
            {ticket.fullAddress || "Ubicación Confidencial Desbloqueada"}
          </p>

          {ticket.mapsUrl && ticket.mapsUrl !== '#' && (
            <a
              href={ticket.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-neon-red py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 mt-3 shadow-md"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Abrir Navegación en Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          )}

          {/* UNLOCKED FINCA PHOTO GALLERY BUTTON (Accessible ONLY on ticket pass) */}
          <button
            onClick={() => onOpenGallery && onOpenGallery()}
            className="w-full btn-silver py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#ff0033]" />
            <span>Ver Galería de Fotos Reales de la Finca</span>
          </button>
        </div>

        {/* SECRET BACKUP SECURITY CODE */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Respaldo de Seguridad
          </span>
          <span className="bg-black/80 px-2.5 py-0.5 rounded-md border border-white/15 text-slate-200 font-bold">
            SECRET: {ticket.backupCode || `BAC-${ticket.id}`}
          </span>
        </div>

      </div>
    </div>
  );
}
