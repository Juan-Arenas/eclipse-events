import React from 'react';
import { Sparkles, MapPin, ExternalLink, Share2, Globe, MessageCircle, Phone, Mail, ShieldCheck } from 'lucide-react';
import { GOOGLE_MAPS_LINK } from '../data/initialData';

export default function Footer({ onNavigate, onOpenGallery, openQRModal }) {
  return (
    <footer className="bg-[#050508] border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#ff0033]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
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
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#ff0033] hover:border-[#ff0033] transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#ff0033] hover:border-[#ff0033] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#ff0033] hover:border-[#ff0033] transition-colors">
                <Share2 className="w-4 h-4" />
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
                  Finca Mi Terrenito
                </button>
              </li>
              <li>
                <button onClick={onOpenGallery} className="hover:text-[#ff0033] transition-colors">
                  Galería de Fotos VIP
                </button>
              </li>
            </ul>
          </div>

          {/* Finca Info */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Ubicación Estrella</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="text-white font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#ff0033]" /> Finca Mi Terrenito
              </p>
              <p>Santa Rosa de Cabal - Pereira (Risaralda)</p>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#ff0033] hover:underline font-bold pt-1"
              >
                <span>Ver en Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4">Contacto & Soporte</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>contacto@eclipseevents.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>+57 310 987 6543</span>
              </p>
              <div className="pt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" /> Sistema de Boletería Verificado
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Eclipse Events. Todos los derechos reservados.</p>
          <p className="font-mono text-[11px]">Metálico, Plata & Rojo Neón • Plataforma de Eventos VIP</p>
        </div>

      </div>
    </footer>
  );
}
