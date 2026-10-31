# Sanyog site map

This document is the human-readable route and asset map for the current website. Keep it updated whenever a page or route is added, renamed, or removed. The automated checker in `scripts/check-site-links.mjs` validates local links and assets.

## Public pages

| Page | Route | Purpose | Access |
|---|---|---|---|
| Home | `index.html` | Public landing page and fictional sample-profile preview | Public |
| Account access | `auth.html` | Sign in, account creation, password recovery | Public entry; account actions require authentication |

## Member pages

| Page | Route | Purpose | Access |
|---|---|---|---|
| Dashboard | `dashboard.html` | Account overview, profile summary, settings and privacy preferences | Signed-in member |
| Profile editor | `profile-setup.html` | Create or update the member's private profile | Signed-in member |
| Photo gallery | `photos.html` | View and manage the member's private photos | Signed-in member |

## Dashboard sections

These are hash routes within `dashboard.html`, not separate HTML files:

- `#overview` — account overview
- `#profile` — saved profile details
- `#photos` — photo gallery entry point
- `#settings` — account settings
- `#privacy` — privacy preferences

## Home-page sections

These are hash routes within `index.html`:

- `#how` — how the service is intended to work
- `#values` — service principles
- `#matches` — fictional sample profiles only

## Shared assets and application files

| File | Responsibility |
|---|---|
| `styles.css` | Public homepage styles |
| `app.js` | Homepage interactions and account menu |
| `manifest.webmanifest` | PWA metadata |
| `sw.js` | Public static-shell service worker |
| `icons/sanyog.svg` | Site and PWA icon |
| `scripts/check-site-links.mjs` | Local link, anchor and asset checker |
| `.github/workflows/site-check.yml` | Runs the site checker on pushes and pull requests |

## External services

- Supabase JS is loaded from jsDelivr on pages that use authentication or member data.
- Supabase project: configured in the existing page scripts. Do not place a Supabase secret/service-role key in browser code.
- GitHub Pages deployment is defined in `.github/workflows/pages.yml`.

## Safety boundaries

- The homepage profiles are fictional demonstration content, not member records.
- Matching, real member discovery, messaging, and interest requests are not enabled.
- Do not make member data public by changing a link or adding a page.
- Photo paths must continue to resolve through private storage and signed URLs.
- Account pages must retain their authentication checks.
- Any new route must be added here and must pass the automated link checker.

## Change procedure

1. Add or update the page.
2. Update this map and `docs/PROJECT-INDEX.md`.
3. Run `node scripts/check-site-links.mjs`.
4. Review the changed links and assets.
5. Merge only after checks pass.
