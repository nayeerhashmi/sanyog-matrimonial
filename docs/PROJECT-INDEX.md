# Project index

Use this page to find project files by responsibility.

## Product and client requirements
- `docs/PRODUCT-SPEC.md` — overall product scope and feature requirements.
- `docs/REGISTRATION-FLOW.md` — five-step onboarding form.
- `docs/REGIONAL-TAXONOMY.md` — location and community/caste taxonomy approach.

## Website and PWA
- `index.html` — public landing page.
- `styles.css` — layout, colours, mobile responsiveness.
- `app.js` — demo profile filtering, account menu, UI interactions and service worker registration.
- `auth.html` — Supabase account registration and sign-in.
- `profile-setup.html` — private profile creation and editing.
- `dashboard.html` — member dashboard, account settings and privacy preferences.
- `photos.html` — member photo gallery.
- `photo-gallery.html` — redirect to the canonical photo gallery.
- `manifest.webmanifest` — install metadata.
- `sw.js` — public static-shell cache only.
- `icons/sanyog.svg` — app icon.

## Legal and trust pages\n- `privacy-policy.html` — provisional privacy notice.\n- `terms.html` — provisional terms and conditions.\n- `community-guidelines.html` — member conduct rules.\n- `safety.html` — safety guidance and feature limitations.\n- `contact.html` — pending verified contact details.\n- `account-deletion.html` — account and data deletion guidance.\n- `legal.css` — shared legal-page styling.\n\n## Engineering and delivery
- `.github/workflows/pages.yml` — GitHub Pages deployment workflow.
- `.gitignore` — ignore local secrets and build artefacts.
- `docs/BUILD-ROADMAP.md` — milestones and implementation sequence.
- `docs/SESSION-CHECKPOINT-2026-11-06.md` — confirmed product decisions and exact point to resume.
- `docs/SECURITY-AND-LAUNCH.md` — launch readiness and safety.
- `docs/CLIENT-HANDOVER.md` — transfer and client ownership process.

## Current status
Supabase authentication, private profile workflows and photo-management flows are connected in the website. Public discovery, matching, chat, payments, moderation operations, account deletion and production security verification remain incomplete.
