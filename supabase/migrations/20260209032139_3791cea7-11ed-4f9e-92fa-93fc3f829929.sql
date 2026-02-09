-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('admin-uploads', 'admin-uploads', true);

-- Allow anyone to view uploaded images (public bucket)
CREATE POLICY "Public read access for admin uploads"
ON storage.objects
FOR SELECT
USING (bucket_id = 'admin-uploads');

-- Only authenticated admin users can upload
CREATE POLICY "Admins can upload files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'admin-uploads'
  AND auth.role() = 'authenticated'
  AND public.has_role(auth.uid(), 'admin')
);

-- Admins can update their uploads
CREATE POLICY "Admins can update files"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'admin-uploads'
  AND auth.role() = 'authenticated'
  AND public.has_role(auth.uid(), 'admin')
);

-- Admins can delete their uploads
CREATE POLICY "Admins can delete files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'admin-uploads'
  AND auth.role() = 'authenticated'
  AND public.has_role(auth.uid(), 'admin')
);
