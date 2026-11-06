# Sanyog build roadmap

## Product direction
Mobile-first website, designed to become an installable Progressive Web App (PWA) and later be packaged for Android using Capacitor if native integrations are needed. Keep the current Sanyog visual identity and improve it incrementally. Initial market: Jammu and Kashmir, with Ladakh and Himachal Pradesh also in scope.

## Implemented foundation
- GitHub Pages deployment workflow.
- Supabase email authentication and account sign-in.
- Private member profile creation, saving, and editing.
- Row-level security on the profiles table with owner-only access.
- Private `member-photos` storage with owner-folder policies.
- Photo upload, private preview, and profile photo-path fields.
- PWA manifest, icons, and service-worker app-shell caching.
- Provisional privacy, terms, community guidelines, safety, contact, and account-deletion information pages.
- Account export and account-deletion workflows.
- Demo profiles are fictional. Public member discovery remains disabled.

## Confirmed product decisions
- Discovery visibility requires both email verification and profile completion. Ordinary publication does not require manual admin approval.
- Discovery is for authenticated, email-verified members only.
- Gender identity and preferred partner gender are separate fields. Partner preference supports men, women, or all genders.
- Members choose which eligible profile fields are visible. Private account data such as full date of birth and email is never exposed.
- Search filters at launch: age range, state/district/location, gender preference, marital status, education, religion, community/subcommunity, and diet.
- Photo privacy supports visible to verified members, private, and blurred until selectively revealed.
- No pause-profile feature in the current scope. Published profiles remain visible until profile/account deletion.
- An interest request can include a short introductory message. Chat opens only after the recipient accepts.
- Reporting, blocking, and admin moderation are deferred for now and must be revisited before public launch.
- Payments are deferred. The planned future paid benefit is unlimited interest requests for two months. No payment or entitlement code should be added yet.

## Next build sequence
1. Update the registration form and profile schema for gender identity and partner-gender preferences. Remove the family-manager workflow from the active member experience.
2. Define required profile-completion fields and email-verification gating.
3. Design a scoped discovery data layer that exposes only member-approved fields. Keep the existing `profiles` table owner-only; do not solve discovery by making it broadly readable.
4. Add member-controlled field visibility settings.
5. Implement the three photo visibility modes while retaining private storage and authorized image delivery.
6. Build member discovery and the agreed search filters.
7. Build interest requests with introductory messages, acceptance/decline, and chat authorization after acceptance.
8. Complete security, privacy, legal, accessibility, and abuse-prevention review before beta.
9. Integrate payments later, including the planned two-month unlimited-interest entitlement. Pricing and other plan rules remain undecided.

## Deferred scope
- Payment collection and subscription management.
- Reporting, blocking, moderation queues, and moderator workflows.
- Family-manager invitations and delegated profile editing.
- Profile pause/hide functionality.

## PWA notes
- The service worker should cache only public static app-shell resources.
- Do not cache authentication endpoints, API requests, user profiles, or private messages.
- PWA installation support varies by browser and operating system.
- A PWA requires HTTPS, which GitHub Pages supplies when correctly configured.

## Important deployment boundary
Committing SQL files to GitHub does not apply them to the live Supabase project. Database migrations must be reviewed and run in the Supabase SQL Editor or through a configured migration pipeline. Edge Function changes also require deployment to Supabase. Never place Supabase service-role credentials in browser code or GitHub.
