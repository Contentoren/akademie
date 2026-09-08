import { Link } from "@tanstack/solid-router"
import type { JSX } from "solid-js"

import { marketingCopy } from "#src/marketing/model/marketingCopy"
import type { MarketingLanguage } from "#src/marketing/model/marketingLanguage"

export function MarketingFooter(props: { language: MarketingLanguage }): JSX.Element {
  const copy = () => marketingCopy[props.language]

  return (
    <footer class="mt-16 border-t border-[#e6e1d8] py-8">
      <div class="learn-shell flex flex-col gap-2 text-sm text-[#8c928f] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} KI-Akademie</p>
        <p>{copy().footerNote}</p>
        <Link class="font-semibold text-[#16211f] underline underline-offset-4" to="/customers">
          {copy().signIn}
        </Link>
      </div>
    </footer>
  )
}
