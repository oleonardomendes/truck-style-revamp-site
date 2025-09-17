-- Add owner scoping and prevent owner_phone exposure to non-owners
BEGIN;

-- 1) Add owner_id to vehicles (nullable for backfill), and set automatically on insert
ALTER TABLE public.vehicles
ADD COLUMN IF NOT EXISTS owner_id uuid;

CREATE OR REPLACE FUNCTION public.set_owner_id()
RETURNS trigger AS $$
BEGIN
  IF NEW.owner_id IS NULL THEN
    NEW.owner_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_set_owner_id ON public.vehicles;
CREATE TRIGGER trg_set_owner_id
BEFORE INSERT ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.set_owner_id();

-- 2) Lock down direct SELECT on base table so authenticated users can't read owner_phone directly
REVOKE SELECT ON TABLE public.vehicles FROM anon;
REVOKE SELECT ON TABLE public.vehicles FROM authenticated;

-- Keep mutation privileges (RLS still applies)
GRANT INSERT, UPDATE, DELETE ON TABLE public.vehicles TO authenticated;

-- 3) Create a secure view for authenticated reads that masks owner_phone unless owned by the requester
CREATE OR REPLACE VIEW public.vehicles_secure
WITH (security_invoker = on) AS
SELECT 
  v.id,
  v.brand,
  v.model,
  v.year,
  v.model_year,
  v.price,
  v.km,
  v.type,
  v.category,
  v.image,
  v.featured,
  v.created_at,
  v.updated_at,
  v.traction,
  v.body_type,
  v.color,
  v.power_steering,
  v.high_roof,
  v.air_conditioning,
  v.climate_control,
  v.sleeper_cabin,
  v.onboard_computer,
  v.automatic_transmission,
  v.vehicle_details,
  v.multiple_units,
  v.fleet_renewal,
  v.km_range_500_600,
  v.owner_id,
  CASE WHEN v.owner_id = auth.uid() THEN v.owner_phone ELSE NULL END AS owner_phone
FROM public.vehicles v;

GRANT SELECT ON public.vehicles_secure TO authenticated;

COMMIT;