import { createFileRoute } from "@tanstack/solid-router"

import { CustomerDetailPage } from "@/features/customers/customer-detail"

export const Route = createFileRoute("/customers/$customerId")({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  return <CustomerDetailPage customerId={params().customerId} />
}
