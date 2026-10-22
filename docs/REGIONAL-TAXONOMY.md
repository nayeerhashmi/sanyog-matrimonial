# Regional taxonomy and profile fields

## Goal
Support people from Jammu & Kashmir, Ladakh, and Himachal Pradesh without assuming that any one religion, language, caste, tribe, or community represents an entire region. Keep all religion and community choices open to users from elsewhere too.

## Location hierarchy
Store location as structured, separately selectable fields:
1. Country of residence
2. State / Union Territory
3. District
4. City / town / tehsil (optional)
5. Native place / ancestral region (optional and visibility-controlled)

Initial location coverage must include the current official district lists for:
- Jammu & Kashmir
- Ladakh
- Himachal Pradesh

Do not hard-code the district list into business logic. Keep it in versioned configuration/data so maintainers can update administrative boundaries and names without a code rewrite. Verify the list against current official government sources before production.

## Identity fields and respectful taxonomy
Use separate optional fields for:
- Religion
- Community / caste (optional, user-entered or maintained from a reviewed catalogue)
- Subcommunity / biradari / clan (optional; terminology differs by community)
- Tribe / ethnic community (optional)
- Mother tongue and other languages
- Cultural or regional background (optional)
- Native place (optional)

Do not combine caste, tribe, religion, ethnicity, language, and region into a single dropdown. They are distinct concepts and may overlap in different ways.

## Candidate options
- Religion: a broad inclusive catalogue, plus Other, No religion, Spiritual but not religious, and Prefer not to say.
- Community/caste: searchable, region-aware options with an explicit "Not listed / enter my own" and "Prefer not to say".
- Subcommunity/biradari/clan: optional free text or curated options where reviewed.
- Tribe/ethnic community: optional field and a reviewed catalogue, with self-description available.
- Mother tongue: searchable language list plus Other and Prefer not to say.
- Partner preferences: a separate section for every criterion. Provide "No preference" by default. Never copy the candidate's own identity into partner filters automatically.

## Governance before cataloguing caste and tribal groups
The client should approve a region-by-region catalogue before it is enabled. Have a knowledgeable local reviewer check names, spelling, aliases, transliterations, and whether each term is a caste, tribe, biradari, clan, language, religion, or broad community label. Include English and relevant local-script variants where practical. Do not publish a supposedly exhaustive list based on guesses. Use a versioned data file and keep source/review notes.

## Privacy and fairness
- Religion, caste/community, and tribal identity can be sensitive personal data. Make them optional and explain why they are requested.
- Do not expose them on a public profile unless the candidate explicitly chooses to show them.
- Do not infer identity from name, district, language, or family details.
- Do not make service access conditional on filling in sensitive fields.
- Do not build discriminatory defaults. Partner filters must be actively chosen by the user and editable.
- Provide "No preference", "Prefer not to say", and "Not listed" paths.
- Apply the same safety, verification, and moderation standards to every community.
- Prevent bulk export and scraping of profiles.
- Audit search behaviour and user reports for abuse or discriminatory targeting.

## Recommended data model
Store catalogue options by stable ID, not by displayed text:
- `taxonomy_items(id, category, parent_id, canonical_name, region_scope, status, source_note, reviewed_at, locale)`
- `taxonomy_aliases(id, taxonomy_item_id, alias, locale)`
- Profile identity selections reference taxonomy IDs and remain private by default.
- User-defined entries should be marked as user-provided until reviewed. Do not silently map uncertain terms to an official group.

## Before implementation
1. Confirm whether the client wants caste/community search at launch or simply optional profile disclosure.
2. Agree the language and transliteration support.
3. Get a local review of the taxonomy for Jammu & Kashmir, Ladakh, and Himachal Pradesh.
4. Confirm data retention, display, and deletion rules with the client.
5. Verify current official administrative geography and any official community lists from appropriate government sources.
6. Build tests for duplicate aliases, invalid IDs, unlisted identities, no-preference behaviour, and privacy settings.

## Important limitation
This document defines a data structure and review process. It is not itself an authoritative or exhaustive caste, tribe, ethnicity, or community list. Do not populate production choices with unverified guesses.
