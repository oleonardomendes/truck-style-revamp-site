-- Protect owner_phone from public access via column-level privileges
-- Strategy:
-- 1) Revoke broad SELECT on vehicles from anon
-- 2) Grant anon SELECT only on non-sensitive columns
-- 3) Ensure authenticated users keep full SELECT

BEGIN;

-- Revoke all privileges for anon on base table to start from a clean state
REVOKE ALL ON TABLE public.vehicles FROM anon;

-- Ensure authenticated users can still read all columns (including owner_phone)
GRANT SELECT ON TABLE public.vehicles TO authenticated;

-- Grant anon SELECT only on the non-sensitive columns
GRANT SELECT (
  id,
  brand,
  model,
  year,
  model_year,
  price,
  km,
  type,
  category,
  image,
  featured,
  created_at,
  updated_at,
  traction,
  body_type,
  color,
  power_steering,
  high_roof,
  air_conditioning,
  climate_control,
  sleeper_cabin,
  onboard_computer,
  automatic_transmission,
  vehicle_details,
  multiple_units,
  fleet_renewal,
  km_range_500_600
) ON public.vehicles TO anon;

-- Note: We intentionally do NOT grant SELECT on owner_phone to anon.
-- The public frontend already queries the vehicles_public view which excludes owner_phone.
-- Admin/authenticated features remain unaffected.

COMMIT;