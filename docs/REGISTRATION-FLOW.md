# Sanyog — Registration and Profile Creation Flow

Requirements for the current adult-member registration experience and later backend implementation.

## Step 1 — Account
- First name and last name or member-selected display details.
- Date of birth, used to confirm the member is at least 18 and calculate age. Never expose the full date of birth publicly.
- Email address and password.
- Email verification is required before the profile can appear in member discovery.
- Every account is controlled by the adult member. Family-manager and delegated-profile workflows are out of current scope.

## Step 2 — Gender, religion, and community
- Add a gender identity field for the member.
- Add a separate preferred-gender field for partner preferences. Members can select men, women, or all genders.
- Gender identity must not automatically determine partner preference.
- Religion, community, and subcommunity remain optional.
- Provide "No preference" separately in partner preferences.
- Sensitive identity fields must be optional and must not be used to exclude users from the service itself.

## Step 3 — Location and personal details
- Country, state/union territory, district, and location.
- Marital status options: Never married, Married, Divorced, Widowed, Awaiting divorce, Marriage annulled, Prefer not to say.
- Height, optional.
- Diet: Vegetarian, Non-vegetarian, Eggetarian, Vegan, Jain, Other, Prefer not to say.
- Collect only what is useful for the member's own profile and chosen preferences.

## Step 4 — Education and career
- Highest qualification.
- College/institution name.
- Annual income band, optional. Suggested editable bands: Below ₹2 lakh, ₹2–4 lakh, ₹4–7 lakh, ₹7–10 lakh, ₹10–15 lakh, ₹15–25 lakh, ₹25 lakh and above, Prefer not to say.
- Employment sector, profession/role, and company name remain optional.
- Never expose exact income or employer details unless the member explicitly chooses to display eligible information.

## Step 5 — About and photos
- Personal introduction with a length limit and community guidelines.
- Optional photos.
- Photo visibility modes: visible to verified members, private, or blurred until selectively revealed.
- Members can control photo visibility. Photos remain in private storage and must be delivered through authorized access.
- Uploads require authenticated access, file size/type validation, and private storage.

## Step 6 — Partner preferences
- Store partner preferences separately from the member's own identity.
- Include preferred gender, age range, location, marital status, education, religion, community/subcommunity, and diet.
- "No preference" should be available for optional matching dimensions.

## Profile publication and privacy
- A profile becomes eligible for discovery after email verification and completion of required profile fields.
- No manual admin approval is required for ordinary publication.
- Only authenticated, email-verified members can use discovery.
- Members choose which eligible profile fields are visible to others.
- Never expose email address, password, full date of birth, account identifiers, or private account data in profile cards or discovery results.
- The agreed initial search filters are age range, state/district/location, gender preference, marital status, education, religion, community/subcommunity, and diet.
- There is no pause/hide-profile option in the current scope. A published profile remains discoverable until profile or account deletion.

## Interests and messaging
- Members can send an interest request with a short introductory message.
- The recipient can accept or decline.
- Private messaging becomes available only after acceptance.

## Future payments
- Payment integration is deferred until the core product is complete.
- Planned paid benefit: unlimited interest requests for two months.
- Do not implement payment collection or paid entitlements during registration now. Pricing, renewal, expiry, and free-tier limits remain undecided.

## Shared interaction requirements
- Multi-step progress indicator, Back/Continue, inline validation, clear error messages, and mobile-friendly controls.
- Save progress only after secure authentication is connected. Do not put sensitive profile data in local storage or URL query strings.
- Explicit privacy acknowledgement before profile submission.
- Allow members to skip optional fields and complete them later.
- Clearly distinguish account registration from public profile visibility.
- All demo/test data must be fictional.
