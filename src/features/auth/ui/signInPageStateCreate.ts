import { createSignal } from "solid-js"

import { authErrorMessage } from "#src/features/auth/model/authErrorMessage"
import { useAuthActions } from "#src/lib/convex-client"

export type SignInFlow = "signIn" | "signUp"

export type SignInCopy = {
  button: string
  helper: string
  switchLabel: string
  title: string
}

const signInCopy: Record<SignInFlow, SignInCopy> = {
  signIn: {
    button: "Einloggen",
    helper: "Noch kein Zugang?",
    switchLabel: "Konto erstellen",
    title: "Einloggen",
  },
  signUp: {
    button: "Konto erstellen",
    helper: "Schon registriert?",
    switchLabel: "Einloggen",
    title: "Zugang anlegen",
  },
}

export function signInPageStateCreate() {
  const { signIn } = useAuthActions()
  const [flow, setFlow] = createSignal<SignInFlow>("signIn")
  const [error, setError] = createSignal<string | null>(null)
  const [pending, setPending] = createSignal<"password" | "google" | null>(null)

  async function submitPassword(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    formData.set("flow", flow())

    setError(null)
    setPending("password")

    try {
      await signIn("password", formData)
    } catch (caughtError) {
      setError(authErrorMessage(caughtError))
    } finally {
      setPending(null)
    }
  }

  async function startGoogle() {
    setError(null)
    setPending("google")

    try {
      await signIn("google", { redirectTo: window.location.origin })
    } catch (caughtError) {
      setError(authErrorMessage(caughtError))
      setPending(null)
    }
  }

  function toggleFlow() {
    setError(null)
    setFlow(flow() === "signIn" ? "signUp" : "signIn")
  }

  return {
    copy: () => signInCopy[flow()],
    error,
    isGooglePending: () => pending() === "google",
    isPending: () => pending() !== null,
    isPasswordPending: () => pending() === "password",
    startGoogle,
    submitPassword,
    toggleFlow,
  }
}
