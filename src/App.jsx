import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventCountdown from './components/EventCountdown';
import TicketStockCounter from './components/TicketStockCounter';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import FincaSpotlight from './components/FincaSpotlight';
import FincaGalleryModal from './components/FincaGalleryModal';
import EventBillboard from './components/EventBillboard';
import TicketPurchaseModal from './components/TicketPurchaseModal';
import MyTicketsModal from './components/MyTicketsModal';
import QRValidatorModal from './components/QRValidatorModal';
import SecretAdminAuthModal from './components/SecretAdminAuthModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import ScrollReveal from './components/ScrollReveal';
import Footer from './components/Footer';
import { INITIAL_MONTHLY_EVENT, GOOGLE_MAPS_LINK } from './data/initialData';
import { ticketService } from './services/ticketService';
import { wompiService } from './services/wompiService';
import { eventConfigService } from './services/eventConfigService';

export default function App() {
  const [monthlyEvent, setMonthlyEvent] = useState(() => {
    const saved = localStorage.getItem('eclipse_monthly_event');
    if (!saved) return INITIAL_MONTHLY_EVENT;
    try {
      const parsed = JSON.parse(saved);
      // Migrate if old date or old venue was cached
      if (parsed.date === '2026-10-24' || !parsed.date) {
        parsed.date = '2026-11-28';
        parsed.formattedDate = 'Sábado, 28 de Noviembre, 2026';
        parsed.time = 'Hora por confirmar (Apertura 08:00 PM)';
      }
      parsed.venue = INITIAL_MONTHLY_EVENT.venue;
      parsed.unlockedVenue = INITIAL_MONTHLY_EVENT.unlockedVenue;
      parsed.unlockedAddress = INITIAL_MONTHLY_EVENT.unlockedAddress;
      parsed.image = INITIAL_MONTHLY_EVENT.image;
      if (!parsed.tiers || parsed.tiers.length < 3) {
        parsed.tiers = INITIAL_MONTHLY_EVENT.tiers;
      }
      return parsed;
    } catch (e) {
      return INITIAL_MONTHLY_EVENT;
    }
  });

  const [seatCounter, setSeatCounter] = useState(() => {
    const saved = localStorage.getItem('eclipse_seat_counter');
    return saved ? JSON.parse(saved) : 2;
  });

  // Wompi real mode ($1 COP per ticket for real gateway test)
  const [isDemoZeroMode, setIsDemoZeroMode] = useState(() => {
    const saved = localStorage.getItem('eclipse_demo_zero_mode');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const initialDefaultTickets = [
    {
      id: 'ECLIPSE-774921',
      qrHash: 'ECLIPSE-TICKET-ECLIPSE-774921-1098765432-1700000000',
      backupCode: 'BAC-ECL-8821-5432',
      seatNumber: 'AFORO GENERAL',
      eventId: 'evt-monthly-main',
      eventTitle: 'ECLIPSE FESTIVAL 2026',
      eventDate: 'Sábado, 28 de Noviembre, 2026',
      eventTime: 'Hora por confirmar (Apertura 08:00 PM)',
      venue: 'Finca Hotel Villa Luisa',
      fullAddress: 'Vereda El Lembo, Santa Rosa de Cabal, Risaralda',
      mapsUrl: GOOGLE_MAPS_LINK,
      tierName: 'Boleta VIP',
      tierDescription: 'Acceso preferencial + Eclipse Drinks Adicional incluido.',
      quantity: 1,
      totalPrice: 0,
      holderName: 'Juan Arenas',
      holderDni: '1098765432',
      holderEmail: 'fullvibessss@gmail.com',
      status: 'VALIDA',
      purchaseDate: new Date().toLocaleDateString('es-CO')
    }
  ];

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('eclipse_user_tickets');
    const raw = saved ? JSON.parse(saved) : initialDefaultTickets;
    return raw.map(t => ({
      ...t,
      venue: 'Finca Hotel Villa Luisa',
      fullAddress: 'Vereda El Lembo, Santa Rosa de Cabal, Risaralda',
      mapsUrl: GOOGLE_MAPS_LINK
    }));
  });

  // Sync with DB on mount & real-time listener
  useEffect(() => {
    const loadDbTickets = async () => {
      const fetched = await ticketService.getTickets(initialDefaultTickets);
      setTickets(fetched);
    };
    loadDbTickets();

    const unsubscribe = ticketService.subscribeToChanges(() => {
      loadDbTickets();
    });

    return () => unsubscribe();
  }, []);

  // Real-time synchronization of DJs / Lineup and Event Config from Supabase
  useEffect(() => {
    const loadDbConfig = async () => {
      const config = await eventConfigService.getEventConfig(INITIAL_MONTHLY_EVENT);
      if (config) {
        setMonthlyEvent(prev => ({
          ...prev,
          ...config,
          image: (config.image && !config.image.includes('IMG_0239')) ? config.image : INITIAL_MONTHLY_EVENT.image,
          lineup: config.lineup || prev.lineup
        }));
      }
    };
    loadDbConfig();

    const unsubscribeConfig = eventConfigService.subscribeToChanges((updated) => {
      setMonthlyEvent(prev => ({
        ...prev,
        ...updated,
        lineup: updated.lineup || prev.lineup
      }));
    });

    return () => unsubscribeConfig();
  }, []);

  const handleUpdateMonthlyEvent = (updated) => {
    setMonthlyEvent(updated);
    eventConfigService.saveEventConfig(updated);
  };

  // Handle Wompi Redirect Callback (if user was redirected after payment)
  useEffect(() => {
    const checkWompiRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const transactionId = urlParams.get('id');

      if (!transactionId) return;

      // 1. Immediately clean URL search params to avoid browser re-processing on reload
      window.history.replaceState({}, document.title, window.location.pathname);

      // 2. Anti-Replay Protection: check if this transaction has ALREADY been processed
      const processedKey = `eclipse_wompi_processed_${transactionId}`;
      if (localStorage.getItem(processedKey)) {
        console.info('Transacción Wompi ya procesada anteriormente:', transactionId);
        return;
      }

      // Mark transaction in-flight to prevent duplicate concurrent runs
      localStorage.setItem(processedKey, 'processing');

      try {
        const transaction = await wompiService.verifyTransaction(transactionId);
        if (transaction && transaction.status === 'APPROVED') {
          const reference = transaction.reference;
          const pendingInfoRaw = sessionStorage.getItem(`eclipse_pending_info_${reference}`) ||
                                 localStorage.getItem(`eclipse_pending_info_${reference}`);
          const pendingInfo = pendingInfoRaw ? JSON.parse(pendingInfoRaw) : {};

          const numTickets = Math.max(1, Math.min(10, Number(pendingInfo.quantity) || 1));
          const isVip = (pendingInfo.tierName || '').toLowerCase().includes('vip') || (transaction.amount_in_cents >= 150000);
          const tierName = pendingInfo.tierName || (isVip ? "Boleta VIP" : "Boleta General");
          const tierDescription = pendingInfo.tierDescription || (isVip ? "Acceso preferencial + Eclipse Drinks Adicional incluido." : "Únicamente acceso al evento.");

          const baseId = Math.floor(100000 + Math.random() * 900000);
          const cleanDni = (pendingInfo.customerDni || transaction.customer_data?.legal_id || '1098765432').replace(/\D/g, '') || '1098765432';
          const buyerName = pendingInfo.customerFullName || transaction.customer_data?.full_name || 'Comprador Eclipse';
          const buyerEmail = pendingInfo.customerEmail || transaction.customer_email || 'cliente@eclipseevents.com';

          const issuedTickets = [];

          for (let i = 0; i < numTickets; i++) {
            const ticketId = numTickets === 1 ? `ECLIPSE-${baseId}` : `ECLIPSE-${baseId}-${i + 1}`;
            
            // Cryptographically secure token (64-bit entropy)
            const randomBuf = new Uint8Array(6);
            crypto.getRandomValues(randomBuf);
            const secureRandom = Array.from(randomBuf).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

            // Cryptographically secure backup code
            const backupBuf = new Uint8Array(3);
            crypto.getRandomValues(backupBuf);
            const secureBackup = Array.from(backupBuf).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

            const qrHash = `ECLIPSE-TICKET-${ticketId}-${secureRandom}-${cleanDni}`;
            const backupCode = `BAC-ECL-${secureBackup}-${cleanDni.slice(-4)}`;

            const singleTicket = {
              id: ticketId,
              qrHash: qrHash,
              backupCode: backupCode,
              seatNumber: "AFORO GENERAL",
              eventId: pendingInfo.eventId || monthlyEvent.id,
              eventTitle: pendingInfo.eventTitle || monthlyEvent.title,
              eventDate: pendingInfo.eventDate || monthlyEvent.formattedDate,
              eventTime: pendingInfo.eventTime || monthlyEvent.time,
              venue: monthlyEvent.venue || "Finca Hotel Villa Luisa",
              fullAddress: monthlyEvent.unlockedAddress || "Vereda El Lembo, Santa Rosa de Cabal, Risaralda",
              mapsUrl: GOOGLE_MAPS_LINK,
              tierName: tierName + (numTickets > 1 ? ` (Pase ${i + 1} de ${numTickets})` : ""),
              tierDescription: tierDescription,
              quantity: 1,
              totalPrice: (transaction.amount_in_cents || 150000) / (100 * numTickets),
              holderName: buyerName,
              holderDni: cleanDni,
              holderEmail: buyerEmail,
              status: 'VALIDA',
              purchaseDate: new Date().toLocaleDateString('es-CO'),
              wompiTransactionId: transactionId,
              wompiReference: reference
            };

            issuedTickets.push(singleTicket);
            await handleTicketPurchased(singleTicket);
          }

          // Mark as confirmed in storage
          localStorage.setItem(processedKey, 'confirmed');

          // Clean up pending purchase temporary items
          sessionStorage.removeItem(`eclipse_pending_info_${reference}`);
          localStorage.removeItem(`eclipse_pending_info_${reference}`);

          setIsTicketsModalOpen(true);
          alert(`🎉 ¡Pago Aprobado por Wompi!\nSe ${numTickets === 1 ? 'ha emitido con éxito tu entrada' : `han emitido con éxito tus ${numTickets} entradas`} (${tierName}) a nombre de ${buyerName}.\nPuedes verlas y descargarlas con su código QR en "Mis Entradas".`);
        } else if (transaction) {
          localStorage.removeItem(processedKey);
          alert(`❌ Transacción Wompi ${transaction.status}: El pago no fue aprobado. No se realizó ningún cobro ni se emitió la entrada.`);
        }
      } catch (err) {
        console.error('Error procesando retorno de Wompi:', err);
        localStorage.removeItem(processedKey);
      }
    };

    checkWompiRedirect();
  }, []);

  useEffect(() => {
    localStorage.setItem('eclipse_monthly_event', JSON.stringify(monthlyEvent));
  }, [monthlyEvent]);

  useEffect(() => {
    localStorage.setItem('eclipse_user_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('eclipse_seat_counter', JSON.stringify(seatCounter));
  }, [seatCounter]);

  useEffect(() => {
    localStorage.setItem('eclipse_demo_zero_mode', JSON.stringify(isDemoZeroMode));
  }, [isDemoZeroMode]);

  // UI States
  const [activeSection, setActiveSection] = useState('hero');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isSecretAuthModalOpen, setIsSecretAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'cartelera') {
      const el = document.getElementById('cartelera-eventos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'finca') {
      const el = document.getElementById('finca-terrenito');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenPurchase = () => {
    setIsPurchaseModalOpen(true);
  };

  const handleTicketPurchased = async (newTicket) => {
    setTickets(prev => {
      const updated = [newTicket, ...prev];
      localStorage.setItem('eclipse_user_tickets', JSON.stringify(updated));
      return updated;
    });
    setSeatCounter(prev => prev + 1);
    await ticketService.createTicket(newTicket);
  };

  const handleDeleteTicket = async (ticketId) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
    await ticketService.deleteTicket(ticketId);
  };

  const handleValidateTicket = (queryInput) => {
    const result = ticketService.validateTicket(tickets, queryInput);
    
    // Update local state sync immediately
    if (result.success && result.ticket) {
      setTickets(prev => {
        const nextTickets = prev.map(t => t.id === result.ticket.id ? result.ticket : t);
        localStorage.setItem('eclipse_user_tickets', JSON.stringify(nextTickets));
        return nextTickets;
      });
    }

    return result;
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 flex flex-col font-sans selection:bg-[#ff0033] selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        ticketCount={tickets.length}
        openTicketsModal={() => setIsTicketsModalOpen(true)}
        openQRModal={() => setIsQRModalOpen(true)}
        onTriggerSecretAuth={() => setIsSecretAuthModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 space-y-8 sm:space-y-12">
        <Hero
          onExplore={() => handleNavigate('cartelera')}
          onSpotlightFinca={() => handleNavigate('finca')}
        />

        {/* 1. CUENTA REGRESIVA DINÁMICA: SÁBADO 28 DE NOVIEMBRE DE 2026 */}
        <EventCountdown
          targetDate={monthlyEvent.date || "2026-11-28"}
          tentativeTime="20:00"
        />

        {/* 2. DISPONIBILIDAD REAL DE BOLETAS Y AFORO OFICIAL EN TIEMPO REAL */}
        <TicketStockCounter
          monthlyEvent={monthlyEvent}
          tickets={tickets}
          onSelectBuy={handleOpenPurchase}
        />

        {/* 3. CARTELERA DEL EVENTO Y COMPRA DE BOLETAS */}
        <EventBillboard
          monthlyEvent={monthlyEvent}
          onSelectEvent={handleOpenPurchase}
          onOpenGallery={() => setIsGalleryOpen(true)}
          isDemoZeroMode={isDemoZeroMode}
        />

        {/* 4. SEDE OFICIAL: FINCA HOTEL VILLA LUISA & CÓMO LLEGAR */}
        <FincaSpotlight
          onOpenGallery={() => setIsGalleryOpen(true)}
          onSelectEvent={handleOpenPurchase}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenGallery={() => setIsGalleryOpen(true)}
        openQRModal={() => setIsQRModalOpen(true)}
      />

      {/* BOTÓN FLOTANTE OFICIAL DE WHATSAPP (313 523 8896) */}
      <FloatingWhatsApp />

      {/* MODALS */}
      <FincaGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      <TicketPurchaseModal
        event={monthlyEvent}
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onTicketPurchased={handleTicketPurchased}
        currentSeatIndex={seatCounter}
        isDemoZeroMode={isDemoZeroMode}
        tickets={tickets}
      />

      <MyTicketsModal
        isOpen={isTicketsModalOpen}
        onClose={() => setIsTicketsModalOpen(false)}
        tickets={tickets}
        onDeleteTicket={handleDeleteTicket}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      <QRValidatorModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        tickets={tickets}
        onValidateTicket={handleValidateTicket}
      />

      {/* Secret iPhone Passcode Modal (eclipse1409) */}
      <SecretAdminAuthModal
        isOpen={isSecretAuthModalOpen}
        onClose={() => setIsSecretAuthModalOpen(false)}
        onSuccessAuth={() => setIsAdminModalOpen(true)}
      />

      {/* Organizer Admin Panel */}
      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        monthlyEvent={monthlyEvent}
        onUpdateMonthlyEvent={handleUpdateMonthlyEvent}
        tickets={tickets}
        onTicketPurchased={handleTicketPurchased}
        currentSeatIndex={seatCounter}
        isDemoZeroMode={isDemoZeroMode}
        setIsDemoZeroMode={setIsDemoZeroMode}
        openQRModal={() => setIsQRModalOpen(true)}
      />

    </div>
  );
}
