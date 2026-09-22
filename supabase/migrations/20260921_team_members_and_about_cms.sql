-- ==============================================================================
-- RENALYTICA MASTER DATABASE MIGRATION: ABOUT US & TEAM MEMBERS CMS
-- Phase 3.0: Team Members Management, Dynamic Departments & About Page Narrative
-- ==============================================================================

-- 1. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'specialist',
    category_label TEXT NOT NULL DEFAULT 'Senior Sector Specialists',
    desk_badge TEXT,
    photo_url TEXT,
    bio TEXT,
    tagline TEXT,
    social_links JSONB DEFAULT '{}'::jsonb, -- linkedin, facebook, website, twitter, scholar
    credentials JSONB DEFAULT '[]'::jsonb,
    papers JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    display_order INT DEFAULT 99,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on category and status for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_team_members_category ON public.team_members(category);
CREATE INDEX IF NOT EXISTS idx_team_members_status ON public.team_members(status);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON public.team_members(display_order);

-- 2. ABOUT US NARRATIVE CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.about_content (
    id TEXT PRIMARY KEY,
    section_key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_about_content_key ON public.about_content(section_key);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES: PUBLIC READ ACCESS FOR PUBLISHED MEMBERS
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'team_members' AND policyname = 'Public can view published team members'
    ) THEN
        CREATE POLICY "Public can view published team members"
            ON public.team_members
            FOR SELECT
            USING (status = 'published');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'team_members' AND policyname = 'Admins and service roles have full access to team members'
    ) THEN
        CREATE POLICY "Admins and service roles have full access to team members"
            ON public.team_members
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
        WHERE tablename = 'about_content' AND policyname = 'Public can view about content'
    ) THEN
        CREATE POLICY "Public can view about content"
            ON public.about_content
            FOR SELECT
            USING (true);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'about_content' AND policyname = 'Admins and service roles have full access to about content'
    ) THEN
        CREATE POLICY "Admins and service roles have full access to about content"
            ON public.about_content
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
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'set_updated_at_team_members'
    ) THEN
        CREATE TRIGGER set_updated_at_team_members
            BEFORE UPDATE ON public.team_members
            FOR EACH ROW
            EXECUTE FUNCTION public.handle_updated_at();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'set_updated_at_about_content'
    ) THEN
        CREATE TRIGGER set_updated_at_about_content
            BEFORE UPDATE ON public.about_content
            FOR EACH ROW
            EXECUTE FUNCTION public.handle_updated_at();
    END IF;
END $$;
