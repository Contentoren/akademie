import { Match, Switch, type JSX } from "solid-js"

import type { LearningCourse } from "#src/features/learning/model/learningCourse"
import { learningAccentStyle } from "#src/features/learning/model/learningAccentStyle"

/** Purely decorative course identity, drawn with CSS and inline SVG. */
export function LearningCourseCover(props: { course: LearningCourse; class?: string }): JSX.Element {
  return (
    <div
      aria-hidden="true"
      class={`learn-cover flex items-center justify-center ${learningAccentStyle(props.course.accent).cover} ${props.class ?? ""}`}
    >
      <svg class="relative z-10 size-full" fill="none" preserveAspectRatio="xMidYMid slice" viewBox="0 0 160 100">
        <Switch>
          <Match when={props.course.accent === "teal"}>
            <g opacity="0.85" stroke="rgba(255,255,255,0.6)" stroke-width="1.1">
              <circle cx="80" cy="50" r="14" />
              <circle cx="80" cy="50" r="27" opacity="0.6" />
              <circle cx="80" cy="50" r="40" opacity="0.32" />
              <path d="M80 10v80M40 50h80" opacity="0.28" />
            </g>
            <circle cx="80" cy="50" fill="rgba(255,255,255,0.9)" r="4" />
          </Match>
          <Match when={props.course.accent === "lime"}>
            <g stroke="rgba(255,255,255,0.55)" stroke-width="1.1">
              <path d="M24 78C48 78 52 30 80 30s32 48 56 48" opacity="0.8" />
              <path d="M24 88C48 88 52 40 80 40s32 48 56 48" opacity="0.45" />
              <path d="M24 68C48 68 52 20 80 20s32 48 56 48" opacity="0.28" />
            </g>
            <g fill="rgba(255,255,255,0.9)">
              <circle cx="80" cy="30" r="3.5" />
              <circle cx="52" cy="52" opacity="0.6" r="2.5" />
              <circle cx="108" cy="52" opacity="0.6" r="2.5" />
            </g>
          </Match>
          <Match when={props.course.accent === "clay"}>
            <g stroke="rgba(255,255,255,0.5)" stroke-width="1.1">
              <rect height="34" rx="4" width="34" x="30" y="14" />
              <rect height="34" opacity="0.65" rx="4" width="34" x="63" y="33" />
              <rect height="34" opacity="0.4" rx="4" width="34" x="96" y="52" />
            </g>
            <g fill="rgba(255,255,255,0.85)">
              <circle cx="47" cy="31" r="3" />
              <circle cx="80" cy="50" opacity="0.7" r="3" />
              <circle cx="113" cy="69" opacity="0.5" r="3" />
            </g>
          </Match>
        </Switch>
      </svg>
    </div>
  )
}
