import type { GoogleAuthResult } from "./googleAuthResult"

export function googleCallbackUrlCreate(
  siteUrl = process.env.CUSTOM_AUTH_SITE_URL ?? process.env.CONVEX_SITE_URL,
): GoogleAuthResult<string> {
  const op = "googleCallbackUrlCreate"

  if (!siteUrl) {
    return { success: false, op, errorMessage: "CONVEX_SITE_URL is required." }
  }

  if (!URL.canParse(siteUrl)) {
    return { success: false, op, errorMessage: "CONVEX_SITE_URL must be an absolute URL." }
  }

  const url = new URL(siteUrl)
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { success: false, op, errorMessage: "CONVEX_SITE_URL must use HTTP or HTTPS." }
  }

  url.pathname = "/api/auth/google"
  url.search = ""
  url.hash = ""
  return { success: true, data: url.toString() }
}
