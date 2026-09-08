import { describe, expect, test } from "bun:test"

import { googleAuthHttpHandler } from "./googleAuthHttpHandler"

describe("Google OAuth HTTP flow", () => {
  test("starts with a browser-bound state cookie and PKCE", async () => {
    const previousSiteUrl = process.env.CONVEX_SITE_URL
    const previousGoogleId = process.env.AUTH_GOOGLE_ID
    const previousAppUrl = process.env.APP_URL
    process.env.CONVEX_SITE_URL = "https://api.preview.akademie.contentoren.de"
    process.env.AUTH_GOOGLE_ID = "google-client-id"
    process.env.APP_URL = "https://preview.akademie.contentoren.de"

    try {
      let mutationArgs: Record<string, unknown> | undefined
      const response = await googleAuthHttpHandler(
        {
          runMutation: async (_reference: unknown, args: Record<string, unknown>) => {
            mutationArgs = args
          },
        } as never,
        new Request("http://api.preview.akademie.contentoren.de/api/auth/google?returnTo=%2Fcustomers%3Ftab%3Dhome"),
      )
      const location = response.headers.get("Location")
      const cookie = response.headers.get("Set-Cookie")

      expect(response.status).toBe(302)
      expect(location).toContain("https://accounts.google.com/o/oauth2/v2/auth?")
      expect(location).toContain("state=")
      expect(location).toContain("code_challenge=")
      expect(location).toContain("code_challenge_method=S256")
      expect(location).toContain("nonce=")
      expect(cookie).toContain("akademie_google_oauth_state=")
      expect(cookie).toContain("HttpOnly")
      expect(cookie).toContain("SameSite=Lax")
      expect(cookie).toContain("Secure")
      expect(mutationArgs?.returnTo).toBe("https://preview.akademie.contentoren.de/customers?tab=home")
    } finally {
      restoreEnvironment("CONVEX_SITE_URL", previousSiteUrl)
      restoreEnvironment("AUTH_GOOGLE_ID", previousGoogleId)
      restoreEnvironment("APP_URL", previousAppUrl)
    }
  })

  test("rejects a callback without the browser state cookie", async () => {
    const previousSiteUrl = process.env.CONVEX_SITE_URL
    const previousAppUrl = process.env.APP_URL
    process.env.CONVEX_SITE_URL = "https://api.example.test"
    process.env.APP_URL = "https://app.example.test"
    try {
      const response = await googleAuthHttpHandler(
        { runMutation: async () => undefined } as never,
        new Request("https://api.example.test/api/auth/google?state=state&code=code"),
      )

      expect(response.status).toBe(400)
    } finally {
      restoreEnvironment("CONVEX_SITE_URL", previousSiteUrl)
      restoreEnvironment("APP_URL", previousAppUrl)
    }
  })

  test("requires an explicit frontend origin for returnTo validation", async () => {
    const previousSiteUrl = process.env.CONVEX_SITE_URL
    const previousAppUrl = process.env.APP_URL
    const previousSiteFallback = process.env.SITE_URL
    process.env.CONVEX_SITE_URL = "https://api.example.test"
    delete process.env.APP_URL
    delete process.env.SITE_URL

    try {
      const response = await googleAuthHttpHandler(
        { runMutation: async () => undefined } as never,
        new Request("https://api.example.test/api/auth/google?returnTo=%2Fapp"),
      )

      expect(response.status).toBe(500)
    } finally {
      restoreEnvironment("CONVEX_SITE_URL", previousSiteUrl)
      restoreEnvironment("APP_URL", previousAppUrl)
      restoreEnvironment("SITE_URL", previousSiteFallback)
    }
  })
})

function restoreEnvironment(name: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[name]
    return
  }
  process.env[name] = value
}
