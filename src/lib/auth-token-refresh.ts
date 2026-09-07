export function authTokenRefreshCreate<T>() {
  let inFlight: Promise<T> | null = null

  function run(refresh: () => Promise<T>) {
    if (inFlight) {
      return inFlight
    }

    const request = refresh()
    inFlight = request
    void request.then(clearInFlight, clearInFlight)
    return request
  }

  function wait() {
    return inFlight?.then(
      () => undefined,
      () => undefined,
    )
  }

  function clearInFlight() {
    inFlight = null
  }

  return { run, wait }
}
