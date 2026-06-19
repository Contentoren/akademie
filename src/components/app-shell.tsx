import { Outlet } from "@tanstack/solid-router"
import { mdiAccountCheckOutline, mdiBookOpenPageVariantOutline } from "@mdi/js"
import { Icon } from "@/components/Icon"
import { createSignal } from "solid-js"

import { SignInPage } from "@/features/auth/sign-in-page"
import { Authenticated, AuthLoading, Unauthenticated, useAuthActions } from "@/lib/convex-client"

export function AppShell() {
  return (
    <div class="flex min-h-screen flex-col">
      <header class="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div class="section-shell flex items-center justify-between py-3">
          <a class="flex items-center gap-3" href="/">
            <span class="flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
              <Icon path={mdiBookOpenPageVariantOutline} class="size-5" />
            </span>
            <span>
              <span class="block text-sm font-black uppercase tracking-[0.26em] text-slate-950">Kundenfortschritt</span>
              <span class="hidden text-xs text-slate-500 sm:block">TanStack Start + Convex</span>
            </span>
          </a>

          <nav class="flex items-center gap-2 text-sm font-bold text-slate-600">
            <Authenticated>
              <a class="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950" href="/customers">
                Kunden
              </a>
              <a class="hidden items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800 sm:flex" href="/customers">
                <Icon path={mdiAccountCheckOutline} class="size-4" />
                Öffnen
              </a>
              <SignOutButton />
            </Authenticated>
          </nav>
        </div>
      </header>

      <main class="flex-1">
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

      <footer class="border-t border-white/70 bg-white/70 py-8 backdrop-blur">
        <div class="section-shell flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kundenfortschritt. Profile, Textdateien und Fortschritt in Convex.</p>
          <p class="font-semibold text-slate-700">Nur Convex Persistenz.</p>
        </div>
      </footer>
    </div>
  )
}

function SignOutButton() {
  const { signOut } = useAuthActions()
  const [isSigningOut, setIsSigningOut] = createSignal(false)

  async function handleSignOut() {
    setIsSigningOut(true)
    try {
      await signOut()
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <button class="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950" disabled={isSigningOut()} onClick={handleSignOut} type="button">
      {isSigningOut() ? "..." : "Abmelden"}
    </button>
  )
}

function AuthLoadingScreen() {
  return (
    <section class="section-shell flex min-h-[calc(100vh-14rem)] items-center justify-center py-16 text-center">
      <div class="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-xl shadow-slate-950/[0.06] ring-1 ring-slate-100">
        <p class="text-sm font-bold uppercase tracking-[0.25em] text-cyan-700">Auth</p>
        <h1 class="mt-3 text-3xl font-black tracking-tight text-slate-950">Anmeldung wird geprüft...</h1>
      </div>
    </section>
  )
}
