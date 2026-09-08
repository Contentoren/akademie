import { For, type JSX } from "solid-js"

import { marketingCopy } from "#src/marketing/model/marketingCopy"
import type { MarketingLanguage } from "#src/marketing/model/marketingLanguage"
import { marketingCourses } from "#src/marketing/model/marketingCourses"
import { marketingPathCourses } from "#src/marketing/model/marketingPathCourses"
import { MarketingAccessCard } from "#src/marketing/ui/MarketingAccessCard"
import { MarketingCourseCard } from "#src/marketing/ui/MarketingCourseCard"
import { MarketingLayout } from "#src/marketing/ui/MarketingLayout"

export function MarketingHomePage(props: { language: MarketingLanguage }): JSX.Element {
  const copy = () => marketingCopy[props.language]

  return (
    <MarketingLayout language={props.language}>
      <div class="space-y-12">
        <section class="max-w-2xl space-y-5">
          <h1 class="learn-serif text-3xl font-semibold text-[#16211f] sm:text-4xl">{copy().heroTitle}</h1>
          <p class="text-[0.98rem] leading-relaxed text-[#5a6462]">{copy().heroText}</p>
          <a
            class="inline-flex min-h-11 items-center rounded-full bg-[#0f6f66] px-6 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"
            href={marketingPathCourses(props.language)}
          >
            {copy().heroCourses}
          </a>
        </section>

        <section aria-labelledby="marketing-method" class="space-y-4">
          <h2 id="marketing-method" class="learn-serif border-b pb-2 text-lg font-semibold text-[#16211f] learn-hairline">
            {copy().methodTitle}
          </h2>
          <ol class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <For each={marketingCourses[0]?.method[props.language] ?? []}>
              {(step, index) => (
                <li class="learn-card p-5">
                  <span class="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">{index() + 1}</span>
                  <p class="mt-2 text-sm font-semibold text-[#16211f]">{step}</p>
                </li>
              )}
            </For>
          </ol>
        </section>

        <section aria-labelledby="marketing-courses" class="space-y-4">
          <h2 id="marketing-courses" class="learn-serif border-b pb-2 text-lg font-semibold text-[#16211f] learn-hairline">
            {copy().coursesTitle}
          </h2>
          <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <For each={marketingCourses}>
              {(course) => <MarketingCourseCard course={course} language={props.language} />}
            </For>
          </div>
        </section>

        <MarketingAccessCard language={props.language} />
      </div>
    </MarketingLayout>
  )
}
