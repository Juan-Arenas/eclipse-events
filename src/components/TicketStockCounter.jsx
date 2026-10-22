import React from 'react';
import { Ticket, Flame, ShieldCheck, Zap, Users, AlertTriangle, ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_BUY_MESSAGE, UNDERACCESS_BUY_LINK } from '../data/initialData';

export default function TicketStockCounter({ monthlyEvent, tickets = [], onSelectBuy }) {
  if (!monthlyEvent || !monthlyEvent.tiers) return null;

  // Real availability calculation matching DB/LocalStorage tickets
  const validTickets = tickets.filter(t => t.status !== 'ANULADA' && t.status !== 'SYSTEM_CONFIG');

  const tierAvailability = monthlyEvent.tiers.map(tier => {
    const quota = tier.quota || 100;
    
    // Count tickets issued for this specific tier
    const sold = validTickets.filter(t => {
      const name = (t.tierName || '').toLowerCase();
      const tierId = (tier.id || '').toLowerCase();
      if (tierId === 'vip') return name.includes('vip');
      if (tierId === '2x1') return name.includes('2x1') || name.includes('mujeres');
      return !name.includes('vip') && !name.includes('2x1') && !name.includes('mujeres');
    }).reduce((sum, t) => sum + (Number(t.quantity) || 1), 0);

    const remaining = Math.max(0, quota - sold);
    const percentLeft = Math.round((remaining / quota) * 100);

    return {
      ...tier,
      sold,
      remaining,
      percentLeft
    };
  });

  const totalQuota = tierAvailability.reduce((sum, t) => sum + t.quota, 0);
  const totalSold = tierAvailability.reduce((sum, t) => sum + t.sold, 0);
  const totalAvailable = Math.max(0, totalQuota - totalSold);
  const totalPercentAvailable = Math.round((totalAvailable / totalQuota) * 100);

  return (
    <section className="py-6 sm:py-8 relative z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#16121c] via-[#0f0e16] to-[#08080c] border-2 border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.2)] backdrop-blur-xl">
          
          {/* Top Live Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>DISPONIBILIDAD OFICIAL EN TIEMPO REAL</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conectado a Base de Datos en Vivo</span>
            </div>
          </div>

          {/* MAIN COUNT BANNER REQUESTED: "¡Solo quedan X boletas disponibles!" */}
          <div className="text-center py-4 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-[#ff0033]/25 via-purple-600/30 to-[#ff0033]/25 border-2 border-[#ff0033]/60 shadow-[0_0_25px_rgba(255,0,51,0.3)] mb-6">
            <div className="flex items-center justify-center gap-2 text-[#ff0033] mb-1">
              <Flame className="w-5 h-5 animate-bounce" />
              <span className="text-xs font-black uppercase tracking-widest text-white">AFORO OFICIAL CONTROLADO</span>
            </div>

            <h3 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-wide uppercase drop-shadow-[0_0_20px_rgba(255,0,51,0.6)]">
              {totalAvailable > 0 ? (
                <>¡SOLO QUEDAN <span className="text-[#ff0033] underline decoration-[#ff0033] decoration-4">{totalAvailable} BOLETAS</span> DISPONIBLES!</>
              ) : (
                <span className="text-rose-400">¡BOLETERÍA TOTALMENTE AGOTADA!</span>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl mx-auto">
              {totalAvailable > 0 
                ? "El aforo se actualiza en tiempo real de forma automática con cada compra y reserva validada para evitar sobreventa."
                : "Se ha alcanzado el límite máximo de aforo permitido por logística y seguridad."}
            </p>

            {/* Global Progress Bar */}
            <div className="mt-4 max-w-lg mx-auto">
              <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                <span>Emitidas: <strong>{totalSold}</strong> / {totalQuota}</span>
                <span className="text-purple-300 font-bold">{totalAvailable} restantes ({totalPercentAvailable}%)</span>
              </div>
              <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-[#ff0033] transition-all duration-700 shadow-sm"
                  style={{ width: `${Math.min(100, Math.max(5, (totalSold / totalQuota) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* BREAKDOWN BY TIER / LOCALIDADES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {tierAvailability.map((tier) => {
              const isLow = tier.remaining <= 15;
              const isSoldOut = tier.remaining === 0;

              return (
                <div 
                  key={tier.id}
                  className={`p-4 rounded-2xl bg-black/50 border transition-all ${
                    isSoldOut 
                      ? 'border-white/10 opacity-60' 
                      : isLow 
                        ? 'border-[#ff0033]/60 shadow-[0_0_15px_rgba(255,0,51,0.2)]' 
                        : 'border-white/15 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      {tier.name}
                    </span>
                    {isSoldOut ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        AGOTADO
                      </span>
                    ) : isLow ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ff0033]/20 text-[#ff0033] border border-[#ff0033]/40 flex items-center gap-1">
                        <Flame className="w-3 h-3" /> ÚLTIMAS
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        DISPONIBLE
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-white">
                      {tier.remaining}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      / {tier.quota} boletas
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">
                    {tier.description}
                  </p>

                  {/* Tier progress bar */}
                  <div className="w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isSoldOut ? 'bg-slate-600' : isLow ? 'bg-[#ff0033]' : 'bg-purple-500'
                      }`}
                      style={{ width: `${Math.max(3, (tier.remaining / tier.quota) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Action Buttons (Compra + WhatsApp) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={UNDERACCESS_BUY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                totalAvailable > 0
                  ? 'btn-neon-red shadow-[0_0_20px_rgba(255,0,51,0.5)] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed pointer-events-none'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>{totalAvailable > 0 ? "Comprar Boletas en Línea" : "Boletas Agotadas"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={WHATSAPP_BUY_MESSAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Reservar o Comprar por WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
