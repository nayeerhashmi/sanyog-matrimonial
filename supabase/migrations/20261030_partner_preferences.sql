-- Sanyog migration: store candidate-selected partner preferences separately.
-- Run in the Supabase SQL Editor before using the updated profile editor.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS partner_preferences jsonb NOT NULL DEFAULT '{}'::jsonb;

COMMENT ON COLUMN public.profiles.partner_preferences IS
'Optional candidate-selected partner preferences. Kept separate from the candidate profile attributes.';
