import React, { useState } from 'react';
import { X, Ticket, CheckCircle2, ShieldCheck, CreditCard, User, Mail, Phone, Hash, Sparkles, ArrowRight, ArrowLeft, Wine, ShieldAlert, FileText, MessageCircle, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import DigitalTicketPass from './DigitalTicketPass';
import TermsModal from './TermsModal';
import { GOOGLE_MAPS_LINK, WHATSAPP_BUY_MESSAGE, WHATSAPP_NUMBER, UNDERACCESS_BUY_LINK } from '../data/initialData';

export default function TicketPurchaseModal({ 
  event, 
  isOpen, 
  onClose, 
  onTicketPurchased, 
  currentSeatIndex,
  isDemoZeroMode = false,
  tickets = []
}) {
  if (!isOpen || !event) return null;

  const [step, setStep] = useState(1); // 1: Tier, 2: Info & Payment, 3: Success
  const [selectedTier, setSelectedTier] = useState(event.tiers?.[0] || { id: "sencilla", name: "Entrada Normal", priceNormal: 25000, pricePromo: 20000, price: 25000, quota: 300, description: "Acceso general al evento." });
  const [quantity, setQuantity] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    email: '',
    phone: '',
    paymentMethod: 'credit'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchasedTicket, setPurchasedTicket] = useState(null);
  const [allIssuedTickets, setAllIssuedTickets] = useState([]);
  const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);

  // Helper to calculate remaining stock for any tier based on real issued tickets
  const getTierRemaining = (tier) => {
    if (!tier) return 0;
    const quota = tier.quota || 100;
    const tierId = (tier.id || '').toLowerCase();

    const sold = (tickets || []).filter(t => {
      if (t.status === 'ANULADA' || t.status === 'SYSTEM_CONFIG') return false;
      const name = (t.tierName || '').toLowerCase();
      if (tierId === 'vip') return name.includes('vip');
      if (tierId === '2x1') return name.includes('2x1') || name.includes('mujeres');
      return !name.includes('vip') && !name.includes('2x1') && !name.includes('mujeres');
    }).reduce((sum, t) => sum + (Number(t.quantity) || 1), 0);

    return Math.max(0, quota - sold);
  };

  const currentTierRemaining = getTierRemaining(selectedTier);

  // Price calculation
  const unitPrice = isDemoZeroMode ? 0 : (selectedTier.pricePromo || selectedTier.priceNormal || selectedTier.price || 25000);
  const totalAmount = unitPrice * quantity;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      // ANTI-OVERSELL PROTECTION
      if (currentTierRemaining <= 0) {
        alert(`❌ Aforo Agotado: La localidad "${selectedTier.name}" no tiene boletas disponibles.`);
        return;
      }
      if (quantity > currentTierRemaining) {
        alert(`⚠️ Aforo Insuficiente: Solo quedan ${currentTierRemaining} boletas disponibles para "${selectedTier.name}". Por favor selecciona como máximo ${currentTierRemaining} unidades.`);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Re-verify anti-oversell right before payment/issuing
      const freshRemaining = getTierRemaining(selectedTier);
      if (quantity > freshRemaining) {
        alert(`⚠️ Aforo insuficiente en este momento: Solo quedan ${freshRemaining} boletas disponibles. Por favor ajusta tu cantidad.`);
        setStep(1);
        return;
      }

      const trimmedName = formData.name.trim();
      const cleanDni = formData.dni.replace(/[^a-zA-Z0-9]/g, '').trim();
      const trimmedEmail = formData.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!trimmedName || trimmedName.length < 3) {
        alert("Por favor ingresa tu nombre completo (mínimo 3 caracteres).");
        return;
      }

      if (!cleanDni || cleanDni.length < 6) {
        alert("Por favor ingresa un número de cédula o documento válido (mínimo 6 dígitos).");
        return;
      }

      if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
        alert("Por favor ingresa un correo electrónico válido (ejemplo: nombre@gmail.com).");
        return;
      }

      if (!acceptedTerms) {
        alert("Debes aceptar los Términos, Condiciones y Política de Privacidad (+16 Años con un adulto responsable) para continuar.");
        return;
      }

      setIsProcessing(true);

      const safeQty = Math.max(1, Math.min(10, Number(quantity) || 1));
      const baseId = Math.floor(100000 + Math.random() * 900000);
      const generatedTickets = [];

      for (let i = 0; i < safeQty; i++) {
        const ticketId = safeQty === 1 ? `ECLIPSE-${baseId}` : `ECLIPSE-${baseId}-${i + 1}`;

        // Cryptographically secure token (64-bit entropy)
        const randomBuf = new Uint8Array(6);
        crypto.getRandomValues(randomBuf);
        const secureRandom = Array.from(randomBuf).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

        const backupBuf = new Uint8Array(3);
        crypto.getRandomValues(backupBuf);
        const secureBackup = Array.from(backupBuf).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

        const qrHash = `ECLIPSE-TICKET-${ticketId}-${secureRandom}-${cleanDni}`;
        const backupCode = `BAC-ECL-${secureBackup}-${cleanDni.slice(-4)}`;

        const newTicket = {
          id: ticketId,
          qrHash: qrHash,
          backupCode: backupCode,
          seatNumber: "AFORO GENERAL",
          eventId: event.id || 'evt-monthly-main',
          eventTitle: event.title || 'ECLIPSE FESTIVAL 2026',
          eventDate: event.formattedDate || 'Sábado, 28 de Noviembre, 2026',
          eventTime: event.time || 'Hora por confirmar (Apertura 08:00 PM)',
          venue: event.venue || "Finca Hotel Villa Luisa",
          fullAddress: event.unlockedAddress || "Vereda El Lembo, Santa Rosa de Cabal, Risaralda",
          mapsUrl: GOOGLE_MAPS_LINK,
          tierName: selectedTier.name + (safeQty > 1 ? ` (Pase ${i + 1} de ${safeQty})` : ""),
          tierDescription: selectedTier.description,
          quantity: 1,
          totalPrice: totalAmount / safeQty,
          holderName: trimmedName,
          holderDni: cleanDni,
          holderEmail: trimmedEmail,
          status: 'VALIDA',
          purchaseDate: new Date().toLocaleDateString('es-CO')
        };
        generatedTickets.push(newTicket);
      }

      const issueTicketPass = () => {
        generatedTickets.forEach(t => onTicketPurchased(t));
        setPurchasedTicket(generatedTickets[0]);
        setAllIssuedTickets(generatedTickets);
        setSelectedTicketIndex(0);
        setIsProcessing(false);
        setStep(3);

        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#ff0033', '#ffffff', '#cbd5e1']
        });
      };

      const executePaymentFlow = () => {
        setIsProcessing(true);
        setTimeout(() => {
          window.location.href = UNDERACCESS_BUY_LINK;
        }, 200);
      };

      executePaymentFlow();
    }
  };

  const handleClose = () => {
    setStep(1);
    setPurchasedTicket(null);
    setAllIssuedTickets([]);
    setSelectedTicketIndex(0);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
        <div className="relative w-full max-w-2xl bg-[#0d0d14] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-8">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-black/40 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ff0033]/20 border border-[#ff0033]/40 text-[#ff0033] text-[10px] font-bold uppercase">
                <Ticket className="w-3 h-3" /> Boletería Oficial Eclipse Events
              </div>
              <h3 className="font-heading font-black text-2xl text-white mt-1">
                {event.title}
              </h3>
            </div>

            <button
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff0033] text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Steps */}
          {step < 3 && (
            <div className="px-6 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs font-semibold text-slate-400">
              <span className={step === 1 ? 'text-[#ff0033] font-bold' : ''}>1. Tipo de Boleta</span>
              <span>&rarr;</span>
              <span className={step === 2 ? 'text-[#ff0033] font-bold' : ''}>2. Datos & Legales</span>
              <span>&rarr;</span>
              <span>3. Boleta & QR</span>
            </div>
          )}

          {/* Content Body */}
          <div className="p-6 sm:p-8">
            
            {/* STEP 1: Select Tier */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      Selecciona tu Localidad:
                    </label>
                    <span className="text-[10px] text-amber-300 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      ⚡ Disponibilidad Oficial en Tiempo Real
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(event.tiers || []).map((tier) => {
                      const tierRem = getTierRemaining(tier);
                      const isSelected = selectedTier.id === tier.id;
                      const isSoldOut = tierRem <= 0;
                      const priceToShow = isDemoZeroMode ? 0 : (tier.pricePromo || tier.priceNormal || tier.price || 25000);

                      return (
                        <div
                          key={tier.id}
                          onClick={() => {
                            if (!isSoldOut) setSelectedTier(tier);
                          }}
                          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                            isSoldOut
                              ? 'bg-black/40 border-white/10 opacity-50 cursor-not-allowed'
                              : isSelected
                                ? 'bg-[#ff0033]/20 border-[#ff0033] shadow-[0_0_20px_rgba(255,0,51,0.35)] cursor-pointer'
                                : 'bg-white/5 border-white/10 hover:border-white/20 cursor-pointer'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <h4 className="font-heading font-black text-base text-white">{tier.name}</h4>
                              {isSelected && !isSoldOut && (
                                <CheckCircle2 className="w-4 h-4 text-[#ff0033]" />
                              )}
                              {isSoldOut && (
                                <span className="text-[9px] font-bold text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">AGOTADO</span>
                              )}
                            </div>

                            <p className="text-[11px] text-slate-400 bg-black/40 p-2 rounded-xl border border-white/5 min-h-[44px]">
                              {tier.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-white/10 space-y-1">
                            <div className="flex items-baseline justify-between">
                              <span className="text-[10px] text-slate-400 uppercase">Precio</span>
                              <span className="font-heading font-black text-base text-emerald-400">
                                ${priceToShow.toLocaleString('es-CO')} COP
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="text-slate-400">Disponibles:</span>
                              <span className={tierRem <= 15 ? 'text-[#ff0033] font-bold' : 'text-purple-300 font-bold'}>
                                {tierRem} de {tier.quota || 100}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Direct WhatsApp Option */}
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-200">
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>¿Prefieres comprar o reservar por WhatsApp?</span>
                  </div>
                  <a
                    href={WHATSAPP_BUY_MESSAGE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                  >
                    <span>Escribir al {WHATSAPP_NUMBER}</span>
                  </a>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div>
                    <span className="text-sm font-bold text-white block">Cantidad de Entradas</span>
                    <span className="text-xs text-slate-400">Acceso General / Aforo Oficial</span>
                  </div>

                  <div className="flex items-center gap-3 bg-black/50 border border-white/20 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-white text-base px-2">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full btn-neon-red py-4 rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Continuar a Registro & Términos Legales</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: Buyer Info Form & Mandatory Legal Terms */}
            {step === 2 && (
              <form onSubmit={handleNextStep} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#ff0033]" /> Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Juan Carlos Pérez"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5 text-[#ff0033]" /> Documento / Cédula ID (+16 Años) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.dni}
                      onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                      placeholder="Ej. 1098765432"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#ff0033]" /> Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ejemplo@email.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> Teléfono Celular
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+57 300 123 4567"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff0033]"
                    />
                  </div>
                </div>

                {/* MANDATORY LEGAL TERMS & PRIVACY POLICY CHECKBOX (+16 AÑOS CON ADULTO RESPONSABLE) */}
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      required
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-700 bg-black text-[#ff0033] focus:ring-[#ff0033]"
                    />
                    <label htmlFor="termsCheckbox" className="text-xs text-slate-300 leading-snug cursor-pointer">
                      Declaro que soy <strong>MAYOR DE 16 AÑOS</strong> (o asisto bajo la supervisión de un <u className="underline font-bold text-rose-300">adulto responsable</u>) y acepto plenamente los{' '}
                      <button
                        type="button"
                        onClick={() => setIsTermsModalOpen(true)}
                        className="text-[#ff0033] underline font-bold hover:text-white"
                      >
                        Términos, Condiciones y Políticas de Privacidad
                      </button>{' '}
                      de Eclipse Events. Entiendo que los menores de edad ingresan bajo la <u className="underline font-bold text-rose-300">exclusiva responsabilidad de su adulto responsable acompañante</u>, eximiendo a la organización de toda responsabilidad legal.
                    </label>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">{selectedTier.name} x {quantity}</span>
                    <span className="text-slate-400 text-[11px]">{selectedTier.description}</span>
                  </div>
                  <span className="font-heading font-black text-xl text-emerald-400">
                    ${totalAmount.toLocaleString('es-CO')} COP
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-silver px-4 py-3.5 rounded-xl text-xs font-bold uppercase flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Volver
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 btn-neon-red py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,0,51,0.5)] cursor-pointer"
                  >
                    {isProcessing ? (
                      <span className="animate-pulse">Redirigiendo a Pasarela de Pago...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>IR A PAGAR EN LÍNEA (${totalAmount.toLocaleString('es-CO')} COP)</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center pt-2">
                  <a
                    href={UNDERACCESS_BUY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-[#ff0033] transition-colors"
                  >
                    ¿Problemas con la redirección? Clic aquí para abrir la pasarela oficial
                  </a>
                </div>
              </form>
            )}

            {/* STEP 3: DIGITAL TICKET PASS */}
            {step === 3 && purchasedTicket && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#ff0033]/20 border-2 border-[#ff0033] text-[#ff0033] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,0,51,0.6)]">
                  <Sparkles className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <h3 className="font-heading font-black text-3xl text-white">
                    ¡{allIssuedTickets.length > 1 ? `${allIssuedTickets.length} Boletas Emitidas con Éxito!` : 'Boleta Emitida con Éxito!'}
                  </h3>
                  <p className="text-slate-300 text-xs mt-1">
                    Acceso General Oficial a nombre de <strong>{purchasedTicket.holderName}</strong> (C.C. {purchasedTicket.holderDni}).
                  </p>
                </div>

                {/* Multiple tickets tab switcher if quantity > 1 */}
                {allIssuedTickets.length > 1 && (
                  <div className="flex items-center justify-center gap-2 flex-wrap bg-white/5 p-2 rounded-2xl border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block w-full text-center mb-1">
                      Selecciona para ver cada pase individual con su QR único:
                    </span>
                    {allIssuedTickets.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedTicketIndex(idx);
                          setPurchasedTicket(allIssuedTickets[idx]);
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedTicketIndex === idx
                            ? 'bg-[#ff0033] text-white shadow-[0_0_10px_rgba(255,0,51,0.5)]'
                            : 'bg-white/10 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        Pase {idx + 1} de {allIssuedTickets.length}
                      </button>
                    ))}
                  </div>
                )}

                {/* Custom Ticket Pass */}
                <DigitalTicketPass ticket={purchasedTicket} />

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleClose}
                    className="btn-silver px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider"
                  >
                    Ver en Mis Entradas
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Legal Terms & Privacy Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </>
  );
}
