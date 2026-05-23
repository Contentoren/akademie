import { convexQuery } from "@convex-dev/react-query"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMutation } from "convex/react"
import { ArrowLeft, FileText, Save, Trash2 } from "lucide-react"
import { useState } from "react"

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
  const { data: result } = useSuspenseQuery(convexQuery(api.textFiles.get, { fileId: id }))
  const updateTextFile = useMutation(api.textFiles.update)
  const removeTextFile = useMutation(api.textFiles.remove)
  const [isSaving, setIsSaving] = useState(false)

  if (result === null || result.customer === null) {
    return (
      <section className="section-shell py-10 sm:py-14">
        <EmptyState title="Textdatei nicht gefunden" text="Die Textdatei existiert nicht oder wurde gelöscht." action={<a className="font-bold text-slate-950 underline" href="/customers">Zur Kundenliste</a>} />
      </section>
    )
  }

  const { customer, file } = result

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = String(formData.get("title") ?? "").trim()
    const kind = String(formData.get("kind") ?? "note") as TextFileKind
    const content = String(formData.get("content") ?? "")

    if (!title) {
      return
    }

    setIsSaving(true)
    try {
      await updateTextFile({ fileId: id, title, kind, content })
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm("Textdatei löschen? Verknüpfte Fortschrittspunkte bleiben erhalten, verlieren aber die Quellenverknüpfung.")) {
      return
    }

    await removeTextFile({ fileId: id })
    window.location.href = `/customers/${customer._id}`
  }

  return (
    <section className="section-shell py-10 sm:py-14">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <a className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-slate-950" href={`/customers/${customer._id}`}>
          <ArrowLeft className="size-4" />
          Zurück zu {customer.name}
        </a>
        <Button onClick={handleDelete} type="button" variant="danger">
          <Trash2 className="mr-2 size-4" />
          Textdatei löschen
        </Button>
      </div>

      <div className="mb-8 rounded-[2.5rem] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/20 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">Textdatei</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">{file.title}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-300">{customer.name} · {fileKindLabels[file.kind]} · {file.content.length} Zeichen</p>
      </div>

      <Card>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
            <FileText className="size-5" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-slate-950">Editor</h2>
            <p className="text-sm text-slate-500">Freier Text für Kundenprofil, Fortschrittsnotizen oder Testdateien.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-[1fr_0.35fr]">
            <Field label="Titel">
              <input className="input-field" defaultValue={file.title} name="title" required />
            </Field>
            <Field label="Typ">
              <select className="input-field" defaultValue={file.kind} name="kind">
                {Object.entries(fileKindLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Inhalt">
            <textarea className="input-field min-h-[28rem] font-mono text-sm leading-7" defaultValue={file.content} name="content" placeholder="Textdatei-Inhalt..." />
          </Field>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled={isSaving} type="submit">
              <Save className="mr-2 size-4" />
              Speichern
            </Button>
            <span className="text-sm font-semibold text-slate-500">Änderungen werden direkt in Convex gespeichert.</span>
          </div>
        </form>
      </Card>
    </section>
  )
}
