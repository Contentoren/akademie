import { onMount } from "solid-js"

import { learningCourseMinutes } from "#src/features/learning/model/learningCourseMinutes"
import { learningCourseProgress, type LearningCourseProgress } from "#src/features/learning/model/learningCourseProgress"
import { learningCourses } from "#src/features/learning/model/learningCourses"
import { learningProgressStore } from "#src/features/learning/model/learningProgressStore"

export type LearningOverviewEntry = {
  progress: LearningCourseProgress
  minutes: number
}

export function learningOverviewPageStateCreate() {
  onMount(() => learningProgressStore.hydrate())

  const progress = learningProgressStore.get

  const entries = (): LearningOverviewEntry[] =>
    learningCourses.map((course) => ({
      progress: learningCourseProgress(course, progress()),
      minutes: learningCourseMinutes(course),
    }))

  const resumeEntry = () =>
    entries().find((entry) => entry.progress.isStarted && !entry.progress.isCompleted) ??
    entries().find((entry) => !entry.progress.isCompleted) ??
    entries()[0]

  const totalLessons = () => entries().reduce((total, entry) => total + entry.progress.lessonCount, 0)
  const completedLessons = () => entries().reduce((total, entry) => total + entry.progress.completedCount, 0)

  return {
    entries,
    resumeEntry,
    totalLessons,
    completedLessons,
    hasStarted: () => completedLessons() > 0,
  }
}
