-- ECLIPSE EVENTS DATABASE SCHEMA (Supabase / PostgreSQL)
-- Run this script in your Supabase SQL Editor to enable cloud database sync

CREATE TABLE IF NOT EXISTS public.tickets (
  id TEXT PRIMARY KEY,
  qr_hash TEXT NOT NULL,
  backup_code TEXT NOT NULL,
  seat_number TEXT NOT NULL,
  event_id TEXT DEFAULT 'evt-monthly-main',
  event_title TEXT NOT NULL,
  event_date TEXT NOT NULL,
  event_time TEXT NOT NULL,
  venue TEXT NOT NULL,
  full_address TEXT NOT NULL,
  maps_url TEXT,
  tier_name TEXT NOT NULL,
  tier_description TEXT,
  quantity INTEGER DEFAULT 1,
  total_price NUMERIC DEFAULT 0,
  holder_name TEXT NOT NULL,
  holder_dni TEXT NOT NULL,
  holder_email TEXT NOT NULL,
  status TEXT DEFAULT 'VALIDA',
  used_timestamp TEXT,
  purchase_date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for anonymous access
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Allow anonymous select, insert, and update for ticket processing
CREATE POLICY "Allow public select on tickets" ON public.tickets FOR SELECT USING (true);
CREATE POLICY "Allow public insert on tickets" ON public.tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on tickets" ON public.tickets FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on tickets" ON public.tickets FOR DELETE USING (true);

-- Enable Realtime for tickets table
ALTER PUBLICATION supabase_realtime ADD TABLE public.tickets;
