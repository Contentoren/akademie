import { describe, expect, test } from "bun:test"

import { authOAuthErrorExtract } from "./authOAuthErrorExtract"

describe("authOAuthErrorExtract", () => {
  test("returns the backend error and a href without it", () => {
    const result = authOAuthErrorExtract("https://akademie.test/customers?authError=google_failed&tab=files#top")

    expect(result).toEqual({
      success: true,
      data: { code: "google_failed", cleanedHref: "/customers?tab=files#top" },
    })
  })

  test("rejects an unsupported callback parameter", () => {
    const result = authOAuthErrorExtract("https://akademie.test/customers?authError=wrong_parameter")

    expect(result.success).toBe(false)
  })
})
