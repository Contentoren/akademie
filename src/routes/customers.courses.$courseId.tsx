import { createFileRoute, Outlet } from "@tanstack/solid-router"

export const Route = createFileRoute("/customers/courses/$courseId")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
