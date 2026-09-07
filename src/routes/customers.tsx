import { createFileRoute, Outlet } from "@tanstack/solid-router"

export const Route = createFileRoute("/customers")({
  component: CustomersLayout,
})

function CustomersLayout() {
  return <Outlet />
}
