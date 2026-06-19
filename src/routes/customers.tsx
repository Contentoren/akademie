import { createFileRoute } from "@tanstack/solid-router"

import { CustomerListPage } from "@/features/customers/customer-list"

export const Route = createFileRoute("/customers")({
  component: CustomerListPage,
})
