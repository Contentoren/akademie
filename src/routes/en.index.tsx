import { createFileRoute } from "@tanstack/solid-router"

import { MarketingHomePage } from "#src/marketing/MarketingHomePage"

export const Route = createFileRoute("/en/")({
  head: () => ({
    meta: [
      { title: "KI-Akademie | AI training for office and knowledge work" },
      { name: "description", content: "Tool-neutral AI training for office and knowledge work." },
      { property: "og:title", content: "KI-Akademie | AI training" },
      { property: "og:url", content: "https://akademie.contentoren.de/en" },
    ],
    links: [{ rel: "canonical", href: "https://akademie.contentoren.de/en" }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <MarketingHomePage language="en" />
}
