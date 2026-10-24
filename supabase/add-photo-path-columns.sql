-- Sanyog: record private storage paths for a member's optional photos.
-- Run this once in Supabase SQL Editor after opening the Sanyog project.
-- These are object paths, not public URLs. The bucket must remain private.

alter table public.profiles
  add column if not exists photo_close_up_path text,
  add column if not exists photo_half_length_path text,
  add column if not exists photo_full_length_path text;

