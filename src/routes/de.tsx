import { createFileRoute, Outlet } from "@tanstack/solid-router"

export const Route = createFileRoute("/de")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
