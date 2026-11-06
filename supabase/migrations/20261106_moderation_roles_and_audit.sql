-- Sanyog moderator authorization and audit trail
-- Apply only after 20261106_trust_safety_foundation.sql.
-- Moderator roles are assigned only by a trusted database operator in SQL Editor.
-- No client-facing role assignment or service-role key is introduced.

create table if not exists public.moderator_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('moderator', 'administrator')),
  assigned_at timestamptz not null default now(),
  assigned_by text not null default 'database_operator'
);

alter table public.moderator_roles enable row level security;
revoke all on public.moderator_roles from anon, authenticated;

create or replace function public.is_sanyog_moderator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.moderator_roles mr
    where mr.user_id = (select auth.uid())
      and mr.role in ('moderator', 'administrator')
  );
$$;

revoke all on function public.is_sanyog_moderator() from public;
grant execute on function public.is_sanyog_moderator() to authenticated;

drop policy if exists "Moderators can review reports" on public.member_reports;
create policy "Moderators can review reports"
on public.member_reports for select
to authenticated
using ((select public.is_sanyog_moderator()));

drop policy if exists "Moderators can update report status" on public.member_reports;
create policy "Moderators can update report status"
on public.member_reports for update
to authenticated
using ((select public.is_sanyog_moderator()))
with check ((select public.is_sanyog_moderator()));

-- Restrict client-side updates to the status field only. No report content,
-- reporter identity, target identity, or timestamps can be edited by moderators.
revoke update on public.member_reports from anon, authenticated;
grant update (status) on public.member_reports to authenticated;

create table if not exists public.moderation_audit (
  id bigint generated always as identity primary key,
  report_id uuid not null references public.member_reports(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  old_status text,
  new_status text not null,
  changed_at timestamptz not null default now()
);

create index if not exists moderation_audit_report_changed_idx
  on public.moderation_audit (report_id, changed_at desc);

alter table public.moderation_audit enable row level security;
revoke all on public.moderation_audit from anon, authenticated;
grant select on public.moderation_audit to authenticated;

drop policy if exists "Moderators can view moderation audit" on public.moderation_audit;
create policy "Moderators can view moderation audit"
on public.moderation_audit for select
to authenticated
using ((select public.is_sanyog_moderator()));

create or replace function public.audit_member_report_status()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status is distinct from old.status then
    new.updated_at = now();
    insert into public.moderation_audit (
      report_id, actor_id, old_status, new_status
    ) values (
      new.id, (select auth.uid()), old.status, new.status
    );
  end if;
  return new;
end;
$$;

drop trigger if exists member_reports_status_audit on public.member_reports;
create trigger member_reports_status_audit
before update of status on public.member_reports
for each row execute function public.audit_member_report_status();

-- Role assignment example for the operator, after the user's account exists:
-- insert into public.moderator_roles (user_id, role)
-- values ('AUTH_USER_UUID', 'administrator');
-- Run that statement manually in Supabase SQL Editor. Never expose this table
-- or a role-assignment action through the public website.
