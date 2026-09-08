import { Link } from "@tanstack/solid-router"
import { For, Show, type JSX } from "solid-js"

import { learningAccentStyle } from "#src/features/learning/model/learningAccentStyle"
import { classArr } from "../../../components/classArr"
import { LearningCourseCard } from "#src/features/learning/ui/LearningCourseCard"
import { LearningCourseCover } from "#src/features/learning/ui/LearningCourseCover"
import { LearningDemoNote } from "#src/features/learning/ui/LearningDemoNote"
import { learningOverviewPageStateCreate } from "#src/features/learning/ui/learningOverviewPageStateCreate"

export function LearningOverviewPage(): JSX.Element {
  const state = learningOverviewPageStateCreate()

  return (
    <div class="max-w-3xl space-y-12 lg:max-w-none">
      <header class="space-y-4">
        <LearningDemoNote />
        <h1 class="learn-serif text-3xl font-semibold text-[#16211f] sm:text-4xl">Schön, dass Sie da sind.</h1>
        <p class="max-w-xl text-[0.98rem] leading-relaxed text-[#5a6462]">
          Ihr Lernbereich für KI-Schulungen. Nehmen Sie sich ein paar ruhige Minuten – ein Kapitel nach dem anderen
          genügt.
        </p>
      </header>

      <Show when={state.resumeEntry()}>
        {(entry) => (
          <section aria-labelledby="weiterlernen" class="learn-card overflow-hidden">
            <div class="sm:flex">
              <LearningCourseCover class="h-24 sm:h-auto sm:w-44 sm:shrink-0" course={entry().progress.course} />
              <div class="flex flex-1 flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p id="weiterlernen" class="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">
                    <Show fallback="Weiterlernen" when={!entry().progress.isStarted}>
                      Hier beginnen
                    </Show>
                  </p>
                  <h2 class="learn-serif mt-1.5 text-2xl font-semibold text-[#16211f]">
                    {entry().progress.course.title}
                  </h2>
                  <p class="mt-1 text-sm text-[#5a6462]">
                    <Show
                      fallback={`${entry().progress.completedCount} von ${entry().progress.lessonCount} Lektionen abgeschlossen`}
                      when={entry().progress.nextEntry && !entry().progress.isStarted}
                    >
                      Erster Schritt: {entry().progress.nextEntry?.lesson.title}
                    </Show>
                  </p>
                </div>
                <Link
                  class="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#0f6f66] px-6 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"
                  params={{ courseId: entry().progress.course.id }}
                  to="/customers/courses/$courseId"
                >
                  <Show fallback="Weiterlernen" when={!entry().progress.isStarted}>
                    Kurs beginnen
                  </Show>
                </Link>
              </div>
            </div>
          </section>
        )}
      </Show>

      <section aria-labelledby="kurse" class="space-y-5">
        <div class="flex items-baseline justify-between border-b pb-2 learn-hairline">
          <h2 id="kurse" class="learn-serif text-lg font-semibold text-[#16211f]">
            Ihre Kurse
          </h2>
          <p class="text-xs text-[#8c928f]">
            {state.completedLessons()} von {state.totalLessons()} Lektionen
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <For each={state.entries()}>
            {(entry) => <LearningCourseCard minutes={entry.minutes} progress={entry.progress} />}
          </For>
        </div>
      </section>

      <section aria-labelledby="lernweg" class="space-y-5">
        <h2 id="lernweg" class="learn-serif border-b pb-2 text-lg font-semibold text-[#16211f] learn-hairline">
          Ihr Lernweg
        </h2>
        <ol class="space-y-4">
          <For each={state.entries()}>
            {(entry, index) => (
              <li class="flex gap-4">
                <div class="flex flex-col items-center">
                  <span
                    class={classArr(
                      "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                      learningAccentStyle(entry.progress.course.accent).chip,
                    )}
                  >
                    {index() + 1}
                  </span>
                  <Show when={index() < state.entries().length - 1}>
                    <span aria-hidden="true" class="mt-1 w-px flex-1 bg-[#e6e1d8]" />
                  </Show>
                </div>
                <div class="pb-1">
                  <p class="text-sm font-semibold text-[#16211f]">{entry.progress.course.title}</p>
                  <p class="mt-0.5 text-sm leading-relaxed text-[#5a6462]">{entry.progress.course.tagline}</p>
                </div>
              </li>
            )}
          </For>
        </ol>
      </section>
    </div>
  )
}
