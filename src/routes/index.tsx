import { createFileRoute } from "@tanstack/solid-router"

import { HomePage } from "@/features/home/home-page"

export const Route = createFileRoute("/")({
  component: HomePage,
})
