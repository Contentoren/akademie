import { Link } from "@tanstack/solid-router"
import { For, Show, type JSX } from "solid-js"

import type { LearningCourse } from "#src/features/learning/model/learningCourse"
import { learningAccentStyle } from "#src/features/learning/model/learningAccentStyle"
import { learningLessonKindLabel } from "#src/features/learning/model/learningLessonKindLabel"

/** Navigable course outline. Every entry links to its lesson view. */
export function LearningSyllabus(props: {
  course: LearningCourse
  isLessonCompleted: (lessonId: string) => boolean
  currentLessonId?: string
}): JSX.Element {
  return (
    <div class="space-y-6">
      <For each={props.course.modules}>
        {(module, moduleIndex) => (
          <section class="space-y-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">Modul {moduleIndex() + 1}</p>
              <h3 class="learn-serif mt-1 text-lg font-semibold text-[#16211f]">{module.title}</h3>
              <p class="mt-1 text-sm leading-relaxed text-[#5a6462]">{module.summary}</p>
            </div>

            <ul class="learn-card divide-y divide-[#efece5]">
              <For each={module.lessons}>
                {(lesson) => (
                  <li>
                    <Link
                      aria-current={props.currentLessonId === lesson.id ? "page" : undefined}
                      class="flex gap-4 px-4 py-3.5 transition hover:bg-[#f7f5f1] sm:px-5"
                      classList={{ "bg-[#e3efec] hover:bg-[#e3efec]": props.currentLessonId === lesson.id }}
                      params={{ courseId: props.course.id, lessonId: lesson.id }}
                      to="/customers/courses/$courseId/lessons/$lessonId"
                    >
                      <span
                        aria-hidden="true"
                        class={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[0.65rem] learn-hairline ${
                          props.isLessonCompleted(lesson.id)
                            ? `border-transparent text-white ${learningAccentStyle(props.course.accent).bar}`
                            : ""
                        }`}
                      >
                        <Show when={props.isLessonCompleted(lesson.id)}>✓</Show>
                      </span>
                      <span class="min-w-0 flex-1">
                        <span class="block text-[0.95rem] font-medium text-[#16211f]">{lesson.title}</span>
                        <span class="mt-0.5 block text-sm leading-relaxed text-[#5a6462]">{lesson.summary}</span>
                        <span class="mt-1 block text-xs text-[#8c928f] sm:hidden">
                          {learningLessonKindLabel(lesson.kind)} · {lesson.minutes} Min.
                          <Show when={props.isLessonCompleted(lesson.id)}> · Abgeschlossen</Show>
                        </span>
                      </span>
                      <span class="hidden shrink-0 text-right text-xs text-[#8c928f] sm:block">
                        <span class="block">{learningLessonKindLabel(lesson.kind)}</span>
                        <span class="block">{lesson.minutes} Min.</span>
                      </span>
                    </Link>
                  </li>
                )}
              </For>
            </ul>
          </section>
        )}
      </For>
    </div>
  )
}
