import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MapPin, Navigation, ExternalLink, Sparkles, CheckCircle2, ShieldCheck, User, Calendar, Lock, Wine } from 'lucide-react';

export default function DigitalTicketPass({ ticket }) {
  if (!ticket) return null;

  const isVip = ticket.tierName?.toLowerCase().includes('vip');

  return (
    <div className="relative max-w-sm sm:max-w-md mx-auto my-4 text-left font-sans animate-fade-in select-none">
      
      {/* Outer Glow container */}
      <div className="relative bg-gradient-to-b from-[#181824] via-[#0d0d15] to-[#141420] border-2 border-[#ff0033]/60 rounded-[32px] p-6 sm:p-7 shadow-[0_0_45px_rgba(255,0,51,0.35)] overflow-hidden">
        
        {/* Ticket Side Notch Cutouts (Classic Stub Cutout from TIKET 2.webp) */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#07070a] border-r-2 border-[#ff0033]/60 z-20"></div>
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-[#07070a] border-l-2 border-[#ff0033]/60 z-20"></div>

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-dashed border-white/20 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#ff0033] flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-heading font-black text-lg tracking-wider text-white">
              ECLIPSE <span className="text-[#ff0033]">EVENTS</span>
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-mono block uppercase">SILLA / ASIENTO</span>
            <span className="text-xs font-mono font-black text-[#ff0033] bg-black/80 px-2.5 py-0.5 rounded-md border border-[#ff0033]/40 shadow-sm">
              {ticket.seatNumber || "SILLA A-001"}
            </span>
          </div>
        </div>

        {/* Status Badge & Tier Name */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> ENTRADA CONFIRMADA
          </span>

          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            isVip
              ? 'bg-[#ff0033] text-white shadow-[0_0_12px_rgba(255,0,51,0.7)]'
              : 'bg-white/10 text-slate-200 border border-white/20'
          }`}>
            {ticket.tierName || "Boleta Sencilla"}
          </span>
        </div>

        {/* Main Title & Benefit Description */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[10px] font-mono text-[#ff0033] uppercase font-bold tracking-widest block">
            PASE DIGITAL ENUMERADO
          </span>
          <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase leading-none tracking-tight">
            {ticket.eventTitle}
          </h3>

          {/* Benefit Badge */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/15 text-slate-200 text-xs font-semibold">
              {isVip ? (
                <>
                  <Wine className="w-3.5 h-3.5 text-[#ff0033]" />
                  <span>Beneficio: <strong>Acceso Preferencial + 1 Cóctel Incluido</strong></span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                  <span>Beneficio: <strong>Acceso al Evento</strong></span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Holder Info Grid */}
        <div className="grid grid-cols-2 gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10 text-xs mb-5">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Titular</span>
            <span className="font-bold text-white truncate block">{ticket.holderName}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Cédula ID</span>
            <span className="font-mono font-bold text-slate-200 block">{ticket.holderDni}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Ubicación Asignada</span>
            <span className="font-mono font-bold text-[#ff0033] block">{ticket.seatNumber || "SILLA A-001"}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Fecha Evento</span>
            <span className="font-bold text-slate-200 block truncate">{ticket.eventDate}</span>
          </div>
        </div>

        {/* UNLOCKED CONFIDENTIAL LOCATION BOX */}
        <div className="bg-gradient-to-r from-[#ff0033]/25 via-black/80 to-[#ff0033]/15 p-4 rounded-2xl border-2 border-[#ff0033] mb-5 text-xs relative shadow-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black text-[#ff0033] uppercase tracking-wider flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 animate-pulse" /> SEDE SECRETA REVELADA
            </span>
            <span className="text-[9px] font-mono text-slate-400">CONFIDENCIAL</span>
          </div>

          <h4 className="font-heading font-black text-base text-white">
            {ticket.venue || "Finca Mi Terrenito"}
          </h4>

          <p className="text-[11px] text-slate-300 font-mono mt-0.5">
            {ticket.fullAddress || "Santa Rosa de Cabal - Pereira (Risaralda). GPS: 4.9158519, -75.626924"}
          </p>

          {ticket.mapsUrl && (
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
        </div>

        {/* Dynamic QR & Barcode Block */}
        <div className="bg-white p-4 rounded-2xl text-center shadow-2xl border-2 border-slate-900">
          <div className="inline-block p-2 bg-slate-100 rounded-xl mb-2">
            <QRCodeSVG 
              value={ticket.qrHash}
              size={155}
              level="H"
              fgColor="#08080c"
            />
          </div>

          {/* Barcode Graphic Lines */}
          <div className="pt-2 border-t border-slate-200">
            <div className="h-9 w-full flex items-center justify-between px-2 gap-0.5 overflow-hidden opacity-90">
              {Array.from({ length: 42 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-black h-full rounded-sm"
                  style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1 : 2)}px` }}
                ></div>
              ))}
            </div>
            <span className="font-mono text-[10px] text-slate-700 tracking-widest font-bold uppercase block mt-1">
              {ticket.qrHash}
            </span>
          </div>
        </div>

        {/* SECRET BACKUP SECURITY CODE (Respaldo por si falla el QR) */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Respaldo de Seguridad
          </span>
          <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 text-slate-300 font-bold">
            SECRET: {ticket.backupCode || `BAC-${ticket.id}`}
          </span>
        </div>

      </div>
    </div>
  );
}
