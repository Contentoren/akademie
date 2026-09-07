import type { LearningCourse } from "#src/features/learning/model/learningCourse"
import { learningCourseLessons, type LearningLessonEntry } from "#src/features/learning/model/learningCourseLessons"

export type LearningLessonContext = {
  current: LearningLessonEntry
  previous: LearningLessonEntry | undefined
  next: LearningLessonEntry | undefined
  lessonCount: number
}

/** Locates a lesson inside its course and its direct neighbours in reading order. */
export function learningLessonContext(course: LearningCourse, lessonId: string): LearningLessonContext | undefined {
  const entries = learningCourseLessons(course)
  const index = entries.findIndex((entry) => entry.lesson.id === lessonId)
  if (index === -1) return undefined

  return {
    current: entries[index]!,
    previous: entries[index - 1],
    next: entries[index + 1],
    lessonCount: entries.length,
  }
}
