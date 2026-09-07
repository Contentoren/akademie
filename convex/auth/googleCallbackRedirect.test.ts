import { describe, expect, test } from "bun:test"

import { googleCallbackRedirectCreate } from "./googleCallbackRedirect"

describe("Google callback routing adapter", () => {
  test("keeps OAuth parameters while entering Convex Auth's callback route", () => {
    const result = googleCallbackRedirectCreate("https://api.example.test/api/auth/google?code=oauth-code&state=oauth-state")

    expect(result).toEqual({
      success: true,
      data: "https://api.example.test/api/auth/callback/google?code=oauth-code&state=oauth-state",
    })
  })
})
