# Sanyog session checkpoint — 7 November 2026

Use this file to resume the product-planning and build conversation from the next session. The source of truth remains `docs/PRODUCT-SPEC.md` and `docs/BUILD-ROADMAP.md`.

## Confirmed decisions

- Initial market: Jammu and Kashmir, with Ladakh and Himachal Pradesh also in scope.
- Adult-only service, minimum age 18.
- Members manage their own accounts and profiles. Family-managed workflows are not in current scope.
- A profile becomes eligible for discovery after email verification and required profile completion. No ordinary manual admin approval.
- Gender identity and partner-gender preference are separate. Partner preference supports men, women, or all genders.
- Members control visibility of eligible profile fields. Private account data such as full date of birth and email is never displayed.
- Photo modes: visible to verified members, private, and blurred until selectively revealed. Photos stay in private storage.
- Advanced discovery filters: age, location, gender preference, marital status, education, religion, community/subcommunity, diet, profession, height, and income range.
- Discovery ranking: compatibility first.
- Compatibility method: flexible matching. Prioritise profiles that satisfy more selected preferences. Missing or undisclosed data is not automatically a mismatch.
- Compatibility display: show both a percentage and a short explanation of matching preferences. The score is indicative, transparent, and not a prediction of relationship success.
- No pause/hide-profile feature currently planned.
- Reporting, blocking, and moderation are deferred for now but must be revisited before public launch.
- Payments are deferred until core functionality is complete. Future paid benefit under consideration is unlimited interest requests for two months.

## Implemented / committed work

- Gender identity and partner-gender preference fields added to profile setup and schema migration.
- User confirmed applying `supabase/migrations/20261106_gender_identity_and_partner_gender.sql`.
- Profile and photo privacy columns added through `supabase/migrations/20261106_profile_and_photo_privacy.sql`. User confirmed applying this migration.
- Dashboard privacy centre updated to save member-selected field visibility and per-photo privacy preferences to the profile record.
- These settings do not make profiles discoverable or photos public. Secure discovery and authorized photo delivery still need implementation.
- Base schema updated to include gender and privacy columns.
- GitHub Pages deployment for commit `56a831ac2136ad2d073480d1e08b5db0c9c60b47` succeeded.

## Important security constraints

- Keep `public.profiles` owner-only under RLS. Never add a broad public SELECT policy.
- Build discovery through a deliberately scoped server-side projection or secure function. Never expose email, full DOB, auth IDs, contact details, partner preference JSON, or other private fields.
- Keep `member-photos` private. Do not make the bucket public. Serve photos only through authorization-aware signed access.
- Never put Supabase service-role or secret keys in browser code or GitHub.
- Committing SQL files to GitHub does not apply them to Supabase.

## Confirmed decisions added during the 7 November session

### Interest request lifecycle and notifications
- Request format: personal introduction with a short message. No structured prompts in the initial flow.
- Sender cannot withdraw a sent request. It remains pending until accepted or declined.
- After a decline, the sender may send another request to the same member after 30 days.
- New request notification: both in-app and email.
- Members can disable new-interest email alerts in account settings. In-app alerts remain on.
- Acceptance or decline notifications: in-app only; no status-change email.
- Interest emails do not include the introductory message. The recipient must sign in to read it.

### Profile views
- Show aggregate view counts only. Never identify visitors or expose visitor-level activity.
- Exclude the profile owner's own visits.
- Keep a lifetime cumulative count without monthly resets.
- Each other member counts once per profile lifetime, regardless of repeat visits.
- Record the view immediately when another member opens the profile.
- Display the count on the main dashboard as a number only, without explanatory caption.

## Next step when resuming

The next unresolved product decision is pending interest request expiry. The user has NOT chosen an option yet. The question is whether unanswered requests should never expire, expire after 30 days, or expire after 90 days. Resume by asking this exact question and wait for the user's choice. Do not assume a default.

The user ended the 7 November 2026 session and wants to continue tomorrow from this exact point. Do not repeat previously answered questions. After the pending-request expiry choice, continue one meaningful product decision at a time and update the product specification, roadmap, and checkpoint as decisions are confirmed.

## User workflow preferences

- Ask one decision at a time.
- Use selectable options with a submit button.
- Keep explanations direct and concise.
- Make actual repository updates as decisions are confirmed.
- Do not reopen decisions already recorded here unless a genuine conflict is discovered.
