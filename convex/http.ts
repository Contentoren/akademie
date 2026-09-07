import { httpActionGeneric, httpRouter } from "convex/server"

import { auth } from "./auth"
import { googleCallbackRedirectCreate } from "./auth/googleCallbackRedirect"

const http = httpRouter()

auth.addHttpRoutes(http)

http.route({
  path: "/api/auth/google",
  method: "GET",
  handler: httpActionGeneric(async (_ctx, request) => {
    const redirect = googleCallbackRedirectCreate(request.url)
    if (!redirect.success) {
      return new Response(null, { status: 400, statusText: "Invalid Google OAuth callback" })
    }

    return new Response(null, {
      status: 302,
      headers: {
        "Cache-Control": "no-store",
        Location: redirect.data,
      },
    })
  }),
})

export default http
