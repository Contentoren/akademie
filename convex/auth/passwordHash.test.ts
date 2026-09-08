import { describe, expect, test } from "bun:test"

import { passwordHashCreate } from "./passwordHashCreate"
import { passwordHashVerify } from "./passwordHashVerify"

describe("custom password hashes", () => {
  test("uses a per-password salt and verifies the original password", async () => {
    const firstHash = await passwordHashCreate("correct horse battery staple")
    const secondHash = await passwordHashCreate("correct horse battery staple")

    expect(firstHash).not.toBe(secondHash)
    expect(await passwordHashVerify("correct horse battery staple", firstHash)).toBe(true)
    expect(await passwordHashVerify("wrong password", firstHash)).toBe(false)
  })

  test("rejects malformed password hashes", async () => {
    expect(await passwordHashVerify("password", "not-a-password-hash")).toBe(false)
  })

  test("rejects unsupported work factors and non-canonical base64url", async () => {
    const hash = await passwordHashCreate("password")
    const [, , salt, digest] = hash.split("$")

    expect(await passwordHashVerify("password", `pbkdf2-sha256$119999$${salt}$${digest}`)).toBe(false)
    expect(await passwordHashVerify("password", `pbkdf2-sha256$120000$${salt}!$${digest}`)).toBe(false)
  })
})
