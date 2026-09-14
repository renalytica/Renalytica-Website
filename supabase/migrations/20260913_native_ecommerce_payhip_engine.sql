-- ==============================================================================
-- RENALYTICA MASTER SUPABASE DATABASE MIGRATION: NATIVE E-COMMERCE & FULFILLMENT
-- Generated: September 2026 (Phase 2 Master Architecture)
-- Specification:
--   1. Products / Research Reports Table (CRUD, rich text, download limit/expiry)
--   2. Orders & Transactions Table (multi-currency, Flutterwave tx_ref & transaction_id)
--   3. Digital Fulfillment & License Table (secure_token, download_count, expires_at)
--   4. Row-Level Security (RLS) & Private Storage Bucket ('reports-private')
--   5. Seed Data for Renalytica Flagship Publications
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. PRODUCTS / RESEARCH REPORTS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku TEXT UNIQUE,
    title TEXT NOT NULL,
    description TEXT, -- Rich HTML / Markdown for Executive Summary & Table of Contents
    category TEXT NOT NULL CHECK (category IN ('Market Insights', 'Data Analysis', 'Industry Research', 'Commodities & Agriculture', 'Fintech & FX')),
    base_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    billing_type TEXT NOT NULL DEFAULT 'one-time' CHECK (billing_type IN ('one-time', 'subscription')),
    file_path TEXT, -- Target private path in 'reports-private' bucket
    preview_file_url TEXT, -- Public sample/excerpt PDF URL
    excel_data_path TEXT, -- Optional unlocked Excel model file path
    download_limit INT NOT NULL DEFAULT 3, -- Corporate Piracy threshold
    download_expiry_days INT NOT NULL DEFAULT 1, -- 24-hour default validity window
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    supported_gateways TEXT[] DEFAULT ARRAY['flutterwave', 'swift_wire', 'corporate_po']::TEXT[],
    pages_count INT DEFAULT 100,
    charts_count INT DEFAULT 40,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products RLS Policy: Anyone can view published reports
CREATE POLICY "Anyone can view published products"
    ON public.products
    FOR SELECT
    USING (status = 'published');

-- Products RLS Policy: Admins have full access to manage all products
CREATE POLICY "Admins have full access to products"
    ON public.products
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- ==============================================================================
-- 3. ORDERS & TRANSACTIONS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    company_name TEXT,
    order_status TEXT NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'paid', 'failed', 'refunded', 'cancelled')),
    total_amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    exchange_rate_to_usd NUMERIC(12, 4) DEFAULT 1.0000,
    flw_tx_ref TEXT UNIQUE NOT NULL,
    flw_transaction_id TEXT,
    payment_method TEXT DEFAULT 'flutterwave',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders RLS Policy: Customers view their own orders
CREATE POLICY "Customers can view their own orders"
    ON public.orders
    FOR SELECT
    USING (auth.uid() = customer_id OR auth.jwt()->>'email' = customer_email);

-- Orders RLS Policy: Admins have full access
CREATE POLICY "Admins have full access to orders"
    ON public.orders
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Orders RLS Policy: Service role can insert and update
CREATE POLICY "Service role can manage orders"
    ON public.orders
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 4. DIGITAL FULFILLMENT & LICENSE TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.digital_fulfillment (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    customer_email TEXT,
    secure_token UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    current_download_count INT NOT NULL DEFAULT 0,
    max_download_limit INT NOT NULL DEFAULT 3,
    expires_at TIMESTAMPTZ NOT NULL,
    last_downloaded_at TIMESTAMPTZ,
    last_download_ip TEXT,
    watermark_metadata JSONB DEFAULT '{}'::jsonb,
    is_revoked BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on digital_fulfillment
ALTER TABLE public.digital_fulfillment ENABLE ROW LEVEL SECURITY;

-- Digital Fulfillment RLS Policy: Customers can view active fulfillments
CREATE POLICY "Customers can view own fulfillment tokens"
    ON public.digital_fulfillment
    FOR SELECT
    USING (auth.uid() = customer_id OR auth.jwt()->>'email' = customer_email);

-- Digital Fulfillment RLS Policy: Admins have full access
CREATE POLICY "Admins have full access to digital_fulfillment"
    ON public.digital_fulfillment
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Digital Fulfillment Policy: Service role manage
CREATE POLICY "Service role can manage fulfillment"
    ON public.digital_fulfillment
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 5. REPORT REVISION UPDATES TABLE (Payhip Feature Benchmark)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.report_revisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    version TEXT NOT NULL DEFAULT '2.0',
    title TEXT NOT NULL,
    changelog TEXT NOT NULL,
    new_file_path TEXT NOT NULL,
    notified_buyers_count INT DEFAULT 0,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.report_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage revisions"
    ON public.report_revisions
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Customers can view revisions for purchased products"
    ON public.report_revisions
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.digital_fulfillment
            WHERE digital_fulfillment.product_id = report_revisions.product_id
            AND digital_fulfillment.customer_id = auth.uid()
        )
    );

