-- Enable RLS and reset policies for a clean, predictable setup
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid duplicates or restrictive behavior)
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'vehicles'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.vehicles', pol.policyname);
  END LOOP;
END$$;

-- Public SELECT: allow anyone (including anonymous) to view vehicles
CREATE POLICY "Public can view vehicles"
ON public.vehicles
FOR SELECT
USING (true);

-- Authenticated users can INSERT/UPDATE/DELETE
CREATE POLICY "Authenticated can insert vehicles"
ON public.vehicles
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can update vehicles"
ON public.vehicles
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can delete vehicles"
ON public.vehicles
FOR DELETE
USING (auth.uid() IS NOT NULL);

-- Ensure timestamps and owner_id are set automatically
-- Create trigger to set owner_id on insert if missing
DROP TRIGGER IF EXISTS set_owner_id_before_insert ON public.vehicles;
CREATE TRIGGER set_owner_id_before_insert
BEFORE INSERT ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.set_owner_id();

-- Create trigger to update updated_at column automatically
DROP TRIGGER IF EXISTS set_updated_at_before_update ON public.vehicles;
CREATE TRIGGER set_updated_at_before_update
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
