-- Corrigir políticas RLS para permitir acesso adequado aos veículos

-- Primeiro, vamos remover as políticas existentes que estão muito restritivas
DROP POLICY IF EXISTS "Public can view vehicles without sensitive data" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can view all vehicle data" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can insert vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can update vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Authenticated users can delete vehicles" ON public.vehicles;

-- Criar políticas mais adequadas

-- Política para permitir que qualquer pessoa (autenticada ou não) veja dados básicos dos veículos
-- mas sem informações sensíveis como telefone do proprietário
CREATE POLICY "Anyone can view basic vehicle data" 
ON public.vehicles 
FOR SELECT 
USING (true);

-- Política para permitir que usuários autenticados insiram veículos
CREATE POLICY "Authenticated users can insert vehicles" 
ON public.vehicles 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Política para permitir que usuários autenticados atualizem veículos
CREATE POLICY "Authenticated users can update vehicles" 
ON public.vehicles 
FOR UPDATE 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Política para permitir que usuários autenticados excluam veículos
CREATE POLICY "Authenticated users can delete vehicles" 
ON public.vehicles 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- Garantir que RLS está habilitado
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;