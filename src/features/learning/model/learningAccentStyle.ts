import type { LearningCourse } from "#src/features/learning/model/learningCourse"

export type LearningAccentStyle = {
  /** Background for the CSS-only course cover. */
  cover: string
  /** Foreground ink used on top of the cover. */
  coverInk: string
  /** Soft chip/pill background used in body copy. */
  chip: string
  /** Progress/marker fill. */
  bar: string
}

const styles: Record<LearningCourse["accent"], LearningAccentStyle> = {
  teal: {
    cover: "bg-[linear-gradient(150deg,#0f6f66_0%,#124f4c_100%)]",
    coverInk: "text-[#e8f4f1]",
    chip: "bg-[#e3efec] text-[#0f5b54]",
    bar: "bg-[#0f6f66]",
  },
  lime: {
    cover: "bg-[linear-gradient(150deg,#5f7a1f_0%,#3c5218_100%)]",
    coverInk: "text-[#f1f5e4]",
    chip: "bg-[#eef2e0] text-[#4b6318]",
    bar: "bg-[#5f7a1f]",
  },
  clay: {
    cover: "bg-[linear-gradient(150deg,#a35a3c_0%,#6d3925_100%)]",
    coverInk: "text-[#f8ece6]",
    chip: "bg-[#f3e7e0] text-[#82412a]",
    bar: "bg-[#a35a3c]",
  },
}

export function learningAccentStyle(accent: LearningCourse["accent"]): LearningAccentStyle {
  return styles[accent]
}
