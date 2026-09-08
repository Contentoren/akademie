import type { MarketingLanguage } from "./marketingLanguage.ts"
import { marketingPathCourses } from "./marketingPathCourses.ts"

/** Public course detail path of a language. */
export function marketingPathCourse(language: MarketingLanguage, slug: string): string {
  return `${marketingPathCourses(language)}/${slug}`
}
