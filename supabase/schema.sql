-- Sanyog initial private profile schema
-- Run this in Supabase SQL Editor. This creates private owner-only profile records.
-- Public profile discovery and photo storage are intentionally not enabled here.

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null check (char_length(first_name) between 1 and 60),
  last_name text not null check (char_length(last_name) between 1 and 60),
  date_of_birth date not null,
  profile_manager text not null check (
    profile_manager in ('self', 'assisted_with_candidate_permission')
  ),
  candidate_consent boolean not null default false,
  religion text,
  community text,
  subcommunity text,
  country_of_residence text not null default 'India',
  partner_community_preference text not null default 'No preference',
  state_or_ut text not null,
  district text,
  marital_status text,
  height_range text,
  diet text,
  education text,
  institution text,
  income_range text,
  employment_sector text,
  profession text,
  company_name text,
  about text check (about is null or char_length(about) <= 1200),
  profile_status text not null default 'draft' check (
    profile_status in ('draft', 'pending_review', 'active', 'paused', 'rejected')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint candidate_consent_required_for_assisted_profiles
    check (profile_manager <> 'assisted_with_candidate_permission' or candidate_consent = true)
);

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_profiles_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "Members can read their own profile" on public.profiles;
create policy "Members can read their own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Members can create their own profile" on public.profiles;
create policy "Members can create their own profile"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Members can update their own profile" on public.profiles;
create policy "Members can update their own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Members can delete their own profile" on public.profiles;
create policy "Members can delete their own profile"
on public.profiles for delete
to authenticated
using ((select auth.uid()) = user_id);

-- No public read policy is created. Profiles stay private until a separate,
-- carefully scoped public discovery design is implemented and reviewed.
