-- Fix Security Definer View issue by recreating vehicles_public view with SECURITY INVOKER
-- This ensures the view executes with the querying user's privileges, not the view owner's,
-- allowing RLS policies to be properly enforced.

BEGIN;

-- Drop the existing view
DROP VIEW IF EXISTS public.vehicles_public;

-- Recreate the view with SECURITY INVOKER (explicit, though it's the default)
CREATE VIEW public.vehicles_public
WITH (security_invoker = true)
AS SELECT 
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
FROM vehicles;

-- Grant appropriate permissions
GRANT SELECT ON public.vehicles_public TO anon;
GRANT SELECT ON public.vehicles_public TO authenticated;

COMMIT;