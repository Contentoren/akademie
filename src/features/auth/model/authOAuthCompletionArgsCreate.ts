export type AuthOAuthCompletionArgs = {
  params: { code: string }
  verifier?: string
}

/**
 * Builds the `auth:signIn` arguments for completing an OAuth flow.
 * The provider is intentionally omitted, which tells Convex Auth to
 * redeem the callback code together with the stored PKCE verifier.
 */
export function authOAuthCompletionArgsCreate(code: string, verifier: string | undefined): AuthOAuthCompletionArgs {
  if (!verifier) {
    return { params: { code } }
  }

  return { params: { code }, verifier }
}
