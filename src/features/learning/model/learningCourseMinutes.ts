import type { LearningCourse } from "#src/features/learning/model/learningCourse"
import { learningCourseLessons } from "#src/features/learning/model/learningCourseLessons"

export function learningCourseMinutes(course: LearningCourse): number {
  return learningCourseLessons(course).reduce((total, entry) => total + entry.lesson.minutes, 0)
}
