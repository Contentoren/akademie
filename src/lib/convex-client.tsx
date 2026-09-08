import { ConvexProvider, setupConvex } from "convex-solidjs"
import { ConvexHttpClient } from "convex/browser"
import { createContext, Show, useContext, type JSX } from "solid-js"

import { convexClientStateCreate } from "./convexClientStateCreate"

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined

type ConvexClientState = ReturnType<typeof convexClientStateCreate>
type AuthActions = ConvexClientState["actions"]
type AuthState = ConvexClientState["authState"]

const AuthActionsContext = createContext<AuthActions>()
const AuthStateContext = createContext<AuthState>()

export function ConvexClientProvider(props: { children?: JSX.Element }) {
  if (!convexUrl) {
    return <MissingConvexSetup />
  }

  const client = setupConvex(convexUrl)
  const httpClient = new ConvexHttpClient(convexUrl)
  const state = convexClientStateCreate(httpClient)

  return (
    <ConvexProvider client={client}>
      <AuthStateContext.Provider value={state.authState}>
        <AuthActionsContext.Provider value={state.actions}>{props.children}</AuthActionsContext.Provider>
      </AuthStateContext.Provider>
    </ConvexProvider>
  )
}

export function useAuthActions() {
  const actions = useContext(AuthActionsContext)
  if (!actions) {
    throw new Error("useAuthActions must be used within ConvexClientProvider")
  }
  return actions
}

export function useAuthCallbackError() {
  const state = useAuthState()
  return state.callbackError
}

function useAuthState() {
  const state = useContext(AuthStateContext)
  if (!state) {
    throw new Error("Auth state must be used within ConvexClientProvider")
  }
  return state
}

export function useAuthToken() {
  const state = useAuthState()
  return () => state.session()?.token ?? ""
}

export function Authenticated(props: { children?: JSX.Element }) {
  const auth = useAuthState()
  return <Show when={!auth.isLoading() && auth.isAuthenticated()}>{props.children}</Show>
}

export function Unauthenticated(props: { children?: JSX.Element }) {
  const auth = useAuthState()
  return <Show when={!auth.isLoading() && !auth.isAuthenticated()}>{props.children}</Show>
}

export function AuthLoading(props: { children?: JSX.Element }) {
  const auth = useAuthState()
  return <Show when={auth.isLoading()}>{props.children}</Show>
}

function MissingConvexSetup() {
  return (
    <main class="section-shell flex min-h-[calc(100vh-9rem)] items-center justify-center py-16">
      <div class="max-w-2xl rounded-[2rem] border border-amber-200 bg-amber-50 p-8 text-amber-950 shadow-xl shadow-amber-950/5">
        <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-700">Convex fehlt</p>
        <h1 class="mt-3 text-3xl font-black tracking-tight">Convex ist noch nicht verbunden.</h1>
        <p class="mt-4 leading-7">
          Starte lokal `bun run convex:dev` und übernimm die erzeugten Werte in `.env`. Benötigt wird vor allem `VITE_CONVEX_URL`.
        </p>
        <div class="mt-5 rounded-2xl bg-white/70 p-4 font-mono text-sm text-amber-900 ring-1 ring-amber-200">
          CONVEX_DEPLOYMENT=...<br />
          VITE_CONVEX_URL=https://...convex.cloud
        </div>
      </div>
    </main>
  )
}
