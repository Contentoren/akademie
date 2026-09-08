import { createFileRoute } from "@tanstack/solid-router"

import { MarketingCoursePage } from "#src/marketing/MarketingCoursePage"
import { publicCourseCatalogFind } from "#src/public-catalog/publicCourseCatalogFind"
import { publicCourseCatalogJsonLd } from "#src/public-catalog/publicCourseCatalogJsonLd"

export const Route = createFileRoute("/de/kurse/$slug")({
  head: ({ params }) => {
    const course = publicCourseCatalogFind(params.slug)
    return course === undefined
      ? {}
      : {
          meta: [
            { title: course.title.de },
            { name: "description", content: course.description.de },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `https://akademie.contentoren.de/de/kurse/${params.slug}` },
          ],
          links: [{ rel: "canonical", href: `https://akademie.contentoren.de/de/kurse/${params.slug}` }],
          scripts: [{ type: "application/ld+json", children: JSON.stringify(publicCourseCatalogJsonLd(course, "de")) }],
        }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  return <MarketingCoursePage language="de" slug={params().slug} />
}
