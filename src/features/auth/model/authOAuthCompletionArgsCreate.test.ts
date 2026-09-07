import { describe, expect, test } from "bun:test"

import { authOAuthCompletionArgsCreate } from "./authOAuthCompletionArgsCreate"

describe("authOAuthCompletionArgsCreate", () => {
  test("omits the provider and includes the verifier", () => {
    const args = authOAuthCompletionArgsCreate("code-1", "verifier-1")

    expect(args).toEqual({ params: { code: "code-1" }, verifier: "verifier-1" })
    expect("provider" in args).toBe(false)
  })

  test("omits the verifier key when it is missing", () => {
    const args = authOAuthCompletionArgsCreate("code-1", undefined)

    expect(args).toEqual({ params: { code: "code-1" } })
    expect("verifier" in args).toBe(false)
  })
})
