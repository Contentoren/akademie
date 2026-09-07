import { useNavigate } from "@tanstack/solid-router"
import { onMount } from "solid-js"

import { learningCourseFind } from "#src/features/learning/model/learningCourseFind"
import { learningCourseNext } from "#src/features/learning/model/learningCourseNext"
import { learningCourseProgress } from "#src/features/learning/model/learningCourseProgress"
import { learningLessonContext } from "#src/features/learning/model/learningLessonContext"
import { learningProgressStore } from "#src/features/learning/model/learningProgressStore"

export function learningLessonPageStateCreate(courseId: () => string, lessonId: () => string) {
  onMount(() => learningProgressStore.hydrate())

  const course = () => learningCourseFind(courseId())

  const context = () => {
    const found = course()
    if (!found) return undefined
    return learningLessonContext(found, lessonId())
  }

  const progress = () => {
    const found = course()
    if (!found) return undefined
    return learningCourseProgress(found, learningProgressStore.get())
  }

  const isLessonCompleted = (id: string) =>
    (learningProgressStore.get().completedLessonIds[courseId()] ?? []).includes(id)

  const isCurrentCompleted = () => isLessonCompleted(lessonId())

  const nextCourse = () => {
    const found = course()
    if (!found) return undefined
    if (!progress()?.isCompleted) return undefined
    return learningCourseNext(found, learningProgressStore.get())
  }

  const navigate = useNavigate()

  const completeCurrent = () => {
    learningProgressStore.lessonSet(courseId(), lessonId(), true)

    const following = context()?.next
    if (!following) return

    void navigate({
      to: "/customers/courses/$courseId/lessons/$lessonId",
      params: { courseId: courseId(), lessonId: following.lesson.id },
    })
  }

  const reopenCurrent = () => learningProgressStore.lessonSet(courseId(), lessonId(), false)

  /** Placeholder learning objectives, derived from the lesson title. */
  const objectives = () => {
    const lesson = context()?.current.lesson
    if (!lesson) return []

    return [
      `Sie ordnen ein, worum es bei „${lesson.title}“ geht.`,
      "Sie erkennen den Bezug zu Ihrem eigenen Arbeitsalltag.",
      "Sie halten für sich fest, was Sie als Nächstes ausprobieren.",
    ]
  }

  return {
    course,
    context,
    objectives,
    progress,
    isLessonCompleted,
    isCurrentCompleted,
    nextCourse,
    completeCurrent,
    reopenCurrent,
  }
}
