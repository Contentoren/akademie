import { useMutation, useQuery } from "convex-solidjs"
import { mdiArrowLeft, mdiContentSaveOutline, mdiFileDocumentOutline, mdiTrashCanOutline } from "@mdi/js"
import { Icon } from "@/components/Icon"
import { createSignal, Show } from "solid-js"

import { api } from "@convex/_generated/api"
import type { Id } from "@convex/_generated/dataModel"
import { Button, Card, EmptyState, Field } from "@/components/ui"
import type { TextFileKind } from "./types"

const fileKindLabels: Record<TextFileKind, string> = {
  profile: "Profil",
  progress: "Fortschritt",
  note: "Notiz",
  test: "Testdatei",
}

export function TextFileEditorPage({ fileId }: { fileId: string }) {
  const id = fileId as Id<"textFiles">
  const result = useQuery(api.textFiles.get, { fileId: id })
  const updateTextFile = useMutation(api.textFiles.update)
  const removeTextFile = useMutation(api.textFiles.remove)
  const [isSaving, setIsSaving] = createSignal(false)
  const loadedResult = () => result.data()

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const title = String(formData.get("title") ?? "").trim()
    const kind = String(formData.get("kind") ?? "note") as TextFileKind
    const content = String(formData.get("content") ?? "")

    if (!title) {
      return
    }

    setIsSaving(true)
    try {
      await updateTextFile.mutate({ fileId: id, title, kind, content })
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm("Textdatei löschen? Verknüpfte Fortschrittspunkte bleiben erhalten, verlieren aber die Quellenverknüpfung.")) {
      return
    }

    await removeTextFile.mutate({ fileId: id })
    const customer = loadedResult()?.customer
    window.location.href = customer ? `/customers/${customer._id}` : "/customers"
  }

  return (
    <Show
      when={loadedResult()?.customer ? loadedResult() : null}
      fallback={
        loadedResult() === null || loadedResult()?.customer === null ? (
          <section class="section-shell py-10 sm:py-14">
            <EmptyState title="Textdatei nicht gefunden" text="Die Textdatei existiert nicht oder wurde gelöscht." action={<a class="font-bold text-slate-950 underline" href="/customers">Zur Kundenliste</a>} />
          </section>
        ) : null
      }
    >
      {(loaded) => (
        <section class="section-shell py-10 sm:py-14">
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
            <a class="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-slate-950" href={`/customers/${loaded().customer!._id}`}>
              <Icon path={mdiArrowLeft} class="size-4" />
              Zurück zu {loaded().customer!.name}
            </a>
            <Button onClick={handleDelete} type="button" variant="danger">
              <Icon path={mdiTrashCanOutline} class="mr-2 size-4" />
              Textdatei löschen
            </Button>
          </div>

          <div class="mb-8 rounded-[2.5rem] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/20 sm:p-10">
            <p class="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Textdatei</p>
            <h1 class="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{loaded().file.title}</h1>
            <p class="mt-4 max-w-3xl leading-7 text-slate-300">{loaded().customer!.name} · {fileKindLabels[loaded().file.kind]} · {loaded().file.content.length} Zeichen</p>
          </div>

          <Card>
            <div class="mb-6 flex items-center gap-3">
              <span class="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <Icon path={mdiFileDocumentOutline} class="size-5" />
              </span>
              <div>
                <h2 class="text-2xl font-black text-slate-950">Editor</h2>
                <p class="text-sm text-slate-500">Freier Text für Kundenprofil, Fortschrittsnotizen oder Testdateien.</p>
              </div>
            </div>

            <form class="space-y-4" onSubmit={handleSubmit}>
              <div class="grid gap-4 md:grid-cols-[1fr_0.35fr]">
                <Field label="Titel">
                  <input class="input-field" value={loaded().file.title} name="title" required />
                </Field>
                <Field label="Typ">
                  <select class="input-field" value={loaded().file.kind} name="kind">
                    {Object.entries(fileKindLabels).map(([value, label]) => (
                      <option value={value}>{label}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Inhalt">
                <textarea class="input-field min-h-[28rem] font-mono text-sm leading-7" value={loaded().file.content} name="content" placeholder="Textdatei-Inhalt..." />
              </Field>
              <div class="flex flex-wrap items-center gap-3">
                <Button disabled={isSaving()} type="submit">
                  <Icon path={mdiContentSaveOutline} class="mr-2 size-4" />
                  Speichern
                </Button>
                <span class="text-sm font-semibold text-slate-500">Änderungen werden direkt in Convex gespeichert.</span>
              </div>
            </form>
          </Card>
        </section>
      )}
    </Show>
  )
}
