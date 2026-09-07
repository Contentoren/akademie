import type { LearningProgress } from "#src/features/learning/model/learningProgress"

/** Returns a new progress with the lesson marked as completed or not completed. */
export function learningProgressLessonSet(
  progress: LearningProgress,
  courseId: string,
  lessonId: string,
  isCompleted: boolean,
): LearningProgress {
  const current = progress.completedLessonIds[courseId] ?? []

  if (!isCompleted) {
    const remaining = current.filter((id) => id !== lessonId)
    const completedLessonIds = { ...progress.completedLessonIds }

    if (remaining.length === 0) delete completedLessonIds[courseId]
    else completedLessonIds[courseId] = remaining

    return { completedLessonIds }
  }

  if (current.includes(lessonId)) return progress

  return { completedLessonIds: { ...progress.completedLessonIds, [courseId]: [...current, lessonId] } }
}
