import React, { useState, useEffect, useRef } from 'react';
import { X, QrCode, ShieldCheck, CheckCircle2, XCircle, Scan, KeyRound, Camera, AlertTriangle, RefreshCw, UserCheck } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

export default function QRValidatorModal({ isOpen, onClose, tickets, onValidateTicket }) {
  const [inputHash, setInputHash] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [activeMode, setActiveMode] = useState('camera'); // 'camera' | 'manual' | 'backup'
  const [cameraError, setCameraError] = useState(null);
  const [isScanningActive, setIsScanningActive] = useState(false);
  const html5QrCodeRef = useRef(null);

  // Synthesize instant sound feedback without external MP3 files
  const playAudioFeedback = (isSuccess) => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isSuccess) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      // Audio context fallback
    }
  };

  const handleScan = (hashToTest) => {
    const target = hashToTest || inputHash;
    if (!target || !target.trim()) return;
    if (scanResult) return; // Guard: prevent double-scanning the same frame or duplicate calls

    const result = onValidateTicket(target.trim());
    playAudioFeedback(result.success);
    setScanResult(result);
  };

  const handleResetScan = () => {
    setInputHash('');
    setScanResult(null);
    setCameraError(null);
  };

  // Real-Time Camera Scanner Lifecycle
  useEffect(() => {
    let scannerInstance = null;

    if (isOpen && activeMode === 'camera' && !scanResult) {
      const containerId = 'qr-camera-reader-element';
      const element = document.getElementById(containerId);
      
      if (element) {
        scannerInstance = new Html5Qrcode(containerId);
        html5QrCodeRef.current = scannerInstance;

        scannerInstance.start(
          { facingMode: 'environment' },
          { fps: 15, qrbox: { width: 220, height: 220 } },
          (decodedText) => {
            scannerInstance.stop().then(() => {
              setIsScanningActive(false);
              handleScan(decodedText);
            }).catch(() => {
              setIsScanningActive(false);
              handleScan(decodedText);
            });
          },
          () => {} // Frame scan ignore
        ).then(() => {
          setIsScanningActive(true);
          setCameraError(null);
        }).catch((err) => {
          console.warn('Camera initiation failed:', err);
          setIsScanningActive(false);
          setCameraError('No se pudo acceder a la cámara. Revisa los permisos del navegador o cambia al modo manual/respaldo.');
        });
      }
    }

    return () => {
      if (scannerInstance && scannerInstance.isScanning) {
        scannerInstance.stop().catch(() => {});
      }
    };
  }, [isOpen, activeMode, scanResult]);

  if (!isOpen) return null;

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
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                Validador en Vivo (Control de Acceso)
              </h3>
              <p className="text-slate-400 text-xs">
                Escáner con Cámara en Tiempo Real + Inhabilitación Automática de Boletas.
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
        <div className="px-6 py-2.5 bg-white/5 border-b border-white/10 flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setActiveMode('camera'); handleResetScan(); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeMode === 'camera' ? 'bg-[#ff0033] text-white shadow-[0_0_12px_rgba(255,0,51,0.5)]' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> Cámara 100% Real
          </button>

          <button
            onClick={() => { setActiveMode('manual'); handleResetScan(); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeMode === 'manual' ? 'bg-white/20 text-white border border-white/30' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Scan className="w-3.5 h-3.5" /> Código Hash
          </button>

          <button
            onClick={() => { setActiveMode('backup'); handleResetScan(); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center gap-1.5 ${
              activeMode === 'backup' ? 'bg-amber-500 text-slate-950 font-black shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" /> Respaldo / Cédula
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* SCANNER MODES */}
          {!scanResult && (
            <div className="space-y-6">
              
              {/* MODE 1: REAL TIME CAMERA SCANNER */}
              {activeMode === 'camera' && (
                <div className="space-y-4 text-center">
                  <div className="relative w-full min-h-[280px] bg-black rounded-3xl overflow-hidden border-2 border-[#ff0033]/60 shadow-[0_0_30px_rgba(255,0,51,0.25)] flex flex-col items-center justify-center p-2">
                    
                    <div id="qr-camera-reader-element" className="w-full h-full rounded-2xl overflow-hidden"></div>

                    {/* Laser Scanner animation effect */}
                    {isScanningActive && (
                      <div className="pointer-events-none absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#ff0033] shadow-[0_0_15px_#ff0033] animate-pulse z-20">
                        <div className="w-full h-12 bg-gradient-to-b from-[#ff0033]/20 to-transparent -translate-y-full"></div>
                      </div>
                    )}

                    {cameraError && (
                      <div className="p-6 text-center space-y-3 bg-red-950/80 rounded-2xl border border-red-500/50 max-w-md mx-auto z-20">
                        <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
                        <p className="text-xs text-red-200">{cameraError}</p>
                        <button
                          onClick={() => { setActiveMode('manual'); setCameraError(null); }}
                          className="btn-neon-red px-4 py-2 rounded-xl text-xs font-bold uppercase"
                        >
                          Usar Ingreso Manual de Código
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-400 text-xs font-mono">
                    Apunta la cámara de tu celular hacia el QR del pase digital. Se procesará automáticamente.
                  </p>
                </div>
              )}

              {/* MODE 2: MANUAL HASH */}
              {activeMode === 'manual' && (
                <div className="bg-metallic-card p-8 rounded-3xl border-2 border-dashed border-[#ff0033]/50 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#ff0033]/10 border border-[#ff0033]/30 flex items-center justify-center text-[#ff0033] animate-pulse">
                    <Scan className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xl text-white">
                      Validación por Código Hash QR
                    </h4>
                    <p className="text-slate-400 text-xs mt-1 max-w-sm">
                      Ingresa o pega el texto del código QR para verificar su estado en la base de datos.
                    </p>
                  </div>

                  <div className="w-full max-w-md flex gap-2">
                    <input
                      type="text"
                      value={inputHash}
                      onChange={(e) => setInputHash(e.target.value)}
                      placeholder="Pega aquí el código QR (ej: ECLIPSE-TICKET-774921)..."
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
              )}

              {/* MODE 3: SECRET BACKUP (Cédula ID / Code) */}
              {activeMode === 'backup' && (
                <div className="bg-amber-950/30 p-8 rounded-3xl border-2 border-dashed border-amber-500/60 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <KeyRound className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xl text-amber-400 uppercase tracking-wider">
                      Respaldo Secreto de Puerta
                    </h4>
                    <p className="text-slate-300 text-xs mt-1 max-w-sm">
                      Si el cliente no tiene batería o el QR no lee, ingresa su <strong>Cédula ID</strong> o el <strong>Código Secreto (BAC-ECL-xxxx)</strong>.
                    </p>
                  </div>

                  <div className="w-full max-w-md flex gap-2">
                    <input
                      type="text"
                      value={inputHash}
                      onChange={(e) => setInputHash(e.target.value)}
                      placeholder="Ej: 1098765432 o BAC-ECL-8821-5432..."
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
                            {t.tierName || 'Boleta Oficial'} — {t.holderName}
                          </span>
                          <span className="text-slate-400 font-mono text-[11px]">
                            C.C. {t.holderDni} • {t.tierName}
                          </span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          t.status === 'VALIDA' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        }`}>
                          {t.status === 'VALIDA' ? 'ACTIVA (VÁLIDA)' : 'DAÑADA (USADA)'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCAN RESULT 1: GREEN (PERMITTED - BOLETA VÁLIDA SE MARCA COMO USADA) */}
          {scanResult && scanResult.success && (
            <div className="bg-emerald-950/80 border-2 border-emerald-500 p-8 rounded-3xl text-center space-y-5 animate-fade-in shadow-[0_0_50px_rgba(16,185,129,0.35)]">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-12 h-12 animate-bounce" />
              </div>

              <div>
                <span className="px-4 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-widest shadow-md">
                  ✓ ACCESO PERMITIDO — BOLETA PROCESADA Y DAÑADA
                </span>
                <h3 className="font-heading font-black text-3xl text-white mt-3">
                  ¡PERMITIR INGRESO AL EVENTO!
                </h3>
              </div>

              <div className="bg-black/80 p-5 rounded-2xl border border-emerald-500/40 text-left text-xs space-y-2 text-slate-200 max-w-md mx-auto shadow-inner">
                <p><span className="text-slate-400">Tipo de Entrada:</span> <strong className="text-[#ff0033] font-mono text-base">{scanResult.ticket.tierName || "Boleta Oficial"}</strong></p>
                <p><span className="text-slate-400">Titular:</span> <strong>{scanResult.ticket.holderName}</strong> (C.C. {scanResult.ticket.holderDni})</p>
                <p><span className="text-slate-400">Localidad:</span> <span className="text-emerald-400 font-bold">{scanResult.ticket.tierName}</span></p>
                {scanResult.ticket.tierDescription && (
                  <p className="text-[11px] text-amber-300 italic pt-1">★ {scanResult.ticket.tierDescription}</p>
                )}
                <div className="pt-2 border-t border-white/10 text-emerald-400 font-mono text-[11px]">
                  🔒 Estado actualizado a: <strong>USADA (INHABILITADA PARA RE-INGRESO)</strong>
                </div>
              </div>

              <button
                onClick={handleResetScan}
                className="btn-silver px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                Validar Siguiente Boleta
              </button>
            </div>
          )}

          {/* SCAN RESULT 2: RED (DENIED / ALREADY USED - DETECTA DUPLICADOS / BOLETA DAÑADA) */}
          {scanResult && !scanResult.success && (
            <div className="bg-rose-950/80 border-2 border-rose-500 p-8 rounded-3xl text-center space-y-5 animate-fade-in shadow-[0_0_50px_rgba(244,63,94,0.4)]">
              <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-400 text-rose-400 flex items-center justify-center mx-auto shadow-xl animate-pulse">
                <XCircle className="w-12 h-12" />
              </div>

              <div>
                <span className="px-4 py-1 rounded-full bg-rose-600 text-white text-xs font-black uppercase tracking-widest shadow-md">
                  🚨 ALERTA - ACCESO DENEGADO
                </span>
                <h3 className="font-heading font-black text-3xl text-white mt-3">
                  {scanResult.message}
                </h3>
              </div>

              {scanResult.ticket && (
                <div className="bg-black/80 p-5 rounded-2xl border border-rose-500/40 text-left text-xs space-y-2 text-slate-200 max-w-md mx-auto shadow-inner">
                  <p><span className="text-slate-400">Tipo de Entrada:</span> <strong className="text-white font-mono">{scanResult.ticket.tierName || "Boleta Oficial"}</strong></p>
                  <p><span className="text-slate-400">Titular Registrado:</span> <strong>{scanResult.ticket.holderName}</strong> (C.C. {scanResult.ticket.holderDni})</p>
                  <p><span className="text-slate-400">Fecha de Ingreso Previo:</span> <span className="text-amber-400 font-mono">{scanResult.ticket.usedTimestamp || 'Previamente consumido'}</span></p>
                  <div className="pt-2 border-t border-rose-500/30 text-rose-400 font-bold text-[11px]">
                    ❌ Esta boleta ya fue escaneada e inhabilitada. No se permite duplicación ni re-ingreso.
                  </div>
                </div>
              )}

              <button
                onClick={handleResetScan}
                className="btn-neon-red px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg"
              >
                Volver a Escanear
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
