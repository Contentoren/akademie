/**
 * Fortschrittsvertrag für den Lernbereich.
 * In Aufgabe 1 immer leer; Aufgabe 2 füllt `completedLessonIds` aus lokaler Persistenz.
 */
export type LearningProgress = {
  /** Keys are course ids, values are the completed lesson ids of that course. */
  completedLessonIds: Record<string, string[]>
}

export const learningProgressEmpty: LearningProgress = { completedLessonIds: {} }
