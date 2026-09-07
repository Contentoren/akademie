import { describe, expect, test } from "bun:test"

import { learningProgressEmpty } from "#src/features/learning/model/learningProgress"
import { learningProgressLessonSet } from "#src/features/learning/model/learningProgressLessonSet"

describe("learningProgressLessonSet", () => {
  test("adds a lesson without mutating the input", () => {
    const next = learningProgressLessonSet(learningProgressEmpty, "c1", "l1", true)

    expect(next.completedLessonIds).toEqual({ c1: ["l1"] })
    expect(learningProgressEmpty.completedLessonIds).toEqual({})
  })

  test("is idempotent for an already completed lesson", () => {
    const first = learningProgressLessonSet(learningProgressEmpty, "c1", "l1", true)

    expect(learningProgressLessonSet(first, "c1", "l1", true)).toBe(first)
  })

  test("removes a lesson and drops empty courses", () => {
    const withTwo = learningProgressLessonSet(
      learningProgressLessonSet(learningProgressEmpty, "c1", "l1", true),
      "c1",
      "l2",
      true,
    )

    expect(learningProgressLessonSet(withTwo, "c1", "l2", false).completedLessonIds).toEqual({ c1: ["l1"] })
    expect(
      learningProgressLessonSet(learningProgressLessonSet(withTwo, "c1", "l2", false), "c1", "l1", false)
        .completedLessonIds,
    ).toEqual({})
  })
})
