
-- Add views column to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS views integer DEFAULT 0;
