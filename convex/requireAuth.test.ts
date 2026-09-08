import { describe, expect, test } from "bun:test"

import { authTokenCreate } from "./auth/authTokenCreate"
import { requireAuth } from "./requireAuth"

describe("requireAuth", () => {
  test("requires both a valid JWT and an active server session", async () => {
    const previousSecret = process.env.AUTH_SECRET
    const secret = "test-auth-secret-that-is-long-enough"
    process.env.AUTH_SECRET = secret
    const created = await authTokenCreate("custom-user-id", "password")
    const session: { userId: string; jti: string; expiresAt: number; revokedAt?: number } = {
      userId: "custom-user-id",
      jti: created.jti,
      expiresAt: created.expiresAt,
      revokedAt: undefined,
    }

    try {
      const context = requireAuthContext(session)
      expect(String(await requireAuth(context, created.token))).toBe("custom-user-id")

      session.revokedAt = Date.now()
      let rejected = false
      try {
        await requireAuth(requireAuthContext(session), created.token)
      } catch {
        rejected = true
      }
      expect(rejected).toBe(true)
    } finally {
      if (previousSecret === undefined) {
        delete process.env.AUTH_SECRET
      } else {
        process.env.AUTH_SECRET = previousSecret
      }
    }
  })

  test("rejects a session that has expired in the database", async () => {
    const previousSecret = process.env.AUTH_SECRET
    const secret = "test-auth-secret-that-is-long-enough"
    process.env.AUTH_SECRET = secret
    const created = await authTokenCreate("custom-user-id", "password")
    const session = {
      userId: "custom-user-id",
      jti: created.jti,
      expiresAt: Date.now() - 1,
    }

    try {
      await expect(requireAuth(requireAuthContext(session), created.token)).rejects.toThrow("AUTH_REQUIRED")
    } finally {
      restoreSecret(previousSecret)
    }
  })

  test("rejects a JWT that has expired even when the database row is active", async () => {
    const previousSecret = process.env.AUTH_SECRET
    const secret = "test-auth-secret-that-is-long-enough"
    process.env.AUTH_SECRET = secret
    const created = await authTokenCreate("custom-user-id", "password", Date.now() - 15 * 24 * 60 * 60 * 1000)
    const session = {
      userId: "custom-user-id",
      jti: created.jti,
      expiresAt: Date.now() + 60_000,
    }

    try {
      await expect(requireAuth(requireAuthContext(session), created.token)).rejects.toThrow("AUTH_REQUIRED")
    } finally {
      restoreSecret(previousSecret)
    }
  })
})

function requireAuthContext(session: { userId: string; jti: string; expiresAt: number; revokedAt?: number }) {
  return {
    db: {
      query: () => ({ withIndex: () => ({ first: async () => session }) }),
      get: async () => ({ _id: session.userId }),
    },
  } as never
}

function restoreSecret(value: string | undefined): void {
  if (value === undefined) {
    delete process.env.AUTH_SECRET
    return
  }

  process.env.AUTH_SECRET = value
}
