-- Create vehicles table for truck inventory
CREATE TABLE public.vehicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  km INTEGER NOT NULL,
  type TEXT NOT NULL DEFAULT 'Caminhão',
  category TEXT NOT NULL DEFAULT 'Seminovo',
  image TEXT,
  owner_phone TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Vehicles are viewable by everyone" 
ON public.vehicles 
FOR SELECT 
USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Authenticated users can insert vehicles" 
ON public.vehicles 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update vehicles" 
ON public.vehicles 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete vehicles" 
ON public.vehicles 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.vehicles (brand, model, year, price, km, owner_phone, featured) VALUES
('Volvo', 'FH 440', 2020, 280000.00, 150000, '15998242856', true),
('Scania', 'R 450', 2019, 320000.00, 200000, '15998242856', true),
('Mercedes-Benz', 'Actros 2646', 2021, 450000.00, 80000, '15998242856', true);