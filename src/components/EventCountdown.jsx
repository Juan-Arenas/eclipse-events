import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles, AlertCircle, Zap } from 'lucide-react';

export default function EventCountdown({ targetDate = "2026-11-28", tentativeTime = "20:00" }) {
  // Target: 2026-11-28 20:00:00 Colombia Time (UTC-5)
  const calculateTimeLeft = () => {
    // Colombia is UTC-5
    // Construct ISO string for America/Bogota (-05:00)
    const targetISO = `${targetDate}T${tentativeTime}:00-05:00`;
    const targetMs = new Date(targetISO).getTime();
    const nowMs = Date.now();
    const difference = targetMs - nowMs;

    // Assume event duration is ~12 hours (until next morning 08:00 AM)
    const eventEndMs = targetMs + 12 * 60 * 60 * 1000;

    if (difference <= 0) {
      if (nowMs < eventEndMs) {
        return { status: 'STARTED' };
      }
      return { status: 'ENDED' };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      status: 'COUNTING',
      days,
      hours,
      minutes,
      seconds
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, tentativeTime]);

  const padZero = (n) => String(n).padStart(2, '0');

  return (
    <section className="relative py-6 sm:py-8 overflow-hidden z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Glow ambient effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-28 bg-[#ff0033]/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#13131f] via-[#0d0d15] to-[#07070a] border-2 border-[#ff0033]/40 shadow-[0_0_40px_rgba(255,0,51,0.25)] backdrop-blur-xl">
          
          {/* Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff0033]/15 border border-[#ff0033]/40 text-[#ff0033] text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,0,51,0.3)]">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span>CUENTA REGRESIVA OFICIAL</span>
            </div>

            <h2 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-wider uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              ¡FALTAN PARA EL EVENTO!
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <Calendar className="w-4 h-4 text-[#ff0033]" />
                Sábado, 28 de Noviembre de 2026
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Hora exacta: Pendiente por confirmar (Apertura estimada: 08:00 PM)
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 font-mono text-[11px]">
                Zona horaria: Colombia (America/Bogota)
              </span>
            </div>
          </div>

          {/* Dynamic State rendering */}
          {timeLeft.status === 'STARTED' ? (
            <div className="text-center py-8 space-y-3 bg-[#ff0033]/10 rounded-2xl border border-[#ff0033]/40 animate-pulse">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#ff0033] flex items-center justify-center text-white shadow-[0_0_30px_#ff0033]">
                <Zap className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-widest uppercase">
                ¡EL EVENTO HA COMENZADO!
              </h3>
              <p className="text-slate-200 text-sm max-w-md mx-auto">
                Las puertas de Finca Hotel Villa Luisa están abiertas. Presenta tu entrada digital en portería.
              </p>
            </div>
          ) : timeLeft.status === 'ENDED' ? (
            <div className="text-center py-6 space-y-2 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="font-heading font-black text-2xl text-slate-300 uppercase">
                ¡El evento ha finalizado!
              </h3>
              <p className="text-slate-400 text-xs">
                Gracias a todos los asistentes. ¡Nos vemos en nuestra próxima edición de Eclipse Events!
              </p>
            </div>
          ) : (
            /* Active 4-Unit Countdown: DÍAS : HORAS : MINUTOS : SEGUNDOS */
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
                
                {/* DÍAS */}
                <div className="relative group bg-black/60 rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 hover:border-[#ff0033]/60">
                  <span className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight drop-shadow-[0_0_12px_rgba(255,0,51,0.5)]">
                    {padZero(timeLeft.days)}
                  </span>
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#ff0033] mt-1">
                    DÍAS
                  </span>
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#ff0033] animate-ping" />
                </div>

                {/* HORAS */}
                <div className="relative group bg-black/60 rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 hover:border-[#ff0033]/60">
                  <span className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight drop-shadow-[0_0_12px_rgba(255,0,51,0.5)]">
                    {padZero(timeLeft.hours)}
                  </span>
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#ff0033] mt-1">
                    HORAS
                  </span>
                </div>

                {/* MINUTOS */}
                <div className="relative group bg-black/60 rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col items-center justify-center shadow-lg transition-transform hover:scale-105 hover:border-[#ff0033]/60">
                  <span className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight drop-shadow-[0_0_12px_rgba(255,0,51,0.5)]">
                    {padZero(timeLeft.minutes)}
                  </span>
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#ff0033] mt-1">
                    MINUTOS
                  </span>
                </div>

                {/* SEGUNDOS */}
                <div className="relative group bg-black/60 rounded-2xl p-4 sm:p-5 border border-[#ff0033]/50 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(255,0,51,0.3)] transition-transform hover:scale-105">
                  <span className="font-heading font-black text-4xl sm:text-6xl text-[#ff0033] tracking-tight drop-shadow-[0_0_20px_#ff0033] font-mono">
                    {padZero(timeLeft.seconds)}
                  </span>
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-white mt-1">
                    SEGUNDOS
                  </span>
                  <span className="absolute bottom-1 w-8 h-0.5 bg-[#ff0033] rounded-full animate-pulse" />
                </div>

              </div>

              {/* Text visual string as requested */}
              <div className="text-center mt-5 pt-4 border-t border-white/10">
                <p className="font-mono text-xs sm:text-sm text-slate-300 font-bold tracking-widest uppercase">
                  {timeLeft.days} DÍAS : {padZero(timeLeft.hours)} HORAS : {padZero(timeLeft.minutes)} MINUTOS : {padZero(timeLeft.seconds)} SEGUNDOS
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
