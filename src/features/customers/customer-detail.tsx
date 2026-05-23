import { convexQuery } from "@convex-dev/react-query"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMutation } from "convex/react"
import { ArrowLeft, FileText, ListChecks, Save, Trash2, UserRoundCheck } from "lucide-react"
import { useState } from "react"

import { api } from "@convex/_generated/api"
import type { Id } from "@convex/_generated/dataModel"
import { Button, Card, EmptyState, Field } from "@/components/ui"
import { calculateProgressPercent, nextProgressStatus, progressStatusLabels, type ProgressStatus } from "@/lib/progress"
import type { TextFileKind } from "./types"

const fileKindLabels: Record<TextFileKind, string> = {
  profile: "Profil",
  progress: "Fortschritt",
  note: "Notiz",
  test: "Testdatei",
}

export function CustomerDetailPage({ customerId }: { customerId: string }) {
  const id = customerId as Id<"customers">
  const { data: customer } = useSuspenseQuery(convexQuery(api.customers.get, { customerId: id }))
  const { data: textFiles } = useSuspenseQuery(convexQuery(api.textFiles.listByCustomer, { customerId: id }))
  const { data: progress } = useSuspenseQuery(convexQuery(api.progress.listByCustomer, { customerId: id }))
  const updateCustomer = useMutation(api.customers.update)
  const removeCustomer = useMutation(api.customers.remove)
  const createTextFile = useMutation(api.textFiles.create)
  const createProgress = useMutation(api.progress.create)
  const updateProgressStatus = useMutation(api.progress.updateStatus)
  const removeProgress = useMutation(api.progress.remove)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isCreatingFile, setIsCreatingFile] = useState(false)
  const [isCreatingProgress, setIsCreatingProgress] = useState(false)

  if (customer === null) {
    return (
      <section className="section-shell py-10 sm:py-14">
        <EmptyState title="Kunde nicht gefunden" text="Das Kundenprofil existiert nicht oder wurde gelöscht." action={<a className="font-bold text-slate-950 underline" href="/customers">Zur Kundenliste</a>} />
      </section>
    )
  }

  const loadedCustomer = customer

  async function handleProfileSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const company = String(formData.get("company") ?? "").trim()
    const notes = String(formData.get("notes") ?? "").trim()

    if (!name || !email) {
      return
    }

    setIsSavingProfile(true)
    try {
      await updateCustomer({ customerId: id, name, email, company: company || undefined, notes: notes || undefined })
    } finally {
      setIsSavingProfile(false)
    }
  }

  async function handleDeleteCustomer() {
    if (!window.confirm("Kundenprofil inklusive Textdateien und Fortschritt löschen?")) {
      return
    }

    await removeCustomer({ customerId: id })
    window.location.href = "/customers"
  }

  async function handleCreateFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const title = String(formData.get("title") ?? "").trim()
    const kind = String(formData.get("kind") ?? "note") as TextFileKind

    if (!title) {
      return
    }

    setIsCreatingFile(true)
    try {
      const fileId = await createTextFile({
        customerId: id,
        title,
        kind,
        content: kind === "profile" ? `# Profil\n\nKunde: ${loadedCustomer.name}\nFirma: ${loadedCustomer.company ?? ""}\n` : "",
      })
      form.reset()
      window.location.href = `/customers/${id}/files/${fileId}`
    } finally {
      setIsCreatingFile(false)
    }
  }

  async function handleCreateProgress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const label = String(formData.get("label") ?? "").trim()
    const sourceTextFileId = String(formData.get("sourceTextFileId") ?? "") as Id<"textFiles">

    if (!label) {
      return
    }

    setIsCreatingProgress(true)
    try {
      await createProgress({
        customerId: id,
        label,
        status: "open",
        sourceTextFileId: sourceTextFileId || undefined,
      })
      form.reset()
    } finally {
      setIsCreatingProgress(false)
    }
  }

  const progressPercent = calculateProgressPercent(progress)

  return (
    <section className="section-shell py-10 sm:py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <a className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-slate-950" href="/customers">
          <ArrowLeft className="size-4" />
          Zur Kundenliste
        </a>
        <Button onClick={handleDeleteCustomer} type="button" variant="danger">
          <Trash2 className="mr-2 size-4" />
          Kunde löschen
        </Button>
      </div>

      <div className="mb-8 rounded-[2.5rem] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/20 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Kundenprofil</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{loadedCustomer.name}</h1>
            <p className="mt-4 max-w-3xl leading-7 text-slate-300">
              {loadedCustomer.company ? `${loadedCustomer.company} · ` : ""}{loadedCustomer.email}
            </p>
          </div>
          <div className="rounded-[2rem] bg-white/10 p-5 text-center ring-1 ring-white/10">
            <strong className="text-4xl font-black">{progressPercent}%</strong>
            <span className="block text-sm text-slate-300">Fortschritt</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.38fr_0.62fr]">
        <div className="space-y-6">
          <Card>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <UserRoundCheck className="size-5" />
              </span>
              <h2 className="text-2xl font-black text-slate-950">Profil</h2>
            </div>
            <form className="space-y-4" onSubmit={handleProfileSubmit}>
              <Field label="Name">
                <input className="input-field" defaultValue={loadedCustomer.name} name="name" required />
              </Field>
              <Field label="E-Mail">
                <input className="input-field" defaultValue={loadedCustomer.email} name="email" required type="email" />
              </Field>
              <Field label="Firma">
                <input className="input-field" defaultValue={loadedCustomer.company ?? ""} name="company" />
              </Field>
              <Field label="Profilnotizen">
                <textarea className="input-field min-h-32" defaultValue={loadedCustomer.notes ?? ""} name="notes" />
              </Field>
              <Button disabled={isSavingProfile} type="submit">
                <Save className="mr-2 size-4" />
                Profil speichern
              </Button>
            </form>
          </Card>

          <Card>
            <h2 className="mb-5 text-2xl font-black text-slate-950">Neue Textdatei</h2>
            <form className="space-y-4" onSubmit={handleCreateFile}>
              <Field label="Titel">
                <input className="input-field" name="title" placeholder="Onboarding Notizen" required />
              </Field>
              <Field label="Typ">
                <select className="input-field" name="kind" defaultValue="note">
                  {Object.entries(fileKindLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </Field>
              <Button disabled={isCreatingFile} type="submit">Textdatei anlegen</Button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700"><FileText className="size-5" /></span>
                <h2 className="text-2xl font-black text-slate-950">Textdateien</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">{textFiles.length}</span>
            </div>
            {textFiles.length === 0 ? (
              <EmptyState title="Keine Textdateien" text="Lege Profil-, Fortschritts- oder Testnotizen als Textdatei an." />
            ) : (
              <div className="space-y-3">
                {textFiles.map((file) => (
                  <a className="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-200 hover:bg-cyan-50/40" href={`/customers/${id}/files/${file._id}`} key={file._id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-black text-slate-950">{file.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{fileKindLabels[file.kind]} · {file.content.length} Zeichen</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">Öffnen</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700"><ListChecks className="size-5" /></span>
              <h2 className="text-2xl font-black text-slate-950">Fortschritt</h2>
            </div>
            <form className="mb-5 grid gap-3 md:grid-cols-[1fr_0.7fr_auto] md:items-end" onSubmit={handleCreateProgress}>
              <Field label="Fortschrittspunkt">
                <input className="input-field" name="label" placeholder="Profil geprüft" required />
              </Field>
              <Field label="Quelle">
                <select className="input-field" name="sourceTextFileId" defaultValue="">
                  <option value="">Keine Textdatei</option>
                  {textFiles.map((file) => (
                    <option key={file._id} value={file._id}>{file.title}</option>
                  ))}
                </select>
              </Field>
              <Button disabled={isCreatingProgress} type="submit">Hinzufügen</Button>
            </form>

            {progress.length === 0 ? (
              <EmptyState title="Noch kein Fortschritt" text="Erstelle Fortschrittspunkte, damit Kunden ihren Stand sehen können." />
            ) : (
              <div className="space-y-3">
                {progress.map((item) => (
                  <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between" key={item._id}>
                    <div>
                      <h3 className="font-black text-slate-950">{item.label}</h3>
                      <p className="mt-1 text-sm text-slate-500">{progressStatusLabels[item.status]}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => updateProgressStatus({ progressId: item._id, status: nextProgressStatus(item.status as ProgressStatus) })} type="button" variant="secondary">
                        Status wechseln
                      </Button>
                      <Button onClick={() => removeProgress({ progressId: item._id })} type="button" variant="ghost">
                        Entfernen
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
