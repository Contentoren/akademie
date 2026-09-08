import { describe, expect, test } from "bun:test"

import { safeReturnToCreate } from "./safeReturnToCreate"

describe("OAuth return URLs", () => {
  test("allows same-origin paths and preserves their query", () => {
    expect(safeReturnToCreate("/app?tab=customers", "https://app.example.test")).toBe(
      "https://app.example.test/app?tab=customers",
    )
  })

  test("rejects external and protocol-relative redirects", () => {
    expect(safeReturnToCreate("https://evil.example.test", "https://app.example.test")).toBeNull()
    expect(safeReturnToCreate("//evil.example.test", "https://app.example.test")).toBeNull()
  })

  test("rejects non-web and credential-bearing application origins", () => {
    expect(safeReturnToCreate("/app", "javascript:alert(1)")).toBeNull()
    expect(safeReturnToCreate("/app", "https://user:password@app.example.test")).toBeNull()
  })

  test("allows the configured production frontend origin", () => {
    expect(safeReturnToCreate("/customers?tab=home", "https://akademie.contentoren.de")).toBe(
      "https://akademie.contentoren.de/customers?tab=home",
    )
  })
})
