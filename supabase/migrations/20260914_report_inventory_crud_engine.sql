-- ==============================================================================
-- RENALYTICA MASTER DATABASE MIGRATION: REPORT INVENTORY CRUD & STORAGE ENGINE
-- Phase 2.5: Report Inventory Management, Multi-Currency Pricing & Safe Erasure
-- Benchmark: Payhip Administrative Interface & Relational Integrity
-- ==============================================================================

-- 1. ADD REGIONAL MULTI-CURRENCY PRICING TO PRODUCTS TABLE
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS regional_pricing JSONB DEFAULT '{
  "NGN": 150000,
  "USD": 450,
  "GHS": 5500,
  "KES": 65000
}'::jsonb;

-- 2. ENSURE STATUS CHECK CONSTRAINT INCLUDES 'draft', 'published', 'archived'
DO $$ 
BEGIN
    ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_status_check;
    ALTER TABLE public.products ADD CONSTRAINT products_status_check 
        CHECK (status IN ('draft', 'published', 'archived'));
EXCEPTION
    WHEN OTHERS THEN NULL;
END $$;

-- 3. ENSURE STORAGE POLICIES ALLOW ADMIN PURGE / DELETION IN 'reports-private'
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND policyname = 'Admins can delete objects in reports-private'
    ) THEN
        CREATE POLICY "Admins can delete objects in reports-private"
            ON storage.objects
            FOR DELETE
            USING (
                bucket_id = 'reports-private' AND (
                    EXISTS (
                        SELECT 1 FROM public.roles
                        WHERE user_id = auth.uid() AND role = 'admin'
                    ) OR auth.jwt()->>'role' = 'service_role'
                )
            );
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' AND policyname = 'Admins can upload objects in reports-private'
    ) THEN
        CREATE POLICY "Admins can upload objects in reports-private"
            ON storage.objects
            FOR INSERT
            WITH CHECK (
                bucket_id = 'reports-private' AND (
                    EXISTS (
                        SELECT 1 FROM public.roles
                        WHERE user_id = auth.uid() AND role = 'admin'
                    ) OR auth.jwt()->>'role' = 'service_role'
                )
            );
    END IF;
END $$;

-- 4. FUNCTION: CHECK PRODUCT DELETION SAFETY
-- Verifies whether a publication is referenced by historical orders or active fulfillment licenses
CREATE OR REPLACE FUNCTION public.check_product_deletion_safety(target_product_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_order_count INT := 0;
    v_fulfillment_count INT := 0;
    v_can_delete BOOLEAN := false;
    v_title TEXT := '';
    v_sku TEXT := '';
BEGIN
    -- Get product info
    SELECT title, sku INTO v_title, v_sku 
    FROM public.products 
    WHERE id = target_product_id;

    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'exists', false,
            'can_delete', false,
            'message', 'Product does not exist in catalog.'
        );
    END IF;

    -- Count orders matching this product UUID or SKU
    SELECT COUNT(*) INTO v_order_count
    FROM public.orders
    WHERE (metadata->>'productId' = target_product_id::text)
       OR (metadata->>'product_id' = target_product_id::text)
       OR (metadata->>'sku' = v_sku);

    -- Count digital fulfillments matching this product UUID
    SELECT COUNT(*) INTO v_fulfillment_count
    FROM public.digital_fulfillment
    WHERE product_id = target_product_id;

    -- If any orders or fulfillments exist, hard deletion is blocked
    IF (v_order_count = 0 AND v_fulfillment_count = 0) THEN
        v_can_delete := true;
    ELSE
        v_can_delete := false;
    END IF;

    RETURN jsonb_build_object(
        'exists', true,
        'product_id', target_product_id,
        'title', v_title,
        'sku', v_sku,
        'can_delete', v_can_delete,
        'order_count', v_order_count,
        'fulfillment_count', v_fulfillment_count,
        'recommendation', CASE 
            WHEN v_can_delete THEN 'safe_to_purge'
            ELSE 'archive_instead'
        END,
        'message', CASE
            WHEN v_can_delete THEN 'Product has zero customer orders or issued fulfillment licenses. Safe to permanently erase.'
            ELSE format('Hard deletion blocked: %s customer orders and %s fulfillment licenses exist for this report. Deletion would revoke customer access. Recommend archiving instead.', v_order_count, v_fulfillment_count)
        END
    );
END;
$$;

-- 5. FUNCTION: SAFE DELETE PRODUCT (ATOMIC BACKEND ROUTINE)
CREATE OR REPLACE FUNCTION public.safe_delete_product(target_product_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_check JSONB;
    v_file_path TEXT;
    v_preview_url TEXT;
BEGIN
    -- Check safety
    v_check := public.check_product_deletion_safety(target_product_id);

    IF NOT (v_check->>'can_delete')::boolean THEN
        RAISE EXCEPTION 'Cannot delete publication with active purchase history: %', (v_check->>'message');
    END IF;

    -- Retrieve file paths for storage cleanup
    SELECT file_path, preview_file_url INTO v_file_path, v_preview_url
    FROM public.products
    WHERE id = target_product_id;

    -- Delete product record
    DELETE FROM public.products WHERE id = target_product_id;

    RETURN jsonb_build_object(
        'success', true,
        'deleted_product_id', target_product_id,
        'purged_file_path', v_file_path,
        'purged_preview_url', v_preview_url,
        'message', 'Product record successfully deleted from database.'
    );
END;
$$;

-- 6. INDEXES TO SPEED UP RELATIONAL SAFETY LOOKUPS
CREATE INDEX IF NOT EXISTS idx_products_regional_pricing ON public.products USING gin(regional_pricing);
