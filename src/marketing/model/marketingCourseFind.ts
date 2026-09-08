import type { MarketingCourse } from "./marketingCourse.ts"
import { publicCourseCatalogFind } from "#src/public-catalog/publicCourseCatalogFind"

/** Look up a published course by its public slug. */
export function marketingCourseFind(slug: string): MarketingCourse | undefined {
  return publicCourseCatalogFind(slug)
}
