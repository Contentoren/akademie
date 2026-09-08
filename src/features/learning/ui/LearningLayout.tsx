import { Link } from "@tanstack/solid-router"
import { For, type JSX } from "solid-js"

import { learningAccentStyle } from "#src/features/learning/model/learningAccentStyle"
import { learningCourses } from "#src/features/learning/model/learningCourses"
import { classArr } from "../../../components/classArr"

export function LearningLayout(props: { children?: JSX.Element }): JSX.Element {
  return (
    <div class="learn-shell py-6 lg:py-10">
      <div class="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <LearningSidebar />
        <LearningMobileNav />
        <div class="mt-6 lg:mt-0">{props.children}</div>
      </div>
    </div>
  )
}

const navLinkClass =
  "block rounded-lg px-3 py-2 text-sm text-[#4b5654] transition hover:bg-[#efece5] hover:text-[#16211f]"
const navLinkActiveClass = "bg-[#e3efec] font-semibold text-[#0f5b54] hover:bg-[#e3efec]"

function LearningSidebar(): JSX.Element {
  return (
    <nav aria-label="Lernbereich" class="hidden lg:sticky lg:top-24 lg:block lg:self-start">
      <p class="px-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8c928f]">Lernen</p>
      <ul class="mt-2 space-y-0.5">
        <li>
          <Link
            activeOptions={{ exact: true }}
            activeProps={{ class: navLinkActiveClass }}
            class={navLinkClass}
            to="/customers"
          >
            Lernübersicht
          </Link>
        </li>
      </ul>

      <p class="mt-8 px-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#8c928f]">Meine Kurse</p>
      <ul class="mt-2 space-y-0.5">
        <For each={learningCourses}>
          {(course) => (
            <li>
              <Link
                activeProps={{ class: navLinkActiveClass }}
                class={classArr(navLinkClass, "flex items-center gap-2.5")}
                params={{ courseId: course.id }}
                to="/customers/courses/$courseId"
              >
                <span
                  aria-hidden="true"
                  class={classArr("size-2.5 shrink-0 rounded-[0.2rem]", learningAccentStyle(course.accent).bar)}
                />
                <span class="truncate">{course.title}</span>
              </Link>
            </li>
          )}
        </For>
      </ul>

      <div class="mt-8 border-t pt-3 learn-hairline">
        <Link activeProps={{ class: navLinkActiveClass }} class={navLinkClass} to="/customers/verwaltung">
          Verwaltung
        </Link>
      </div>
    </nav>
  )
}

function LearningMobileNav(): JSX.Element {
  return (
    <nav aria-label="Lernbereich" class="-mx-1 overflow-x-auto lg:hidden">
      <ul class="flex w-max items-center gap-1.5 px-1">
        <li>
          <Link
            activeOptions={{ exact: true }}
            activeProps={{ class: "border-transparent bg-[#e3efec] font-semibold text-[#0f5b54]" }}
            class="block whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm text-[#4b5654] learn-hairline"
            to="/customers"
          >
            Übersicht
          </Link>
        </li>
        <For each={learningCourses}>
          {(course) => (
            <li>
              <Link
                activeProps={{ class: "border-transparent bg-[#e3efec] font-semibold text-[#0f5b54]" }}
                class="block whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm text-[#4b5654] learn-hairline"
                params={{ courseId: course.id }}
                to="/customers/courses/$courseId"
              >
                {course.title}
              </Link>
            </li>
          )}
        </For>
        <li>
          <Link
            activeProps={{ class: "border-transparent bg-[#e3efec] font-semibold text-[#0f5b54]" }}
            class="block whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm text-[#4b5654] learn-hairline"
            to="/customers/verwaltung"
          >
            Verwaltung
          </Link>
        </li>
      </ul>
    </nav>
  )
}
