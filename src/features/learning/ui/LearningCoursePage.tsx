import { Link } from "@tanstack/solid-router"
import { For, Show, type JSX } from "solid-js"

import { learningAccentStyle } from "#src/features/learning/model/learningAccentStyle"
import { classArr } from "../../../components/classArr"
import { LearningCourseCover } from "#src/features/learning/ui/LearningCourseCover"
import { LearningDemoNote } from "#src/features/learning/ui/LearningDemoNote"
import { learningCoursePageStateCreate } from "#src/features/learning/ui/learningCoursePageStateCreate"
import { LearningNotFound } from "#src/features/learning/ui/LearningNotFound"
import { LearningProgressBar } from "#src/features/learning/ui/LearningProgressBar"
import { LearningSyllabus } from "#src/features/learning/ui/LearningSyllabus"

export function LearningCoursePage(props: { courseId: string }): JSX.Element {
  const state = learningCoursePageStateCreate(() => props.courseId)

  return (
    <Show
      fallback={
        <LearningNotFound title="Kurs nicht gefunden" description="Dieser Kurs ist im Demo-Katalog nicht enthalten." />
      }
      when={state.course()}
    >
      {(course) => (
        <article class="max-w-3xl space-y-12">
          <header class="space-y-5">
            <Link class="text-sm text-[#0f6f66] underline-offset-4 hover:underline" to="/customers">
              ← Lernübersicht
            </Link>

            <LearningCourseCover class="h-32 rounded-xl" course={course()} />

            <div class="space-y-3">
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <span
                  class={classArr("rounded-full px-2 py-0.5 font-medium", learningAccentStyle(course().accent).chip)}
                >
                  {course().level}
                </span>
                <span class="text-[#8c928f]">
                  {course().modules.length} Module · {state.progress()?.lessonCount} Lektionen · ca. {state.minutes()}{" "}
                  Min.
                </span>
              </div>

              <h1 class="learn-serif text-3xl font-semibold text-[#16211f] sm:text-4xl">{course().title}</h1>
              <p class="text-[0.98rem] leading-relaxed text-[#5a6462]">{course().description}</p>
              <LearningDemoNote />
            </div>

            <Show when={state.progress()}>
              {(progress) => (
                <div class="max-w-sm space-y-2">
                  <LearningProgressBar
                    fillClass={learningAccentStyle(course().accent).bar}
                    label={`Fortschritt ${course().title}`}
                    percent={progress().percent}
                  />
                  <p class="text-xs text-[#8c928f]">
                    {progress().completedCount} von {progress().lessonCount} Lektionen abgeschlossen
                  </p>
                </div>
              )}
            </Show>

            <Show when={state.progress()}>
              {(progress) => (
                <Show when={state.lessonTarget()}>
                  {(lesson) => (
                    <div class="flex flex-wrap items-center gap-3">
                      <Link
                        class="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0f6f66] px-6 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"
                        params={{ courseId: course().id, lessonId: lesson().lessonId }}
                        to="/customers/courses/$courseId/lessons/$lessonId"
                      >
                        <Show fallback="Kurs beginnen" when={progress().isStarted}>
                          <Show fallback="Weiterlernen" when={progress().isCompleted}>
                            Kurs wiederholen
                          </Show>
                        </Show>
                      </Link>
                      <span class="text-sm text-[#5a6462]">
                        <Show fallback={`Zuletzt offen: ${lesson().title}`} when={progress().isCompleted}>
                          Alle Lektionen abgeschlossen
                        </Show>
                      </span>
                    </div>
                  )}
                </Show>
              )}
            </Show>
          </header>

          <section aria-labelledby="lernziele" class="space-y-4">
            <h2 id="lernziele" class="learn-serif border-b pb-2 text-lg font-semibold text-[#16211f] learn-hairline">
              Das nehmen Sie mit
            </h2>
            <ul class="space-y-2.5">
              <For each={course().objectives}>
                {(objective) => (
                  <li class="flex gap-3 text-[0.95rem] leading-relaxed text-[#3d4745]">
                    <span
                      aria-hidden="true"
                      class={classArr("mt-2 size-1.5 shrink-0 rounded-full", learningAccentStyle(course().accent).bar)}
                    />
                    {objective}
                  </li>
                )}
              </For>
            </ul>
          </section>

          <section aria-labelledby="inhalt" class="space-y-6">
            <h2 id="inhalt" class="learn-serif border-b pb-2 text-lg font-semibold text-[#16211f] learn-hairline">
              Kursinhalt
            </h2>

            <LearningSyllabus course={course()} isLessonCompleted={state.isLessonCompleted} />
          </section>

          <p class="rounded-xl bg-[#efece5] px-5 py-4 text-sm leading-relaxed text-[#5a6462]">
            Die Lektionen enthalten bewusst noch keine Schulungsinhalte. Ihr Fortschritt wird ausschließlich in diesem
            Browser gespeichert.
          </p>
        </article>
      )}
    </Show>
  )
}
