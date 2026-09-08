import { describe, expect, test } from "bun:test"

import { authOAuthCodeExtract } from "./authOAuthCodeExtract"

describe("authOAuthCodeExtract", () => {
  test("returns the code and a href without it", () => {
    const result = authOAuthCodeExtract("https://akademie.test/customers?authCode=abc&tab=files#top")

    expect(result).toEqual({ success: true, data: { code: "abc", cleanedHref: "/customers?tab=files#top" } })
  })

  test("keeps a bare path when no other search params remain", () => {
    const result = authOAuthCodeExtract("https://akademie.test/?authCode=abc")

    expect(result.success && result.data.cleanedHref).toBe("/")
  })

  test("fails without a code", () => {
    const result = authOAuthCodeExtract("https://akademie.test/customers")

    expect(result.success).toBe(false)
  })

  test("only accepts the backend authCode callback parameter", () => {
    const result = authOAuthCodeExtract("https://akademie.test/customers?code=abc")

    expect(result.success).toBe(false)
  })

  test("fails on an invalid URL", () => {
    const result = authOAuthCodeExtract("not-a-url?authCode=abc")

    expect(result.success).toBe(false)
  })
})
