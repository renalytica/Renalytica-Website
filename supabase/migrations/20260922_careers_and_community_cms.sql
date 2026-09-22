-- ==============================================================================
-- RENALYTICA MASTER DATABASE MIGRATION: CAREERS & COMMUNITY CMS
-- Phase 4.0: Careers Open Roles Management & Community Guilds / Roundtables
-- ==============================================================================

-- 1. CAREERS & JOB OPENINGS TABLE
CREATE TABLE IF NOT EXISTS public.careers_jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'agri', -- agri, data, macro, sales, or custom slug
    category_label TEXT NOT NULL DEFAULT 'Agriculture & Commodities',
    location TEXT NOT NULL DEFAULT 'Lagos, Nigeria (Hybrid)',
    employment_type TEXT NOT NULL DEFAULT 'Full-Time',
    experience_level TEXT NOT NULL DEFAULT '3–5 Years Exp',
    overview TEXT NOT NULL,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    qualifications JSONB DEFAULT '[]'::jsonb,
    apply_mode TEXT DEFAULT 'modal' CHECK (apply_mode IN ('modal', 'external_url', 'email')),
    apply_url TEXT,
    apply_button_label TEXT DEFAULT 'Apply for This Role →',
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    display_order INT DEFAULT 99,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_careers_jobs_category ON public.careers_jobs(category);
CREATE INDEX IF NOT EXISTS idx_careers_jobs_status ON public.careers_jobs(status);
CREATE INDEX IF NOT EXISTS idx_careers_jobs_order ON public.careers_jobs(display_order);

-- 2. COMMUNITY ACTIVITIES, GUILDS & ROUNDTABLES TABLE
CREATE TABLE IF NOT EXISTS public.community_activities (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL DEFAULT 'guild' CHECK (type IN ('guild', 'roundtable', 'fellow')),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'macro', -- macro, agri, commodity, diaspora, or custom
    category_label TEXT NOT NULL DEFAULT 'Macro & Currency',
    badge TEXT, -- e.g. 'UPCOMING // 4 DAYS', 'WEEKLY TELEMETRY', 'LAGOS NODE'
    datetime TEXT, -- e.g. 'MAR 18 • 16:00 WAT' (for roundtables/events)
    mission TEXT, -- description / summary
    speaker_name TEXT,
    speaker_role TEXT,
    speaker_photo TEXT,
    metric_1 TEXT, -- e.g. '412 FELLOWS' or 'DATA LATENCY: 14ms'
    metric_2 TEXT, -- e.g. 'BI-WEEKLY BRIEFING'
    action_label TEXT DEFAULT 'View Guild Charter →',
    action_url TEXT,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    display_order INT DEFAULT 99,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_community_activities_type ON public.community_activities(type);
CREATE INDEX IF NOT EXISTS idx_community_activities_category ON public.community_activities(category);
CREATE INDEX IF NOT EXISTS idx_community_activities_status ON public.community_activities(status);
CREATE INDEX IF NOT EXISTS idx_community_activities_order ON public.community_activities(display_order);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.careers_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_activities ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES: PUBLIC READ ACCESS FOR PUBLISHED ENTITIES
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'careers_jobs' AND policyname = 'Public can view published jobs'
    ) THEN
        CREATE POLICY "Public can view published jobs"
            ON public.careers_jobs
            FOR SELECT
            USING (status = 'published');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'careers_jobs' AND policyname = 'Admins and service roles have full access to jobs'
    ) THEN
        CREATE POLICY "Admins and service roles have full access to jobs"
            ON public.careers_jobs
            FOR ALL
            USING (
                auth.jwt()->>'role' = 'service_role' OR
                EXISTS (
                    SELECT 1 FROM public.roles
                    WHERE user_id = auth.uid() AND role = 'admin'
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'community_activities' AND policyname = 'Public can view published community activities'
    ) THEN
        CREATE POLICY "Public can view published community activities"
            ON public.community_activities
            FOR SELECT
            USING (status = 'published');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'community_activities' AND policyname = 'Admins and service roles have full access to community activities'
    ) THEN
        CREATE POLICY "Admins and service roles have full access to community activities"
            ON public.community_activities
            FOR ALL
            USING (
                auth.jwt()->>'role' = 'service_role' OR
                EXISTS (
                    SELECT 1 FROM public.roles
                    WHERE user_id = auth.uid() AND role = 'admin'
                )
            );
    END IF;
END $$;

-- 5. TRIGGER: AUTO-UPDATE UPDATED_AT TIMESTAMP
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'set_updated_at_careers_jobs'
    ) THEN
        CREATE TRIGGER set_updated_at_careers_jobs
            BEFORE UPDATE ON public.careers_jobs
            FOR EACH ROW
            EXECUTE FUNCTION public.handle_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'set_updated_at_community_activities'
    ) THEN
        CREATE TRIGGER set_updated_at_community_activities
            BEFORE UPDATE ON public.community_activities
            FOR EACH ROW
            EXECUTE FUNCTION public.handle_updated_at();
    END IF;
END $$;
