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
