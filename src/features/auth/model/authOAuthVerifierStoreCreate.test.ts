import { describe, expect, test } from "bun:test"

import { authOAuthVerifierStoreCreate, type AuthOAuthVerifierStorage } from "./authOAuthVerifierStoreCreate"

function storageCreate(): AuthOAuthVerifierStorage {
  const values = new Map<string, string>()

  return {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => {
      values.delete(key)
    },
    setItem: (key, value) => {
      values.set(key, value)
    },
  }
}

describe("authOAuthVerifierStoreCreate", () => {
  test("persists and reads a verifier", () => {
    const store = authOAuthVerifierStoreCreate("verifier-key", storageCreate())
    store.persist("verifier-1")

    expect(store.read()).toBe("verifier-1")
  })

  test("clears the verifier", () => {
    const store = authOAuthVerifierStoreCreate("verifier-key", storageCreate())
    store.persist("verifier-1")
    store.clear()

    expect(store.read()).toBeUndefined()
  })

  test("persisting undefined removes a stale verifier", () => {
    const store = authOAuthVerifierStoreCreate("verifier-key", storageCreate())
    store.persist("verifier-1")
    store.persist(undefined)

    expect(store.read()).toBeUndefined()
  })
})
