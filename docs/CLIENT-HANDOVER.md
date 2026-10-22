# Client ownership and handover checklist

## Ownership principles
- Client should own the GitHub organization/repository, domain registrar account, hosting account, backend/database, storage, transactional email, payment account, analytics, and future app-store accounts.
- Use a client-controlled email address and MFA for owner accounts.
- Developer accounts receive the minimum delegated access needed.
- Never place credentials, recovery codes, private keys, or customer data in the repository.
- Record third-party service names, plan limits, billing owner, renewal dates, data export paths, and account recovery process in a private handover document.

## Before development
- Agree the project name, branding, scope, acceptance criteria, maintenance expectations, and ownership of custom code/design assets in writing.
- Confirm the client controls the domain and can access DNS.
- Confirm who pays for hosting and backend services.
- Use development/test environments separately from production.

## Before launch
- Move all production services into client-owned accounts.
- Verify the client can independently access GitHub, domain DNS, hosting, database, storage, email, payment provider, and analytics.
- Test a database export and restore procedure.
- Document deployment and rollback steps.
- Transfer environment-variable names and setup instructions without putting secret values in Git.
- Configure client-owned billing and alerts.
- Rotate any credentials that the developer may have seen.
- Remove sample accounts and demo content.
- Revoke unnecessary developer access only after the client confirms the handover works.
- Confirm privacy policy, terms, community guidelines, support contact, grievance handling, and deletion process.
- Sign off on the final security checklist and known limitations.

## GitHub repository transfer
If the repository starts in a developer-owned personal account, the owner can transfer it to the client's GitHub account or organization from repository Settings. Before transfer:
1. Confirm the destination account/organization and its permissions.
2. Ensure the client has a GitHub account and MFA.
3. Review GitHub Pages, Actions secrets, environment settings, branch protection, and any connected apps after transfer.
4. Update deployment URLs and domain settings if needed.
5. Verify workflows run under the new owner.
6. Confirm the client has admin access and can deploy without the developer.
7. Keep a backup clone or archive as agreed in the contract.

## Current repository state
The repository is currently under `nayeerhashmi/sanyog-matrimonial`. It is not yet transferred to the client. The current website is a static prototype and should not accept real member information.
