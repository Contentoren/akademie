import { Link } from "@tanstack/solid-router"
import { For, Show, type JSX } from "solid-js"

import { learningAccentStyle } from "#src/features/learning/model/learningAccentStyle"
import { classArr } from "../../../components/classArr"
import { learningLessonKindLabel } from "#src/features/learning/model/learningLessonKindLabel"
import { LearningDemoNote } from "#src/features/learning/ui/LearningDemoNote"
import { learningLessonPageStateCreate } from "#src/features/learning/ui/learningLessonPageStateCreate"
import { LearningNotFound } from "#src/features/learning/ui/LearningNotFound"
import { LearningProgressBar } from "#src/features/learning/ui/LearningProgressBar"
import { LearningSyllabus } from "#src/features/learning/ui/LearningSyllabus"

export function LearningLessonPage(props: { courseId: string; lessonId: string }): JSX.Element {
  const state = learningLessonPageStateCreate(
    () => props.courseId,
    () => props.lessonId,
  )

  return (
    <Show
      fallback={
        <LearningNotFound title="Kurs nicht gefunden" description="Dieser Kurs ist im Demo-Katalog nicht enthalten." />
      }
      when={state.course()}
    >
      {(course) => (
        <Show
          fallback={
            <LearningNotFound
              actionLabel={`Zum Kurs „${course().title}“`}
              actionParams={{ courseId: course().id }}
              actionTo="/customers/courses/$courseId"
              description="Diese Lektion gehört nicht zu diesem Kurs. Wählen Sie im Kursinhalt eine Lektion aus."
              title="Lektion nicht gefunden"
            />
          }
          when={state.context()}
        >
          {(context) => (
            <div class="max-w-3xl space-y-10">
              <header class="space-y-4">
                <nav aria-label="Pfad" class="text-sm text-[#5a6462]">
                  <Link class="text-[#0f6f66] underline-offset-4 hover:underline" to="/customers">
                    Lernübersicht
                  </Link>
                  <span aria-hidden="true" class="px-1.5 text-[#a8aeab]">
                    /
                  </span>
                  <Link
                    class="text-[#0f6f66] underline-offset-4 hover:underline"
                    params={{ courseId: course().id }}
                    to="/customers/courses/$courseId"
                  >
                    {course().title}
                  </Link>
                </nav>

                <div class="space-y-2">
                  <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">
                    {context().current.module.title} · Lektion {context().current.position} von {context().lessonCount}
                  </p>
                  <h1 class="learn-serif text-3xl font-semibold text-[#16211f]">{context().current.lesson.title}</h1>
                  <p class="text-[0.98rem] leading-relaxed text-[#5a6462]">{context().current.lesson.summary}</p>
                  <div class="flex flex-wrap items-center gap-2 text-xs">
                    <span
                      class={classArr(
                        "rounded-full px-2 py-0.5 font-medium",
                        learningAccentStyle(course().accent).chip,
                      )}
                    >
                      {learningLessonKindLabel(context().current.lesson.kind)}
                    </span>
                    <span class="text-[#8c928f]">ca. {context().current.lesson.minutes} Min.</span>
                    <Show when={state.isCurrentCompleted()}>
                      <span class="text-[#0f6f66]">✓ Abgeschlossen</span>
                    </Show>
                  </div>
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
              </header>

              <section aria-labelledby="lernziele-lektion" class="space-y-3">
                <h2 id="lernziele-lektion" class="learn-serif text-lg font-semibold text-[#16211f]">
                  Ziel dieser Lektion
                </h2>
                <ul class="space-y-2.5">
                  <For each={state.objectives()}>
                    {(objective) => (
                      <li class="flex gap-3 text-[0.95rem] leading-relaxed text-[#3d4745]">
                        <span
                          aria-hidden="true"
                          class={classArr(
                            "mt-2 size-1.5 shrink-0 rounded-full",
                            learningAccentStyle(course().accent).bar,
                          )}
                        />
                        {objective}
                      </li>
                    )}
                  </For>
                </ul>
              </section>

              <section aria-labelledby="inhalt-lektion" class="space-y-3">
                <h2 id="inhalt-lektion" class="learn-serif text-lg font-semibold text-[#16211f]">
                  Lektionsinhalt
                </h2>
                <div class="learn-card space-y-3 bg-[#efece5] p-6">
                  <LearningDemoNote />
                  <p class="text-[0.95rem] leading-relaxed text-[#5a6462]">
                    Hier entstehen die eigentlichen Schulungsinhalte dieser Lektion. Der Bereich ist bewusst leer
                    gehalten: Es gibt noch kein Video, kein Skript und keine Aufgabenstellung.
                  </p>
                  <p class="text-[0.95rem] leading-relaxed text-[#5a6462]">
                    Sie können den Ablauf trotzdem vollständig durchgehen – Abschließen, Weiterlernen und Fortschritt
                    funktionieren bereits.
                  </p>
                </div>
              </section>

              <section aria-labelledby="weiter" class="learn-card space-y-4 p-6">
                <h2 id="weiter" class="learn-serif text-lg font-semibold text-[#16211f]">
                  <Show fallback="Lektion abschließen" when={state.isCurrentCompleted()}>
                    Lektion abgeschlossen
                  </Show>
                </h2>

                <Show
                  fallback={
                    <div class="flex flex-wrap items-center gap-3">
                      <button
                        class="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0f6f66] px-6 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"
                        onClick={state.completeCurrent}
                        type="button"
                      >
                        <Show fallback="Abschließen und Kurs beenden" when={context().next}>
                          Abschließen und weiter
                        </Show>
                      </button>
                      <Show when={context().next}>
                        {(next) => <span class="text-sm text-[#5a6462]">Als Nächstes: {next().lesson.title}</span>}
                      </Show>
                    </div>
                  }
                  when={state.isCurrentCompleted()}
                >
                  <div class="flex flex-wrap items-center gap-3">
                    <Show when={context().next}>
                      {(next) => (
                        <Link
                          class="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0f6f66] px-6 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"
                          params={{
                            courseId: course().id,
                            lessonId: next().lesson.id,
                          }}
                          to="/customers/courses/$courseId/lessons/$lessonId"
                        >
                          Nächste Lektion: {next().lesson.title}
                        </Link>
                      )}
                    </Show>

                    <Show when={state.progress()?.isCompleted}>
                      <Show
                        fallback={
                          <Link
                            class="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0f6f66] px-6 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"
                            to="/customers"
                          >
                            Zur Lernübersicht
                          </Link>
                        }
                        when={state.nextCourse()}
                      >
                        {(next) => (
                          <Link
                            class="inline-flex min-h-11 items-center justify-center rounded-full bg-[#0f6f66] px-6 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"
                            params={{ courseId: next().id }}
                            to="/customers/courses/$courseId"
                          >
                            Weiter mit „{next().title}“
                          </Link>
                        )}
                      </Show>
                    </Show>

                    <button
                      class="inline-flex min-h-11 items-center justify-center rounded-full border px-5 text-sm font-medium text-[#4b5654] transition hover:bg-[#efece5] learn-hairline"
                      onClick={state.reopenCurrent}
                      type="button"
                    >
                      Als offen markieren
                    </button>
                  </div>
                </Show>

                <Show when={state.progress()?.isCompleted}>
                  <p class="text-sm leading-relaxed text-[#5a6462]">
                    Sie haben alle Lektionen dieses Kurses abgeschlossen.
                  </p>
                </Show>

                <p class="text-xs text-[#8c928f]">
                  Der Fortschritt wird nur in diesem Browser gespeichert (Demo, keine Übertragung).
                </p>
              </section>

              <nav aria-label="Lektionen" class="flex flex-wrap gap-3 border-t pt-5 learn-hairline">
                <Show when={context().previous}>
                  {(previous) => (
                    <Link
                      class="inline-flex min-h-11 items-center rounded-full border px-4 text-sm text-[#4b5654] transition hover:bg-[#efece5] learn-hairline"
                      params={{
                        courseId: course().id,
                        lessonId: previous().lesson.id,
                      }}
                      to="/customers/courses/$courseId/lessons/$lessonId"
                    >
                      ← {previous().lesson.title}
                    </Link>
                  )}
                </Show>
                <Show when={context().next}>
                  {(next) => (
                    <Link
                      class="inline-flex min-h-11 items-center rounded-full border px-4 text-sm text-[#4b5654] transition hover:bg-[#efece5] learn-hairline"
                      params={{
                        courseId: course().id,
                        lessonId: next().lesson.id,
                      }}
                      to="/customers/courses/$courseId/lessons/$lessonId"
                    >
                      {next().lesson.title} →
                    </Link>
                  )}
                </Show>
              </nav>

              <section aria-labelledby="kursinhalt-lektion" class="space-y-5">
                <h2
                  id="kursinhalt-lektion"
                  class="learn-serif border-b pb-2 text-lg font-semibold text-[#16211f] learn-hairline"
                >
                  Kursinhalt
                </h2>
                <LearningSyllabus
                  course={course()}
                  currentLessonId={context().current.lesson.id}
                  isLessonCompleted={state.isLessonCompleted}
                />
              </section>
            </div>
          )}
        </Show>
      )}
    </Show>
  )
}
