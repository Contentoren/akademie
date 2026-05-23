import { convexQuery } from "@convex-dev/react-query"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ArrowRight, DatabaseZap, FileText, ListChecks, ShieldCheck, UserRoundCheck } from "lucide-react"

import { api } from "@convex/_generated/api"
import { Card } from "@/components/ui"

export function HomePage() {
  const { data: overview } = useSuspenseQuery(convexQuery(api.dashboard.overview, {}))

  return (
    <div className="overflow-hidden">
      <section className="app-grid relative">
        <div className="section-shell grid gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-sm font-bold text-cyan-800 shadow-sm backdrop-blur">
              <DatabaseZap className="size-4" />
              Convex ist die einzige Persistenz
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
              Kundenfortschritt über Profile und Textdateien sichtbar machen.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Diese App speichert Kundenprofile, freie Textdateien und Fortschrittspunkte in Convex. So können Kundendaten geladen, gepflegt und als Fortschritt angezeigt werden.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-slate-950/20 transition hover:bg-blue-950" href="/customers">
                Kunden öffnen
                <ArrowRight className="size-4" />
              </a>
              <a className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-bold text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-50" href="/customers">
                Profil anlegen
              </a>
            </div>
          </div>

          <Card className="relative rounded-[2.5rem] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Arbeitsstand</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">Aktuelle Convex-Daten</h2>
              </div>
              <span className="flex size-14 items-center justify-center rounded-3xl bg-slate-950 text-white">
                <ShieldCheck className="size-6" />
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <HeroMetric icon={<UserRoundCheck className="size-5" />} label="Kunden" value={overview?.customerCount ?? 0} />
              <HeroMetric icon={<FileText className="size-5" />} label="Textdateien" value={overview?.textFileCount ?? 0} />
              <HeroMetric icon={<ListChecks className="size-5" />} label="Fortschritte" value={overview?.progressCount ?? 0} />
              <HeroMetric icon={<ShieldCheck className="size-5" />} label="Erledigt" value={overview?.doneProgress ?? 0} />
            </div>
          </Card>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: UserRoundCheck, title: "Profile", text: "Strukturierte Kundendaten wie Name, E-Mail, Firma und Profilnotizen." },
            { icon: FileText, title: "Textdateien", text: "Freie Textinhalte für Tests, Notizen, Profilinformationen oder Fortschrittsdokumentation." },
            { icon: ListChecks, title: "Fortschritt", text: "Statuspunkte zeigen, was offen, in Arbeit oder erledigt ist." },
          ].map((item) => (
            <Card key={item.title}>
              <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <item.icon className="size-6" />
              </span>
              <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

function HeroMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
      <div className="mb-3 text-cyan-700">{icon}</div>
      <strong className="text-3xl font-black text-slate-950">{value}</strong>
      <span className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</span>
    </div>
  )
}
