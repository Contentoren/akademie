# Goal
- Configure production and development domains, local environment files, and both Convex backends; implement Google sign-in with sibling-app structure and Result-based application logic.

# Decisions
- Production frontend: https://akademie.contentoren.de; API: https://api.akademie.contentoren.de.
- Development frontend: https://preview.akademie.contentoren.de; API: https://api.preview.akademie.contentoren.de.
- Both Google callbacks end in /api/auth/google, as confirmed by the user.
- Preserve existing password login and use the custom signed sessions. Use existing dependencies first and follow the code-style skill. Never expose credentials in output or tracked files.
- The custom Google flow uses `/api/auth/google`, exchanges the provider code once, and issues the application session through the existing Convex action.
- The callback uses `CONVEX_SITE_URL`; `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`, and the frontend `APP_URL`/`SITE_URL` are environment values.
- API domains use DNS-only records and Caddy TLS with a local bridge to the remote Convex deployments; registry ports are 8309 (development) and 8311 (production). Frontend ports are 3120 and 3122 respectively.

# Approach
- Implement and test the smallest compatible Google integration, borrowing sibling folder conventions while keeping the custom authentication protocol in one place.
- Configure environment-specific credentials and backend/domain routing with installed infrastructure tooling.
- Deploy and verify both environments, including browser sign-in initiation.

# Tasks
1. [x] Implement backend Google flow with exact callback and Result-based helpers; verify focused tests.
2. [x] Add Google sign-in UI using existing components and extracted logic; verify tests/typecheck.
3. [x] Configure both env files, DNS and registry mappings, sync backend values, and deploy both environments.
4. [x] Browser-verify both environments and report remaining external constraints, if any.
