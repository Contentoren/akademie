import type { LearningCourse } from "#src/features/learning/model/learningCourse"
import { learningCourses } from "#src/features/learning/model/learningCourses"

export function learningCourseFind(courseId: string): LearningCourse | undefined {
  return learningCourses.find((course) => course.id === courseId)
}
