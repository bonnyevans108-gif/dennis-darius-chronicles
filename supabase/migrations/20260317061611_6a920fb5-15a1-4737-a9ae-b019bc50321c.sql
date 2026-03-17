CREATE POLICY "Anyone can insert testimonials"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (true);