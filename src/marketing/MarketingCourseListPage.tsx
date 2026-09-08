import { For, type JSX } from "solid-js"

import { marketingCopy } from "#src/marketing/model/marketingCopy"
import type { MarketingLanguage } from "#src/marketing/model/marketingLanguage"
import { marketingCourses } from "#src/marketing/model/marketingCourses"
import { MarketingAccessCard } from "#src/marketing/ui/MarketingAccessCard"
import { MarketingCourseCard } from "#src/marketing/ui/MarketingCourseCard"
import { MarketingLayout } from "#src/marketing/ui/MarketingLayout"

export function MarketingCourseListPage(props: { language: MarketingLanguage }): JSX.Element {
  const copy = () => marketingCopy[props.language]

  return (
    <MarketingLayout language={props.language}>
      <div class="space-y-10">
        <header class="max-w-2xl space-y-3">
          <h1 class="learn-serif text-3xl font-semibold text-[#16211f] sm:text-4xl">{copy().coursesTitle}</h1>
          <p class="text-[0.98rem] leading-relaxed text-[#5a6462]">{copy().coursesText}</p>
        </header>

        <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <For each={marketingCourses}>
            {(course) => <MarketingCourseCard course={course} language={props.language} />}
          </For>
        </div>

        <MarketingAccessCard language={props.language} />
      </div>
    </MarketingLayout>
  )
}
