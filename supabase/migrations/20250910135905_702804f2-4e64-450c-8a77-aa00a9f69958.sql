-- Fix the security issues from the previous migration

-- Drop and recreate the function with proper search_path
DROP FUNCTION IF EXISTS public.get_public_vehicle_fields();
CREATE OR REPLACE FUNCTION public.get_public_vehicle_fields()
RETURNS TEXT AS $$
SELECT 'id, brand, model, year, model_year, price, km, type, category, image, featured, created_at, updated_at, traction, body_type, color, power_steering, high_roof, air_conditioning, climate_control, sleeper_cabin, onboard_computer, automatic_transmission, vehicle_details, multiple_units, fleet_renewal, km_range_500_600';
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- Drop the security definer view and create a regular view
DROP VIEW IF EXISTS public.vehicles_public;
CREATE OR REPLACE VIEW public.vehicles_public AS
SELECT 
  id, brand, model, year, model_year, price, km, type, category, 
  image, featured, created_at, updated_at, traction, body_type,
  color, power_steering, high_roof, air_conditioning, climate_control,
  sleeper_cabin, onboard_computer, automatic_transmission, vehicle_details,
  multiple_units, fleet_renewal, km_range_500_600
FROM public.vehicles;

-- Grant appropriate permissions
GRANT SELECT ON public.vehicles_public TO anon;
GRANT SELECT ON public.vehicles_public TO authenticated;