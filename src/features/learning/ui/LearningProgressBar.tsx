import type { JSX } from "solid-js"
import { classArr } from "../../../components/classArr"

export function LearningProgressBar(props: { percent: number; fillClass: string; label: string }): JSX.Element {
  return (
    <div
      aria-label={props.label}
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={props.percent}
      class="h-1.5 w-full overflow-hidden rounded-full bg-[#e6e1d8]"
      role="progressbar"
    >
      <div
        class={classArr("h-full rounded-full transition-[width]", props.fillClass)}
        style={{ width: `${props.percent}%` }}
      />
    </div>
  )
}
