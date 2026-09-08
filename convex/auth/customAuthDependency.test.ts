import { describe, expect, test } from "bun:test"

import packageJson from "../../package.json"

describe("custom auth dependency boundary", () => {
  test("does not depend on the removed Auth.js or Convex Auth packages", async () => {
    const dependencies = packageJson.dependencies as Record<string, string>
    expect(dependencies["@auth/core"]).toBeUndefined()
    expect(dependencies["@convex-dev/auth"]).toBeUndefined()

    const lockfile = await Bun.file(new URL("../../bun.lock", import.meta.url)).text()
    expect(lockfile).not.toContain('"@auth/core"')
    expect(lockfile).not.toContain('"@convex-dev/auth"')
  })
})
