import { httpActionGeneric, httpRouter } from "convex/server"

import type { ActionCtx } from "./_generated/server"
import { googleAuthHttpHandler } from "./auth/googleAuthHttpHandler"

const http = httpRouter()

http.route({
  path: "/api/auth/google",
  method: "GET",
  handler: httpActionGeneric((ctx, request) => googleAuthHttpHandler(ctx as unknown as ActionCtx, request)),
})

export default http
