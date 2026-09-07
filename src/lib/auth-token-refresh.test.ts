import { describe, expect, test } from "bun:test"

import { authTokenRefreshCreate } from "./auth-token-refresh"

describe("auth token refresh", () => {
  test("shares a concurrent refresh request", async () => {
    const refresh = authTokenRefreshCreate<string>()
    let refreshCalls = 0
    let resolveRefresh: ((token: string) => void) | undefined

    const first = refresh.run(
      () =>
        new Promise((resolve) => {
          refreshCalls += 1
          resolveRefresh = resolve
        }),
    )
    const second = refresh.run(async () => "unexpected second request")

    expect(second).toBe(first)
    expect(refreshCalls).toBe(1)

    resolveRefresh?.("fresh-token")
    expect(await Promise.all([first, second])).toEqual(["fresh-token", "fresh-token"])
  })
})
