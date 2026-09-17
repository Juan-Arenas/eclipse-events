import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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
import { INITIAL_MONTHLY_EVENT } from './data/initialData';
import { ticketService } from './services/ticketService';
import { wompiService } from './services/wompiService';

export default function App() {
  const [monthlyEvent, setMonthlyEvent] = useState(() => {
    const saved = localStorage.getItem('eclipse_monthly_event');
    if (!saved) return INITIAL_MONTHLY_EVENT;
    try {
      const parsed = JSON.parse(saved);
      parsed.image = '/images/finca/IMG_0239.jpg';
      parsed.venue = 'Ubicación en tu Entrada Digital';
      if (parsed.tiers) {
        parsed.tiers = parsed.tiers.map(t => ({ ...t, price: 1500, pricePromo: 1500, priceNormal: 1500 }));
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
      eventTitle: 'ECLIPSE NEON FESTIVAL 2026',
      eventDate: 'Sábado, 24 de Octubre, 2026',
      eventTime: '08:00 PM - 06:00 AM',
      venue: 'Sede Campestre (En Tu Entrada Digital)',
      fullAddress: 'Ubicación Confidencial Activada',
      mapsUrl: '#',
      tierName: 'Boleta VIP',
      tierDescription: 'Acceso preferencial + Eclipse Drinks Adicional incluido.',
      quantity: 1,
      totalPrice: 0,
      holderName: 'Juan Arenas',
      holderDni: '1098765432',
      holderEmail: 'juan@eclipseevents.com',
      status: 'VALIDA',
      purchaseDate: new Date().toLocaleDateString('es-CO')
    }
  ];

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('eclipse_user_tickets');
    const raw = saved ? JSON.parse(saved) : initialDefaultTickets;
    return raw.map(t => ({
      ...t,
      venue: 'Sede Campestre (En Tu Entrada Digital)',
      fullAddress: 'Ubicación Confidencial Activada',
      mapsUrl: '#'
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

  // Handle Wompi Redirect Callback (if user was redirected after payment)
  useEffect(() => {
    const checkWompiRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const transactionId = urlParams.get('id');

      if (!transactionId) return;

      // Clean URL search params without page reload
      window.history.replaceState({}, document.title, window.location.pathname);

      const transaction = await wompiService.verifyTransaction(transactionId);
      if (transaction && transaction.status === 'APPROVED') {
        const reference = transaction.reference;
        const pendingInfoRaw = sessionStorage.getItem(`eclipse_pending_info_${reference}`);
        const pendingInfo = pendingInfoRaw ? JSON.parse(pendingInfoRaw) : {};

        const seatFormatted = "AFORO GENERAL";
        const ticketId = `ECLIPSE-${Math.floor(100000 + Math.random() * 900000)}`;

        const newTicket = {
          id: ticketId,
          qrHash: `ECLIPSE-TICKET-${ticketId}-${pendingInfo.customerDni || '1098765432'}-${Date.now()}`,
          backupCode: `BAC-ECL-${Math.floor(1000 + Math.random() * 9000)}-${(pendingInfo.customerDni || '5432').slice(-4)}`,
          seatNumber: seatFormatted,
          eventId: monthlyEvent.id,
          eventTitle: monthlyEvent.title,
          eventDate: monthlyEvent.formattedDate,
          eventTime: monthlyEvent.time,
          venue: "Sede Campestre (En Tu Entrada Digital)",
          fullAddress: "Ubicación Confidencial Activada",
          mapsUrl: "#",
          tierName: "Boleta General Wompi",
          tierDescription: "Entrada confirmada vía Wompi Checkout",
          quantity: 1,
          totalPrice: (transaction.amount_in_cents || 150000) / 100,
          holderName: pendingInfo.customerFullName || transaction.customer_data?.full_name || 'Comprador Eclipse',
          holderDni: pendingInfo.customerDni || '1098765432',
          holderEmail: pendingInfo.customerEmail || transaction.customer_email || 'cliente@eclipseevents.com',
          status: 'VALIDA',
          purchaseDate: new Date().toLocaleDateString('es-CO')
        };

        await handleTicketPurchased(newTicket);
        setIsTicketsModalOpen(true);
        alert(`🎉 ¡Pago Aprobado por Wompi!\nSe ha emitido con éxito tu entrada (${seatFormatted}) a nombre de ${newTicket.holderName}.`);
      } else if (transaction) {
        alert(`❌ Transacción Wompi ${transaction.status}: El pago no fue aprobado. No se realizó el cobro ni se emitió la entrada.`);
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

      {/* Main Content (BUYING TICKETS & MAIN EVENT SPOTLIGHT FIRST AS REQUESTED) */}
      <main className="flex-1 space-y-12">
        <Hero
          onExplore={() => handleNavigate('cartelera')}
          onSpotlightFinca={() => handleNavigate('finca')}
        />

        {/* 1. TICKET BUYING SHOWCASE FIRST WITH INTEGRATED VENUE PHOTOS & EARLY BIRD DISCOUNTS */}
        <EventBillboard
          monthlyEvent={monthlyEvent}
          onSelectEvent={handleOpenPurchase}
          onOpenGallery={() => setIsGalleryOpen(true)}
          isDemoZeroMode={isDemoZeroMode}
        />

        {/* 2. Venue Features & Amenity Details */}
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
        onUpdateMonthlyEvent={setMonthlyEvent}
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
