import { describe, expect, test } from "bun:test"

import { googleTokenRequestInitCreate } from "./googleTokenRequestInit"

describe("Google token request adapter", () => {
  test("uses the external callback URI during the token exchange", () => {
    const result = googleTokenRequestInitCreate(
      {
        method: "POST",
        body: new URLSearchParams({ code: "oauth-code", grant_type: "authorization_code" }),
      },
      "https://api.example.test",
    )

    expect(result.success).toBe(true)
    if (!result.success) return

    expect(result.data?.body).toEqual(
      new URLSearchParams({
        code: "oauth-code",
        grant_type: "authorization_code",
        redirect_uri: "https://api.example.test/api/auth/google",
      }),
    )
  })

  test("does not rewrite non-authorization-code requests", () => {
    const init = { method: "POST", body: new URLSearchParams({ grant_type: "refresh_token" }) }

    const result = googleTokenRequestInitCreate(init, "https://api.example.test")

    expect(result).toEqual({ success: true, data: init })
  })
})
