# Security and Public Launch Checklist

This checklist is planning guidance, not legal advice or a security certification.

## Never do these
- Never commit API secrets, service-role keys, passwords, OTPs, or production environment files.
- Never use real personal details or photos in demo data without informed permission.
- Never treat the visual prototype as a secure, live service.
- Never expose member records or photos publicly by default.
- Never allow family access to private messages simply because they help manage a profile.

## Current safeguards and limitations
- Supabase authentication, owner-only profile access, and private member-photo storage are implemented.
- Privacy, terms, community guidelines, safety, contact, and account-deletion information pages are published as provisional documents.
- Public member discovery, matching, interest requests, and messaging are not enabled.
- Reporting, blocking, moderator workflows, appeals, automated account deletion, and data export are not yet available in the live application.
- The report/block SQL foundation is being prepared separately. A GitHub commit does not apply SQL to Supabase.
- The contact page provides an operator contact route. Do not represent it as a formal grievance officer appointment or guaranteed monitored response channel without confirmation.

## Before collecting real user data or opening a beta
- Use a separate development backend project and test accounts.
- Configure authentication providers and allowed redirect URLs.
- Enforce adult eligibility and candidate consent.
- Enable and test row-level security on every table exposed through the client API.
- Keep admin credentials server-side only. Never put service-role keys in browser code.
- Keep storage private and thoroughly test access rules.
- Rate-limit registration, login, search, interest requests, messages, reports, and uploads.
- Validate upload file types and size; re-encode images and consider malware scanning.
- Implement reporting, blocking, moderation, appeals, and secure account-deletion workflows.
- Test family-manager invitation, permission limits, revocation, and audit trails.
- Implement user data export and retention/deletion rules.
- Add monitoring, backup/recovery tests, and an incident-response process.
- Review relevant Indian privacy, consumer, IT, intermediary, payment, and other obligations with qualified counsel.
- Test mobile usability, weak networks, keyboard navigation, and screen readers.
- Arrange an independent security review before public beta.

## Launch sequence
1. Private development environment using test accounts.
2. Permission and abuse-case tests.
3. Complete safety, privacy, support, and operational workflows.
4. Invite-only beta with user consent and support coverage.
5. Fix issues and complete legal, security, and accessibility reviews.
6. Public launch only when moderation, legal documents, operations, and incident response are ready.
