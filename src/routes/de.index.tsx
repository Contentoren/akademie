import { createFileRoute } from "@tanstack/solid-router"

import { MarketingHomePage } from "#src/marketing/MarketingHomePage"

export const Route = createFileRoute("/de/")({
  head: () => ({
    meta: [
      { title: "KI-Akademie | KI-Schulungen für Büro- und Wissensarbeit" },
      { name: "description", content: "Toolneutrale KI-Schulungen für Büro- und Wissensarbeit." },
      { property: "og:title", content: "KI-Akademie | KI-Schulungen" },
      { property: "og:url", content: "https://akademie.contentoren.de/de" },
    ],
    links: [{ rel: "canonical", href: "https://akademie.contentoren.de/de" }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <MarketingHomePage language="de" />
}
