# Security and Public Launch Checklist

This checklist is planning guidance, not legal advice or a security certification.

## Never do these
- Never commit API secrets, service-role keys, passwords, OTPs, or production environment files.
- Never use real personal details or photos in demo data without informed permission.
- Never treat the visual prototype as a secure, live service.
- Never expose member records or photos publicly by default.
- Never allow family access to private messages simply because they help manage a profile.

## Before collecting real user data
- Create a separate development backend project.
- Configure authentication providers and allowed redirect URLs.
- Enforce adult eligibility and candidate consent.
- Enable and test row-level security on every table exposed through the client API.
- Keep admin credentials server-side only.
- Create private storage buckets and thoroughly test access rules.
- Rate-limit registration, login, search, interest requests, messages, and uploads.
- Validate upload file types and size; re-encode images and consider malware scanning.
- Implement reporting, blocking, moderation, appeals, and account-deletion workflows.
- Test revocation of family-manager access and maintain an audit trail of consent changes.
- Add monitoring, backup/recovery tests, and an incident-response process.
- Publish accurate privacy notice, terms, community rules, contact/grievance process, and retention/deletion rules.
- Review relevant Indian privacy, consumer, IT, intermediary, payment, and other obligations with qualified counsel.
- Test mobile usability, weak networks, keyboard navigation, and screen readers.
- Arrange an independent security review before public beta.

## Launch sequence
1. Local prototype with fictional data.
2. Private development environment using test accounts.
3. Permission and abuse-case tests.
4. Invite-only beta with user consent and support coverage.
5. Fix issues and review security/privacy.
6. Public launch only when moderation, legal documents, operations, and incident response are ready.
