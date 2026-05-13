import { Link, createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router"
import "../tailwind.css"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        title: "Akademie – Weiterbildung & Wissen",
      },
      {
        name: "description",
        content: "Akademie für Weiterbildung, Kurse und professionelle Entwicklung.",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: "#1a1a2e",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
        type: "image/x-icon",
        sizes: "any",
      },
      {
        rel: "preconnect",
        href: "https://assets.akademie.contentoren.de",
        crossOrigin: "anonymous",
      },
      {
        rel: "dns-prefetch",
        href: "https://assets.akademie.contentoren.de",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
})

function RootComponent() {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-6 text-[#1a1a2e]">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6c757d]">404</p>
        <h1 className="text-3xl font-semibold text-balance">Seite nicht gefunden</h1>
        <p className="text-sm leading-6 text-[#495057]">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full bg-[#1a1a2e] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Zur Startseite
        </Link>
      </div>
    </main>
  )
}
