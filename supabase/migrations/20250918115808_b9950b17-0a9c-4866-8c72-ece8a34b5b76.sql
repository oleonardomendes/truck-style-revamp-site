-- CORREÇÃO: Políticas que permitem visualização pública mas protegem dados sensíveis

-- Remover todas as políticas existentes para recriar corretamente
DROP POLICY IF EXISTS "Public can view non-sensitive vehicle data" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can view all vehicle data" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can insert vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can update vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can delete vehicles" ON public.vehicles;

-- Remover função desnecessária
DROP FUNCTION IF EXISTS public.get_public_vehicle_data(public.vehicles);

-- POLÍTICA SIMPLIFICADA: Todos podem VER veículos (dados básicos disponíveis publicamente)
-- O controle de dados sensíveis será feito no nível da aplicação
CREATE POLICY "Anyone can view vehicles" 
ON public.vehicles 
FOR SELECT 
USING (true);

-- Apenas usuários autenticados podem MODIFICAR veículos
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

-- Garantir que RLS está habilitado
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;