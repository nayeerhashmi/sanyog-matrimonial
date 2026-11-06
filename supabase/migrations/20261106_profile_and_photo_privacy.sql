-- Sanyog: persist member-controlled profile field and photo visibility.
-- Run in Supabase SQL Editor. Existing profile rows remain unchanged and private.

alter table public.profiles
  add column if not exists profile_visibility jsonb not null default '{}'::jsonb,
  add column if not exists photo_visibility jsonb not null default '{}'::jsonb;

alter table public.profiles
  drop constraint if exists profiles_profile_visibility_object_check,
  drop constraint if exists profiles_photo_visibility_object_check;

alter table public.profiles
  add constraint profiles_profile_visibility_object_check
    check (jsonb_typeof(profile_visibility) = 'object'),
  add constraint profiles_photo_visibility_object_check
    check (jsonb_typeof(photo_visibility) = 'object');

comment on column public.profiles.profile_visibility is
  'Member-controlled visibility flags for eligible profile fields. Private account data is never included.';
comment on column public.profiles.photo_visibility is
  'Per-photo visibility mode: members, private, or blurred_reveal.';
