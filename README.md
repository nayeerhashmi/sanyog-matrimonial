# Sanyog Matrimonial

A client-owned matrimonial platform for Jammu & Kashmir, Ladakh, and Himachal Pradesh. The product is designed as a mobile-first website with a path to an installable PWA and a future Android app.

## Client ownership and handover
This is a client project. Keep ownership, accounts, billing, domain, hosting, email delivery, database, storage, analytics, and app-store listings under the client's control wherever possible. Use delegated access rather than personal production credentials. Before handover, transfer repository administration to the client, document services and recovery, rotate secrets, and revoke unnecessary developer access.

## Current status
This repository contains a development website with Supabase authentication, private member profile editing, a private photo gallery, and project documentation. It is not yet a production matrimonial service. The homepage sample profiles are fictional, and public member discovery, matching, messaging, moderation workflows, and launch readiness are not complete.

## Regional scope
Initial focus: Jammu & Kashmir, Ladakh, and Himachal Pradesh. The platform is open to all religions and communities. Caste, community, tribe, language, religion, and location are distinct optional fields; identity must never be inferred from name or location. See [Regional Taxonomy](docs/REGIONAL-TAXONOMY.md).

## Project map
See [Project Index](docs/PROJECT-INDEX.md) for the file map and [Site Map](docs/SITE-MAP.md) for pages, routes, access boundaries, and navigation.

- Product: `docs/PRODUCT-SPEC.md`, `docs/REGISTRATION-FLOW.md`
- Regional data design: `docs/REGIONAL-TAXONOMY.md`
- Website/PWA: `index.html`, `styles.css`, `app.js`, `profile-setup.html`, `manifest.webmanifest`, `sw.js`, `icons/`
- Site integrity: `scripts/check-site-links.mjs`, `.github/workflows/site-check.yml`
- Deployment: `.github/workflows/pages.yml`
- Security: `docs/SECURITY-AND-LAUNCH.md`
- Client transfer: `docs/CLIENT-HANDOVER.md`
- Roadmap: `docs/BUILD-ROADMAP.md`

## Security rule
Do not collect real personal data until authentication, authorization, database row-level security, secure photo storage, moderation, privacy documents, and account deletion have been implemented and tested.
