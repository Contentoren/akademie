import type { ConvexHttpClient } from "convex/browser"
import type { Value } from "convex/values"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { onCleanup, onMount } from "solid-js"

import { api } from "#convex/_generated/api.js"
import { authOAuthCodeExtract } from "#src/features/auth/model/authOAuthCodeExtract"
import { authOAuthErrorExtract } from "#src/features/auth/model/authOAuthErrorExtract"
import { authSessionIsExpired } from "#src/features/auth/model/authSessionIsExpired"
import type { AuthSession } from "#src/features/auth/model/authSession"
import { authSessionParse } from "#src/features/auth/model/authSessionParse"
import { authSessionStorageCreate } from "#src/features/auth/model/authSessionStorageCreate"

type AuthSessionStorage = ReturnType<typeof authSessionStorageCreate>
const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL as string | undefined

export function convexClientStateCreate(httpClient: ConvexHttpClient) {
  const session = createSignalObject<AuthSession | null>(null)
  const callbackError = createSignalObject<Error | null>(null)
  const isLoading = createSignalObject(true)
  let sessionStorage: AuthSessionStorage | null = null
  let expiryTimer: ReturnType<typeof setTimeout> | undefined

  function sessionStorageClear(): void {
    sessionStorage?.clear()
  }

  function expiryTimerClear(): void {
    if (expiryTimer === undefined) {
      return
    }

    clearTimeout(expiryTimer)
    expiryTimer = undefined
  }

  function sessionClear(): void {
    expiryTimerClear()
    session.set(null)
    sessionStorageClear()
    isLoading.set(false)
  }

  function expiryTimerSchedule(value: AuthSession): void {
    expiryTimerClear()
    const delay = Date.parse(value.expiresAt) - Date.now()
    if (delay <= 0) {
      sessionClear()
      return
    }

    expiryTimer = setTimeout(sessionClear, delay)
  }

  function sessionSet(value: AuthSession): void {
    if (authSessionIsExpired(value)) {
      sessionClear()
      return
    }

    sessionStorage?.write(value)
    session.set(value)
    expiryTimerSchedule(value)
    isLoading.set(false)
  }

  function sessionResponseParse(value: unknown): AuthSession {
    const result = authSessionParse(value)
    if (!result.success) {
      throw new Error("AUTH_INVALID_SESSION")
    }

    return result.data
  }

  async function initializeSession(): Promise<void> {
    sessionStorage = authSessionStorageCreate(window.sessionStorage)

    const callback = authOAuthCodeExtract(window.location.href)
    if (callback.success) {
      window.history.replaceState(null, "", callback.data.cleanedHref)
      try {
        const response = await httpClient.action(api.auth.exchangeGoogleCode, { code: callback.data.code })
        sessionSet(sessionResponseParse(response))
      } catch {
        sessionClear()
      }
      return
    }

    const callbackErrorResult = authOAuthErrorExtract(window.location.href)
    if (callbackErrorResult.success) {
      window.history.replaceState(null, "", callbackErrorResult.data.cleanedHref)
      callbackError.set(new Error(callbackErrorResult.data.code))
      sessionClear()
      return
    }

    const stored = sessionStorage.read()
    if (!stored.success || authSessionIsExpired(stored.data)) {
      sessionClear()
      return
    }

    try {
      await httpClient.query(api.auth.currentUser, { token: stored.data.token })
    } catch {
      sessionClear()
      return
    }

    sessionSet(stored.data)
  }

  async function signIn(provider: string, args?: FormData | Record<string, Value>) {
    if (provider === "google") {
      if (typeof window === "undefined") {
        throw new Error("Google login is only available in the browser.")
      }
      if (!convexSiteUrl) {
        throw new Error("VITE_CONVEX_SITE_URL is required for Google login.")
      }

      const returnTo = `${window.location.pathname}${window.location.search}${window.location.hash}` || "/"
      const redirect = new URL("/api/auth/google", convexSiteUrl)
      redirect.searchParams.set("returnTo", returnTo)
      window.location.assign(redirect.toString())
      return { signingIn: false, redirect }
    }

    if (provider !== "password") {
      throw new Error("Unsupported authentication provider.")
    }

    const params = args instanceof FormData ? Object.fromEntries(args.entries()) : (args ?? {})
    const email = String(params.email ?? "")
    const password = String(params.password ?? "")
    const flow = String(params.flow ?? "signIn")
    const response = flow === "signUp"
      ? await httpClient.action(api.auth.signUp, { email, password })
      : await httpClient.action(api.auth.signIn, { email, password })

    sessionSet(sessionResponseParse(response))
    return { signingIn: true }
  }

  async function signOut(): Promise<void> {
    const token = session.get()?.token
    sessionClear()
    if (!token) {
      return
    }

    try {
      await httpClient.mutation(api.auth.signOut, { token })
    } catch {
      // The local session is already cleared when the server session is gone or unavailable.
    }
  }

  onMount(() => {
    void initializeSession().catch(sessionClear)
  })

  onCleanup(expiryTimerClear)

  return {
    actions: { signIn, signOut },
    authState: {
      callbackError: callbackError.get,
      isAuthenticated: () => session.get() !== null,
      isLoading: isLoading.get,
      session: session.get,
    },
  }
}
