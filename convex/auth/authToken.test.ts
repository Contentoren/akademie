import { describe, expect, test } from "bun:test"

import { authTokenCreate } from "./authTokenCreate"
import { authTokenVerify } from "./authTokenVerify"

describe("custom JWT sessions", () => {
  test("creates a verifiable HS256 token with a session identifier", async () => {
    const secret = "test-auth-secret-that-is-long-enough"
    const created = await authTokenCreate("custom-user-id", "password", Date.now(), secret)
    const verified = await authTokenVerify(created.token, secret)

    expect(created.jti.length).toBeGreaterThan(20)
    expect(verified).toEqual({
      userId: "custom-user-id",
      jti: created.jti,
      expiresAt: Math.floor(created.expiresAt / 1000) * 1000,
      loginMethod: "password",
    })
  })

  test("rejects a token signed with another secret", async () => {
    const created = await authTokenCreate("custom-user-id", "google", Date.now(), "test-auth-secret-one-that-is-long-enough")

    expect(await authTokenVerify(created.token, "test-auth-secret-two-that-is-long-enough")).toBeNull()
  })

  test("requires a sufficiently long signing secret", async () => {
    await expect(authTokenCreate("custom-user-id", "password", Date.now(), "too-short")).rejects.toThrow(
      "AUTH_SECRET must contain at least 32 characters",
    )
  })

  test("rejects an expired token", async () => {
    const created = await authTokenCreate(
      "custom-user-id",
      "password",
      Date.now() - 15 * 24 * 60 * 60 * 1000,
      "test-auth-secret-one-that-is-long-enough",
    )

    expect(await authTokenVerify(created.token, "test-auth-secret-one-that-is-long-enough")).toBeNull()
  })
})
