import { convexQuery } from "@convex-dev/react-query"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMutation } from "convex/react"
import { ArrowRight, Building2, FileText, Plus, UserRound } from "lucide-react"
import { useState } from "react"

import { api } from "@convex/_generated/api"
import { Button, Card, EmptyState, Field } from "@/components/ui"

export function CustomerListPage() {
  const { data: customers } = useSuspenseQuery(convexQuery(api.customers.list, {}))
  const { data: overview } = useSuspenseQuery(convexQuery(api.dashboard.overview, {}))
  const createCustomer = useMutation(api.customers.create)
  const [isCreating, setIsCreating] = useState(false)

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const company = String(formData.get("company") ?? "").trim()

    if (!name || !email) {
      return
    }

    setIsCreating(true)
    try {
      const customerId = await createCustomer({ name, email, company: company || undefined })
      window.location.href = `/customers/${customerId}`
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <section className="section-shell py-10 sm:py-14">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.42fr] lg:items-stretch">
        <div className="rounded-[2.5rem] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/20 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Kundenprofile</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Kunden, Textdateien und Fortschritt an einem Ort.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Convex speichert nur strukturierte Kundenprofile, editierbare Textdateien und Fortschrittspunkte. Keine parallele Datenbank, keine Altlasten.
          </p>
        </div>
        <Card className="flex flex-col justify-center gap-4">
          <Metric label="Kunden" value={overview?.customerCount ?? 0} />
          <Metric label="Textdateien" value={overview?.textFileCount ?? 0} />
          <Metric label="Fortschrittspunkte" value={overview?.progressCount ?? 0} />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
        <Card>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
              <Plus className="size-5" />
            </span>
            <div>
              <h2 className="text-2xl font-black text-slate-950">Neuer Kunde</h2>
              <p className="text-sm text-slate-500">Profil anlegen und danach Textdateien ergänzen.</p>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleCreate}>
            <Field label="Name">
              <input className="input-field" name="name" placeholder="Max Mustermann" required />
            </Field>
            <Field label="E-Mail">
              <input className="input-field" name="email" placeholder="max@example.com" required type="email" />
            </Field>
            <Field label="Firma">
              <input className="input-field" name="company" placeholder="Muster GmbH" />
            </Field>
            <Button className="w-full" disabled={isCreating} type="submit">
              Kunde anlegen
            </Button>
          </form>
        </Card>

        <div>
          {customers.length === 0 ? (
            <EmptyState title="Noch keine Kunden" text="Lege den ersten Kunden an. Danach kannst du Profil, Textdateien und Fortschritt pflegen." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {customers.map((customer) => (
                <a className="group rounded-[2rem] border border-white/70 bg-white/88 p-5 shadow-xl shadow-slate-950/[0.05] ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-2xl" href={`/customers/${customer._id}`} key={customer._id}>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
                      <UserRound className="size-5" />
                    </span>
                    <ArrowRight className="size-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-slate-950" />
                  </div>
                  <h2 className="text-xl font-black text-slate-950">{customer.name}</h2>
                  <p className="mt-2 text-sm font-semibold text-slate-600">{customer.email}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    {customer.company ? <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Building2 className="size-3" />{customer.company}</span> : null}
                    <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1 text-cyan-800"><FileText className="size-3" />Profil</span>
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
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div className="text-3xl font-black text-slate-950">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</div>
    </div>
  )
}
