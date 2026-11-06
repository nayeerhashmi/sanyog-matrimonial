-- Sanyog member reporting and blocking foundation
-- Apply in Supabase SQL Editor. This creates private records only.
-- It does not enable profile discovery or create moderator access.

create table if not exists public.member_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reported_user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in (
    'harassment', 'fake_profile', 'scam_or_fraud', 'inappropriate_content',
    'underage_suspicion', 'privacy_violation', 'other'
  )),
  description text not null check (char_length(trim(description)) between 10 and 2000),
  status text not null default 'received' check (status in (
    'received', 'under_review', 'action_taken', 'no_action', 'closed'
  )),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint member_reports_no_self_report check (reporter_id <> reported_user_id)
);

create index if not exists member_reports_reporter_created_idx
  on public.member_reports (reporter_id, created_at desc);
create index if not exists member_reports_reported_created_idx
  on public.member_reports (reported_user_id, created_at desc);

create table if not exists public.member_blocks (
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_user_id),
  constraint member_blocks_no_self_block check (blocker_id <> blocked_user_id)
);

create index if not exists member_blocks_blocked_user_idx
  on public.member_blocks (blocked_user_id);

create or replace function public.set_member_report_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists member_reports_set_updated_at on public.member_reports;
create trigger member_reports_set_updated_at
before update on public.member_reports
for each row execute function public.set_member_report_updated_at();

alter table public.member_reports enable row level security;
alter table public.member_blocks enable row level security;

drop policy if exists "Members can submit reports" on public.member_reports;
create policy "Members can submit reports"
on public.member_reports for insert
to authenticated
with check (
  reporter_id = (select auth.uid())
  and reporter_id <> reported_user_id
);

drop policy if exists "Members can view their submitted reports" on public.member_reports;
create policy "Members can view their submitted reports"
on public.member_reports for select
to authenticated
using (reporter_id = (select auth.uid()));

-- No member UPDATE or DELETE policy is provided for reports.
-- Moderation status changes must be performed by a trusted server-side workflow.

drop policy if exists "Members can view their own blocks" on public.member_blocks;
create policy "Members can view their own blocks"
on public.member_blocks for select
to authenticated
using (blocker_id = (select auth.uid()));

drop policy if exists "Members can block another account" on public.member_blocks;
create policy "Members can block another account"
on public.member_blocks for insert
to authenticated
with check (
  blocker_id = (select auth.uid())
  and blocker_id <> blocked_user_id
);

drop policy if exists "Members can unblock accounts they blocked" on public.member_blocks;
create policy "Members can unblock accounts they blocked"
on public.member_blocks for delete
to authenticated
using (blocker_id = (select auth.uid()));

-- No policy grants members access to another person's report or block list.
-- Service-role access must remain inside trusted Edge Functions only.
