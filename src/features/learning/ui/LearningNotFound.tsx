import { Link } from "@tanstack/solid-router"
import { Show, type JSX } from "solid-js"

export function LearningNotFound(props: {
  title: string
  description: string
  actionLabel?: string
  actionTo?: "/customers/courses/$courseId"
  actionParams?: { courseId: string }
}): JSX.Element {
  const buttonClass =
    "mt-5 inline-flex min-h-11 items-center rounded-full bg-[#0f6f66] px-5 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"

  return (
    <div class="learn-card max-w-lg p-8">
      <h1 class="learn-serif text-2xl font-semibold text-[#16211f]">{props.title}</h1>
      <p class="mt-2 text-sm leading-relaxed text-[#5a6462]">{props.description}</p>

      <Show
        fallback={
          <Link class={buttonClass} to="/customers">
            Zur Lernübersicht
          </Link>
        }
        when={props.actionTo && props.actionParams ? props.actionParams : undefined}
      >
        {(params) => (
          <Link class={buttonClass} params={params()} to="/customers/courses/$courseId">
            {props.actionLabel ?? "Weiter"}
          </Link>
        )}
      </Show>
    </div>
  )
}
