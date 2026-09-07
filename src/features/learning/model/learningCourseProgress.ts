import type { LearningCourse } from "#src/features/learning/model/learningCourse"
import { learningCourseLessons, type LearningLessonEntry } from "#src/features/learning/model/learningCourseLessons"
import type { LearningProgress } from "#src/features/learning/model/learningProgress"

export type LearningCourseProgress = {
  course: LearningCourse
  lessonCount: number
  completedCount: number
  /** 0–100, rounded. */
  percent: number
  /** First not-yet-completed lesson, or undefined when the course is finished. */
  nextEntry: LearningLessonEntry | undefined
  isStarted: boolean
  isCompleted: boolean
}

export function learningCourseProgress(course: LearningCourse, progress: LearningProgress): LearningCourseProgress {
  const entries = learningCourseLessons(course)
  const completed = new Set(progress.completedLessonIds[course.id] ?? [])
  const completedCount = entries.filter((entry) => completed.has(entry.lesson.id)).length

  return {
    course,
    lessonCount: entries.length,
    completedCount,
    percent: entries.length === 0 ? 0 : Math.round((completedCount / entries.length) * 100),
    nextEntry: entries.find((entry) => !completed.has(entry.lesson.id)),
    isStarted: completedCount > 0,
    isCompleted: entries.length > 0 && completedCount === entries.length,
  }
}
