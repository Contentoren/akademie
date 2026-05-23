import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext } from "@tanstack/react-router"

import { AppShell } from "@/components/app-shell"
import "@/tailwind.css"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kundenfortschritt | TanStack Start + Convex" },
      {
        name: "description",
        content: "Kundenprofile, Textdateien und Fortschritt mit TanStack Start und Convex.",
      },
    ],
  }),
  component: AppShell,
  notFoundComponent: () => (
    <section className="section-shell flex min-h-[60vh] items-center justify-center py-16 text-center">
      <div className="max-w-xl rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-950/[0.06] ring-1 ring-slate-100">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-700">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">Seite nicht gefunden</h1>
        <p className="mt-4 text-slate-600">Diese Kundenfortschritt-Seite existiert nicht.</p>
        <a className="mt-7 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white" href="/customers">Zur Kundenliste</a>
      </div>
    </section>
  ),
})
