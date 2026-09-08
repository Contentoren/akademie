import { describe, expect, test } from "bun:test"

import { publicCourseCatalog } from "./publicCourseCatalog.js"
import { publicCourseCatalogFind } from "./publicCourseCatalogFind.js"
import { publicCourseCatalogJsonLd } from "./publicCourseCatalogJsonLd.js"

describe("public course catalog", () => {
  test("exposes the public marketing projection only", () => {
    expect(publicCourseCatalog).toHaveLength(1)
    expect(publicCourseCatalog[0]?.slug).toBe("ki-fuehrerschein")
    expect(publicCourseCatalog[0]?.modules).toHaveLength(9)
    expect(publicCourseCatalog[0]).not.toHaveProperty("lessons")
  })

  test("finds courses and creates language-specific JSON-LD", () => {
    const course = publicCourseCatalogFind("ki-fuehrerschein")
    expect(course).toBeDefined()
    expect(publicCourseCatalogFind("missing")).toBeUndefined()
    expect(publicCourseCatalogJsonLd(course!, "en")).toMatchObject({
      "@type": "Course",
      name: "AI driving licence for office and knowledge work",
      inLanguage: "en",
      timeRequired: "PT390M",
    })
  })
})
