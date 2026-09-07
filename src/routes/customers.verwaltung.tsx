import { createFileRoute } from "@tanstack/solid-router"

import { CustomerListPage } from "#src/features/customers/customer-list"

export const Route = createFileRoute("/customers/verwaltung")({
  component: CustomerListPage,
})
