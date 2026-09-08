import { Outlet, useRouterState } from "@tanstack/solid-router"
import { mdiBookOpenPageVariantOutline } from "@adaptive-ds/mdi/mdiBookOpenPageVariantOutline.js"
import { Icon } from "#src/components/Icon"
import { createSignal, Show } from "solid-js"

import { marketingPathIsPublic } from "#src/marketing/model/marketingPathIsPublic"
import { SignInPage } from "#src/marketing/sign-in-page"
import { Authenticated, AuthLoading, Unauthenticated, useAuthActions } from "#src/lib/convex-client"

export function AppShell() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <Show fallback={<Outlet />} when={!marketingPathIsPublic(pathname())}>
      <AppAuthenticatedShell />
    </Show>
  )
}

function AppAuthenticatedShell() {
  return (
    <div class="flex min-h-screen flex-col">
      <header class="sticky top-0 z-40 border-b border-[#e6e1d8] bg-[#f7f5f1]/90 backdrop-blur-xl">
        <div class="learn-shell flex items-center justify-between py-3">
          <a class="flex items-center gap-3" href="/customers">
            <span class="flex size-10 items-center justify-center rounded-xl bg-[#0f6f66] text-white">
              <Icon path={mdiBookOpenPageVariantOutline} class="size-5" />
            </span>
            <span>
              <span class="learn-serif block text-base font-semibold text-[#16211f]">KI-Akademie</span>
              <span class="hidden text-xs text-[#8c928f] sm:block">Ihr Lernbereich</span>
            </span>
          </a>

          <nav class="flex items-center gap-1 text-sm text-[#4b5654]">
            <a class="rounded-full px-4 py-2 transition hover:bg-[#efece5] hover:text-[#16211f]" href="/de">
              Website
            </a>
            <Authenticated>
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

      <footer class="mt-16 border-t border-[#e6e1d8] py-8">
        <div class="learn-shell flex flex-col gap-2 text-sm text-[#8c928f] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} KI-Akademie</p>
          <p>Demo-Umgebung mit Platzhalterinhalten.</p>
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
    <button class="rounded-full px-4 py-2 transition hover:bg-[#efece5] hover:text-[#16211f]" disabled={isSigningOut()} onClick={handleSignOut} type="button">
      {isSigningOut() ? "..." : "Abmelden"}
    </button>
  )
}

function AuthLoadingScreen() {
  return (
    <section class="learn-shell flex min-h-[calc(100vh-14rem)] items-center justify-center py-16 text-center">
      <p class="learn-serif text-xl text-[#5a6462]">Anmeldung wird geprüft …</p>
    </section>
  )
}
