import { useMutation, useQuery } from "convex-solidjs"
import { mdiAccountCircleOutline, mdiArrowRight, mdiFileDocumentOutline, mdiOfficeBuildingOutline, mdiPlus } from "@mdi/js"
import { Icon } from "#src/components/Icon"
import { createSignal } from "solid-js"

import { api } from "#convex/_generated/api.js"
import { Button, Card, EmptyState, Field } from "#src/components/ui"

export function CustomerListPage() {
  const customersQuery = useQuery(api.customers.list, {})
  const overview = useQuery(api.dashboard.overview, {})
  const createCustomer = useMutation(api.customers.create)
  const [isCreating, setIsCreating] = createSignal(false)
  const customers = () => customersQuery.data() ?? []

  async function handleCreate(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const company = String(formData.get("company") ?? "").trim()

    if (!name || !email) {
      return
    }

    setIsCreating(true)
    try {
      const customerId = await createCustomer.mutate({ name, email, company: company || undefined })
      window.location.href = `/customers/${customerId}`
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <section class="section-shell py-10 sm:py-14">
      <div class="mb-8 grid gap-6 lg:grid-cols-[1fr_0.42fr] lg:items-stretch">
        <div class="rounded-[2.5rem] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/20 sm:p-10">
          <p class="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Kundenprofile</p>
          <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Kunden, Textdateien und Fortschritt an einem Ort.</h1>
          <p class="mt-4 max-w-2xl leading-7 text-slate-300">
            Convex speichert nur strukturierte Kundenprofile, editierbare Textdateien und Fortschrittspunkte. Keine parallele Datenbank, keine Altlasten.
          </p>
        </div>
        <Card class="flex flex-col justify-center gap-4">
          <Metric label="Kunden" value={overview.data()?.customerCount ?? 0} />
          <Metric label="Textdateien" value={overview.data()?.textFileCount ?? 0} />
          <Metric label="Fortschrittspunkte" value={overview.data()?.progressCount ?? 0} />
        </Card>
      </div>

      <div class="grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
        <Card>
          <div class="mb-5 flex items-center gap-3">
            <span class="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
              <Icon path={mdiPlus} class="size-5" />
            </span>
            <div>
              <h2 class="text-2xl font-black text-slate-950">Neuer Kunde</h2>
              <p class="text-sm text-slate-500">Profil anlegen und danach Textdateien ergänzen.</p>
            </div>
          </div>
          <form class="space-y-4" onSubmit={handleCreate}>
            <Field label="Name">
              <input class="input-field" name="name" placeholder="Max Mustermann" required />
            </Field>
            <Field label="E-Mail">
              <input class="input-field" name="email" placeholder="max@example.com" required type="email" />
            </Field>
            <Field label="Firma">
              <input class="input-field" name="company" placeholder="Muster GmbH" />
            </Field>
            <Button class="w-full" disabled={isCreating()} type="submit">
              Kunde anlegen
            </Button>
          </form>
        </Card>

        <div>
          {customers().length === 0 ? (
            <EmptyState title="Noch keine Kunden" text="Lege den ersten Kunden an. Danach kannst du Profil, Textdateien und Fortschritt pflegen." />
          ) : (
            <div class="grid gap-4 md:grid-cols-2">
              {customers().map((customer) => (
                <a class="group rounded-[2rem] border border-white/70 bg-white/88 p-5 shadow-xl shadow-slate-950/[0.05] ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-2xl" href={`/customers/${customer._id}`}>
                  <div class="mb-5 flex items-start justify-between gap-4">
                    <span class="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
                      <Icon path={mdiAccountCircleOutline} class="size-5" />
                    </span>
                    <Icon path={mdiArrowRight} class="size-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-950" />
                  </div>
                  <h2 class="text-xl font-black text-slate-950">{customer.name}</h2>
                  <p class="mt-2 text-sm font-semibold text-slate-600">{customer.email}</p>
                  <div class="mt-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    {customer.company ? <span class="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Icon path={mdiOfficeBuildingOutline} class="size-3" />{customer.company}</span> : null}
                    <span class="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1 text-cyan-800"><Icon path={mdiFileDocumentOutline} class="size-3" />Profil</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div class="text-3xl font-black text-slate-950">{value}</div>
      <div class="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</div>
    </div>
  )
}
