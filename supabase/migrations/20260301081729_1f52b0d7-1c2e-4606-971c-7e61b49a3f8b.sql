
CREATE TABLE public.certificates (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  issuer text,
  date text,
  category text DEFAULT 'General',
  image_url text,
  published boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published certificates" ON public.certificates FOR SELECT USING (published = true);
CREATE POLICY "Admins can view all certificates" ON public.certificates FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can manage certificates" ON public.certificates FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON public.certificates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
