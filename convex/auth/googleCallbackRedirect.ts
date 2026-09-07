import type { GoogleAuthResult } from "./googleAuthResult"

export function googleCallbackRedirectCreate(requestUrl: string): GoogleAuthResult<string> {
  const op = "googleCallbackRedirectCreate"

  if (!URL.canParse(requestUrl)) {
    return { success: false, op, errorMessage: "The Google callback URL is invalid." }
  }

  const url = new URL(requestUrl)
  if (url.pathname !== "/api/auth/google") {
    return { success: false, op, errorMessage: "The Google callback path is invalid." }
  }

  url.pathname = "/api/auth/callback/google"
  url.hash = ""
  return { success: true, data: url.toString() }
}
