import type { JSX } from "solid-js"

import { cn } from "#src/lib/utils"

type IconProps = Omit<JSX.SvgSVGAttributes<SVGSVGElement>, "title"> & {
  path: string
  title?: string
}

export function Icon({ path, title, class: className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" class={cn("fill-current", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      <path d={path} />
    </svg>
  )
}
