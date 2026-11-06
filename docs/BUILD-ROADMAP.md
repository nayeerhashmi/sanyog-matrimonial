# Sanyog build roadmap

## Product direction
Mobile-first website, designed to become installable as a Progressive Web App (PWA) and later be packaged for Android using Capacitor if native integrations are needed. Keep the current Sanyog visual identity and improve it incrementally.

## Implemented foundation
- GitHub Pages deployment workflow.
- Supabase email authentication and account sign-in.
- Private member profile creation, saving, and editing.
- Row-level security on the profiles table with owner-only access.
- Private `member-photos` storage with owner-folder policies.
- Photo upload, private preview, and profile photo-path fields.
- PWA manifest, icons, and service-worker app-shell caching.
- Provisional privacy, terms, community guidelines, safety, contact, and account-deletion information pages.
- Demo profiles are fictional and clearly identified. Public member discovery remains disabled.

## Current work
1. Establish report and block data structures with restrictive row-level security.
2. Build trusted server-side moderation actions and a moderator access model.
3. Implement secure account export and deletion, including private photo cleanup.
4. Implement candidate-controlled family-manager invitations, consent, permissions, and revocation.
5. Add audit logging, rate limits, abuse controls, monitoring, and recovery procedures.
6. Test every permission boundary and complete legal, privacy, accessibility, and security reviews.

## Later work
7. Enable member discovery, mutual interests, and private messaging only after the safety and authorization layers are ready.
8. Add notifications and payment integration after the core product is stable.
9. Run an invite-only beta before considering public launch.

## PWA notes
- The service worker should cache only public static app-shell resources.
- Do not cache authentication endpoints, API requests, user profiles, or private messages.
- PWA installation support varies by browser and operating system.
- A PWA requires HTTPS, which GitHub Pages supplies when correctly configured.

## Important deployment boundary
Committing SQL files to GitHub does not apply them to the live Supabase project. Database migrations must be reviewed and run in the Supabase SQL Editor or through a configured migration pipeline. Never place Supabase service-role credentials in browser code or GitHub Pages.
