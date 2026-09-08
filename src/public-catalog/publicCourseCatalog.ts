import { marketingCourses } from "../marketing/model/marketingCourses.js"
import type { MarketingCourse } from "../marketing/model/marketingCourse.js"

/**
 * Read-only public projection of the versioned course package.
 *
 * Marketing pages and the metadata CLI deliberately consume this same value;
 * protected lesson, exercise, and assessment content is not part of it.
 */
export const publicCourseCatalog = marketingCourses satisfies readonly MarketingCourse[]
