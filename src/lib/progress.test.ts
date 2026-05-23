import { describe, expect, test } from "bun:test"

import { calculateProgressPercent, nextProgressStatus } from "./progress"

describe("progress", () => {
  test("calculates completed progress percentage", () => {
    expect(calculateProgressPercent([])).toBe(0)
    expect(calculateProgressPercent([{ status: "done" }, { status: "open" }, { status: "in_progress" }])).toBe(33)
    expect(calculateProgressPercent([{ status: "done" }, { status: "done" }])).toBe(100)
  })

  test("cycles progress status", () => {
    expect(nextProgressStatus("open")).toBe("in_progress")
    expect(nextProgressStatus("in_progress")).toBe("done")
    expect(nextProgressStatus("done")).toBe("open")
  })
})
