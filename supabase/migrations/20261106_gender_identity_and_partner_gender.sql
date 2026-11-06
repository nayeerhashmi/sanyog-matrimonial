-- Sanyog: separate member gender identity from partner gender preference.
-- Run this migration in the Supabase SQL Editor. It preserves existing profile rows.

alter table public.profiles
  add column if not exists gender_identity text,
  add column if not exists gender_identity_other text;

alter table public.profiles
  drop constraint if exists profiles_gender_identity_check;

alter table public.profiles
  add constraint profiles_gender_identity_check
  check (
    gender_identity is null
    or gender_identity in ('Woman', 'Man', 'Non-binary', 'Self-describe')
  );

comment on column public.profiles.gender_identity is
  'Optional member-selected gender identity. Separate from partner preferences.';
comment on column public.profiles.gender_identity_other is
  'Optional self-described gender identity when gender_identity is Self-describe.';

-- Existing partner_preferences JSONB stores preferred_gender as one of:
-- Men, Women, All genders, or null (no preference).
