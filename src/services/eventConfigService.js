import { supabase, isSupabaseConfigured } from '../lib/supabase';

const CONFIG_RECORD_ID = 'ECLIPSE_GLOBAL_EVENT_CONFIG';
const LOCAL_STORAGE_KEY = 'eclipse_monthly_event';
const BROADCAST_CHANNEL_NAME = 'eclipse_events_config_channel';

const broadcastChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel(BROADCAST_CHANNEL_NAME)
  : null;

export const eventConfigService = {
  /**
   * Fetch event config (lineup, title, date, etc.) from Supabase,
   * with fallback to localStorage or initial data.
   */
  async getEventConfig(fallbackEvent) {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('tickets')
          .select('*')
          .eq('id', CONFIG_RECORD_ID)
          .maybeSingle();

        if (!error && data && data.tier_description) {
          const parsed = JSON.parse(data.tier_description);
          const merged = {
            ...fallbackEvent,
            lineup: parsed.lineup || fallbackEvent.lineup,
            title: parsed.title || fallbackEvent.title,
            subtitle: parsed.subtitle || fallbackEvent.subtitle,
            date: parsed.date || fallbackEvent.date,
            time: parsed.time || fallbackEvent.time,
            category: parsed.category || fallbackEvent.category,
          };

          if (typeof window !== 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
          }
          return merged;
        }
      } catch (err) {
        console.warn('Supabase eventConfig fetch error, using local fallback:', err);
      }
    }

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }

    return fallbackEvent;
  },

  /**
   * Save event config and lineup to Supabase and broadcast to all connected clients
   */
  async saveEventConfig(eventData) {
    // 1. Update local storage immediately
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(eventData));
    }

    // 2. Broadcast to other tabs on same device
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: 'CONFIG_UPDATED', payload: eventData });
    }

    // 3. Upsert to Supabase
    if (isSupabaseConfigured()) {
      try {
        const payload = {
          id: CONFIG_RECORD_ID,
          qr_hash: 'CONFIG_HASH',
          backup_code: 'CFG-0001',
          seat_number: 'CONFIG',
          event_id: eventData.id || 'evt-monthly-main',
          event_title: eventData.title || 'ECLIPSE NEON FESTIVAL 2026',
          event_date: eventData.date || '2026-10-24',
          event_time: eventData.time || '08:00 PM - 06:00 AM',
          venue: eventData.venue || 'Sede Campestre (En Tu Entrada Digital)',
          full_address: 'CONFIG',
          maps_url: '#',
          tier_name: 'CONFIG',
          tier_description: JSON.stringify({
            lineup: eventData.lineup || [],
            title: eventData.title,
            subtitle: eventData.subtitle,
            date: eventData.date,
            time: eventData.time,
            category: eventData.category
          }),
          quantity: 0,
          total_price: 0,
          holder_name: 'ECLIPSE_SYSTEM_CONFIG',
          holder_dni: '00000000',
          holder_email: 'config@eclipseevents.com',
          status: 'SYSTEM_CONFIG',
          purchase_date: new Date().toISOString().split('T')[0]
        };

        const { error } = await supabase
          .from('tickets')
          .upsert(payload);

        if (error) {
          console.error('Error saving event config to Supabase:', error);
          return false;
        }
        return true;
      } catch (err) {
        console.error('Exception saving event config to Supabase:', err);
        return false;
      }
    }

    return true;
  },

  /**
   * Subscribe to real-time changes of event config from Supabase & BroadcastChannel
   */
  subscribeToChanges(onConfigUpdated) {
    // 1. Supabase Postgres changes listener
    let channel = null;
    if (isSupabaseConfigured()) {
      channel = supabase
        .channel('public:event_config')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'tickets',
            filter: `id=eq.${CONFIG_RECORD_ID}`
          },
          (payload) => {
            if (payload.new && payload.new.tier_description) {
              try {
                const parsed = JSON.parse(payload.new.tier_description);
                onConfigUpdated(parsed);
              } catch (e) {}
            }
          }
        )
        .subscribe();
    }

    // 2. BroadcastChannel listener
    const handleBroadcast = (event) => {
      if (event.data?.type === 'CONFIG_UPDATED' && event.data.payload) {
        onConfigUpdated(event.data.payload);
      }
    };

    if (broadcastChannel) {
      broadcastChannel.addEventListener('message', handleBroadcast);
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
      if (broadcastChannel) {
        broadcastChannel.removeEventListener('message', handleBroadcast);
      }
    };
  }
};
