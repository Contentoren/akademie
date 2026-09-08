import { createFileRoute } from "@tanstack/solid-router"

import { MarketingCourseListPage } from "#src/marketing/MarketingCourseListPage"

export const Route = createFileRoute("/en/courses/")({
  head: () => ({
    meta: [
      { title: "Courses | KI-Akademie" },
      { name: "description", content: "Course structure, guide times and learning objectives." },
      { property: "og:url", content: "https://akademie.contentoren.de/en/courses" },
    ],
    links: [{ rel: "canonical", href: "https://akademie.contentoren.de/en/courses" }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <MarketingCourseListPage language="en" />
}
