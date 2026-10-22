# Sanyog — Registration and Profile Creation Flow

Requirements transcribed from the founder's paper sketches. These requirements guide the UI and later backend implementation.

## Step 1 — Account
- First name
- Last name
- Date of birth
- Email address
- Password and verification (implementation phase)
- Minimum age 18. Reject underage accounts; never show full date of birth publicly.
- Explain whether the account is managed by the candidate or by an invited family member. Family assistance must not bypass the adult candidate's consent.

## Step 2 — Religion and community
- Religion dropdown: Hindu, Muslim, Jain, Sikh, Buddhist, Parsi, No religion, Spiritual but not religious, Other, Prefer not to say.
- Community and subcommunity fields should be optional and support free-text/managed lists without assuming one exhaustive taxonomy.
- Provide "No preference" in partner preferences separately from the candidate's own identity.
- Country of residence, defaulted only as a convenience and editable by the user.
- Sensitive identity fields must be optional and must not be used to exclude users from the service itself.

## Step 3 — Location and personal details
- Country, state/union territory, city/district.
- Marital status options: Never married, Married, Divorced, Widowed, Awaiting divorce, Marriage annulled, Prefer not to say.
- Height, optional.
- Diet: Vegetarian, Non-vegetarian, Eggetarian, Vegan, Jain, Other, Prefer not to say.
- Collect only what is useful for the user's own profile and chosen preferences.

## Step 4 — Education and career
- Highest qualification.
- College/institution name.
- Annual income band (not exact salary by default). Suggested editable bands: Below ₹2 lakh, ₹2–4 lakh, ₹4–7 lakh, ₹7–10 lakh, ₹10–15 lakh, ₹15–25 lakh, ₹25 lakh and above, Prefer not to say.
- Employment sector: Private sector, Government/public sector, Defence/civil services, Business/self-employed, Student, Not currently working, Other, Prefer not to say.
- Profession/role and company name, both optional.
- Never expose exact income or employer details unless the user explicitly chooses to display them.

## Step 5 — About and photos
- Personal introduction with a length limit and community guidelines.
- Optional photos: close-up, half-length, full-length.
- Photos are private by default until the candidate chooses visibility settings. Uploads require authenticated access, file size/type validation, private storage, and moderation/reporting controls.
- Explain that photo categories are suggestions, not mandatory body-image requirements.

## Shared interaction requirements
- Multi-step progress indicator, Back/Continue, inline validation, clear error messages, and mobile-friendly controls.
- Save progress only after secure authentication is connected. Do not put sensitive profile data in local storage or URL query strings.
- Explicit privacy/consent acknowledgement before profile submission.
- Allow users to skip optional fields and complete them later.
- Clearly distinguish account registration from public profile visibility.
- Never send the form to a real database while this is a front-end-only prototype.
- All demo/test data must be fictional.

## Partner preferences are separate
Candidate's own religion, community, diet, education, and marital status are profile attributes. Desired partner filters are separate choices and must include "No preference". Do not silently turn identity fields into matching restrictions.
