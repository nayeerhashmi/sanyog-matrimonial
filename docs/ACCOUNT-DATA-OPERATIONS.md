# Account data export and deletion

These are Supabase Edge Functions. GitHub Pages does not deploy them. They must be deployed to the linked Supabase project using the Supabase CLI.

## Functions

- `account-export`: authenticates the caller, exports that user's account metadata, profile, submitted reports and blocks they created. It returns short-lived signed links for the user's private photos.
- `account-delete`: authenticates the caller, removes objects under that user's UUID folder in the private `member-photos` bucket, then deletes only that authenticated user's Auth account. Existing foreign-key cascades remove the profile and related records.

Neither function accepts a user ID from the request body. This prevents a caller from exporting or deleting another member's account.

## Deploy

From the repository root, after installing the Supabase CLI and logging in:

```sh
supabase link --project-ref eoziavhnktcsqmtnfuhz
supabase functions deploy account-export
supabase functions deploy account-delete
```

The functions use the linked project's built-in `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` environment values. The service-role key must remain in Supabase's server-side function environment. Never add it to GitHub, browser JavaScript, or a public config file.

## Test account export

Call the function while signed in, using the current user's access token. The response is JSON. Photo download links expire after five minutes. Do not publish or share the export response.

## Account deletion safeguards

Deletion is permanent. Test only with a disposable test account first. Confirm the account has been re-authenticated recently before exposing a production deletion button. The current function removes the member's own private photo folder before deleting their Auth account. If photo removal fails, it stops before deleting the account. If Auth deletion fails after photo cleanup, the account remains but the photos may already be gone; contact support before retrying.

The current database schema cascades member reports and blocks when an account is deleted. If report retention is required for safety or legal reasons, design and review a separate retention policy before public launch.

## Still required before public use

- Add a clear confirmation screen and recent-authentication requirement in the member UI.
- Test export and deletion with separate disposable accounts.
- Test users with zero, one, and multiple stored photos.
- Test nested storage folders if the storage layout changes.
- Add rate limiting and operational alerting.
- Review applicable privacy, retention, and grievance obligations with qualified counsel.
- Update the account deletion page only after these functions are deployed and tested.
