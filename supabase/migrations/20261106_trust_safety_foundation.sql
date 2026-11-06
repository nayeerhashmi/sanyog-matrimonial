-- Sanyog trust and safety foundation
-- Apply in Supabase SQL Editor after reviewing the project schema.
-- This creates private report and block records only. It does not create a
-- moderator dashboard or grant moderator access. Moderation remains server-side work.

create table if not exists public.member_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reported_user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (
    category in ('fake_profile', 'harassment', 'impersonation', 'scam_or_fraud',
                 'inappropriate_content', 'underage_concern', 'other')
  ),
  description text not null check (char_length(trim(description)) between 10 and 2000),
  status text not null default 'submitted' check (
    status in ('submitted', 'under_review', 'action_taken', 'closed')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reports_cannot_target_reporter check (reporter_id <> reported_user_id)
);

create index if not exists member_reports_reporter_created_idx
  on public.member_reports (reporter_id, created_at desc);
create index if not exists member_reports_target_created_idx
  on public.member_reports (reported_user_id, created_at desc);

alter table public.member_reports enable row level security;

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

-- Deliberately no client UPDATE or DELETE policy. Status changes and report
-- handling must be performed by a trusted server-side moderation function.

create table if not exists public.member_blocks (
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_user_id),
  constraint members_cannot_block_themselves check (blocker_id <> blocked_user_id)
);

create index if not exists member_blocks_blocked_user_idx
  on public.member_blocks (blocked_user_id);

alter table public.member_blocks enable row level security;

drop policy if exists "Members can view their own blocks" on public.member_blocks;
create policy "Members can view their own blocks"
on public.member_blocks for select
to authenticated
using (blocker_id = (select auth.uid()));

drop policy if exists "Members can block other accounts" on public.member_blocks;
create policy "Members can block other accounts"
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

-- No policies expose reports to reported members or blocks to blocked members.
-- No public profile lookup, messaging, or discovery access is enabled here.
