import type { JSX } from "solid-js"

import { marketingCopy } from "#src/marketing/model/marketingCopy"
import type { MarketingCourse } from "#src/marketing/model/marketingCourse"
import type { MarketingLanguage } from "#src/marketing/model/marketingLanguage"
import { marketingPathCourse } from "#src/marketing/model/marketingPathCourse"

export function MarketingCourseCard(props: { course: MarketingCourse; language: MarketingLanguage }): JSX.Element {
  const copy = () => marketingCopy[props.language]

  return (
    <a
      class="learn-card flex flex-col gap-3 p-6 transition hover:border-[#c9c2b4]"
      href={marketingPathCourse(props.language, props.course.slug)}
    >
      <p class="text-xs text-[#8c928f]">
        {props.course.modules.length} {copy().modules} · {props.course.totalMinutes} {copy().minutesShort}
      </p>
      <h3 class="learn-serif text-xl font-semibold text-[#16211f]">{props.course.title[props.language]}</h3>
      <p class="text-sm leading-relaxed text-[#5a6462]">{props.course.tagline[props.language]}</p>
      <span class="mt-auto pt-2 text-sm font-semibold text-[#0f6f66]">{copy().courseDetails} →</span>
    </a>
  )
}
