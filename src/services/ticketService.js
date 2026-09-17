import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_TICKETS_KEY = 'eclipse_user_tickets';
const BROADCAST_CHANNEL_NAME = 'eclipse_events_ticket_channel';

// Create BroadcastChannel for instant cross-tab & cross-window sync
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel(BROADCAST_CHANNEL_NAME)
  : null;

export const ticketService = {

  // 1. Get all tickets from DB (or LocalStorage cache)
  async getTickets(initialFallback = []) {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .neq('id', 'ECLIPSE_GLOBAL_EVENT_CONFIG')
          .neq('status', 'SYSTEM_CONFIG')
          .order('created_at', { ascending: false });

        if (!error && data) {
          // Normalize DB field names if needed
          const formatted = data.map(t => ({
            id: t.id,
            qrHash: t.qr_hash || t.qrHash,
            backupCode: t.backup_code || t.backupCode,
            seatNumber: t.seat_number || t.seatNumber,
            eventId: t.event_id || t.eventId,
            eventTitle: t.event_title || t.eventTitle,
            eventDate: t.event_date || t.eventDate,
            eventTime: t.event_time || t.eventTime,
            venue: t.venue,
            fullAddress: t.full_address || t.fullAddress,
            mapsUrl: t.maps_url || t.mapsUrl,
            tierName: t.tier_name || t.tierName,
            tierDescription: t.tier_description || t.tierDescription,
            quantity: t.quantity || 1,
            totalPrice: t.total_price || t.totalPrice,
            holderName: t.holder_name || t.holderName,
            holderDni: t.holder_dni || t.holderDni,
            holderEmail: t.holder_email || t.holderEmail,
            status: t.status,
            usedTimestamp: t.used_timestamp || t.usedTimestamp,
            purchaseDate: t.purchase_date || t.purchaseDate
          }));
          
          localStorage.setItem(LOCAL_TICKETS_KEY, JSON.stringify(formatted));
          return formatted;
        }
      } catch (err) {
        console.warn('Supabase fetch error, using local fallback:', err);
      }
    }

    // Fallback to local storage
    const saved = localStorage.getItem(LOCAL_TICKETS_KEY);
    return saved ? JSON.parse(saved) : initialFallback;
  },

  // 2. Insert new ticket into DB
  async createTicket(newTicket) {
    if (isSupabaseConfigured()) {
      try {
        const payload = {
          id: newTicket.id,
          qr_hash: newTicket.qrHash,
          backup_code: newTicket.backupCode,
          seat_number: newTicket.seatNumber || 'AFORO GENERAL',
          event_id: newTicket.eventId,
          event_title: newTicket.eventTitle,
          event_date: newTicket.eventDate,
          event_time: newTicket.eventTime,
          venue: newTicket.venue,
          full_address: newTicket.fullAddress,
          maps_url: newTicket.mapsUrl,
          tier_name: newTicket.tierName,
          tier_description: newTicket.tierDescription,
          quantity: newTicket.quantity || 1,
          total_price: newTicket.totalPrice || 0,
          holder_name: newTicket.holderName,
          holder_dni: newTicket.holderDni,
          holder_email: newTicket.holderEmail,
          status: newTicket.status || 'VALIDA',
          purchase_date: newTicket.purchaseDate || new Date().toLocaleDateString('es-CO')
        };

        await supabase.from('tickets').upsert([payload], { onConflict: 'id', ignoreDuplicates: true });
      } catch (err) {
        console.warn('Supabase insert error:', err);
      }
    }

    // Sync via BroadcastChannel
    if (syncChannel) {
      syncChannel.postMessage({ type: 'TICKET_CREATED', ticket: newTicket });
    }

    return newTicket;
  },

  // 3. Validate ticket and mark as USADA in DB with strict anti-spoofing matching & local storage sync
  validateTicket(ticketsList, queryInput) {
    if (!queryInput || !String(queryInput).trim()) {
      return { success: false, message: 'CÓDIGO O CÉDULA VACÍA' };
    }

    // Combine ticketsList from React state with localStorage tickets to ensure 100% up-to-date data
    let combinedTickets = [...(ticketsList || [])];
    try {
      const localSaved = localStorage.getItem(LOCAL_TICKETS_KEY);
      if (localSaved) {
        const parsed = JSON.parse(localSaved);
        parsed.forEach(t => {
          if (!combinedTickets.some(existing => existing.id === t.id)) {
            combinedTickets.push(t);
          }
        });
      }
    } catch (e) {}

    const rawQuery = String(queryInput).trim();
    const cleanQuery = rawQuery.toUpperCase();
    const alphaOnlyQuery = cleanQuery.replace(/[^A-Z0-9]/g, '');
    const digitsOnly = cleanQuery.replace(/[^0-9]/g, '');

    // STRICT MATCHING: Eliminates arbitrary substring false positives
    const foundIndex = combinedTickets.findIndex(t => {
      const tId = String(t.id || '').toUpperCase().trim();
      const tQrHash = String(t.qrHash || '').toUpperCase().trim();
      const tBackup = String(t.backupCode || '').toUpperCase().trim();
      const tDni = String(t.holderDni || '').replace(/\D/g, '').trim();

      const tIdAlpha = tId.replace(/[^A-Z0-9]/g, '');
      const tBackupAlpha = tBackup.replace(/[^A-Z0-9]/g, '');

      // 1. Exact match with QR Hash (direct camera scan or full string)
      if (rawQuery === t.qrHash || cleanQuery === tQrHash) {
        return true;
      }

      // 2. Exact match with Ticket ID (e.g. ECLIPSE-123456)
      if (cleanQuery === tId || (alphaOnlyQuery.length >= 6 && alphaOnlyQuery === tIdAlpha)) {
        return true;
      }

      // 3. Exact match with Backup Code (e.g. BAC-ECL-8821-5432)
      if (cleanQuery === tBackup || (alphaOnlyQuery.length >= 6 && alphaOnlyQuery === tBackupAlpha)) {
        return true;
      }

      // 4. Exact full match with Holder DNI / Cédula (only if query contains at least 6 digits and matches entire DNI)
      if (digitsOnly.length >= 6 && tDni && digitsOnly === tDni) {
        return true;
      }

      return false;
    });

    if (foundIndex === -1) {
      return { 
        success: false, 
        message: '❌ ENTRADA INVÁLIDA O CÓDIGO NO ENCONTRADO EN BASE DE DATOS' 
      };
    }

    const ticket = combinedTickets[foundIndex];
    if (ticket.status === 'USADA') {
      return { 
        success: false, 
        ticket, 
        message: `🚨 ALERTA DE SEGURIDAD: ENTRADA YA UTILIZADA PREVIAMENTE\nIngreso registrado: ${ticket.usedTimestamp || 'Acceso previo'}` 
      };
    }

    const timestampStr = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' (' + new Date().toLocaleDateString('es-CO') + ')';
    const updatedTicket = { ...ticket, status: 'USADA', usedTimestamp: timestampStr };

    // Update LocalStorage synchronously
    try {
      const saved = localStorage.getItem(LOCAL_TICKETS_KEY);
      const list = saved ? JSON.parse(saved) : combinedTickets;
      const updatedList = list.map(item => item.id === ticket.id ? updatedTicket : item);
      localStorage.setItem(LOCAL_TICKETS_KEY, JSON.stringify(updatedList));
    } catch (e) {}

    // Update Supabase DB in background
    if (isSupabaseConfigured()) {
      supabase
        .from('tickets')
        .update({ status: 'USADA', used_timestamp: timestampStr })
        .eq('id', ticket.id)
        .then(() => {})
        .catch(err => console.warn('Supabase update error:', err));
    }

    if (syncChannel) {
      syncChannel.postMessage({ type: 'TICKET_VALIDATED', ticket: updatedTicket });
    }

    return { success: true, ticket: updatedTicket };
  },

  // 4. Delete ticket from DB
  async deleteTicket(ticketId) {
    if (isSupabaseConfigured()) {
      try {
        await supabase.from('tickets').delete().eq('id', ticketId);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }

    if (syncChannel) {
      syncChannel.postMessage({ type: 'TICKET_DELETED', ticketId });
    }
  },

  // 5. Subscribe to real-time database changes
  subscribeToChanges(onTicketUpdated) {
    if (isSupabaseConfigured()) {
      const channel = supabase
        .channel('public:tickets')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, (payload) => {
          if (payload.new?.id === 'ECLIPSE_GLOBAL_EVENT_CONFIG' || payload.old?.id === 'ECLIPSE_GLOBAL_EVENT_CONFIG') {
            return;
          }
          onTicketUpdated(payload);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }

    // Local BroadcastChannel listener
    if (syncChannel) {
      const handleMessage = (event) => {
        onTicketUpdated(event.data);
      };
      syncChannel.addEventListener('message', handleMessage);
      return () => syncChannel.removeEventListener('message', handleMessage);
    }

    return () => {};
  }
};
