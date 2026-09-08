import type { JSX } from "solid-js"

import type { MarketingLanguage } from "#src/marketing/model/marketingLanguage"
import { MarketingFooter } from "#src/marketing/ui/MarketingFooter"
import { MarketingHeader } from "#src/marketing/ui/MarketingHeader"

export function MarketingLayout(props: { language: MarketingLanguage; children?: JSX.Element }): JSX.Element {
  return (
    <div class="flex min-h-screen flex-col bg-[#f7f5f1]">
      <MarketingHeader language={props.language} />
      <main class="learn-shell flex-1 py-12 sm:py-16">{props.children}</main>
      <MarketingFooter language={props.language} />
    </div>
  )
}
