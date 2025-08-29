-- Adicionar novos campos à tabela vehicles
ALTER TABLE public.vehicles 
ADD COLUMN color text,
ADD COLUMN power_steering boolean DEFAULT false,
ADD COLUMN high_roof boolean DEFAULT false,
ADD COLUMN air_conditioning boolean DEFAULT false,
ADD COLUMN climate_control boolean DEFAULT false,
ADD COLUMN sleeper_cabin boolean DEFAULT false,
ADD COLUMN onboard_computer boolean DEFAULT false,
ADD COLUMN automatic_transmission boolean DEFAULT false,
ADD COLUMN vehicle_details text,
ADD COLUMN multiple_units boolean DEFAULT false,
ADD COLUMN fleet_renewal boolean DEFAULT false,
ADD COLUMN km_range_500_600 boolean DEFAULT false;

-- Comentários para documentar os novos campos
COMMENT ON COLUMN public.vehicles.color IS 'Cor do veículo';
COMMENT ON COLUMN public.vehicles.power_steering IS 'Direção hidráulica';
COMMENT ON COLUMN public.vehicles.high_roof IS 'Teto alto';
COMMENT ON COLUMN public.vehicles.air_conditioning IS 'Ar condicionado';
COMMENT ON COLUMN public.vehicles.climate_control IS 'Climatizador';
COMMENT ON COLUMN public.vehicles.sleeper_cabin IS 'Cabine leito';
COMMENT ON COLUMN public.vehicles.onboard_computer IS 'Computador de bordo';
COMMENT ON COLUMN public.vehicles.automatic_transmission IS 'Câmbio automático';
COMMENT ON COLUMN public.vehicles.vehicle_details IS 'Detalhes do veículo';
COMMENT ON COLUMN public.vehicles.multiple_units IS 'Várias unidades disponíveis';
COMMENT ON COLUMN public.vehicles.fleet_renewal IS 'Renovação de frota';
COMMENT ON COLUMN public.vehicles.km_range_500_600 IS 'Quilometragem entre 500 a 600 mil km';