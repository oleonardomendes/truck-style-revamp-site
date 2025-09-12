-- Protect sensitive column from anonymous (public) access without impacting existing app behavior
-- Rationale: Frontend reads from vehicles_public (no owner_phone). Admin reads from vehicles with authenticated role.
-- This migration revokes column-level SELECT on owner_phone for the anon and PUBLIC roles.

BEGIN;

-- Ensure table exists
DO $$ BEGIN
  PERFORM 1 FROM information_schema.columns 
  WHERE table_schema = 'public' AND table_name = 'vehicles' AND column_name = 'owner_phone';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Column public.vehicles.owner_phone does not exist';
  END IF;
END $$;

-- Revoke ability for anonymous users to read owner phone numbers
REVOKE SELECT (owner_phone) ON TABLE public.vehicles FROM anon;

-- Defense in depth: also revoke from the PUBLIC role
REVOKE SELECT (owner_phone) ON TABLE public.vehicles FROM PUBLIC;

COMMIT;