import type { MarketingCourse } from "../marketing/model/marketingCourse.js"
import type { MarketingLanguage } from "../marketing/model/marketingLanguage.js"

/** Creates the public Course JSON-LD projection used by marketing route metadata. */
export function publicCourseCatalogJsonLd(
  course: MarketingCourse,
  language: MarketingLanguage,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title[language],
    description: course.description[language],
    inLanguage: language,
    courseCode: course.slug,
    timeRequired: `PT${course.totalMinutes}M`,
    provider: {
      "@type": "Organization",
      name: "KI-Akademie",
    },
  }
}
