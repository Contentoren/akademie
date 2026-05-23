export type ProgressStatus = "open" | "in_progress" | "done"

export const progressStatusLabels: Record<ProgressStatus, string> = {
  open: "Offen",
  in_progress: "In Arbeit",
  done: "Erledigt",
}

export function calculateProgressPercent(items: Array<{ status: ProgressStatus }>) {
  if (items.length === 0) {
    return 0
  }

  const done = items.filter((item) => item.status === "done").length
  return Math.round((done / items.length) * 100)
}

export function nextProgressStatus(status: ProgressStatus): ProgressStatus {
  if (status === "open") {
    return "in_progress"
  }

  if (status === "in_progress") {
    return "done"
  }

  return "open"
}
