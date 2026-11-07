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
- Advanced search filters at launch: age range, state/district/location, gender preference, marital status, education, religion, community/subcommunity, diet, profession, height, and income range. Hidden fields must not be exposed through cards or filter results.
- Photo privacy supports visible to verified members, private, and blurred until selectively revealed.
- No pause-profile feature in the current scope. Published profiles remain visible until profile/account deletion.
- Discovery is ranked by compatibility first, using flexible matching that prioritises profiles meeting more selected preferences rather than requiring every preference to match. Missing or undisclosed data is not automatically a mismatch.
- Show an indicative compatibility percentage with a brief explanation of matching preferences. Keep the calculation transparent and do not imply it predicts relationship success.
- Interest request format: personal introduction with a short introductory message. No structured conversation prompts in the initial request flow.
- Notify recipients of new interest requests through both in-app notifications and email. Members can turn off these email alerts in account settings; in-app notifications remain enabled. Email alerts contain no introductory message, directing members to sign in to read it. For accepted or declined requests, notify the sender in-app only, without a status-change email.
- Profile analytics may show aggregate view counts only. Do not identify profile visitors or expose visitor-level activity. Exclude the profile owner's own visits from the count. Maintain a lifetime total without monthly resets.
- A sender cannot withdraw a sent request. It remains pending until the recipient accepts or declines.
- After a decline, the sender may send another request to the same member after a 30-day waiting period. Chat opens only after acceptance.
- Reporting, blocking, and admin moderation are deferred for now and must be revisited before public launch.
- Payments are deferred. The planned future paid benefit is unlimited interest requests for two months. No payment or entitlement code should be added yet.

## Next build sequence
1. Confirm required profile-completion fields and secure email-verification gating.
2. Design a scoped discovery data layer that exposes only member-approved fields. Keep the existing `profiles` table owner-only; do not solve discovery by making it broadly readable.
3. Implement secure photo visibility modes while retaining private storage and authorized image delivery.
4. Build discovery with advanced filters and compatibility-first flexible ranking, including an explainable indicative percentage.
5. Build personal-introduction interest requests with a short message, recipient acceptance/decline, and chat authorization only after acceptance.
6. Complete security, privacy, legal, accessibility, and abuse-prevention review before beta.
7. Integrate payments later, including the planned two-month unlimited-interest entitlement. Pricing and other plan rules remain undecided.

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
