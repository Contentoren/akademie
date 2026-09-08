import { Link } from "@tanstack/solid-router"
import { Show, type JSX } from "solid-js"

import { learningAccentStyle } from "#src/features/learning/model/learningAccentStyle"
import type { LearningCourseProgress } from "#src/features/learning/model/learningCourseProgress"
import { LearningCourseCover } from "#src/features/learning/ui/LearningCourseCover"
import { LearningProgressBar } from "#src/features/learning/ui/LearningProgressBar"
import { classArr } from "../../../components/classArr"

export function LearningCourseCard(props: { progress: LearningCourseProgress; minutes: number }): JSX.Element {
  return (
    <Link
      class="learn-card group flex flex-col overflow-hidden transition hover:border-[#c9c2b4] hover:shadow-[0_1px_2px_rgba(22,33,31,0.06),0_8px_24px_-12px_rgba(22,33,31,0.25)]"
      params={{ courseId: props.progress.course.id }}
      to="/customers/courses/$courseId"
    >
      <LearningCourseCover class="h-28" course={props.progress.course} />

      <div class="flex flex-1 flex-col gap-3 p-5">
        <div class="flex items-center gap-2 text-xs">
          <span
            class={classArr(
              "rounded-full px-2 py-0.5 font-medium",
              learningAccentStyle(props.progress.course.accent).chip,
            )}
          >
            {props.progress.course.level}
          </span>
          <span class="text-[#8c928f]">
            {props.progress.lessonCount} Lektionen · ca. {props.minutes} Min.
          </span>
        </div>

        <div>
          <h3 class="learn-serif text-xl font-semibold text-[#16211f]">{props.progress.course.title}</h3>
          <p class="mt-1 text-sm leading-relaxed text-[#5a6462]">{props.progress.course.tagline}</p>
        </div>

        <div class="mt-auto pt-2">
          <LearningProgressBar
            fillClass={learningAccentStyle(props.progress.course.accent).bar}
            label={`Fortschritt ${props.progress.course.title}`}
            percent={props.progress.percent}
          />
          <p class="mt-2 text-xs text-[#8c928f]">
            <Show fallback="Noch nicht begonnen" when={props.progress.isStarted}>
              {props.progress.completedCount} von {props.progress.lessonCount} abgeschlossen
            </Show>
          </p>
        </div>
      </div>
    </Link>
  )
}
