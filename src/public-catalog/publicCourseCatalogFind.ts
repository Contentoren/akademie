import type { MarketingCourse } from "../marketing/model/marketingCourse.js"
import { publicCourseCatalog } from "./publicCourseCatalog.js"

/** Finds one public course without reading protected learning data. */
export function publicCourseCatalogFind(slug: string): MarketingCourse | undefined {
  return publicCourseCatalog.find((course) => course.slug === slug)
}
