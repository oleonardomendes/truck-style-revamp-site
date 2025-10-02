-- Add images column to store multiple vehicle images
ALTER TABLE vehicles ADD COLUMN images text[] DEFAULT ARRAY[]::text[];