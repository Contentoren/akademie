import { mdiBookOpenPageVariantOutline } from "@adaptive-ds/mdi/mdiBookOpenPageVariantOutline.js"
import { Link, useRouterState } from "@tanstack/solid-router"
import type { JSX } from "solid-js"

import { Icon } from "#src/components/Icon"
import { marketingCopy } from "#src/marketing/model/marketingCopy"
import type { MarketingLanguage } from "#src/marketing/model/marketingLanguage"
import { marketingPathCourses } from "#src/marketing/model/marketingPathCourses"
import { marketingPathHome } from "#src/marketing/model/marketingPathHome"
import { marketingPathTranslate } from "#src/marketing/model/marketingPathTranslate"

export function MarketingHeader(props: { language: MarketingLanguage }): JSX.Element {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const copy = () => marketingCopy[props.language]
  const otherLanguage = (): MarketingLanguage => (props.language === "de" ? "en" : "de")

  return (
    <header class="sticky top-0 z-40 border-b border-[#e6e1d8] bg-[#f7f5f1]/90 backdrop-blur-xl">
      <div class="learn-shell flex items-center justify-between gap-4 py-3">
        <a class="flex items-center gap-3" href={marketingPathHome(props.language)}>
          <span class="flex size-10 items-center justify-center rounded-xl bg-[#0f6f66] text-white">
            <Icon path={mdiBookOpenPageVariantOutline} class="size-5" />
          </span>
          <span>
            <span class="learn-serif block text-base font-semibold text-[#16211f]">KI-Akademie</span>
            <span class="hidden text-xs text-[#8c928f] sm:block">{copy().brandTagline}</span>
          </span>
        </a>

        <nav class="flex items-center gap-1 text-sm text-[#4b5654]">
          <a class="rounded-full px-3 py-2 transition hover:bg-[#efece5] hover:text-[#16211f]" href={marketingPathCourses(props.language)}>
            {copy().navCourses}
          </a>
          <a
            class="rounded-full px-3 py-2 transition hover:bg-[#efece5] hover:text-[#16211f]"
            href={marketingPathTranslate(pathname(), otherLanguage())}
            hreflang={otherLanguage()}
          >
            {otherLanguage() === "de" ? "Deutsch" : "English"}
          </a>
          <Link
            class="ml-1 inline-flex min-h-11 items-center rounded-full bg-[#0f6f66] px-5 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"
            to="/customers"
          >
            {copy().signIn}
          </Link>
        </nav>
      </div>
    </header>
  )
}
