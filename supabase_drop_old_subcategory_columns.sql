-- ==============================================================================
-- Gearters Sports: Drop Legacy Subcategory String Columns
-- Run this in your Supabase Dashboard SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Drop old text array column from categories table
ALTER TABLE public.categories 
DROP COLUMN IF EXISTS subcategories;

-- 2. Drop old text string column from products table
ALTER TABLE public.products 
DROP COLUMN IF EXISTS subcategory;

-- ==============================================================================
-- Both tables are now 100% normalized!
-- Products link to subcategories via `subcategory_id`
-- Subcategories link to categories via `category_id`
-- ==============================================================================

