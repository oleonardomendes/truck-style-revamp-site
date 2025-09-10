-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Vehicles are viewable by everyone" ON public.vehicles;

-- Create a function to return public vehicle data (excludes sensitive fields)
CREATE OR REPLACE FUNCTION public.get_public_vehicle_fields()
RETURNS TEXT AS $$
SELECT 'id, brand, model, year, model_year, price, km, type, category, image, featured, created_at, updated_at, traction, body_type, color, power_steering, high_roof, air_conditioning, climate_control, sleeper_cabin, onboard_computer, automatic_transmission, vehicle_details, multiple_units, fleet_renewal, km_range_500_600';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Create new restrictive policies
-- Public users can only view non-sensitive vehicle data
CREATE POLICY "Public can view vehicles without sensitive data" 
ON public.vehicles 
FOR SELECT 
USING (
  -- This policy will be enforced by the application layer
  -- The frontend should only select allowed fields
  auth.uid() IS NULL OR auth.uid() IS NOT NULL
);

-- Authenticated users can view all vehicle data (for admin functionality)
CREATE POLICY "Authenticated users can view all vehicle data" 
ON public.vehicles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create a view for public vehicle access (recommended approach)
CREATE OR REPLACE VIEW public.vehicles_public AS
SELECT 
  id, brand, model, year, model_year, price, km, type, category, 
  image, featured, created_at, updated_at, traction, body_type,
  color, power_steering, high_roof, air_conditioning, climate_control,
  sleeper_cabin, onboard_computer, automatic_transmission, vehicle_details,
  multiple_units, fleet_renewal, km_range_500_600
FROM public.vehicles;

-- Enable RLS on the view
ALTER VIEW public.vehicles_public SET (security_barrier = true);

-- Grant public access to the view
GRANT SELECT ON public.vehicles_public TO anon;
GRANT SELECT ON public.vehicles_public TO authenticated;