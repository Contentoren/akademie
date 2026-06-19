import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/solid-router"
import { Suspense, type JSX } from "solid-js"
import { HydrationScript } from "solid-js/web"

import { AppShell } from "@/components/app-shell"
import { ConvexClientProvider } from "@/lib/convex-client"
import "@/tailwind.css"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kundenfortschritt | TanStack Start + Convex" },
      {
        name: "description",
        content: "Kundenprofile, Textdateien und Fortschritt mit TanStack Start und Convex.",
      },
    ],
  }),
  component: RootOutlet,
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <section class="section-shell flex min-h-[60vh] items-center justify-center py-16 text-center">
      <div class="max-w-xl rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-950/[0.06] ring-1 ring-slate-100">
        <p class="text-sm font-bold uppercase tracking-[0.25em] text-cyan-700">404</p>
        <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950">Seite nicht gefunden</h1>
        <p class="mt-4 text-slate-600">Diese Kundenfortschritt-Seite existiert nicht.</p>
        <a class="mt-7 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white" href="/customers">Zur Kundenliste</a>
      </div>
    </section>
  ),
})

function RootOutlet() {
  return <AppShell />
}

function RootDocument(props: { children?: JSX.Element }) {
  return (
    <html lang="de">
      <head>
        <meta charset="utf-8" />
        <HydrationScript />
        <HeadContent />
      </head>
      <body>
        <ConvexClientProvider>
          <Suspense>{props.children}</Suspense>
        </ConvexClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
