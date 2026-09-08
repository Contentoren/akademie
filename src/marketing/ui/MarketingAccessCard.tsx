import { mdiLockOutline } from "@adaptive-ds/mdi/mdiLockOutline.js"
import { Link } from "@tanstack/solid-router"
import type { JSX } from "solid-js"

import { Icon } from "#src/components/Icon"
import { marketingCopy } from "#src/marketing/model/marketingCopy"
import type { MarketingLanguage } from "#src/marketing/model/marketingLanguage"

export function MarketingAccessCard(props: { language: MarketingLanguage }): JSX.Element {
  const copy = () => marketingCopy[props.language]

  return (
    <section class="learn-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex gap-4">
        <span class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#0f6f66]/10 text-[#0f6f66]">
          <Icon path={mdiLockOutline} class="size-5" />
        </span>
        <div>
          <h2 class="learn-serif text-xl font-semibold text-[#16211f]">{copy().accessTitle}</h2>
          <p class="mt-1 max-w-xl text-sm leading-relaxed text-[#5a6462]">{copy().accessText}</p>
        </div>
      </div>
      <Link
        class="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#0f6f66] px-6 text-sm font-semibold text-white transition hover:bg-[#0c5a53]"
        to="/customers"
      >
        {copy().signIn}
      </Link>
    </section>
  )
}
