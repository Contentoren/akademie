import { createFileRoute } from "@tanstack/solid-router"

import { MarketingCourseListPage } from "#src/marketing/MarketingCourseListPage"

export const Route = createFileRoute("/de/kurse/")({
  head: () => ({
    meta: [
      { title: "Kurse | KI-Akademie" },
      { name: "description", content: "Aufbau, Zeitrahmen und Lernziele der KI-Akademie-Kurse." },
      { property: "og:url", content: "https://akademie.contentoren.de/de/kurse" },
    ],
    links: [{ rel: "canonical", href: "https://akademie.contentoren.de/de/kurse" }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <MarketingCourseListPage language="de" />
}
