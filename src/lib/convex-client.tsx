import { ConvexProvider, setupConvex } from "convex-solidjs"
import { ConvexHttpClient } from "convex/browser"
import type { Value } from "convex/values"
import { createContext, createSignal, onMount, Show, useContext, type JSX } from "solid-js"

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined
const JWT_STORAGE_KEY = "__convexAuthJWT"
const REFRESH_TOKEN_STORAGE_KEY = "__convexAuthRefreshToken"

type AuthActions = {
  signIn: (provider: string, params?: FormData | Record<string, Value>) => Promise<{ signingIn: boolean; redirect?: URL }>
  signOut: () => Promise<void>
}

type AuthState = {
  isAuthenticated: () => boolean
  isLoading: () => boolean
}

const AuthActionsContext = createContext<AuthActions>()
const AuthStateContext = createContext<AuthState>()

export function ConvexClientProvider(props: { children?: JSX.Element }) {
  if (!convexUrl) {
    return <MissingConvexSetup />
  }

  const client = setupConvex(convexUrl)
  const httpClient = new ConvexHttpClient(convexUrl)
  const storageNamespace = convexUrl.replace(/[^a-zA-Z0-9]/g, "")
  const storageKey = (key: string) => `${key}_${storageNamespace}`
  const [token, setTokenState] = createSignal<string | null>(null)
  const [isLoading, setIsLoading] = createSignal(true)

  const setToken = async (tokens: { token: string; refreshToken?: string } | null, shouldStore: boolean) => {
    setTokenState(tokens?.token ?? null)
    if (tokens?.token) {
      client.setAuth(async ({ forceRefreshToken }) => {
        if (!forceRefreshToken) {
          return token()
        }

        const refreshToken = localStorage.getItem(storageKey(REFRESH_TOKEN_STORAGE_KEY))
        if (!refreshToken) {
          return null
        }

        const result = await httpClient.action("auth:signIn" as never, { refreshToken } as never)
        const refreshedTokens = (result as { tokens?: { token: string; refreshToken: string } | null }).tokens ?? null
        await setToken(refreshedTokens, true)
        return refreshedTokens?.token ?? null
      })
    }

    if (shouldStore) {
      if (tokens?.token) {
        localStorage.setItem(storageKey(JWT_STORAGE_KEY), tokens.token)
        if (tokens.refreshToken) {
          localStorage.setItem(storageKey(REFRESH_TOKEN_STORAGE_KEY), tokens.refreshToken)
        }
      } else {
        localStorage.removeItem(storageKey(JWT_STORAGE_KEY))
        localStorage.removeItem(storageKey(REFRESH_TOKEN_STORAGE_KEY))
      }
    }
    setIsLoading(false)
  }

  const actions: AuthActions = {
    async signIn(provider, args) {
      const params = args instanceof FormData ? Object.fromEntries(args.entries()) : (args ?? {})
      const result = await client.action("auth:signIn" as never, { provider, params } as never)
      const authResult = result as { redirect?: string; tokens?: { token: string; refreshToken: string } | null; verifier?: string }

      if (authResult.redirect) {
        const redirect = new URL(authResult.redirect)
        window.location.href = redirect.toString()
        return { signingIn: false, redirect }
      }

      if ("tokens" in authResult) {
        await setToken(authResult.tokens ?? null, true)
        return { signingIn: authResult.tokens !== null }
      }

      return { signingIn: false }
    },
    async signOut() {
      try {
        await client.action("auth:signOut" as never, {} as never)
      } catch {
        // Signing out should still clear local tokens if the server session is already gone.
      }
      await setToken(null, true)
    },
  }

  onMount(() => {
    const storedToken = localStorage.getItem(storageKey(JWT_STORAGE_KEY))
    void setToken(storedToken ? { token: storedToken } : null, false)
  })

  return (
    <ConvexProvider client={client}>
      <AuthStateContext.Provider value={{ isAuthenticated: () => token() !== null, isLoading }}>
        <AuthActionsContext.Provider value={actions}>{props.children}</AuthActionsContext.Provider>
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

function useAuthState() {
  const state = useContext(AuthStateContext)
  if (!state) {
    throw new Error("Auth state must be used within ConvexClientProvider")
  }
  return state
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
