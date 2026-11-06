# Sanyog moderation operations

This document describes the initial database foundation. It is not a live moderator dashboard or a complete moderation service.

## Required migration order

1. Apply `supabase/migrations/20261106_trust_safety_foundation.sql`.
2. Apply `supabase/migrations/20261106_moderation_roles_and_audit.sql`.

Run these in the Supabase SQL Editor for the correct project. Committing the files to GitHub does not execute them. Review the SQL and take a database backup before applying changes.

## Assigning the first administrator

1. Create the intended operator account through the normal Sanyog signup flow.
2. In Supabase, open Authentication and locate that account's user UUID.
3. Open SQL Editor and run the following statement after replacing the placeholder with the exact UUID:

```sql
insert into public.moderator_roles (user_id, role)
values ('AUTH_USER_UUID', 'administrator');
```

Only a trusted database operator should run this statement. Do not add role assignment to the public website. Do not expose the moderator_roles table to browser clients.

To revoke moderator access, run:

```sql
delete from public.moderator_roles
where user_id = 'AUTH_USER_UUID';
```

## What this foundation provides

- Moderators and administrators can read submitted reports.
- Moderators and administrators can change report status.
- Client updates are restricted to the status field.
- Status changes are recorded in the moderation_audit table.
- Ordinary members can read only reports they submitted.
- Ordinary members cannot read the audit table or assign roles.

## What is still missing

- A secure moderator interface.
- Server-side review actions, evidence handling, and reasoned decisions.
- Account suspension and reinstatement controls.
- Appeals and member notifications.
- Rate limits, abuse detection, and operational response procedures.
- A tested end-to-end report and block experience in the member interface.

Do not announce reporting or moderation as available to members until the migrations have been applied and the complete workflow has been tested with separate member and moderator accounts.
