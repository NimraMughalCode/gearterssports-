-- ==============================================================================
-- Gearters Sports: Product Display Order & Custom Position Setup
-- Run this in your Supabase Dashboard SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Add display_order column to the products table (if it doesn't exist)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS display_order INT DEFAULT NULL;

-- 2. Create an index for blazing-fast sorting and position lookups
CREATE INDEX IF NOT EXISTS products_display_order_idx 
ON public.products (display_order ASC NULLS LAST, created_at DESC);

-- ==============================================================================
-- How It Works:
-- 1. Products with display_order (1, 2, 3, etc.) appear at those exact top positions.
-- 2. Products without display_order (NULL) automatically sort by newest first (created_at DESC).
-- 3. Whenever a new product is uploaded, it automatically appears right at the top of the unpinned products!
-- ==============================================================================

