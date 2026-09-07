import type { LearningCourse } from "#src/features/learning/model/learningCourse"
import { learningCourseProgress } from "#src/features/learning/model/learningCourseProgress"
import { learningCourses } from "#src/features/learning/model/learningCourses"
import type { LearningProgress } from "#src/features/learning/model/learningProgress"

/** First other course that is not finished yet – used as follow-up action after a course is done. */
export function learningCourseNext(course: LearningCourse, progress: LearningProgress): LearningCourse | undefined {
  return learningCourses.find(
    (candidate) => candidate.id !== course.id && !learningCourseProgress(candidate, progress).isCompleted,
  )
}
