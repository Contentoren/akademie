import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/solid-router"
import { Suspense, type JSX } from "solid-js"
import { HydrationScript } from "solid-js/web"

import { AppShell } from "#src/components/app-shell"
import { ConvexClientProvider } from "#src/lib/convex-client"
import "#src/tailwind.css"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "KI-Akademie | Lernbereich" },
      {
        name: "description",
        content: "Lernbereich für KI-Schulungen: Kurse, Module und Lektionen im Überblick.",
      },
    ],
  }),
  component: RootOutlet,
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <section class="learn-shell flex min-h-[60vh] items-center justify-center py-16 text-center">
      <div class="learn-card max-w-xl p-8">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">404</p>
        <h1 class="learn-serif mt-3 text-3xl font-semibold text-[#16211f]">Seite nicht gefunden</h1>
        <p class="mt-3 text-sm leading-relaxed text-[#5a6462]">Diese Seite existiert nicht.</p>
        <a class="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#0f6f66] px-6 text-sm font-semibold text-white transition hover:bg-[#0c5a53]" href="/customers">
          Zur Lernübersicht
        </a>
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
