import { mdiLockOutline, mdiShieldCheckOutline } from "@mdi/js"
import { Icon } from "#src/components/Icon"
import { createSignal } from "solid-js"

import { Button, Card, Field } from "#src/components/ui"
import { useAuthActions } from "#src/lib/convex-client"

type AuthFlow = "signIn" | "signUp"

const authCopy: Record<AuthFlow, { button: string; helper: string; switchLabel: string; title: string }> = {
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

export function SignInPage() {
  const { signIn } = useAuthActions()
  const [flow, setFlow] = createSignal<AuthFlow>("signIn")
  const [error, setError] = createSignal<string | null>(null)
  const [isSubmitting, setIsSubmitting] = createSignal(false)
  const copy = () => authCopy[flow()]

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    formData.set("flow", flow())

    setError(null)
    setIsSubmitting(true)

    try {
      await signIn("password", formData)
    } catch (caughtError) {
      setError(getAuthErrorMessage(caughtError))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section class="section-shell flex min-h-[calc(100vh-14rem)] items-center py-10 sm:py-14">
      <div class="grid w-full gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div class="rounded-[2.5rem] bg-slate-950 p-7 text-white shadow-2xl shadow-slate-950/20 sm:p-10">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-200">
            <Icon path={mdiShieldCheckOutline} class="size-4" />
            Geschützter Zugriff
          </div>
          <h1 class="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Kundenfortschritt nur nach Anmeldung öffnen.</h1>
          <p class="mt-5 max-w-2xl leading-7 text-slate-300">
            Convex Auth schützt Kundenprofile, Textdateien und Fortschrittspunkte. Nach dem Einloggen lädt die App die bestehenden Convex-Daten.
          </p>
        </div>

        <Card class="p-7 sm:p-8">
          <div class="mb-6 flex items-center gap-3">
            <span class="flex size-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
              <Icon path={mdiLockOutline} class="size-5" />
            </span>
            <div>
              <p class="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Convex Auth</p>
              <h2 class="text-2xl font-black text-slate-950">{copy().title}</h2>
            </div>
          </div>

          <form class="space-y-4" onSubmit={handleSubmit}>
            <Field label="E-Mail">
              <input class="input-field" name="email" placeholder="name@example.com" required type="email" />
            </Field>
            <Field label="Passwort">
              <input class="input-field" minLength={8} name="password" placeholder="Mindestens 8 Zeichen" required type="password" />
            </Field>
            {error() ? <p class="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-100">{error()}</p> : null}
            <Button class="w-full" disabled={isSubmitting()} type="submit">
              {isSubmitting() ? "Bitte warten..." : copy().button}
            </Button>
          </form>

          <div class="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
            <span>{copy().helper}</span>
            <button
              class="font-bold text-slate-950 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-950"
              onClick={() => {
                setError(null)
                setFlow(flow() === "signIn" ? "signUp" : "signIn")
              }}
              type="button"
            >
              {copy().switchLabel}
            </button>
          </div>
        </Card>
      </div>
    </section>
  )
}

function getAuthErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("Invalid credentials")) {
      return "E-Mail oder Passwort ist nicht korrekt."
    }

    return error.message
  }

  return "Anmeldung fehlgeschlagen. Bitte erneut versuchen."
}
