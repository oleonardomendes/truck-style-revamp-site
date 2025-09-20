-- Ensure RLS is enabled
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies on vehicles to avoid conflicts
DO $$
DECLARE pol RECORD;
BEGIN
  FOR pol IN SELECT policyname FROM pg_policies WHERE schemaname = 'public' AND tablename = 'vehicles'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.vehicles', pol.policyname);
  END LOOP;
END$$;

-- Recreate clean policies
-- Public can read vehicles (for website)
CREATE POLICY "Public can view vehicles"
ON public.vehicles
FOR SELECT
USING (true);

-- Authenticated users can insert/update/delete (for admin panel)
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

-- Ensure correct grants at the Postgres level
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON TABLE public.vehicles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.vehicles TO authenticated;

-- Recreate triggers for owner_id and updated_at to guarantee consistency
DROP TRIGGER IF EXISTS set_owner_id_before_insert ON public.vehicles;
CREATE TRIGGER set_owner_id_before_insert
BEFORE INSERT ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.set_owner_id();

DROP TRIGGER IF EXISTS set_updated_at_before_update ON public.vehicles;
CREATE TRIGGER set_updated_at_before_update
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
