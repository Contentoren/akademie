# Custom authentication

## Goal
- Replace Auth.js and Convex Auth with the custom authentication approach in `../allgroups-chat`.
- Preserve Google login, email/password sign-in and sign-up, and existing application data.

## Decisions
- Fresh authentication is acceptable; no existing account or session migration.
- Use reference-style signed JWT sessions in browser sessionStorage and explicit tokens for protected Convex calls.
- Keep the existing Google callback `/api/auth/google` and existing Google environment variable names; use `AUTH_SECRET` for sessions.
- Reuse existing libraries and UI components. No visual redesign, deployment, or external configuration changes.

## Approach
- Adapt reference OAuth exchange, profile validation, password hashing, session creation, and verification to Akademie's existing structure.
- Keep session revocation and expiry enforced server-side; validate OAuth state and callback destinations.
- Use noncolliding custom auth tables if required for existing schema compatibility; do not delete application data.
- Remove both `@auth/core` and `@convex-dev/auth` and obsolete protocol/configuration code after replacement.

## Tasks
- [x] 1. Implement custom backend auth, Google HTTP endpoints, password signup/login, sessions, protected function token arguments, and focused tests.
- [x] 2. Replace client auth/session protocol and propagate tokens through all protected calls without changing UI design.
- [x] 3. Remove obsolete dependencies/configuration, update environment documentation, and run full automated verification.
- [x] 4. Verify available browser authentication flows and protected-page behavior.

Current contract: `auth.signUp` and `auth.signIn` accept email/password; `auth.exchangeGoogleCode` accepts a one-time code; session responses contain token, tokenType, expiresAt, and user. Google starts at `/api/auth/google?returnTo=...` and returns `authCode`. Protected functions and sign-out accept `token`. Custom auth tables coexist with inactive legacy tables.
