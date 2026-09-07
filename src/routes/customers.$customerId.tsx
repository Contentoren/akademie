import { createFileRoute, Outlet } from "@tanstack/solid-router"

export const Route = createFileRoute("/customers/$customerId")({
  component: CustomerLayout,
})

function CustomerLayout() {
  return <Outlet />
}
