import { useMutation, useQuery } from "convex-solidjs"
import { mdiAccountCheckOutline, mdiArrowLeft, mdiContentSaveOutline, mdiFileDocumentOutline, mdiFormatListChecks, mdiTrashCanOutline } from "@mdi/js"
import { Icon } from "@/components/Icon"
import { createSignal, Show } from "solid-js"

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
  const customer = useQuery(api.customers.get, { customerId: id })
  const textFilesQuery = useQuery(api.textFiles.listByCustomer, { customerId: id })
  const progressQuery = useQuery(api.progress.listByCustomer, { customerId: id })
  const updateCustomer = useMutation(api.customers.update)
  const removeCustomer = useMutation(api.customers.remove)
  const createTextFile = useMutation(api.textFiles.create)
  const createProgress = useMutation(api.progress.create)
  const updateProgressStatus = useMutation(api.progress.updateStatus)
  const removeProgress = useMutation(api.progress.remove)
  const [isSavingProfile, setIsSavingProfile] = createSignal(false)
  const [isCreatingFile, setIsCreatingFile] = createSignal(false)
  const [isCreatingProgress, setIsCreatingProgress] = createSignal(false)
  const textFiles = () => textFilesQuery.data() ?? []
  const progress = () => progressQuery.data() ?? []
  const loadedCustomer = () => customer.data()

  async function handleProfileSubmit(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const company = String(formData.get("company") ?? "").trim()
    const notes = String(formData.get("notes") ?? "").trim()

    if (!name || !email) {
      return
    }

    setIsSavingProfile(true)
    try {
      await updateCustomer.mutate({ customerId: id, name, email, company: company || undefined, notes: notes || undefined })
    } finally {
      setIsSavingProfile(false)
    }
  }

  async function handleDeleteCustomer() {
    if (!window.confirm("Kundenprofil inklusive Textdateien und Fortschritt löschen?")) {
      return
    }

    await removeCustomer.mutate({ customerId: id })
    window.location.href = "/customers"
  }

  async function handleCreateFile(event: SubmitEvent) {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const title = String(formData.get("title") ?? "").trim()
    const kind = String(formData.get("kind") ?? "note") as TextFileKind

    if (!title) {
      return
    }

    setIsCreatingFile(true)
    try {
      const fileId = await createTextFile.mutate({
        customerId: id,
        title,
        kind,
        content: kind === "profile" ? `# Profil\n\nKunde: ${loadedCustomer()?.name ?? ""}\nFirma: ${loadedCustomer()?.company ?? ""}\n` : "",
      })
      form.reset()
      window.location.href = `/customers/${id}/files/${fileId}`
    } finally {
      setIsCreatingFile(false)
    }
  }

  async function handleCreateProgress(event: SubmitEvent) {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const label = String(formData.get("label") ?? "").trim()
    const sourceTextFileId = String(formData.get("sourceTextFileId") ?? "") as Id<"textFiles">

    if (!label) {
      return
    }

    setIsCreatingProgress(true)
    try {
      await createProgress.mutate({
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

  const progressPercent = () => calculateProgressPercent(progress())

  return (
    <Show
      when={loadedCustomer()}
      fallback={
        customer.data() === null ? (
          <section class="section-shell py-10 sm:py-14">
            <EmptyState title="Kunde nicht gefunden" text="Das Kundenprofil existiert nicht oder wurde gelöscht." action={<a class="font-bold text-slate-950 underline" href="/customers">Zur Kundenliste</a>} />
          </section>
        ) : null
      }
    >
      {(loaded) => (
    <section class="section-shell py-10 sm:py-14">
      <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
        <a class="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-slate-950" href="/customers">
          <Icon path={mdiArrowLeft} class="size-4" />
          Zur Kundenliste
        </a>
        <Button onClick={handleDeleteCustomer} type="button" variant="danger">
          <Icon path={mdiTrashCanOutline} class="mr-2 size-4" />
          Kunde löschen
        </Button>
      </div>

      <div class="mb-8 rounded-[2.5rem] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/20 sm:p-10">
        <div class="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p class="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Kundenprofil</p>
            <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{loaded().name}</h1>
            <p class="mt-4 max-w-3xl leading-7 text-slate-300">
              {loaded().company ? `${loaded().company} · ` : ""}{loaded().email}
            </p>
          </div>
          <div class="rounded-[2rem] bg-white/10 p-5 text-center ring-1 ring-white/10">
            <strong class="text-4xl font-black">{progressPercent()}%</strong>
            <span class="block text-sm text-slate-300">Fortschritt</span>
          </div>
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-[0.38fr_0.62fr]">
        <div class="space-y-6">
          <Card>
            <div class="mb-5 flex items-center gap-3">
              <span class="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <Icon path={mdiAccountCheckOutline} class="size-5" />
              </span>
              <h2 class="text-2xl font-black text-slate-950">Profil</h2>
            </div>
            <form class="space-y-4" onSubmit={handleProfileSubmit}>
              <Field label="Name">
                <input class="input-field" value={loaded().name} name="name" required />
              </Field>
              <Field label="E-Mail">
                <input class="input-field" value={loaded().email} name="email" required type="email" />
              </Field>
              <Field label="Firma">
                <input class="input-field" value={loaded().company ?? ""} name="company" />
              </Field>
              <Field label="Profilnotizen">
                <textarea class="input-field min-h-32" value={loaded().notes ?? ""} name="notes" />
              </Field>
              <Button disabled={isSavingProfile()} type="submit">
                <Icon path={mdiContentSaveOutline} class="mr-2 size-4" />
                Profil speichern
              </Button>
            </form>
          </Card>

          <Card>
            <h2 class="mb-5 text-2xl font-black text-slate-950">Neue Textdatei</h2>
            <form class="space-y-4" onSubmit={handleCreateFile}>
              <Field label="Titel">
                <input class="input-field" name="title" placeholder="Onboarding Notizen" required />
              </Field>
              <Field label="Typ">
                <select class="input-field" name="kind" value="note">
                  {Object.entries(fileKindLabels).map(([value, label]) => (
                    <option value={value}>{label}</option>
                  ))}
                </select>
              </Field>
              <Button disabled={isCreatingFile()} type="submit">Textdatei anlegen</Button>
            </form>
          </Card>
        </div>

        <div class="space-y-6">
          <Card>
            <div class="mb-5 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700"><Icon path={mdiFileDocumentOutline} class="size-5" /></span>
                <h2 class="text-2xl font-black text-slate-950">Textdateien</h2>
              </div>
              <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">{textFiles().length}</span>
            </div>
            {textFiles().length === 0 ? (
              <EmptyState title="Keine Textdateien" text="Lege Profil-, Fortschritts- oder Testnotizen als Textdatei an." />
            ) : (
              <div class="space-y-3">
                {textFiles().map((file) => (
                  <a class="block rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-200 hover:bg-cyan-50/40" href={`/customers/${id}/files/${file._id}`}>
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <h3 class="font-black text-slate-950">{file.title}</h3>
                        <p class="mt-1 text-sm text-slate-500">{fileKindLabels[file.kind]} · {file.content.length} Zeichen</p>
                      </div>
                      <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">Öffnen</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <div class="mb-5 flex items-center gap-3">
              <span class="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700"><Icon path={mdiFormatListChecks} class="size-5" /></span>
              <h2 class="text-2xl font-black text-slate-950">Fortschritt</h2>
            </div>
            <form class="mb-5 grid gap-3 md:grid-cols-[1fr_0.7fr_auto] md:items-end" onSubmit={handleCreateProgress}>
              <Field label="Fortschrittspunkt">
                <input class="input-field" name="label" placeholder="Profil geprüft" required />
              </Field>
              <Field label="Quelle">
                <select class="input-field" name="sourceTextFileId" value="">
                  <option value="">Keine Textdatei</option>
                  {textFiles().map((file) => (
                    <option value={file._id}>{file.title}</option>
                  ))}
                </select>
              </Field>
              <Button disabled={isCreatingProgress()} type="submit">Hinzufügen</Button>
            </form>

            {progress().length === 0 ? (
              <EmptyState title="Noch kein Fortschritt" text="Erstelle Fortschrittspunkte, damit Kunden ihren Stand sehen können." />
            ) : (
              <div class="space-y-3">
                {progress().map((item) => (
                  <div class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 class="font-black text-slate-950">{item.label}</h3>
                      <p class="mt-1 text-sm text-slate-500">{progressStatusLabels[item.status]}</p>
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <Button onClick={() => updateProgressStatus.mutate({ progressId: item._id, status: nextProgressStatus(item.status as ProgressStatus) })} type="button" variant="secondary">
                        Status wechseln
                      </Button>
                      <Button onClick={() => removeProgress.mutate({ progressId: item._id })} type="button" variant="ghost">
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
      )}
    </Show>
  )
}
