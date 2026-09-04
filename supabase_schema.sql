-- ==============================================================================
-- VANIX PRODUCTION LEAD / INQUIRY MANAGEMENT SYSTEM SCHEMA (V2)
-- Database: Supabase PostgreSQL
-- ==============================================================================

-- 1. Create Extension for UUID generation if not already active
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    whatsapp TEXT,
    service TEXT,
    business_type TEXT,
    company TEXT,
    website TEXT,
    message TEXT,
    budget TEXT,
    source_page TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    referrer TEXT,
    device_info TEXT,
    ip_address TEXT,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (
        status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'WON', 'LOST', 'SPAM')
    ),
    notes TEXT DEFAULT '',
    email_notification_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (
        email_notification_status IN ('PENDING', 'SENT', 'FAILED', 'SKIPPED')
    ),
    customer_email_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (
        customer_email_status IN ('PENDING', 'SENT', 'FAILED', 'SKIPPED')
    ),
    whatsapp_notification_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (
        whatsapp_notification_status IN ('PENDING', 'SENT', 'FAILED', 'SKIPPED')
    ),
    handoff_status TEXT NOT NULL DEFAULT 'NONE' CHECK (
        handoff_status IN ('NONE', 'REQUESTED', 'RESOLVED')
    ),
    handoff_reason TEXT DEFAULT '',
    followup_stage INTEGER NOT NULL DEFAULT 0,
    conversation_history JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Create High-Performance Indexes for Filtering & Search
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_service ON public.leads (service);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_handoff ON public.leads (handoff_status);

-- 4. Automatically update updated_at timestamp on row modification
CREATE OR REPLACE FUNCTION public.update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_leads_updated_at();

-- 5. Row Level Security (RLS) Configuration
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow backend service role key full unrestricted access
DROP POLICY IF EXISTS "Service Role Full Access" ON public.leads;
CREATE POLICY "Service Role Full Access"
ON public.leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow public anonymous / publishable key insertions
DROP POLICY IF EXISTS "Allow public anonymous insert" ON public.leads;
CREATE POLICY "Allow public anonymous insert"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading inserted records
DROP POLICY IF EXISTS "Allow public anonymous select" ON public.leads;
CREATE POLICY "Allow public anonymous select"
ON public.leads
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow updating records (admin/lead workflows)
DROP POLICY IF EXISTS "Allow public anonymous update" ON public.leads;
CREATE POLICY "Allow public anonymous update"
ON public.leads
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Grant appropriate permissions
GRANT ALL ON public.leads TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
