import React from 'react';
import { Sparkles, MapPin, ExternalLink, Share2, Globe, MessageCircle, Phone, Mail, ShieldCheck } from 'lucide-react';
import { GOOGLE_MAPS_LINK } from '../data/initialData';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer({ onNavigate, onOpenGallery, openQRModal }) {
  return (
    <footer className="bg-[#050508] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#ff0033]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#ff0033]" />
              <span className="font-heading font-black text-2xl text-white">
                ECLIPSE <span className="text-[#ff0033]">EVENTS</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Plataforma líder en venta de entradas digitales, eventos nocturnos VIP y gestión con control de acceso mediante código QR.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/eclipse_fullvibes_events"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram Oficial @eclipse_fullvibes_events"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#ff0033]/40 text-slate-200 hover:text-white hover:bg-[#ff0033]/20 hover:border-[#ff0033] transition-all text-xs font-semibold shadow-[0_0_15px_rgba(255,0,51,0.25)]"
              >
                <InstagramIcon className="w-4 h-4 text-[#ff0033]" />
                <span className="font-mono text-[11px]">@eclipse_fullvibes_events</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Navegación</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('cartelera')} className="hover:text-[#ff0033] transition-colors">
                  Cartelera de Eventos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('finca')} className="hover:text-[#ff0033] transition-colors">
                  Instalaciones Sede
                </button>
              </li>
            </ul>
          </div>

          {/* Location Notice */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Ubicación del Evento</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="text-white font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#ff0033]" /> Sede Campestre Privada
              </p>
              <p>📍 La ubicación exacta y el mapa en GPS se activan únicamente en tu pase digital al comprar tu entrada.</p>
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Contacto & Soporte</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#ff0033]" />
                <a href="mailto:fullvibessss@gmail.com" className="hover:text-white transition-colors">
                  fullvibessss@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#ff0033]" />
                <a 
                  href="https://wa.me/573105019591" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors font-mono"
                  title="Escribir por WhatsApp"
                >
                  +57 310 501 9591
                </a>
              </p>
              <div className="pt-1">
                <a
                  href="https://wa.me/573105019591?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20las%20boletas%20del%20Eclipse%20Festival"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25 hover:text-emerald-300 transition-all text-xs font-bold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Soporte VIP</span>
                </a>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" /> Sistema de Boletería Verificado
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
