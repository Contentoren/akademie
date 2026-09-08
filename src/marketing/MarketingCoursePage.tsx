import { For, Show, type JSX } from "solid-js"

import { marketingCopy } from "#src/marketing/model/marketingCopy"
import { marketingCourseFind } from "#src/marketing/model/marketingCourseFind"
import type { MarketingLanguage } from "#src/marketing/model/marketingLanguage"
import { marketingPathCourses } from "#src/marketing/model/marketingPathCourses"
import { MarketingAccessCard } from "#src/marketing/ui/MarketingAccessCard"
import { MarketingLayout } from "#src/marketing/ui/MarketingLayout"

export function MarketingCoursePage(props: { language: MarketingLanguage; slug: string }): JSX.Element {
  const copy = () => marketingCopy[props.language]
  const course = () => marketingCourseFind(props.slug)

  return (
    <MarketingLayout language={props.language}>
      <Show
        when={course()}
        fallback={<p class="learn-serif text-xl text-[#5a6462]">{copy().notFound}</p>}
      >
        {(current) => (
          <div class="space-y-10">
            <a class="text-sm font-semibold text-[#0f6f66]" href={marketingPathCourses(props.language)}>
              ← {copy().backToCourses}
            </a>

            <header class="max-w-2xl space-y-4">
              <h1 class="learn-serif text-3xl font-semibold text-[#16211f] sm:text-4xl">
                {current().title[props.language]}
              </h1>
              <p class="text-[0.98rem] leading-relaxed text-[#5a6462]">{current().tagline[props.language]}</p>
              <p class="text-[0.98rem] leading-relaxed text-[#5a6462]">{current().description[props.language]}</p>
              <dl class="grid gap-3 text-sm text-[#5a6462] sm:grid-cols-3">
                <div>
                  <dt class="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">{copy().audience}</dt>
                  <dd class="mt-1">{current().audience[props.language]}</dd>
                </div>
                <div>
                  <dt class="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">{copy().totalTime}</dt>
                  <dd class="mt-1">
                    {current().totalMinutes} {copy().minutesShort}
                  </dd>
                </div>
                <div>
                  <dt class="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">{copy().version}</dt>
                  <dd class="mt-1">{current().version}</dd>
                </div>
              </dl>
            </header>

            <section aria-labelledby="course-modules" class="space-y-5">
              <h2 id="course-modules" class="learn-serif border-b pb-2 text-lg font-semibold text-[#16211f] learn-hairline">
                {copy().modules}
              </h2>
              <ol class="space-y-4">
                <For each={current().modules}>
                  {(module) => (
                    <li class="learn-card p-6">
                      <p class="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">
                        M{module.number} · {module.minutes} {copy().minutesShort}
                      </p>
                      <h3 class="learn-serif mt-1.5 text-xl font-semibold text-[#16211f]">
                        {module.title[props.language]}
                      </h3>
                      <p class="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8c928f]">
                        {copy().objectives}
                      </p>
                      <ul class="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#5a6462]">
                        <For each={module.objectives[props.language]}>{(objective) => <li>{objective}</li>}</For>
                      </ul>
                    </li>
                  )}
                </For>
              </ol>
            </section>

            <MarketingAccessCard language={props.language} />
          </div>
        )}
      </Show>
    </MarketingLayout>
  )
}
