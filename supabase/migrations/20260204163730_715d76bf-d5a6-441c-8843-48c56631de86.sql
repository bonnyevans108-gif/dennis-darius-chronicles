-- Create a function that assigns admin role to the first user if no admins exist
-- This uses SECURITY DEFINER to bypass RLS
CREATE OR REPLACE FUNCTION public.assign_first_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only assign admin if no admin users exist yet
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to run after profile creation (which happens on user signup)
DROP TRIGGER IF EXISTS on_first_user_assign_admin ON public.profiles;
CREATE TRIGGER on_first_user_assign_admin
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.assign_first_admin();