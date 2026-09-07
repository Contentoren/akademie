import type { GoogleAuthResult } from "./googleAuthResult"
import { googleCallbackUrlCreate } from "./googleCallbackUrl"

export function googleTokenRequestInitCreate(
  init: RequestInit | undefined,
  siteUrl?: string,
): GoogleAuthResult<RequestInit | undefined> {
  const op = "googleTokenRequestInitCreate"

  if (!init || (init.method ?? "GET").toUpperCase() !== "POST") {
    return { success: true, data: init }
  }

  const body = init.body
  if (body === undefined || body === null) {
    return { success: true, data: init }
  }

  const parameters =
    body instanceof URLSearchParams ? new URLSearchParams(body) : typeof body === "string" ? new URLSearchParams(body) : null
  if (!parameters || parameters.get("grant_type") !== "authorization_code") {
    return { success: true, data: init }
  }

  const callbackUrl = googleCallbackUrlCreate(siteUrl)
  if (!callbackUrl.success) {
    return callbackUrl
  }

  parameters.set("redirect_uri", callbackUrl.data)
  return { success: true, data: { ...init, body: parameters } }
}
