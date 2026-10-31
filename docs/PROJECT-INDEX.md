# Project index

Use this page to find project files by responsibility.

## Product and client requirements
- `docs/PRODUCT-SPEC.md` — overall product scope and feature requirements.
- `docs/REGISTRATION-FLOW.md` — five-step onboarding form.
- `docs/REGIONAL-TAXONOMY.md` — location and community/caste taxonomy approach.

## Website and PWA
- `index.html` — public landing page.
- `styles.css` — layout, colours, mobile responsiveness.
- `app.js` — demo profile filtering, UI interactions, service worker registration.
- `auth.html` — Supabase sign-in, account creation, and password recovery.
- `dashboard.html` — signed-in member dashboard, settings, and privacy preferences.
- `profile-setup.html` — signed-in profile editor and private photo upload flow.
- `photos.html` — signed-in private photo gallery.
- `manifest.webmanifest` — install metadata.
- `sw.js` — public static-shell cache only.
- `icons/sanyog.svg` — app icon.
- `docs/SITE-MAP.md` — central page and route map.
- `scripts/check-site-links.mjs` — local link, anchor, and asset checker.

## Engineering and delivery
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow.
- `.github/workflows/site-check.yml` — automated link and asset validation on pushes and pull requests.
- `.gitignore` — ignore local secrets and build artefacts.
- `docs/BUILD-ROADMAP.md` — milestones and implementation sequence.
- `docs/SECURITY-AND-LAUNCH.md` — launch readiness and safety.
- `docs/CLIENT-HANDOVER.md` — transfer and client ownership process.

## Current status
Development website with Supabase authentication, member profile editing, private photo gallery, and PWA foundation. Public discovery, matching, chat, moderation tooling, and production security review are not yet complete. See [Site Map](SITE-MAP.md) for current routes and access boundaries.
