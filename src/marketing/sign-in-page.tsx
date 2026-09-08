import { mdiLockOutline } from "@adaptive-ds/mdi/mdiLockOutline.js"
import { mdiShieldCheckOutline } from "@adaptive-ds/mdi/mdiShieldCheckOutline.js"
import { Icon } from "#src/components/Icon"

import { Button, Card, Field } from "#src/components/ui"
import { AuthGoogleButton } from "#src/marketing/ui/AuthGoogleButton"
import { signInPageStateCreate } from "#src/features/auth/ui/signInPageStateCreate"

export function SignInPage() {
  const state = signInPageStateCreate()

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
              <h2 class="text-2xl font-black text-slate-950">{state.copy().title}</h2>
            </div>
          </div>

          <AuthGoogleButton disabled={state.isPending()} onClick={state.startGoogle} pending={state.isGooglePending()} />

          <div class="my-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
            <span class="h-px flex-1 bg-slate-200" />
            oder
            <span class="h-px flex-1 bg-slate-200" />
          </div>

          <form class="space-y-4" onSubmit={state.submitPassword}>
            <Field label="E-Mail">
              <input class="input-field" name="email" placeholder="name@example.com" required type="email" />
            </Field>
            <Field label="Passwort">
              <input class="input-field" minLength={8} name="password" placeholder="Mindestens 8 Zeichen" required type="password" />
            </Field>
            {state.error() ? (
              <p class="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 ring-1 ring-red-100">{state.error()}</p>
            ) : null}
            <Button class="w-full" disabled={state.isPending()} type="submit">
              {state.isPasswordPending() ? "Bitte warten..." : state.copy().button}
            </Button>
          </form>

          <div class="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
            <span>{state.copy().helper}</span>
            <button
              class="font-bold text-slate-950 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-950"
              onClick={state.toggleFlow}
              type="button"
            >
              {state.copy().switchLabel}
            </button>
          </div>
        </Card>
      </div>
    </section>
  )
}
