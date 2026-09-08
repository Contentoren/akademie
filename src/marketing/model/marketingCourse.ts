import type { MarketingLanguage } from "./marketingLanguage.ts"

export type MarketingLocalizedText = Readonly<Record<MarketingLanguage, string>>

export type MarketingLocalizedList = Readonly<Record<MarketingLanguage, readonly string[]>>

export type MarketingCourseModule = {
  /** Stable module id from the course manifest (content/<course>/kurs.json). */
  readonly id: string
  readonly number: number
  readonly title: MarketingLocalizedText
  /** Guide time in minutes, taken from the course manifest. */
  readonly minutes: number
  readonly objectives: MarketingLocalizedList
}

export type MarketingCourse = {
  /** Stable course id, used as the public route slug. */
  readonly slug: string
  readonly title: MarketingLocalizedText
  readonly tagline: MarketingLocalizedText
  readonly description: MarketingLocalizedText
  readonly audience: MarketingLocalizedText
  /** Course package version from the manifest. */
  readonly version: string
  readonly totalMinutes: number
  /** Recurring working method of the course. */
  readonly method: MarketingLocalizedList
  readonly modules: readonly MarketingCourseModule[]
}
