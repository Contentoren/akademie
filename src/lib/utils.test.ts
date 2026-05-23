import { describe, expect, test } from "bun:test"

import { parseJsonArray, safeRedirectPath, slugify, toInt } from "./utils"

describe("utils", () => {
  test("creates stable German slugs", () => {
    expect(slugify("Müller & Söhne: KI-Grundlagen")).toBe("mueller-soehne-ki-grundlagen")
    expect(slugify("Datenschutz, Ethik und sichere KI-Nutzung")).toBe("datenschutz-ethik-und-sichere-ki-nutzung")
  })

  test("keeps redirects internal", () => {
    expect(safeRedirectPath("/customers", "/fallback")).toBe("/customers")
    expect(safeRedirectPath("//example.com", "/fallback")).toBe("/fallback")
    expect(safeRedirectPath("https://example.com", "/fallback")).toBe("/fallback")
  })

  test("parses form-adjacent values safely", () => {
    expect(parseJsonArray('["eins","zwei",3]')).toEqual(["eins", "zwei"])
    expect(parseJsonArray("not json")).toEqual([])
    expect(toInt("42", 1)).toBe(42)
    expect(toInt("abc", 1)).toBe(1)
  })
})
