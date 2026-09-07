import { googleTokenRequestInitCreate } from "./googleTokenRequestInit"

export const googleOAuthFetch = (async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const requestInit = googleTokenRequestInitCreate(init)
  if (!requestInit.success) {
    return new Response(null, { status: 500, statusText: "Google OAuth configuration error" })
  }

  return fetch(input, requestInit.data)
}) as typeof fetch
