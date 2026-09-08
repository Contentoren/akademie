import { describe, expect, test } from "bun:test"

import { authSessionIsExpired } from "./authSessionIsExpired"
import { authSessionStorageCreate } from "./authSessionStorageCreate"

const session = {
  token: "token-1",
  tokenType: "Bearer" as const,
  expiresAt: "2030-01-01T00:00:00.000Z",
  user: { id: "user-1", email: "person@example.com" },
}

function storageCreate() {
  const values = new Map<string, string>()

  return {
    getItem: (key: string) => values.get(key) ?? null,
    removeItem: (key: string) => {
      values.delete(key)
    },
    setItem: (key: string, value: string) => {
      values.set(key, value)
    },
  }
}

describe("auth session storage", () => {
  test("round-trips the complete custom session through sessionStorage", () => {
    const store = authSessionStorageCreate(storageCreate())

    store.write(session)

    expect(store.read()).toEqual({ success: true, data: session })
  })

  test("rejects expired sessions before they reach authenticated UI", () => {
    expect(authSessionIsExpired(session, Date.parse("2030-01-01T00:00:00.000Z"))).toBe(true)
    expect(authSessionIsExpired(session, Date.parse("2029-12-31T23:59:59.999Z"))).toBe(false)
  })

  test("clears a stored session", () => {
    const store = authSessionStorageCreate(storageCreate())
    store.write(session)

    store.clear()

    expect(store.read().success).toBe(false)
  })
})
