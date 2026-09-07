import { createSignal } from "solid-js"
import { isServer } from "solid-js/web"

import { type LearningProgress, learningProgressEmpty } from "#src/features/learning/model/learningProgress"
import { learningProgressLessonSet } from "#src/features/learning/model/learningProgressLessonSet"
import { learningProgressParse, learningProgressVersion } from "#src/features/learning/model/learningProgressParse"

const storageKey = "akademie.learning-progress.v1"

const [progress, setProgress] = createSignal<LearningProgress>(learningProgressEmpty)

let isHydrated = false
let writeHandle: number | undefined
let idleWriteHandle: number | undefined
let writeVersion = 0

/**
 * App-global demo progress. Lives only in this browser: the server renders the empty state and the
 * stored value is applied after hydration, so all learning pages share one reactive source.
 */
export const learningProgressStore = {
  get: progress,

  /** Reads localStorage once on the client. Safe to call from every page. */
  hydrate() {
    if (isServer || isHydrated) return
    isHydrated = true
    setProgress(learningProgressParse(storageRead()))
  },

  lessonSet(courseId: string, lessonId: string, isCompleted: boolean) {
    const next = learningProgressLessonSet(progress(), courseId, lessonId, isCompleted)
    if (next === progress()) return
    setProgress(next)
    if (isCompleted) storageWriteImmediately(next)
    else storageWriteScheduled(next)
  },
}

function storageRead(): string | null {
  try {
    return window.localStorage.getItem(storageKey)
  } catch {
    return null
  }
}

function storageWriteScheduled(value: LearningProgress) {
  if (isServer || typeof window === "undefined") return
  storageWriteCancelPending()
  const version = writeVersion

  writeHandle = window.setTimeout(() => {
    writeHandle = undefined
    const write = () => {
      idleWriteHandle = undefined
      if (version !== writeVersion) return
      storageWrite(value)
    }
    if (version !== writeVersion) return
    if (typeof window.requestIdleCallback === "function") idleWriteHandle = window.requestIdleCallback(write)
    else write()
  }, 120)
}

function storageWriteImmediately(value: LearningProgress) {
  if (isServer || typeof window === "undefined") return
  storageWriteCancelPending()
  storageWrite(value)
}

function storageWriteCancelPending() {
  writeVersion += 1
  if (typeof window === "undefined") return
  if (writeHandle !== undefined) {
    window.clearTimeout(writeHandle)
    writeHandle = undefined
  }
  if (idleWriteHandle !== undefined && typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(idleWriteHandle)
    idleWriteHandle = undefined
  }
}

function storageWrite(value: LearningProgress) {
  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ version: learningProgressVersion, completedLessonIds: value.completedLessonIds }),
    )
  } catch {
    // Private mode or full storage: the demo progress simply stays in memory.
  }
}
