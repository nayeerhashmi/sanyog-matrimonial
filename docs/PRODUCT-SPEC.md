# Sanyog Matrimonial — Product Specification

## Objective
Build a trustworthy, mobile-first matrimonial service initially serving Jammu and Kashmir, with Ladakh and Himachal Pradesh as additional target markets. The service is for adults aged 18+ and is open to all religions and communities.

## Roles
- Visitor: can access public information pages and registration.
- Member: an adult who owns and controls their own profile, privacy, preferences, and communication.
- Administrator: operates the service. Privileged actions must be restricted and logged.
- Family-managed profile workflows are not part of the current product scope.

## Core modules
1. Authentication, account recovery, and adult eligibility confirmation.
2. Member profiles and separate partner preferences.
3. Email verification and profile-completion checks before discovery visibility.
4. Member discovery, search filters, and profile cards.
5. Member-controlled field visibility and photo privacy.
6. Interest requests with a short introductory message.
7. Private messaging only after the recipient accepts the interest.
8. Account export and deletion.
9. Safety, moderation, and admin controls as a later phase.
10. Premium plans and payment integration only after core functionality is ready.

## Confirmed product decisions

### Profile publication
- A profile becomes eligible for discovery after the member verifies their email and completes the required profile fields.
- No manual admin approval is required for ordinary profile publication.
- Public discovery must be limited to authenticated, email-verified members.
- Never expose the member's full date of birth, email address, password, account identifiers, or other private account data in discovery.

### Gender and partner preference
- Store a member's gender identity separately from their preferred gender(s) for a partner.
- Members can select men, women, or all genders as partner preferences. Do not automatically infer a preference from the member's own gender.

### Search profile cards and privacy
- Members control which profile details are visible to other members.
- Build individual visibility controls for eligible profile fields rather than one all-or-nothing setting.
- Private account data is never eligible for public profile display.
- Search filters at launch are advanced: age range, state/district/location, gender preference, marital status, education, religion, community/subcommunity, diet, profession, height, and income range. Only fields the member has chosen to make visible may be displayed on profile cards; filter handling must not reveal hidden values.

### Photo privacy
- Support three member-selectable photo visibility modes: visible to verified members, private, and blurred until selectively revealed.
- Provide clear controls so members understand who can see each photo.
- Photos remain in private storage. Do not make the storage bucket public to implement discovery.

### Profile visibility and deletion
- There is no pause/hide-profile control in the current agreed scope.
- A published profile remains discoverable until the member deletes their profile or account.
- Account deletion and profile deletion must clearly explain what data is removed and what is retained for legitimate operational or legal reasons.

### Interests and messaging
- Interest request format: personal introduction. A member sends an interest request with a short introductory message. Structured conversation prompts are not part of the initial request flow.
- Notify recipients of new interest requests through both an in-app notification and an email.
- When an interest request is accepted or declined, notify the sender inside the app only. Do not send an email for these status changes.
- Members can disable email notifications for new interest requests in account settings. In-app notifications remain enabled regardless of this email preference.
- Interest-request emails must not include the sender's introductory message. The email only alerts the recipient that a request has arrived; they must sign in to read the message.
- The recipient can accept or decline.
- Senders cannot withdraw an interest request after sending it. A pending request remains pending until the recipient accepts or declines.
- If an interest request is declined, the sender may send another request to the same member after a 30-day waiting period.
- Private chat becomes available only after the recipient accepts.
- Do not allow unsolicited direct messaging before acceptance.

### Interest request limits and future payment
- Payment integration is deferred until the core product is complete.
- When payments are introduced, the planned paid benefit is unlimited interest requests for a two-month period.
- Do not implement payment collection, paid entitlements, or request limits now. Pricing, renewal, expiry handling, and the free-tier allowance remain undecided.

## Profile fields
Collect only information needed for profile creation and member-selected preferences. Date of birth is used to verify adult eligibility and calculate age; never display the full date of birth. Religion, community, subcommunity, diet, education, profession, marital status, height, income range, and photos should have clear optionality and visibility controls where appropriate. Contact details remain private.

## Matchmaking
- Rank discovery results by compatibility first.
- Use flexible matching: prioritise profiles that satisfy more of a member's selected partner preferences instead of requiring every preference to match.
- Treat preferences as ranking signals, not guarantees. Missing or undisclosed profile data must not be treated as a mismatch by default.
- Display a compatibility percentage alongside a short explanation of the preferences that match. Make the calculation transparent and indicative, not a scientific prediction of relationship success.
- Keep profile identity separate from partner preferences.

## Trust, privacy, and safety
- Service is intended for adults aged 18+.
- Email verification is required before discovery visibility.
- Contact details and account identifiers remain private.
- Discovery must expose only an explicitly approved set of profile fields.
- Do not add a broad public SELECT policy to the private profiles table. Use a deliberately scoped public-profile data layer or secure server-side query.
- Private photos must be served through authorized access, not public bucket access.
- Mutual consent is required before chat.
- Reporting, blocking, moderation workflows, and related admin features are deferred by the founder for now; revisit before public launch.
- No public bulk directory or scraping of member records.
- Verification labels must state exactly what was checked and must not promise guaranteed authenticity.

## Non-functional requirements
- Mobile-first responsive design and accessible forms.
- Secure sessions and recovery.
- Server-side authorization and database row-level security.
- Private photo storage with appropriately scoped access.
- Backups, monitoring, and incident response before production.
- Clear privacy notice, terms, community guidelines, contact process, and account deletion path.
- No real user data in demos, test fixtures, or public repository.

## Milestones
1. Authentication and private profile foundation (implemented).
2. Refine registration and profile completion around the confirmed decisions.
3. Add gender identity and partner-gender preferences.
4. Build a safe, scoped member-discovery data layer and search.
5. Add member-controlled profile-field visibility and photo privacy.
6. Build interest requests and mutual-acceptance messaging.
7. Complete security, privacy, legal, accessibility, and abuse-prevention review.
8. Add payments and the two-month unlimited-interest entitlement after the core product is stable.
9. Run an invite-only beta before public launch.
