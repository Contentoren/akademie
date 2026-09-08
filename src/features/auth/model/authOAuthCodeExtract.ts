import type { AuthResult } from "./authResult"

export type AuthOAuthCode = {
  code: string
  cleanedHref: string
}

export function authOAuthCodeExtract(href: string): AuthResult<AuthOAuthCode> {
  const op = "authOAuthCodeExtract"

  if (!URL.canParse(href)) {
    return { success: false, op, errorMessage: "The current location is not a valid URL." }
  }

  const url = new URL(href)
  const code = url.searchParams.get("authCode")
  if (!code) {
    return { success: false, op, errorMessage: "The current location has no authentication code." }
  }

  url.searchParams.delete("authCode")
  return { success: true, data: { code, cleanedHref: `${url.pathname}${url.search}${url.hash}` } }
}
