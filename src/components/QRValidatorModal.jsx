import React, { useState } from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2, XCircle, Scan, KeyRound, ShieldAlert, UserCheck } from 'lucide-react';

export default function QRValidatorModal({ isOpen, onClose, tickets, onValidateTicket }) {
  if (!isOpen) return null;

  const [inputHash, setInputHash] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [activeMode, setActiveMode] = useState('qr'); // 'qr' | 'backup'

  const handleScan = (hashToTest) => {
    const target = hashToTest || inputHash;
    if (!target.trim()) return;

    const result = onValidateTicket(target.trim());
    setScanResult(result);
  };

  const handleResetScan = () => {
    setInputHash('');
    setScanResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0c0c14] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/40 flex items-center justify-center text-[#ff0033]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-2xl text-white">
                Validador de Acceso (Gate Security)
              </h3>
              <p className="text-slate-400 text-xs">
                Escáner de código QR y sistema secreto de respaldo para puerta.
              </p>
            </div>
          </div>

          <button
            onClick={() => { handleResetScan(); onClose(); }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff0033] text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="px-6 py-2.5 bg-white/5 border-b border-white/10 flex items-center gap-2">
          <button
            onClick={() => { setActiveMode('qr'); handleResetScan(); }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeMode === 'qr' ? 'bg-[#ff0033] text-white shadow-[0_0_10px_rgba(255,0,51,0.4)]' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Scan className="w-3.5 h-3.5" /> Escáner QR Normal
          </button>

          <button
            onClick={() => { setActiveMode('backup'); handleResetScan(); }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeMode === 'backup' ? 'bg-amber-500 text-slate-950 font-black shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" /> Modo Respaldo Secreto (Fallo de QR)
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Scanner Simulation Box */}
          {!scanResult && (
            <div className="space-y-6">
              
              {activeMode === 'qr' ? (
                <div className="relative bg-metallic-card p-8 rounded-3xl border-2 border-dashed border-[#ff0033]/50 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#ff0033]/10 border border-[#ff0033]/30 flex items-center justify-center text-[#ff0033] animate-pulse">
                    <Scan className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xl text-white">
                      Escáner QR Principal
                    </h4>
                    <p className="text-slate-400 text-xs mt-1 max-w-sm">
                      Pega el código Hash de la boleta o selecciona una boleta de la lista para validar el ingreso.
                    </p>
                  </div>

                  <div className="w-full max-w-md flex gap-2">
                    <input
                      type="text"
                      value={inputHash}
                      onChange={(e) => setInputHash(e.target.value)}
                      placeholder="Pega aquí el código QR..."
                      className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#ff0033]"
                    />
                    <button
                      onClick={() => handleScan(inputHash)}
                      className="btn-neon-red px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider"
                    >
                      Validar QR
                    </button>
                  </div>
                </div>
              ) : (
                /* SECRET BACKUP MODE (If QR Fails) */
                <div className="relative bg-amber-950/30 p-8 rounded-3xl border-2 border-dashed border-amber-500/60 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <KeyRound className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xl text-amber-400 uppercase tracking-wider">
                      Respaldo Secreto de Puerta
                    </h4>
                    <p className="text-slate-300 text-xs mt-1 max-w-sm">
                      Si la cámara o pantalla del cliente falla, ingresa el <strong>Código Secreto de Respaldo</strong> o la <strong>Cédula ID del comprador</strong>.
                    </p>
                  </div>

                  <div className="w-full max-w-md flex gap-2">
                    <input
                      type="text"
                      value={inputHash}
                      onChange={(e) => setInputHash(e.target.value)}
                      placeholder="Ingresa Cédula o Código BAC-ECL-xxxx..."
                      className="flex-1 bg-black/60 border border-amber-500/50 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <button
                      onClick={() => handleScan(inputHash)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg transition-colors"
                    >
                      Validar Respaldo
                    </button>
                  </div>
                </div>
              )}

              {/* Fast Test Tickets Picker */}
              <div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                  Boletas Emitidas Disponibles para Probar Ingreso:
                </span>

                {tickets.length === 0 ? (
                  <p className="text-xs text-slate-400 italic bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                    No hay boletas registradas aún. Genera una boleta a $0 COP en la página para probar la validación.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {tickets.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => { setInputHash(t.qrHash); handleScan(t.qrHash); }}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-white block">
                            {t.seatNumber || 'SILLA A-001'} — {t.holderName}
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">
                            C.C. {t.holderDni} • {t.tierName}
                          </span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          t.status === 'VALIDA' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCAN RESULT: GREEN (PERMITTED) */}
          {scanResult && scanResult.success && (
            <div className="bg-emerald-950/60 border-2 border-emerald-500 p-8 rounded-3xl text-center space-y-5 animate-fade-in shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-12 h-12 animate-bounce" />
              </div>

              <div>
                <span className="px-4 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-widest">
                  ACCESO PERMITIDO - BOLETA VÁLIDA
                </span>
                <h3 className="font-heading font-black text-3xl text-white mt-3">
                  ¡Permitir Ingreso al Evento!
                </h3>
              </div>

              <div className="bg-black/60 p-4 rounded-2xl border border-emerald-500/30 text-left text-xs space-y-2 text-slate-200 max-w-md mx-auto">
                <p><span className="text-slate-400">Silla Asignada:</span> <strong className="text-[#ff0033] font-mono text-sm">{scanResult.ticket.seatNumber || "SILLA A-001"}</strong></p>
                <p><span className="text-slate-400">Titular:</span> <strong>{scanResult.ticket.holderName}</strong> (C.C. {scanResult.ticket.holderDni})</p>
                <p><span className="text-slate-400">Localidad:</span> <span className="text-emerald-400 font-bold">{scanResult.ticket.tierName}</span></p>
                {scanResult.ticket.tierDescription && (
                  <p className="text-[11px] text-amber-300 italic">★ {scanResult.ticket.tierDescription}</p>
                )}
                <p className="text-[11px] text-emerald-400 pt-1 font-mono">Boleta marcada como INGRESADA en tiempo real.</p>
              </div>

              <button
                onClick={handleResetScan}
                className="btn-silver px-6 py-3 rounded-xl text-xs font-bold uppercase"
              >
                Validar Siguiente Boleta
              </button>
            </div>
          )}

          {/* SCAN RESULT: RED (DENIED / ALREADY USED) */}
          {scanResult && !scanResult.success && (
            <div className="bg-rose-950/60 border-2 border-rose-500 p-8 rounded-3xl text-center space-y-5 animate-fade-in shadow-[0_0_50px_rgba(244,63,94,0.3)]">
              <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-400 text-rose-400 flex items-center justify-center mx-auto shadow-xl">
                <XCircle className="w-12 h-12" />
              </div>

              <div>
                <span className="px-4 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-widest">
                  ACCESO DENEGADO
                </span>
                <h3 className="font-heading font-black text-3xl text-white mt-3">
                  {scanResult.message}
                </h3>
              </div>

              {scanResult.ticket && (
                <div className="bg-black/60 p-4 rounded-2xl border border-rose-500/30 text-left text-xs space-y-1 text-slate-200 max-w-md mx-auto">
                  <p><span className="text-slate-400">Silla:</span> {scanResult.ticket.seatNumber}</p>
                  <p><span className="text-slate-400">Titular:</span> {scanResult.ticket.holderName} (C.C. {scanResult.ticket.holderDni})</p>
                  <p className="text-rose-400 font-bold mt-1">Esta boleta ya ingresó anteriormente.</p>
                </div>
              )}

              <button
                onClick={handleResetScan}
                className="btn-neon-red px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider"
              >
                Reintentar Escaneo
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
