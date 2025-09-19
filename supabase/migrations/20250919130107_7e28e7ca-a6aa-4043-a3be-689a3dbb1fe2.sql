-- Secure public vs admin access and fix permissions
-- 1) Ensure vehicles is only readable by authenticated users
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive public select policy if it exists
DROP POLICY IF EXISTS "Anyone can view vehicles" ON public.vehicles;

-- Authenticated users can select
CREATE POLICY IF NOT EXISTS "Authenticated users can view vehicles"
ON public.vehicles
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Keep existing write policies (already require auth). Ensure grants are correct
REVOKE ALL ON TABLE public.vehicles FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.vehicles TO authenticated;

-- 2) Prepare public table and make it safe to read publicly
ALTER TABLE public.vehicles_public ENABLE ROW LEVEL SECURITY;

-- Ensure id is not null and is primary key for upserts
DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'vehicles_public' AND column_name = 'id' AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE public.vehicles_public ALTER COLUMN id SET NOT NULL;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conrelid = 'public.vehicles_public'::regclass AND contype = 'p'
  ) THEN
    ALTER TABLE public.vehicles_public ADD PRIMARY KEY (id);
  END IF;
END $$;

-- Public can select sanitized data
DROP POLICY IF EXISTS "Public can view vehicles_public" ON public.vehicles_public;
CREATE POLICY "Public can view vehicles_public"
ON public.vehicles_public
FOR SELECT
USING (true);

GRANT SELECT ON TABLE public.vehicles_public TO anon, authenticated;

-- 3) Sync triggers from vehicles -> vehicles_public (exclude owner_phone)
CREATE OR REPLACE FUNCTION public.sync_vehicles_to_public()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    DELETE FROM public.vehicles_public WHERE id = OLD.id;
    RETURN OLD;
  ELSE
    INSERT INTO public.vehicles_public (
      id, brand, model, year, model_year, price, km, type, category, 
      image, featured, created_at, updated_at, traction, body_type,
      color, power_steering, high_roof, air_conditioning, climate_control,
      sleeper_cabin, onboard_computer, automatic_transmission, vehicle_details,
      multiple_units, fleet_renewal, km_range_500_600
    ) VALUES (
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
  END IF;
END;
$$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_sync_vehicles_to_public'
  ) THEN
    CREATE TRIGGER trg_sync_vehicles_to_public
    AFTER INSERT OR UPDATE OR DELETE ON public.vehicles
    FOR EACH ROW EXECUTE FUNCTION public.sync_vehicles_to_public();
  END IF;
END $$;

-- 4) Backfill public table from existing vehicles
INSERT INTO public.vehicles_public (
  id, brand, model, year, model_year, price, km, type, category,
  image, featured, created_at, updated_at, traction, body_type,
  color, power_steering, high_roof, air_conditioning, climate_control,
  sleeper_cabin, onboard_computer, automatic_transmission, vehicle_details,
  multiple_units, fleet_renewal, km_range_500_600
)
SELECT
  v.id, v.brand, v.model, v.year, v.model_year, v.price, v.km, v.type, v.category,
  v.image, v.featured, v.created_at, v.updated_at, v.traction, v.body_type,
  v.color, v.power_steering, v.high_roof, v.air_conditioning, v.climate_control,
  v.sleeper_cabin, v.onboard_computer, v.automatic_transmission, v.vehicle_details,
  v.multiple_units, v.fleet_renewal, v.km_range_500_600
FROM public.vehicles v
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
