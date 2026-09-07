import { createFileRoute, type ErrorComponentProps } from "@tanstack/solid-router"

import { EmptyState } from "#src/components/ui"
import { CustomerDetailPage } from "#src/features/customers/customer-detail"

export const Route = createFileRoute("/customers/$customerId/")({
  component: RouteComponent,
  errorComponent: CustomerDetailError,
})

function RouteComponent() {
  const params = Route.useParams()

  return <CustomerDetailPage customerId={params().customerId} />
}

function CustomerDetailError(_props: ErrorComponentProps) {
  return (
    <section class="section-shell py-10 sm:py-14">
      <EmptyState
        title="Kundenprofil nicht verfügbar"
        text="Die angegebene Kundenadresse ist ungültig oder konnte nicht geladen werden."
        action={<a class="font-bold text-slate-950 underline" href="/customers/verwaltung">Zur Kundenliste</a>}
      />
    </section>
  )
}
