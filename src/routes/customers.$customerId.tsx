import { createFileRoute } from "@tanstack/react-router"

import { CustomerDetailPage } from "@/features/customers/customer-detail"

export const Route = createFileRoute("/customers/$customerId")({
  component: RouteComponent,
})

function RouteComponent() {
  const { customerId } = Route.useParams()

  return <CustomerDetailPage customerId={customerId} />
}
