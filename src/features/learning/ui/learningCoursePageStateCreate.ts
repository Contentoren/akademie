import { onMount } from "solid-js"

import { learningCourseFind } from "#src/features/learning/model/learningCourseFind"
import { learningCourseMinutes } from "#src/features/learning/model/learningCourseMinutes"
import { learningCourseProgress } from "#src/features/learning/model/learningCourseProgress"
import { learningCourseResumeTarget } from "#src/features/learning/model/learningCourseResumeTarget"
import { learningProgressStore } from "#src/features/learning/model/learningProgressStore"

export function learningCoursePageStateCreate(courseId: () => string) {
  onMount(() => learningProgressStore.hydrate())

  const course = () => learningCourseFind(courseId())

  const progress = () => {
    const found = course()
    if (!found) return undefined
    return learningCourseProgress(found, learningProgressStore.get())
  }

  const minutes = () => {
    const found = course()
    if (!found) return 0
    return learningCourseMinutes(found)
  }

  const lessonTarget = () => {
    const current = progress()
    if (!current) return undefined
    return learningCourseResumeTarget(current)
  }

  const isLessonCompleted = (lessonId: string) =>
    (learningProgressStore.get().completedLessonIds[courseId()] ?? []).includes(lessonId)

  return { course, progress, minutes, lessonTarget, isLessonCompleted }
}
