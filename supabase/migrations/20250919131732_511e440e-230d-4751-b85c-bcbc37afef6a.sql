-- Fix vehicles visibility and secure public site via vehicles_public
BEGIN;

-- Ensure RLS is enabled
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles_public ENABLE ROW LEVEL SECURITY;

-- Ensure vehicles_public has a primary key so we can upsert by id
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'vehicles_public_pkey'
  ) THEN
    -- Make sure id is not null before adding PK
    ALTER TABLE public.vehicles_public ALTER COLUMN id SET NOT NULL;
    ALTER TABLE public.vehicles_public ADD CONSTRAINT vehicles_public_pkey PRIMARY KEY (id);
  END IF;
END $$;

-- Reset policies on vehicles to allow only authenticated users to manage/read
DROP POLICY IF EXISTS "Anyone can view vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can insert vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can update vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can delete vehicles" ON public.vehicles;

CREATE POLICY "Authenticated can select vehicles"
ON public.vehicles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can insert vehicles"
ON public.vehicles
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update vehicles"
ON public.vehicles
FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated can delete vehicles"
ON public.vehicles
FOR DELETE
TO authenticated
USING (true);

-- Grants for vehicles (frontend uses JWT -> role authenticated). Revoke anon.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vehicles TO authenticated;
REVOKE ALL ON public.vehicles FROM anon;

-- Public read access for vehicles_public (safe columns only)
DROP POLICY IF EXISTS "Public read vehicles_public" ON public.vehicles_public;
CREATE POLICY "Public read vehicles_public"
ON public.vehicles_public
FOR SELECT
TO anon, authenticated
USING (true);

-- Ensure only our triggers write to vehicles_public
REVOKE INSERT, UPDATE, DELETE ON public.vehicles_public FROM anon, authenticated;
GRANT SELECT ON public.vehicles_public TO anon, authenticated;

-- Sync triggers: keep vehicles_public in sync with vehicles
CREATE OR REPLACE FUNCTION public.sync_vehicles_to_public()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.vehicles_public AS vp (
    id, brand, model, year, model_year, price, km, type, category,
    image, featured, created_at, updated_at, traction, body_type,
    color, power_steering, high_roof, air_conditioning, climate_control,
    sleeper_cabin, onboard_computer, automatic_transmission, vehicle_details,
    multiple_units, fleet_renewal, km_range_500_600
  )
  VALUES (
    NEW.id, NEW.brand, NEW.model, NEW.year, NEW.model_year, NEW.price, NEW.km, NEW.type, NEW.category,
    NEW.image, NEW.featured, NEW.created_at, NEW.updated_at, NEW.traction, NEW.body_type,
    NEW.color, NEW.power_steering, NEW.high_roof, NEW.air_conditioning, NEW.climate_control,
    NEW.sleeper_cabin, NEW.onboard_computer, NEW.automatic_transmission, NEW.vehicle_details,
    NEW.multiple_units, NEW.fleet_renewal, NEW.km_range_500_600
  )
  ON CONFLICT (id) DO UPDATE SET
    brand = EXCLUDED.brand,
    model = EXCLUDED.model,
    year = EXCLUDED.year,
    model_year = EXCLUDED.model_year,
    price = EXCLUDED.price,
    km = EXCLUDED.km,
    type = EXCLUDED.type,
    category = EXCLUDED.category,
    image = EXCLUDED.image,
    featured = EXCLUDED.featured,
    created_at = EXCLUDED.created_at,
    updated_at = EXCLUDED.updated_at,
    traction = EXCLUDED.traction,
    body_type = EXCLUDED.body_type,
    color = EXCLUDED.color,
    power_steering = EXCLUDED.power_steering,
    high_roof = EXCLUDED.high_roof,
    air_conditioning = EXCLUDED.air_conditioning,
    climate_control = EXCLUDED.climate_control,
    sleeper_cabin = EXCLUDED.sleeper_cabin,
    onboard_computer = EXCLUDED.onboard_computer,
    automatic_transmission = EXCLUDED.automatic_transmission,
    vehicle_details = EXCLUDED.vehicle_details,
    multiple_units = EXCLUDED.multiple_units,
    fleet_renewal = EXCLUDED.fleet_renewal,
    km_range_500_600 = EXCLUDED.km_range_500_600;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_vehicles_from_public()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.vehicles_public WHERE id = OLD.id;
  RETURN OLD;
END;
$$;

-- Attach triggers to vehicles
DROP TRIGGER IF EXISTS trg_sync_vehicles_to_public ON public.vehicles;
CREATE TRIGGER trg_sync_vehicles_to_public
AFTER INSERT OR UPDATE ON public.vehicles
FOR EACH ROW EXECUTE FUNCTION public.sync_vehicles_to_public();

DROP TRIGGER IF EXISTS trg_delete_vehicles_from_public ON public.vehicles;
CREATE TRIGGER trg_delete_vehicles_from_public
AFTER DELETE ON public.vehicles
FOR EACH ROW EXECUTE FUNCTION public.delete_vehicles_from_public();

-- Set owner_id and updated_at maintenance triggers (functions already exist)
DROP TRIGGER IF EXISTS trg_set_owner_id ON public.vehicles;
CREATE TRIGGER trg_set_owner_id
BEFORE INSERT ON public.vehicles
FOR EACH ROW EXECUTE FUNCTION public.set_owner_id();

DROP TRIGGER IF EXISTS trg_update_updated_at ON public.vehicles;
CREATE TRIGGER trg_update_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Backfill public table with existing records
INSERT INTO public.vehicles_public (
  id, brand, model, year, model_year, price, km, type, category, image, featured, created_at, updated_at,
  traction, body_type, color, power_steering, high_roof, air_conditioning, climate_control, sleeper_cabin,
  onboard_computer, automatic_transmission, vehicle_details, multiple_units, fleet_renewal, km_range_500_600
)
SELECT 
  v.id, v.brand, v.model, v.year, v.model_year, v.price, v.km, v.type, v.category, v.image, v.featured, v.created_at, v.updated_at,
  v.traction, v.body_type, v.color, v.power_steering, v.high_roof, v.air_conditioning, v.climate_control, v.sleeper_cabin,
  v.onboard_computer, v.automatic_transmission, v.vehicle_details, v.multiple_units, v.fleet_renewal, v.km_range_500_600
FROM public.vehicles v
ON CONFLICT (id) DO NOTHING;

COMMIT;