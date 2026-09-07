import { type LearningProgress, learningProgressEmpty } from "#src/features/learning/model/learningProgress"

/** Version of the locally stored demo progress payload. Bump on shape changes. */
export const learningProgressVersion = 1

/**
 * Parses persisted demo progress defensively: anything unexpected falls back to an empty progress
 * instead of throwing, so a stale or hand-edited localStorage entry can never break the page.
 */
export function learningProgressParse(raw: string | null): LearningProgress {
  if (!raw) return learningProgressEmpty

  const parsed = jsonParse(raw)
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return learningProgressEmpty

  const record = parsed as Record<string, unknown>
  if (record.version !== learningProgressVersion) return learningProgressEmpty

  const stored = record.completedLessonIds
  if (!stored || typeof stored !== "object" || Array.isArray(stored)) return learningProgressEmpty

  const completedLessonIds: Record<string, string[]> = {}

  for (const [courseId, lessonIds] of Object.entries(stored as Record<string, unknown>)) {
    if (!Array.isArray(lessonIds)) continue
    const valid = lessonIds.filter((lessonId): lessonId is string => typeof lessonId === "string" && lessonId !== "")
    if (valid.length > 0) completedLessonIds[courseId] = [...new Set(valid)]
  }

  return { completedLessonIds }
}

function jsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown
  } catch {
    return undefined
  }
}
