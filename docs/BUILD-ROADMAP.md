# Sanyog build roadmap

## Product direction
Mobile-first website, designed to become installable as a Progressive Web App (PWA) and later be packaged for Android using Capacitor if native integrations are needed. Keep the current Sanyog visual identity and improve it incrementally.

## Current milestone
- Existing landing page and fictional demo profiles.
- Five-step profile creation prototype.
- PWA manifest, app icon, and service worker shell caching.
- GitHub Pages deployment workflow.
- No authentication or database writes yet. Do not collect real member information.

## Next milestones
1. Validate the static site and get GitHub Pages deployment working.
2. Build the application architecture with a maintainable component system.
3. Connect authentication and database with row-level security policies tested for each role.
4. Implement candidate-owned profiles, family-manager invitation/revocation, preferences, and profile visibility.
5. Add discovery, mutual interest, and private messaging.
6. Add moderation, reporting, blocking, account export/deletion, audit logging, and admin controls.
7. Add notification and payment systems only after safety and core flows are stable.
8. Run security, privacy, accessibility, and load tests before an invite-only beta.

## PWA notes
- The service worker caches only public static app shell resources.
- Do not cache authentication endpoints, API requests, user profiles, or private messages.
- PWA installation support varies by browser and operating system.
- A PWA requires HTTPS, which GitHub Pages supplies when correctly configured.
