import { describe, expect, test } from "bun:test"

import { learningProgressParse, learningProgressVersion } from "#src/features/learning/model/learningProgressParse"

const stored = (completedLessonIds: unknown, version: unknown = learningProgressVersion) =>
  JSON.stringify({ version, completedLessonIds })

describe("learningProgressParse", () => {
  test("returns empty progress for missing or broken input", () => {
    expect(learningProgressParse(null).completedLessonIds).toEqual({})
    expect(learningProgressParse("not json").completedLessonIds).toEqual({})
    expect(learningProgressParse("[]").completedLessonIds).toEqual({})
    expect(learningProgressParse(stored({ a: ["x"] }, 0)).completedLessonIds).toEqual({})
    expect(learningProgressParse(stored("nope")).completedLessonIds).toEqual({})
  })

  test("keeps valid lesson ids and drops invalid ones", () => {
    const result = learningProgressParse(stored({ "ki-verstehen": ["a", 2, "", "a", "b"], broken: "x", leer: [] }))

    expect(result.completedLessonIds).toEqual({ "ki-verstehen": ["a", "b"] })
  })
})
