import { createFileRoute } from "@tanstack/solid-router"

import { MarketingCoursePage } from "#src/marketing/MarketingCoursePage"
import { publicCourseCatalogFind } from "#src/public-catalog/publicCourseCatalogFind"
import { publicCourseCatalogJsonLd } from "#src/public-catalog/publicCourseCatalogJsonLd"

export const Route = createFileRoute("/en/courses/$slug")({
  head: ({ params }) => {
    const course = publicCourseCatalogFind(params.slug)
    return course === undefined
      ? {}
      : {
          meta: [
            { title: course.title.en },
            { name: "description", content: course.description.en },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `https://akademie.contentoren.de/en/courses/${params.slug}` },
          ],
          links: [{ rel: "canonical", href: `https://akademie.contentoren.de/en/courses/${params.slug}` }],
          scripts: [{ type: "application/ld+json", children: JSON.stringify(publicCourseCatalogJsonLd(course, "en")) }],
        }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  return <MarketingCoursePage language="en" slug={params().slug} />
}
