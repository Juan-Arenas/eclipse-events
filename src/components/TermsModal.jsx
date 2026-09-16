import React from 'react';
import { X, ShieldAlert, ShieldCheck, UserCheck, AlertTriangle, FileText, Lock } from 'lucide-react';

export default function TermsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c0c14] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-black/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-2xl text-white">
                Términos, Condiciones & Política de Privacidad
              </h3>
              <p className="text-slate-400 text-xs">
                Cláusulas legales y restricción estricta de edad (+18 Años) - Eclipse Events.
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

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs text-slate-300 leading-relaxed">
          
          {/* Strict Age Restriction Highlight */}
          <div className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-500/60 flex items-start gap-4 shadow-lg">
            <UserCheck className="w-8 h-8 text-rose-400 shrink-0 mt-1" />
            <div>
              <h4 className="font-heading font-black text-base text-white uppercase tracking-wider">
                🚫 RESTRICCIÓN ABSOLUTA Y ESTRICTA: PROHIBIDO MENORES DE EDAD (+18 AÑOS)
              </h4>
              <p className="text-slate-200 text-xs mt-1">
                Eclipse Events exige la presentación obligatoria de la <strong>Cédula de Ciudadanía Original o Documento Oficial con Foto</strong> en la entrada del evento. <span className="text-rose-400 font-bold">Bajo ninguna circunstancia se permitirá el ingreso a menores de 18 años</span>, y la compra de boletería realizada por o para un menor de edad no dará derecho a devolución ni reembolso de dinero.
              </p>
            </div>
          </div>

          {/* Clause 1 */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
            <h5 className="font-heading font-bold text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#ff0033]" /> 1. Autenticidad de la Boletería & Código QR Único
            </h5>
            <p>
              Cada entrada o pase digital emitida por Eclipse Events contiene un código QR encriptado dinámico y un código de respaldo único asignado al documento de identidad registrado. Está prohibida la duplicación, reventa no autorizada o alteración de la boleta. El sistema anulará automáticamente cualquier intento de duplicación en puerta.
            </p>
          </div>

          {/* Clause 2 */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
            <h5 className="font-heading font-bold text-white text-sm flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#ff0033]" /> 2. Reserva de Ubicación & Seguridad de la Sede
            </h5>
            <p>
              Por motivos de seguridad, aforo VIP y protección de la sede, la dirección exacta y coordenadas GPS se revelan exclusivamente al comprador verificado en su Pase Digital. El comprador se compromete a no divulgar públicamente la ubicación exacta.
            </p>
          </div>

          {/* Clause 3 */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
            <h5 className="font-heading font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ff0033]" /> 3. Derecho de Admisión y Permanencia
            </h5>
            <p>
              Eclipse Events se reserva el derecho de admisión y permanencia. No se permitirá el ingreso de sustancias psicoactivas, armas de cualquier índole ni personas en estado de embriaguez extrema que pongan en riesgo la seguridad de los demás asistentes.
            </p>
          </div>

          {/* Clause 4 */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
            <h5 className="font-heading font-bold text-white text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> 4. Política de Cancelación y Reembolsos
            </h5>
            <p>
              En caso de fuerza mayor o reprogramación por causas climáticas extremas, las boletas mantendrán su validez automática para la nueva fecha programada por la organización.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/60 text-center">
          <button
            onClick={onClose}
            className="btn-neon-red px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider"
          >
            Entendido y Acepto Términos (+18 Años)
          </button>
        </div>

      </div>
    </div>
  );
}
