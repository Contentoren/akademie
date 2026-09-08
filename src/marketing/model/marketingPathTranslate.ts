import type { MarketingLanguage } from "./marketingLanguage.ts"
import { marketingPathCourse } from "./marketingPathCourse.ts"
import { marketingPathCourses } from "./marketingPathCourses.ts"
import { marketingPathHome } from "./marketingPathHome.ts"

/** Translate a public pathname into the same page of the target language. */
export function marketingPathTranslate(pathname: string, target: MarketingLanguage): string {
  const segments = pathname.split("/").filter((segment) => segment.length > 0)
  const listingSegments = segments.slice(1)
  if (listingSegments.length === 0) return marketingPathHome(target)

  const slug = listingSegments[1]
  if (slug === undefined) return marketingPathCourses(target)
  return marketingPathCourse(target, slug)
}
