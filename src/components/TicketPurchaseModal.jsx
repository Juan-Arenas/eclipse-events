import React, { useState } from 'react';
import { X, Ticket, CheckCircle2, ShieldCheck, CreditCard, User, Mail, Phone, Hash, Sparkles, ArrowRight, ArrowLeft, Wine, ShieldAlert, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import DigitalTicketPass from './DigitalTicketPass';
import TermsModal from './TermsModal';
import { GOOGLE_MAPS_LINK } from '../data/initialData';
import { wompiService } from '../services/wompiService';

export default function TicketPurchaseModal({ 
  event, 
  isOpen, 
  onClose, 
  onTicketPurchased, 
  currentSeatIndex,
  isDemoZeroMode = true 
}) {
  if (!isOpen || !event) return null;

  const [step, setStep] = useState(1); // 1: Tier, 2: Info & Payment, 3: Success
  const [selectedTier, setSelectedTier] = useState(event.tiers[0] || { id: "sencilla", name: "Boleta General", priceNormal: 1500, pricePromo: 1500, price: 1500, description: "Únicamente acceso al evento." });
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

  // Price calculation
  const unitPrice = isDemoZeroMode ? 0 : (selectedTier.pricePromo || selectedTier.priceNormal || 0);
  const totalAmount = unitPrice * quantity;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!formData.name || !formData.dni || !formData.email) {
        alert("Por favor completa los campos obligatorios: Nombre, Cédula/ID y Email.");
        return;
      }

      if (!acceptedTerms) {
        alert("Debes aceptar los Términos, Condiciones y Política de Privacidad (+16 Años con un adulto responsable) para continuar.");
        return;
      }

      setIsProcessing(true);
      
      const ticketId = `ECLIPSE-${Math.floor(100000 + Math.random() * 900000)}`;
      const qrHash = `ECLIPSE-TICKET-${ticketId}-${formData.dni}-${Date.now()}`;
      const backupCode = `BAC-ECL-${Math.floor(1000 + Math.random() * 9000)}-${formData.dni.slice(-4)}`;

      const issueTicketPass = () => {
        const newTicket = {
          id: ticketId,
          qrHash: qrHash,
          backupCode: backupCode,
          seatNumber: "AFORO GENERAL",
          eventId: event.id,
          eventTitle: event.title,
          eventDate: event.formattedDate,
          eventTime: event.time,
          venue: "Sede Campestre (En Tu Entrada Digital)",
          fullAddress: "Ubicación Confidencial Activada",
          mapsUrl: "#",
          tierName: selectedTier.name,
          tierDescription: selectedTier.description,
          quantity: quantity,
          totalPrice: totalAmount,
          holderName: formData.name,
          holderDni: formData.dni,
          holderEmail: formData.email,
          status: 'VALIDA',
          purchaseDate: new Date().toLocaleDateString('es-CO')
        };

        onTicketPurchased(newTicket);
        setPurchasedTicket(newTicket);
        setIsProcessing(false);
        setStep(3);

        confetti({
          particleCount: 140,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#ff0033', '#ffffff', '#cbd5e1']
        });
      };

      const executePaymentFlow = async () => {
        try {
          if (isDemoZeroMode || totalAmount === 0) {
            setTimeout(issueTicketPass, 800);
          } else {
            await wompiService.openCheckout({
              amountInCop: totalAmount,
              reference: `ECLIPSE-PAY-${ticketId}`,
              customerEmail: formData.email,
              customerFullName: formData.name,
              customerPhoneNumber: formData.phone || '3000000000',
              customerDni: formData.dni,
              onSuccess: (transaction) => {
                if (transaction && transaction.status === 'APPROVED') {
                  issueTicketPass();
                } else {
                  setIsProcessing(false);
                  alert("❌ Pago No Aprobado: La transacción no fue autorizada por el banco. Tu entrada NO ha sido emitida.");
                }
              },
              onError: (error) => {
                setIsProcessing(false);
                alert("❌ Pago No Aprobado / Cancelado: La pasarela Wompi no confirmó el pago. Tu entrada NO ha sido emitida.");
              }
            });
          }
        } catch (err) {
          console.error("Payment execution error:", err);
          setIsProcessing(false);
          alert("❌ Error de Comunicación: Ocurrió un problema conectando con la pasarela. No se realizó ningún cobro ni se emitió la boleta.");
        }
      };

      executePaymentFlow();
    }
  };

  const handleClose = () => {
    setStep(1);
    setPurchasedTicket(null);
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
                      Selecciona tu Entrada:
                    </label>
                    <span className="text-[10px] text-amber-300 font-bold bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                      ⚡ Promo Primeros 20 Compradores
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* BOLETA GENERAL */}
                    <div
                      onClick={() => setSelectedTier(event.tiers[0])}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                        selectedTier.id === event.tiers[0].id
                          ? 'bg-[#ff0033]/15 border-[#ff0033] shadow-[0_0_25px_rgba(255,0,51,0.35)]'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-heading font-black text-lg text-white">Boleta General</h4>
                          {selectedTier.id === event.tiers[0].id && (
                            <CheckCircle2 className="w-5 h-5 text-[#ff0033]" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-300 block mb-1">
                          Beneficio:
                        </span>
                        <p className="text-xs text-slate-400 bg-black/40 p-2.5 rounded-xl border border-white/10">
                          • Únicamente acceso al evento.
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                        <span className="text-xs text-slate-400">Precio Promo</span>
                        {isDemoZeroMode ? (
                          <span className="font-heading font-black text-xl text-emerald-400">$0 COP</span>
                        ) : (
                          <div className="text-right">
                            <span className="font-heading font-black text-lg text-emerald-400">$1.500 COP</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* BOLETA VIP */}
                    <div
                      onClick={() => setSelectedTier(event.tiers[1] || event.tiers[0])}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                        selectedTier.id === (event.tiers[1]?.id || 'vip')
                          ? 'bg-[#ff0033]/20 border-[#ff0033] shadow-[0_0_25px_rgba(255,0,51,0.4)]'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-heading font-black text-lg text-white flex items-center gap-1.5">
                            <Wine className="w-4 h-4 text-[#ff0033]" /> Boleta VIP
                          </span>
                          {selectedTier.id === (event.tiers[1]?.id || 'vip') && (
                            <CheckCircle2 className="w-5 h-5 text-[#ff0033]" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-300 block mb-1">
                          Beneficios:
                        </span>
                        <p className="text-xs text-slate-300 bg-black/40 p-2.5 rounded-xl border border-white/10">
                          • Acceso preferencial sin filas.<br />
                          • <strong>Eclipse Drinks Adicional incluido.</strong>
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-baseline justify-between">
                        <span className="text-xs text-slate-400">Precio Promo</span>
                        {isDemoZeroMode ? (
                          <span className="font-heading font-black text-xl text-emerald-400">$0 COP</span>
                        ) : (
                          <div className="text-right">
                            <span className="font-heading font-black text-lg text-emerald-400">$1.500 COP</span>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
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

                {/* Sandbox Info Callout for Test Mode */}
                {wompiService.isSandboxMode() && !isDemoZeroMode && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Wompi en Modo Sandbox (Pruebas)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
                        SIMULACIÓN
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-100/80 leading-relaxed">
                      Wompi <strong>rechaza tarjetas reales</strong> en modo pruebas. Para aprobar el pago en la pasarela, usa la tarjeta de prueba oficial:
                    </p>
                    <div className="bg-black/50 p-2.5 rounded-xl border border-amber-500/20 font-mono text-[11px] text-white flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-slate-400 text-[10px] block">NÚMERO DE TARJETA:</span>
                        <strong className="text-amber-300 tracking-wider">4242 4242 4242 4242</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">VENCE:</span>
                        <strong className="text-amber-300">12/28</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">CVC:</span>
                        <strong className="text-amber-300">123</strong>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
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
                    className="flex-1 btn-neon-red py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span className="animate-pulse">Conectando con Pasarela Wompi...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pagar con Wompi (${totalAmount.toLocaleString('es-CO')} COP)</span>
                      </>
                    )}
                  </button>
                </div>

                {isProcessing && !isDemoZeroMode && (
                  <div className="text-center pt-2 animate-fade-in">
                    <p className="text-[11px] text-slate-400 mb-1">¿No se abre la ventana desplegable de Wompi?</p>
                    <button
                      type="button"
                      onClick={async () => {
                        const ticketId = `ECLIPSE-${Math.floor(100000 + Math.random() * 900000)}`;
                        const url = await wompiService.buildWebCheckoutUrl({
                          amountInCop: totalAmount,
                          reference: `ECLIPSE-PAY-${ticketId}`
                        });
                        window.location.href = url;
                      }}
                      className="text-xs text-[#ff0033] font-bold underline hover:text-white transition-colors"
                    >
                      ⚡ Clic aquí para abrir Wompi en Ventana Completa (Redirección Directa)
                    </button>
                  </div>
                )}
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
                    ¡Boleta Emitida con Éxito!
                  </h3>
                  <p className="text-slate-300 text-xs mt-1">
                    Se asignó la <strong className="text-[#ff0033]">{purchasedTicket.seatNumber}</strong> a nombre de <strong>{purchasedTicket.holderName}</strong>.
                  </p>
                </div>

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
