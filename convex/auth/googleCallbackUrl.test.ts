import { describe, expect, test } from "bun:test"

import { googleCallbackUrlCreate } from "./googleCallbackUrl"

describe("Google callback URL", () => {
  test("uses the exact external callback path", () => {
    const result = googleCallbackUrlCreate("https://api.example.test")

    expect(result).toEqual({ success: true, data: "https://api.example.test/api/auth/google" })
  })

  test("returns a Result error for an invalid site URL", () => {
    const result = googleCallbackUrlCreate("not-a-url")

    expect(result.success).toBe(false)
  })

  test("rejects credentials embedded in the callback origin", () => {
    const result = googleCallbackUrlCreate("https://user:password@api.example.test")

    expect(result.success).toBe(false)
  })
})
