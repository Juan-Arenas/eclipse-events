import React from 'react';
import { X, Ticket, Trash2 } from 'lucide-react';
import DigitalTicketPass from './DigitalTicketPass';

export default function MyTicketsModal({ isOpen, onClose, tickets, onDeleteTicket }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c14] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/40 flex items-center justify-center text-[#ff0033]">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-2xl text-white">
                Bóveda de Entradas Digitales
              </h3>
              <p className="text-slate-400 text-xs">
                Tus pases con código QR y la ubicación exacta desbloqueada de la sede.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff0033] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-8">
          {tickets.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 max-w-md mx-auto">
              <Ticket className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
              <h4 className="font-heading font-bold text-xl text-white">No tienes entradas compradas</h4>
              <p className="text-slate-400 text-xs mt-2 px-6">
                Reserva tu entrada para el próximo evento del mes para desbloquear tu pase digital con QR y mapa GPS.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {tickets.map((t) => (
                <div key={t.id} className="relative group">
                  <div className="absolute top-2 right-2 z-30">
                    <button
                      onClick={() => onDeleteTicket(t.id)}
                      title="Eliminar entrada de la bóveda"
                      className="p-2 rounded-xl bg-black/80 hover:bg-rose-600 text-slate-400 hover:text-white border border-white/20 transition-colors shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Render Custom Ticket Pass (Matching TIKET 2.webp layout) */}
                  <DigitalTicketPass ticket={t} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
