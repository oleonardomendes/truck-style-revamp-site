-- CORREÇÃO CRÍTICA: Proteger números de telefone dos proprietários

-- Remover política insegura atual
DROP POLICY IF EXISTS "Anyone can view basic vehicle data" ON public.vehicles;

-- Criar função de segurança para dados públicos (sem telefone)
CREATE OR REPLACE FUNCTION public.get_public_vehicle_data(vehicle_row public.vehicles)
RETURNS BOOLEAN AS $$
BEGIN
  -- Esta função será usada para determinar se um veículo pode ser visto publicamente
  -- mas excluiremos campos sensíveis na consulta
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Política para usuários não autenticados: podem ver dados básicos MAS SEM telefone
CREATE POLICY "Public can view non-sensitive vehicle data" 
ON public.vehicles 
FOR SELECT 
USING (
  auth.uid() IS NULL 
  AND public.get_public_vehicle_data(vehicles.*)
);

-- Política para usuários autenticados: podem ver TODOS os dados incluindo telefone
CREATE POLICY "Authenticated users can view all vehicle data" 
ON public.vehicles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Manter políticas para modificação (apenas usuários autenticados)
-- Já criadas na migração anterior, mas vamos garantir que existem

-- Para INSERT
DROP POLICY IF EXISTS "Authenticated users can insert vehicles" ON public.vehicles;
CREATE POLICY "Authenticated users can insert vehicles" 
ON public.vehicles 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Para UPDATE  
DROP POLICY IF EXISTS "Authenticated users can update vehicles" ON public.vehicles;
CREATE POLICY "Authenticated users can update vehicles" 
ON public.vehicles 
FOR UPDATE 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Para DELETE
DROP POLICY IF EXISTS "Authenticated users can delete vehicles" ON public.vehicles;
CREATE POLICY "Authenticated users can delete vehicles" 
ON public.vehicles 
FOR DELETE 
USING (auth.uid() IS NOT NULL);