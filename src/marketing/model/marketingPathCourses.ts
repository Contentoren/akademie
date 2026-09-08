import type { MarketingLanguage } from "./marketingLanguage.ts"

/** Public course listing path of a language. */
export function marketingPathCourses(language: MarketingLanguage): string {
  return language === "de" ? "/de/kurse" : "/en/courses"
}
