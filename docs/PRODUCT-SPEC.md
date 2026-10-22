# Sanyog Matrimonial — Product Specification

## Objective
Build a trustworthy, mobile-first matrimonial service initially serving Jammu and Kashmir and open to all religions and communities. Support self-managed profiles and family-assisted profiles, with the adult candidate's informed consent and clearly limited permissions.

## Roles
- Visitor: public marketing pages only.
- Candidate: adult member who owns their profile and controls consent, privacy, and communication.
- Family manager: person invited by a candidate to help maintain the profile. Their access can be revoked at any time.
- Moderator: reviews reports and content under documented rules.
- Administrator: operates the service. Privileged actions must be logged and limited.

## Core modules
1. Authentication, account recovery, and adult eligibility confirmation.
2. Candidate profiles and partner preferences.
3. Candidate-controlled family-manager invitations and revocation.
4. Search, filters, saved profiles, and explainable recommendations.
5. Interest requests and mutual acceptance.
6. Private messaging only after mutual consent.
7. Photo privacy and content moderation.
8. Reporting, blocking, appeals, and safety support.
9. Account export/deletion request workflow.
10. Admin dashboard and audit log.
11. Premium plans and payment integration after core functionality and policies are ready.
12. English first, with Hindi and Urdu planned. Do not infer language or religion based on location.

## Profile fields
Collect the minimum necessary: display name, date of birth (calculate age and don't publicly expose DOB), district, profile manager type, partner preferences, and consent state. Optional fields include languages, education, profession, family overview, interests, marital status, religion/community, and photos. Sensitive optional fields should be skippable.

## Matchmaking
Use user-selected preferences and transparent weighting. Do not claim a score scientifically predicts relationship success.

## Trust and safety
- Service intended for adults aged 18+.
- Candidate consent required before family-managed editing.
- Candidate can revoke family-manager access at any time.
- Contact details private by default.
- Mutual consent before chat.
- Block/report available from profiles and conversations.
- Moderation queue for reports and flagged content.
- No public bulk directory or scraping of member records.
- Rate limiting and abuse monitoring before public launch.
- Verification labels must state what was checked and must not promise guaranteed authenticity.

## Non-functional requirements
- Mobile-first responsive design and accessible forms.
- Secure sessions and recovery.
- Server-side authorization and database row-level security.
- Private photo storage with appropriately scoped access.
- Backups, monitoring, and incident response before production.
- Clear privacy notice, terms, community guidelines, grievance/contact process, and account deletion path.
- No real user data in demos, test fixtures, or public repository.

## Milestones
1. Static UI prototype (current phase).
2. Next.js/TypeScript application structure.
3. Authentication and database with tested row-level security.
4. Profiles, family consent, preferences, and search.
5. Mutual interests and private messaging.
6. Moderation and admin controls.
7. Subscription/payment integration.
8. Security, privacy, legal, load, and accessibility review.
9. Invite-only beta, then public launch.
