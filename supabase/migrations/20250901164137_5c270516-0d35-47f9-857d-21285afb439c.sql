-- Create storage bucket for vehicle images
INSERT INTO storage.buckets (id, name, public) VALUES ('vehicle-images', 'vehicle-images', true);

-- Create policies for vehicle images bucket
CREATE POLICY "Vehicle images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'vehicle-images');

CREATE POLICY "Authenticated users can upload vehicle images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'vehicle-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update vehicle images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'vehicle-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete vehicle images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'vehicle-images' AND auth.uid() IS NOT NULL);