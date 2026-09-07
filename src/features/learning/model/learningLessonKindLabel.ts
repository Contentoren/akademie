import type { LearningLesson } from "#src/features/learning/model/learningCourse"

const labels: Record<LearningLesson["kind"], string> = {
  lesson: "Lektion",
  exercise: "Übung",
  reflection: "Rückblick",
}

export function learningLessonKindLabel(kind: LearningLesson["kind"]): string {
  return labels[kind]
}
