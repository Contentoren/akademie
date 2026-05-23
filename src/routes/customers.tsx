import { createFileRoute } from "@tanstack/react-router"

import { CustomerListPage } from "@/features/customers/customer-list"

export const Route = createFileRoute("/customers")({
  component: CustomerListPage,
})