-- ==============================================================================
-- 6. PRIVATE STORAGE BUCKET: 'reports-private'
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('reports-private', 'reports-private', false, 524288000, ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/csv'])
ON CONFLICT (id) DO UPDATE SET public = false;

-- Storage RLS on 'reports-private'
CREATE POLICY "reports_private_access_via_token"
    ON storage.objects
    FOR SELECT
    USING (
        bucket_id = 'reports-private' AND (
            EXISTS (
                SELECT 1 FROM public.roles
                WHERE user_id = auth.uid() AND role = 'admin'
            ) OR
            EXISTS (
                SELECT 1 FROM public.digital_fulfillment df
                JOIN public.products p ON df.product_id = p.id
                WHERE df.customer_id = auth.uid()
                AND df.is_revoked = false
                AND df.expires_at > NOW()
                AND df.current_download_count < df.max_download_limit
                AND p.file_path = storage.objects.name
            )
        )
    );

-- ==============================================================================
-- 7. SEED DATA: FLAGSHIP RENALYTICA RESEARCH REPORTS
-- ==============================================================================
INSERT INTO public.products (id, sku, title, description, category, base_price, currency, billing_type, file_path, preview_file_url, download_limit, download_expiry_days, status, pages_count, charts_count)
VALUES 
    (
        'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
        'REN-AI-2026-042',
        'The Economics of AI Adoption in Africa: Enterprise Survey, Infrastructure Gaps, and Labor Realities',
        'Definitive empirical benchmark covering 385 enterprises across 6 major tech hubs. Evaluates enterprise ROI, data residency bottlenecks, GPU infrastructure deficits, and labor workforce restructuring.',
        'Data Analysis',
        2500.00,
        'USD',
        'one-time',
        'reports/Renalytica_Economics_AI_Adoption_2026.pdf',
        'assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf',
        3,
        1,
        'published',
        185,
        74
    ),
    (
        'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
        'REN-AG-2026-081',
        'Sub-Saharan Africa Commercial Grains & Oilseeds Outlook: Production Trends, Fertilizer Costs, and Trade Corridors (2026–2032)',
        'A comprehensive, empirical investigation into commercial maize, wheat, and soybean production, processing capacities, and storage infrastructure across 14 Sub-Saharan African economies.',
        'Market Insights',
        3500.00,
        'USD',
        'one-time',
        'reports/Renalytica_Economics_AI_Adoption_2026.pdf',
        'assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf',
        3,
        1,
        'published',
        384,
        112
    ),
    (
        'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f',
        'REN-FX-2026-119',
        'Stablecoins & Cross-Border Liquidity: Corporate Treasury Adoption & Regulatory Arbitrage in West Africa',
        'High-frequency assessment of corporate treasury utilization of USD-pegged stablecoins for intra-African settlements, hedging naira/cedi devaluation, and SWIFT alternative routing.',
        'Industry Research',
        2800.00,
        'USD',
        'one-time',
        'reports/Renalytica_Stablecoins_Report_2026.pdf',
        'assets/reports/Renalytica_Stablecoins_Report_2026.pdf',
        3,
        1,
        'published',
        220,
        88
    )
ON CONFLICT (id) DO NOTHING;

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_flw_tx_ref ON public.orders(flw_tx_ref);
CREATE INDEX IF NOT EXISTS idx_digital_fulfillment_token ON public.digital_fulfillment(secure_token);
CREATE INDEX IF NOT EXISTS idx_digital_fulfillment_customer ON public.digital_fulfillment(customer_id);
CREATE INDEX IF NOT EXISTS idx_digital_fulfillment_expires ON public.digital_fulfillment(expires_at);
