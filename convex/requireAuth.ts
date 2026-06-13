import { getAuthUserId } from "@convex-dev/auth/server"
import { ConvexError } from "convex/values"

import type { MutationCtx, QueryCtx } from "./_generated/server"

export async function requireAuth(ctx: QueryCtx | MutationCtx) {
  const userId = await getAuthUserId(ctx)

  if (userId === null) {
    throw new ConvexError("AUTH_REQUIRED")
  }

  return userId
}
