import { useAuthActions } from "@convex-dev/auth/react"
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react"
import { BookText, UserRoundCheck } from "lucide-react"
import { HeadContent, Outlet, Scripts } from "@tanstack/react-router"
import { useState } from "react"

import { SignInPage } from "@/features/auth/sign-in-page"

export function AppShell() {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
            <div className="section-shell flex items-center justify-between py-3">
              <a className="flex items-center gap-3" href="/">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
                  <BookText className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-black uppercase tracking-[0.26em] text-slate-950">Kundenfortschritt</span>
                  <span className="hidden text-xs text-slate-500 sm:block">TanStack Start + Convex</span>
                </span>
              </a>

              <nav className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <Authenticated>
                  <a className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950" href="/customers">
                    Kunden
                  </a>
                  <a className="hidden items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800 sm:flex" href="/customers">
                    <UserRoundCheck className="size-4" />
                    Öffnen
                  </a>
                  <SignOutButton />
                </Authenticated>
              </nav>
            </div>
          </header>

          <main className="flex-1">
            <AuthLoading>
              <AuthLoadingScreen />
            </AuthLoading>
            <Unauthenticated>
              <SignInPage />
            </Unauthenticated>
            <Authenticated>
              <Outlet />
            </Authenticated>
          </main>

          <footer className="border-t border-white/70 bg-white/70 py-8 backdrop-blur">
            <div className="section-shell flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Kundenfortschritt. Profile, Textdateien und Fortschritt in Convex.</p>
              <p className="font-semibold text-slate-700">Nur Convex Persistenz.</p>
            </div>
          </footer>
        </div>
        <Scripts />
      </body>
    </html>
  )
}

function SignOutButton() {
  const { signOut } = useAuthActions()
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)
    try {
      await signOut()
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <button className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950" disabled={isSigningOut} onClick={handleSignOut} type="button">
      {isSigningOut ? "..." : "Abmelden"}
    </button>
  )
}

function AuthLoadingScreen() {
  return (
    <section className="section-shell flex min-h-[calc(100vh-14rem)] items-center justify-center py-16 text-center">
      <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-950/[0.06] ring-1 ring-slate-100">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-700">Auth</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Anmeldung wird geprüft...</h1>
      </div>
    </section>
  )
}
