
-- 1. Create private schema for internal helpers (not exposed to PostgREST)
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

-- 2. Create private.has_role
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 3. Recreate all policies to use private.has_role
-- blog_posts
DROP POLICY IF EXISTS "Admins can manage blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can view all blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all blog posts" ON public.blog_posts
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- certificates
DROP POLICY IF EXISTS "Admins can manage certificates" ON public.certificates;
DROP POLICY IF EXISTS "Admins can view all certificates" ON public.certificates;
CREATE POLICY "Admins can manage certificates" ON public.certificates
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all certificates" ON public.certificates
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- gallery_images
DROP POLICY IF EXISTS "Admins can manage gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Admins can view all gallery images" ON public.gallery_images;
CREATE POLICY "Admins can manage gallery images" ON public.gallery_images
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all gallery images" ON public.gallery_images
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- projects
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can view all projects" ON public.projects;
CREATE POLICY "Admins can manage projects" ON public.projects
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all projects" ON public.projects
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));

-- testimonials (also tighten INSERT WITH CHECK)
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can view all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can insert testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all testimonials" ON public.testimonials
  FOR SELECT TO authenticated
  USING (private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public can submit testimonials for review" ON public.testimonials
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    published = false
    AND featured = false
    AND char_length(name) BETWEEN 1 AND 100
    AND char_length(content) BETWEEN 1 AND 1000
    AND (role IS NULL OR char_length(role) <= 100)
    AND (company IS NULL OR char_length(company) <= 100)
    AND (avatar_url IS NULL OR char_length(avatar_url) <= 500)
    AND (rating IS NULL OR (rating BETWEEN 1 AND 5))
  );

-- user_roles
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (private.has_role(auth.uid(), 'admin'))
  WITH CHECK (private.has_role(auth.uid(), 'admin'));

-- storage.objects admin policies
DROP POLICY IF EXISTS "Admins can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update files" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete files" ON storage.objects;
CREATE POLICY "Admins can upload files" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'admin-uploads' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update files" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'admin-uploads' AND private.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete files" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'admin-uploads' AND private.has_role(auth.uid(), 'admin'));

-- 4. Remove broad listing policy on admin-uploads (public URLs still work via bucket public flag)
DROP POLICY IF EXISTS "Public read access for admin uploads" ON storage.objects;

-- 5. Handle_new_user trigger references public.has_role via assign_first_admin? No, it's separate.
-- Drop old public.has_role now that nothing references it
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 6. Make admin-uploads bucket private and add scoped read policy for site assets
-- Keep bucket public so existing getPublicUrl links keep working; listing is already removed above.
