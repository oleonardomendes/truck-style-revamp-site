-- Adicionar novos campos à tabela vehicles
ALTER TABLE public.vehicles 
ADD COLUMN model_year integer,
ADD COLUMN traction text,
ADD COLUMN body_type text;

-- Comentários para documentar os novos campos
COMMENT ON COLUMN public.vehicles.model_year IS 'Ano do modelo do veículo';
COMMENT ON COLUMN public.vehicles.traction IS 'Tipo de tração (4x2, 6x4, etc.)';
COMMENT ON COLUMN public.vehicles.body_type IS 'Tipo de carroceria (Baú, Graneleiro, etc.)';