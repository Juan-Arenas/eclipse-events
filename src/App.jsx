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

export default function App() {
  const [monthlyEvent, setMonthlyEvent] = useState(() => {
    const saved = localStorage.getItem('eclipse_monthly_event');
    if (!saved) return INITIAL_MONTHLY_EVENT;
    try {
      const parsed = JSON.parse(saved);
      parsed.image = '/images/finca/IMG_0239.jpg';
      parsed.venue = 'Ubicación en tu Entrada Digital';
      if (parsed.tiers) {
        parsed.tiers = parsed.tiers.map(t => ({ ...t, price: 1, pricePromo: 1, priceNormal: 1 }));
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
      seatNumber: 'SILLA A-001',
      eventId: 'evt-monthly-main',
      eventTitle: 'ECLIPSE NEON FESTIVAL 2026',
      eventDate: 'Sábado, 24 de Octubre, 2026',
      eventTime: '08:00 PM - 06:00 AM',
      venue: 'Finca Mi Terrenito (Santa Rosa de Cabal - Pereira)',
      fullAddress: 'Finca Mi Terrenito, Coordenadas GPS: 4.9158519, -75.626924 (Risaralda)',
      mapsUrl: 'https://www.google.com/maps/place/Finca+Mi+Terrenito/@4.9158615,-75.6269243,3a,74.8y/data=!3m8!1e2!3m6!1sCIABIhARGMsr6SiNoILgMCMHpPUT!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWlcGXqwQ34G1w0bGyjmBHfWvGvF055_UzClQuSlgsEkeP7_hKrCXKorIZSbfxt7k5X_wwBfIqzKjfWkwMkGVpB3d7Q28gyaAeFzs55QSbmZcqyui-CrBTVVE75yVeiSSDWm39VlfMsV95XG%3Dw203-h152-k-no!7i1600!8i1200!4m7!3m6!1s0x8e477f0030099ba3:0x4518ed58d1ca7593!8m2!3d4.9158519!4d-75.626924!10e5!16s%2Fg%2F11xmksv4dm?entry=ttu&g_ep=EgoyMDI2MDkxMy4wIKXMDSoASAFQAw%3D%3D',
      tierName: 'Boleta VIP',
      tierDescription: 'Acceso preferencial + 1 Cóctel de bienvenida incluido.',
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
    return saved ? JSON.parse(saved) : initialDefaultTickets;
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
        <ScrollReveal>
          <Hero
            onExplore={() => handleNavigate('cartelera')}
            onSpotlightFinca={() => handleNavigate('finca')}
          />
        </ScrollReveal>

        {/* 1. TICKET BUYING SHOWCASE FIRST WITH INTEGRATED VENUE PHOTOS & EARLY BIRD DISCOUNTS */}
        <ScrollReveal>
          <EventBillboard
            monthlyEvent={monthlyEvent}
            onSelectEvent={handleOpenPurchase}
            onOpenGallery={() => setIsGalleryOpen(true)}
            isDemoZeroMode={isDemoZeroMode}
          />
        </ScrollReveal>

        {/* 2. Venue Features & Amenity Details */}
        <ScrollReveal>
          <FincaSpotlight
            onOpenGallery={() => setIsGalleryOpen(true)}
            onSelectEvent={handleOpenPurchase}
          />
        </ScrollReveal>
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
