import type { LearningCourseProgress } from "#src/features/learning/model/learningCourseProgress"
import { learningCourseLessons } from "#src/features/learning/model/learningCourseLessons"

export type LearningCourseResumeTarget = {
  lessonId: string
  title: string
}

/** Resolves the lesson id and title used by a course's primary learning action. */
export function learningCourseResumeTarget(
  progress: LearningCourseProgress,
): LearningCourseResumeTarget | undefined {
  const entry = progress.nextEntry ?? learningCourseLessons(progress.course)[0]
  if (!entry) return undefined

  return {
    lessonId: entry.lesson.id,
    title: entry.lesson.title,
  }
}
