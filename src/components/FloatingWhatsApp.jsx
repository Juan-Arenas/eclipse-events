import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { WHATSAPP_BUY_MESSAGE, WHATSAPP_NUMBER } from '../data/initialData';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <aside aria-label="Contacto de WhatsApp" className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0c0c14] border border-emerald-500/50 text-white px-4 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md animate-bounce">
          <div className="text-left">
            <p className="text-[11px] font-black uppercase text-emerald-400 tracking-wider">
              ¿Dudas o Compra Directa?
            </p>
            <p className="text-xs text-slate-300">
              Escríbenos al <strong className="text-white font-mono">{WHATSAPP_NUMBER}</strong>
            </p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white ml-1 p-0.5"
            title="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={WHATSAPP_BUY_MESSAGE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp oficial de Eclipse Events"
        className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all transform hover:scale-110 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>
    </aside>
  );
}
