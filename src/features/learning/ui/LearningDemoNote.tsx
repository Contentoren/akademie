import type { JSX } from "solid-js"

export function LearningDemoNote(): JSX.Element {
  return (
    <p class="inline-flex items-center gap-2 rounded-full bg-[#f3ead6] px-3 py-1 text-xs font-medium text-[#7a5a17]">
      <span aria-hidden="true" class="size-1.5 rounded-full bg-[#c08b1f]" />
      Demo-Inhalte: Kurse, Module und Lektionen sind Platzhalter.
    </p>
  )
}
