-- ==============================================================================
-- VANIX COMPLETE PRODUCTION CRM & DATABASE SCHEMA (V3)
-- Database: Supabase PostgreSQL
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Services Table (The 14 Official VANIX Integrated Digital Services)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL DEFAULT 'Digital Growth',
    description TEXT DEFAULT '',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Seed Official VANIX Services
INSERT INTO public.services (name, category, description, is_active)
VALUES
    ('Website Development', 'Core Infrastructure', 'Custom luxury high-performance business websites & web applications.', true),
    ('E-commerce Website', 'Core Infrastructure', 'Conversion-engineered online stores with integrated checkout & payments.', true),
    ('Product Listing', 'Marketplace & Retail', 'Professional SKU cataloging, categorization, and optimization.', true),
    ('Marketplace Services', 'Marketplace & Retail', 'Amazon, Flipkart, and multi-channel marketplace scaling.', true),
    ('Google Business Profile', 'Local Domination', 'Optimized local visibility, maps ranking, and review systems.', true),
    ('Local SEO', 'Local Domination', 'Geo-targeted organic search dominance for localized footfall & leads.', true),
    ('Social Media Management', 'Brand & Content', 'Omnichannel luxury brand presence, creative assets, and storytelling.', true),
    ('Google Ads', 'Paid Acquisition', 'High-intent search, shopping, and performance max campaigns.', true),
    ('Meta Ads', 'Paid Acquisition', 'Targeted Instagram & Facebook direct-response advertising.', true),
    ('WhatsApp Sales', 'Conversion Automation', 'Automated sales funnels, catalog sharing, and instant lead capture.', true),
    ('Lead Generation', 'Conversion Automation', 'Omnichannel B2B & B2C customer acquisition pipelines.', true),
    ('Analytics & Reporting', 'Data & Optimization', 'Live revenue tracking, conversion analytics, and growth reporting.', true),
    ('Online Growth Strategy', 'Strategic Consulting', 'Complete roadmap from traditional offline operations to online leadership.', true),
    ('Technical & Marketing Support', 'Strategic Consulting', 'Dedicated SLA engineering, site maintenance, and growth advisory.', true)
ON CONFLICT (name) DO NOTHING;

-- 3. Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT,
    phone TEXT NOT NULL,
    website TEXT,
    services TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'ARCHIVED')),
    total_paid NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (total_paid >= 0),
    pending_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (pending_amount >= 0),
    notes TEXT DEFAULT '',
    converted_from_inquiry_id UUID,
    last_contact_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Leads / Inquiries Table
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
        status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST', 'SPAM')
    ),
    notes TEXT DEFAULT '',
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    last_contact_at TIMESTAMPTZ,
    next_followup_at TIMESTAMPTZ,
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

-- 5. Follow-ups Table
CREATE TABLE IF NOT EXISTS public.follow_ups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    type TEXT NOT NULL DEFAULT 'CALL' CHECK (type IN ('CALL', 'WHATSAPP', 'EMAIL', 'MEETING', 'OTHER')),
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'MISSED', 'CANCELLED')),
    note TEXT DEFAULT '',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    inquiry_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    amount NUMERIC(14, 2) NOT NULL CHECK (amount >= 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    method TEXT NOT NULL DEFAULT 'UPI' CHECK (method IN ('UPI', 'BANK_TRANSFER', 'CARD', 'CASH', 'OTHER')),
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'FAILED', 'REFUNDED')),
    transaction_id TEXT,
    invoice_number TEXT,
    notes TEXT DEFAULT '',
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    payment_id UUID REFERENCES public.payments(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    description TEXT NOT NULL,
    actor TEXT NOT NULL DEFAULT 'Admin',
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. CRM Realtime Notifications Table
CREATE TABLE IF NOT EXISTS public.crm_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. CRM Settings Table
CREATE TABLE IF NOT EXISTS public.crm_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    business_name TEXT NOT NULL DEFAULT 'VANIX Digital Growth',
    business_email TEXT NOT NULL DEFAULT 'info@vanix.in',
    business_phone TEXT NOT NULL DEFAULT '+91 9457727770',
    business_whatsapp TEXT NOT NULL DEFAULT '+91 9457727770',
    default_inquiry_status TEXT NOT NULL DEFAULT 'NEW',
    currency TEXT NOT NULL DEFAULT 'INR',
    notification_preferences JSONB NOT NULL DEFAULT '{"email": true, "whatsapp": true}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Seed Default CRM Settings
INSERT INTO public.crm_settings (id, business_name, business_email, business_phone, business_whatsapp, default_inquiry_status, currency)
VALUES ('default', 'VANIX Digital Growth', 'info@vanix.in', '+91 9457727770', '+91 9457727770', 'NEW', 'INR')
ON CONFLICT (id) DO NOTHING;

-- 10. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_customer_id ON public.leads (customer_id);
CREATE INDEX IF NOT EXISTS idx_leads_service ON public.leads (service);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

CREATE INDEX IF NOT EXISTS idx_customers_created_at ON public.customers (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON public.customers (phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON public.customers (email);

CREATE INDEX IF NOT EXISTS idx_follow_ups_scheduled_at ON public.follow_ups (scheduled_at ASC);
CREATE INDEX IF NOT EXISTS idx_follow_ups_status ON public.follow_ups (status);
CREATE INDEX IF NOT EXISTS idx_follow_ups_inquiry_id ON public.follow_ups (inquiry_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_customer_id ON public.follow_ups (customer_id);

CREATE INDEX IF NOT EXISTS idx_payments_created_at ON public.payments (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments (status);
CREATE INDEX IF NOT EXISTS idx_payments_customer_id ON public.payments (customer_id);

CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_inquiry_id ON public.activity_logs (inquiry_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_customer_id ON public.activity_logs (customer_id);

CREATE INDEX IF NOT EXISTS idx_crm_notifications_created_at ON public.crm_notifications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_notifications_is_read ON public.crm_notifications (is_read);

-- 11. Row Level Security (RLS) Configuration
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_settings ENABLE ROW LEVEL SECURITY;

-- Service Role Full Access Policies
CREATE POLICY "Service Role Full Services" ON public.services FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Customers" ON public.customers FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Leads" ON public.leads FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full FollowUps" ON public.follow_ups FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Payments" ON public.payments FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full ActivityLogs" ON public.activity_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Notifications" ON public.crm_notifications FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service Role Full Settings" ON public.crm_settings FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Public / Anonymous Access Policies for Website Operations
CREATE POLICY "Public Read Services" ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public Insert Leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public Select Leads" ON public.leads FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public Update Leads" ON public.leads FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public All Customers" ON public.customers FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public All FollowUps" ON public.follow_ups FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public All Payments" ON public.payments FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public All ActivityLogs" ON public.activity_logs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public All Notifications" ON public.crm_notifications FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Public All Settings" ON public.crm_settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 12. Enable Supabase Realtime Replication on CRM Tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.customers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.follow_ups;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_notifications;
