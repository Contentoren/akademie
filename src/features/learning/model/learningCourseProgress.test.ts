import { describe, expect, test } from "bun:test"

import { learningCourseLessons } from "#src/features/learning/model/learningCourseLessons"
import { learningCourseNext } from "#src/features/learning/model/learningCourseNext"
import { learningCourseProgress } from "#src/features/learning/model/learningCourseProgress"
import { learningCourseResumeTarget } from "#src/features/learning/model/learningCourseResumeTarget"
import { learningCourses } from "#src/features/learning/model/learningCourses"
import { learningLessonContext } from "#src/features/learning/model/learningLessonContext"
import { learningProgressEmpty } from "#src/features/learning/model/learningProgress"

const course = learningCourses[0]!
const entries = learningCourseLessons(course)

describe("learningCourseProgress", () => {
  test("starts empty", () => {
    const progress = learningCourseProgress(course, learningProgressEmpty)

    expect(progress.percent).toBe(0)
    expect(progress.completedCount).toBe(0)
    expect(progress.isStarted).toBe(false)
    expect(progress.isCompleted).toBe(false)
    expect(progress.nextEntry?.lesson.id).toBe(entries[0]!.lesson.id)
  })

  test("skips completed lessons when picking the next entry", () => {
    const progress = learningCourseProgress(course, {
      completedLessonIds: { [course.id]: [entries[0]!.lesson.id] },
    })

    expect(progress.completedCount).toBe(1)
    expect(progress.isStarted).toBe(true)
    expect(progress.nextEntry?.lesson.id).toBe(entries[1]!.lesson.id)
  })

  test("reports completion when every lesson is done", () => {
    const progress = learningCourseProgress(course, {
      completedLessonIds: { [course.id]: entries.map((entry) => entry.lesson.id) },
    })

    expect(progress.percent).toBe(100)
    expect(progress.isCompleted).toBe(true)
    expect(progress.nextEntry).toBeUndefined()
  })

  test("ignores lesson ids of other courses", () => {
    const progress = learningCourseProgress(course, { completedLessonIds: { "andere-id": ["was-ist-ki"] } })

    expect(progress.completedCount).toBe(0)
  })

  test("emits the nested next lesson id and title for the primary action", () => {
    const progress = learningCourseProgress(course, learningProgressEmpty)

    expect(learningCourseResumeTarget(progress)).toEqual({
      lessonId: entries[0]!.lesson.id,
      title: entries[0]!.lesson.title,
    })
  })

  test("emits the following nested lesson id and title after progress", () => {
    const progress = learningCourseProgress(course, {
      completedLessonIds: { [course.id]: [entries[0]!.lesson.id] },
    })

    expect(learningCourseResumeTarget(progress)).toEqual({
      lessonId: entries[1]!.lesson.id,
      title: entries[1]!.lesson.title,
    })
  })

  test("does not emit an incomplete target for an empty course", () => {
    const emptyCourse = { ...course, modules: [] }
    const progress = learningCourseProgress(emptyCourse, learningProgressEmpty)

    expect(learningCourseResumeTarget(progress)).toBeUndefined()
  })
})

describe("learningLessonContext", () => {
  test("resolves neighbours across module boundaries", () => {
    const context = learningLessonContext(course, entries[1]!.lesson.id)

    expect(context?.current.position).toBe(2)
    expect(context?.previous?.lesson.id).toBe(entries[0]!.lesson.id)
    expect(context?.next?.lesson.id).toBe(entries[2]!.lesson.id)
    expect(context?.lessonCount).toBe(entries.length)
  })

  test("has no neighbours at the edges and rejects unknown ids", () => {
    expect(learningLessonContext(course, entries[0]!.lesson.id)?.previous).toBeUndefined()
    expect(learningLessonContext(course, entries.at(-1)!.lesson.id)?.next).toBeUndefined()
    expect(learningLessonContext(course, "gibt-es-nicht")).toBeUndefined()
  })
})

describe("learningCourseNext", () => {
  test("suggests another unfinished course", () => {
    expect(learningCourseNext(course, learningProgressEmpty)?.id).toBe(learningCourses[1]!.id)
  })

  test("skips finished courses", () => {
    const completedLessonIds = Object.fromEntries(
      learningCourses
        .slice(0, 2)
        .map((entry) => [entry.id, learningCourseLessons(entry).map((lesson) => lesson.lesson.id)]),
    )

    expect(learningCourseNext(course, { completedLessonIds })?.id).toBe(learningCourses[2]!.id)
  })
})
