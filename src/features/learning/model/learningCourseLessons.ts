import type { LearningCourse, LearningLesson, LearningModule } from "#src/features/learning/model/learningCourse"

export type LearningLessonEntry = {
  module: LearningModule
  lesson: LearningLesson
  /** 1-based position across the whole course. */
  position: number
}

/** Flattens all lessons of a course in reading order. */
export function learningCourseLessons(course: LearningCourse): LearningLessonEntry[] {
  const entries: LearningLessonEntry[] = []

  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      entries.push({ module, lesson, position: entries.length + 1 })
    }
  }

  return entries
}
