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
          seat_number: newTicket.seatNumber,
          event_id: newTicket.eventId,
          event_title: newTicket.eventTitle,
          event_date: newTicket.eventDate,
          event_time: newTicket.eventTime,
          venue: newTicket.venue,
          full_address: newTicket.fullAddress,
          maps_url: newTicket.mapsUrl,
          tier_name: newTicket.tierName,
          tier_description: newTicket.tierDescription,
          quantity: newTicket.quantity,
          total_price: newTicket.totalPrice,
          holder_name: newTicket.holderName,
          holder_dni: newTicket.holderDni,
          holder_email: newTicket.holderEmail,
          status: 'VALIDA',
          purchase_date: newTicket.purchaseDate
        };

        await supabase.from('tickets').insert([payload]);
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

  // 3. Validate ticket and mark as USADA in DB with robust fuzzy matching
  validateTicket(ticketsList, queryInput) {
    if (!queryInput) {
      return { success: false, message: 'CÓDIGO O CÉDULA VACÍA' };
    }

    const rawQuery = String(queryInput).trim();
    const cleanQuery = rawQuery.toUpperCase();
    const alphaOnlyQuery = cleanQuery.replace(/[^A-Z0-9]/g, '');

    const foundIndex = ticketsList.findIndex(t => {
      const tId = String(t.id || '').toUpperCase();
      const tQrHash = String(t.qrHash || '').toUpperCase();
      const tBackup = String(t.backupCode || '').toUpperCase();
      const tDni = String(t.holderDni || '').trim();

      const tIdAlpha = tId.replace(/[^A-Z0-9]/g, '');
      const tQrAlpha = tQrHash.replace(/[^A-Z0-9]/g, '');
      const tBackupAlpha = tBackup.replace(/[^A-Z0-9]/g, '');

      // 1. Exact match
      if (tId === cleanQuery || tQrHash === cleanQuery || tBackup === cleanQuery || tDni === cleanQuery) {
        return true;
      }

      // 2. Substring match (if query contains QR hash or QR hash contains query)
      if (cleanQuery.length >= 4) {
        if (tQrHash.includes(cleanQuery) || cleanQuery.includes(tQrHash)) return true;
        if (tId.includes(cleanQuery) || cleanQuery.includes(tId)) return true;
        if (tBackup.includes(cleanQuery) || cleanQuery.includes(tBackup)) return true;
      }

      // 3. Alphanumeric match (ignoring hyphens and spaces)
      if (alphaOnlyQuery.length >= 4) {
        if (tQrAlpha.includes(alphaOnlyQuery) || alphaOnlyQuery.includes(tQrAlpha)) return true;
        if (tIdAlpha.includes(alphaOnlyQuery) || alphaOnlyQuery.includes(tIdAlpha)) return true;
        if (tBackupAlpha.includes(alphaOnlyQuery) || alphaOnlyQuery.includes(tBackupAlpha)) return true;
      }

      return false;
    });

    if (foundIndex === -1) {
      return { success: false, message: 'ENTRADA INVÁLIDA O CÓDIGO NO ENCONTRADO EN BASE DE DATOS' };
    }

    const ticket = ticketsList[foundIndex];
    if (ticket.status === 'USADA') {
      return { success: false, ticket, message: '🚨 ALERTA: ENTRADA YA UTILIZADA Y DAÑADA EN PUERTA' };
    }

    const timestampStr = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' (' + new Date().toLocaleDateString('es-CO') + ')';
    const updatedTicket = { ...ticket, status: 'USADA', usedTimestamp: timestampStr };

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
