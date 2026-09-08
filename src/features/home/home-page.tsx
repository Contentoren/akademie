import { mdiAccountCheckOutline } from "@adaptive-ds/mdi/mdiAccountCheckOutline.js"
import { mdiArrowRight } from "@adaptive-ds/mdi/mdiArrowRight.js"
import { mdiDatabaseOutline } from "@adaptive-ds/mdi/mdiDatabaseOutline.js"
import { mdiFileDocumentOutline } from "@adaptive-ds/mdi/mdiFileDocumentOutline.js"
import { mdiFormatListChecks } from "@adaptive-ds/mdi/mdiFormatListChecks.js"
import { mdiShieldCheckOutline } from "@adaptive-ds/mdi/mdiShieldCheckOutline.js"
import { Icon } from "#src/components/Icon"
import type { JSX } from "solid-js"

import { api } from "#convex/_generated/api.js"
import { Card } from "#src/components/ui"
import { useAuthToken } from "#src/lib/convex-client"
import { useQuery } from "convex-solidjs"

export function HomePage() {
  const token = useAuthToken()
  const overview = useQuery(api.dashboard.overview, () => ({ token: token() }), () => ({ enabled: token().length > 0 }))

  return (
    <div class="overflow-hidden">
      <section class="app-grid relative">
        <div class="section-shell grid gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
          <div>
            <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-bold text-cyan-800 shadow-sm backdrop-blur">
              <Icon path={mdiDatabaseOutline} class="size-4" />
              Convex ist die einzige Persistenz
            </div>
            <h1 class="max-w-4xl text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
              Kundenfortschritt über Profile und Textdateien sichtbar machen.
            </h1>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Diese App speichert Kundenprofile, freie Textdateien und Fortschrittspunkte in Convex. So können Kundendaten geladen, gepflegt und als Fortschritt angezeigt werden.
            </p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <a class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/20 transition hover:bg-blue-950" href="/customers">
                Zum Lernbereich
                <Icon path={mdiArrowRight} class="size-4" />
              </a>
              <a class="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-bold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50" href="/customers/verwaltung">
                Verwaltung öffnen
              </a>
            </div>
          </div>

          <Card class="relative rounded-[2.5rem] p-6">
            <div class="mb-6 flex items-center justify-between">
              <div>
                <p class="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Arbeitsstand</p>
                <h2 class="mt-2 text-2xl font-black text-slate-950">Aktuelle Convex-Daten</h2>
              </div>
              <span class="flex size-14 items-center justify-center rounded-3xl bg-slate-950 text-white">
                <Icon path={mdiShieldCheckOutline} class="size-6" />
              </span>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <HeroMetric icon={<Icon path={mdiAccountCheckOutline} class="size-5" />} label="Kunden" value={overview.data()?.customerCount ?? 0} />
              <HeroMetric icon={<Icon path={mdiFileDocumentOutline} class="size-5" />} label="Textdateien" value={overview.data()?.textFileCount ?? 0} />
              <HeroMetric icon={<Icon path={mdiFormatListChecks} class="size-5" />} label="Fortschritte" value={overview.data()?.progressCount ?? 0} />
              <HeroMetric icon={<Icon path={mdiShieldCheckOutline} class="size-5" />} label="Erledigt" value={overview.data()?.doneProgress ?? 0} />
            </div>
          </Card>
        </div>
      </section>

      <section class="section-shell py-16">
        <div class="grid gap-4 md:grid-cols-3">
          {[
            { icon: mdiAccountCheckOutline, title: "Profile", text: "Strukturierte Kundendaten wie Name, E-Mail, Firma und Profilnotizen." },
            { icon: mdiFileDocumentOutline, title: "Textdateien", text: "Freie Textinhalte für Tests, Notizen, Profilinformationen oder Fortschrittsdokumentation." },
            { icon: mdiFormatListChecks, title: "Fortschritt", text: "Statuspunkte zeigen, was offen, in Arbeit oder erledigt ist." },
          ].map((item) => (
            <Card>
              <span class="mb-5 flex size-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <Icon path={item.icon} class="size-6" />
              </span>
              <h3 class="text-xl font-black text-slate-950">{item.title}</h3>
              <p class="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

function HeroMetric(props: { icon: JSX.Element; label: string; value: number }) {
  return (
    <div class="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div class="mb-3 text-cyan-700">{props.icon}</div>
      <strong class="text-3xl font-black text-slate-950">{props.value}</strong>
      <span class="block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{props.label}</span>
    </div>
  )
}
