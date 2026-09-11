-- ==============================================================================
-- RENALYTICA MASTER SUPABASE DATABASE MIGRATION & RLS POLICIES
-- Generated: September 2026
-- Scope:
--   1. Role-Based Access Control (RBAC): 'admin' vs 'client'
--   2. Row-Level Security (RLS) on client_deliverables and storage buckets
--   3. Commercial Purchases Table linking user_id, file_id, and payment_status
--   4. Dynamic CMS Table (public_content) for Tiptap Rich Text & Admin Portal
-- ==============================================================================

-- 1. EXTENSIONS & SCHEMAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. ROLES & USER PROFILES TABLE (RBAC)
-- ==============================================================================
CREATE TYPE user_role_enum AS ENUM ('admin', 'client');

CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    role user_role_enum NOT NULL DEFAULT 'client',
    organization_name TEXT,
    full_name TEXT,
    account_tier TEXT DEFAULT 'Departmental License',
    is_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on roles table
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Helper Function: Check if the calling user is an Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Roles Policies:
-- Users can view their own profile
CREATE POLICY "Users can view own profile"
    ON public.roles
    FOR SELECT
    USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON public.roles
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Admins can view and manage all profiles
CREATE POLICY "Admins have full access to all roles"
    ON public.roles
    FOR ALL
    USING (public.is_admin());

-- ==============================================================================
-- 3. PURCHASES TABLE (Payment Verification & Deliverable Entitlement)
-- ==============================================================================
CREATE TYPE payment_status_enum AS ENUM ('pending', 'successful', 'failed', 'refunded');

CREATE TABLE IF NOT EXISTS public.purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    file_id TEXT NOT NULL,
    report_sku TEXT,
    report_title TEXT NOT NULL,
    license_type TEXT NOT NULL DEFAULT 'departmental',
    amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    payment_gateway VARCHAR(50) DEFAULT 'flutterwave',
    tx_ref TEXT NOT NULL UNIQUE,
    flw_ref TEXT,
    payment_status payment_status_enum NOT NULL DEFAULT 'pending',
    verified_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on purchases
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Purchases Policies:
-- Users can view only their own purchases
CREATE POLICY "Users can view own purchases"
    ON public.purchases
    FOR SELECT
    USING (auth.uid() = user_id);

-- Admins have global access to all purchases
CREATE POLICY "Admins have global access to purchases"
    ON public.purchases
    FOR ALL
    USING (public.is_admin());

-- Service role / Webhook handler can insert and update
CREATE POLICY "Service role can insert and update purchases"
    ON public.purchases
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- ==============================================================================
-- 4. CLIENT DELIVERABLES REGISTRY & RLS POLICIES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.client_deliverables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    account_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    file_id TEXT NOT NULL,
    bucket_name TEXT NOT NULL DEFAULT 'client_deliverables',
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes BIGINT,
    content_type TEXT DEFAULT 'application/pdf',
    license_tier TEXT DEFAULT 'Global Enterprise',
    assigned_by UUID REFERENCES auth.users(id),
    download_count INT DEFAULT 0,
    last_downloaded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on client_deliverables
ALTER TABLE public.client_deliverables ENABLE ROW LEVEL SECURITY;

-- Deliverable RLS Rule 1: Users can ONLY select files where file's account_id matches their authenticated user_id
CREATE POLICY "client_deliverables_user_isolation"
    ON public.client_deliverables
    FOR SELECT
    USING (auth.uid() = account_id);

-- Deliverable RLS Rule 2: Admins have global INSERT, UPDATE, DELETE, and SELECT access
CREATE POLICY "client_deliverables_admin_full_access"
    ON public.client_deliverables
    FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ==============================================================================
-- 5. STORAGE BUCKET POLICIES (Supabase Storage RLS)
-- ==============================================================================
-- Insert buckets into storage.buckets if they do not exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('public_assets', 'public_assets', true, 52428800, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf']),
    ('client_deliverables', 'client_deliverables', false, 524288000, ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'video/mp4'])
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- Storage RLS on client_deliverables bucket:
-- Only authenticated users who have purchased or been assigned the file can read
CREATE POLICY "client_deliverables_storage_user_select"
    ON storage.objects
    FOR SELECT
    USING (
        bucket_id = 'client_deliverables' AND (
            public.is_admin() OR
            EXISTS (
                SELECT 1 FROM public.client_deliverables
                WHERE account_id = auth.uid()
                AND file_path = storage.objects.name
            ) OR
            EXISTS (
                SELECT 1 FROM public.purchases
                WHERE user_id = auth.uid()
                AND payment_status = 'successful'
                AND (metadata->>'storage_path' = storage.objects.name OR file_id = storage.objects.name)
            )
        )
    );

-- Admins have full access to storage
CREATE POLICY "admin_full_storage_access"
    ON storage.objects
    FOR ALL
    USING (bucket_id IN ('client_deliverables', 'public_assets') AND public.is_admin())
    WITH CHECK (bucket_id IN ('client_deliverables', 'public_assets') AND public.is_admin());

-- Public can read public_assets
CREATE POLICY "public_assets_read_access"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'public_assets');

-- ==============================================================================
-- 6. DYNAMIC CMS: PUBLIC CONTENT TABLE (Tiptap & Admin Portal)
-- ==============================================================================
CREATE TYPE content_category_enum AS ENUM ('blogs', 'news', 'csr', 'whitepapers', 'market_insights');
CREATE TYPE content_status_enum AS ENUM ('draft', 'published', 'archived');

CREATE TABLE IF NOT EXISTS public.public_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category content_category_enum NOT NULL,
    author TEXT NOT NULL DEFAULT 'Renalytica Research Desk',
    author_title TEXT DEFAULT 'Senior Analyst',
    read_time_minutes INT DEFAULT 5,
    excerpt TEXT,
    html_content TEXT NOT NULL,
    featured_image_url TEXT,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    status content_status_enum NOT NULL DEFAULT 'draft',
    seo_meta_title TEXT,
    seo_meta_description TEXT,
    view_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Enable RLS on public_content
ALTER TABLE public.public_content ENABLE ROW LEVEL SECURITY;

-- Public read policy: Anyone can read published content
CREATE POLICY "public_can_read_published_content"
    ON public.public_content
    FOR SELECT
    USING (status = 'published');

-- Admins can read, insert, update, delete all content (drafts & published)
CREATE POLICY "admins_can_manage_all_content"
    ON public.public_content
    FOR ALL
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- ==============================================================================
-- 7. AUTOMATIC USER REGISTRATION TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.roles (user_id, role, full_name, organization_name)
    VALUES (
        NEW.id,
        CASE 
            WHEN NEW.email = 'renalytica@gmail.com' THEN 'admin'::user_role_enum
            ELSE 'client'::user_role_enum
        END,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Institutional Partner'),
        COALESCE(NEW.raw_user_meta_data->>'organization', 'Renalytica Enterprise Client')
    )
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexing for high-performance querying
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_tx_ref ON public.purchases(tx_ref);
CREATE INDEX IF NOT EXISTS idx_client_deliverables_account ON public.client_deliverables(account_id);
CREATE INDEX IF NOT EXISTS idx_public_content_slug ON public.public_content(slug);
CREATE INDEX IF NOT EXISTS idx_public_content_category ON public.public_content(category);
