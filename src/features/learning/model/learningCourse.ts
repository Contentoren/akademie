export type LearningLesson = {
  /** Stable id, unique within its course. Used in /customers/courses/$courseId/lessons/$lessonId */
  id: string
  title: string
  summary: string
  /** Rough reading/working time in minutes, for orientation only. */
  minutes: number
  kind: "lesson" | "exercise" | "reflection"
}

export type LearningModule = {
  /** Stable id, unique within its course. */
  id: string
  title: string
  summary: string
  lessons: LearningLesson[]
}

export type LearningCourse = {
  /** Stable id, unique app-wide. Used in /customers/courses/$courseId */
  id: string
  title: string
  /** Short editorial line shown under the title. */
  tagline: string
  description: string
  /** Visual identity of the course cover, rendered purely in CSS/SVG. */
  accent: "teal" | "lime" | "clay"
  level: "Einstieg" | "Aufbau" | "Praxis"
  objectives: string[]
  modules: LearningModule[]
}
