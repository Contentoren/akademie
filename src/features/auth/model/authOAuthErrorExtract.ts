import type { AuthResult } from "./authResult"

export function authOAuthErrorExtract(
  href: string,
): AuthResult<{ code: "google_denied" | "google_failed"; cleanedHref: string }> {
  const op = "authOAuthErrorExtract"

  if (!URL.canParse(href)) {
    return { success: false, op, errorMessage: "The current location is not a valid URL." }
  }

  const url = new URL(href)
  const code = url.searchParams.get("authError")
  if (code !== "google_denied" && code !== "google_failed") {
    return { success: false, op, errorMessage: "The current location has no recognized authentication error." }
  }

  url.searchParams.delete("authError")
  return { success: true, data: { code, cleanedHref: `${url.pathname}${url.search}${url.hash}` } }
}
