-- Sanyog private member photo storage policies
-- Run this in Supabase SQL Editor after creating the private member-photos bucket.
-- Each member may access only files stored under a folder named with their auth user ID.
-- Expected object paths: <auth-user-uuid>/close-up.jpg, <auth-user-uuid>/half-length.jpg, etc.

drop policy if exists "Members can upload their own photos" on storage.objects;
create policy "Members can upload their own photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'member-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "Members can read their own photos" on storage.objects;
create policy "Members can read their own photos"
on storage.objects for select
to authenticated
using (
  bucket_id = 'member-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "Members can update their own photos" on storage.objects;
create policy "Members can update their own photos"
on storage.objects for update
to authenticated
using (
  bucket_id = 'member-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
)
with check (
  bucket_id = 'member-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

drop policy if exists "Members can delete their own photos" on storage.objects;
create policy "Members can delete their own photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'member-photos'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);
