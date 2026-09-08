import { ConvexError } from "convex/values"

import type { MutationCtx, QueryCtx } from "./_generated/server"
import { authTokenVerify } from "./auth/authTokenVerify"

export async function requireAuth(ctx: QueryCtx | MutationCtx, token: string) {
  const verifiedToken = await authTokenVerify(token)
  if (!verifiedToken || verifiedToken.expiresAt <= Date.now()) {
    throw new ConvexError("AUTH_REQUIRED")
  }

  const session = await ctx.db
    .query("customAuthSessions")
    .withIndex("by_jti", (q) => q.eq("jti", verifiedToken.jti))
    .first()
  if (!session || session.revokedAt !== undefined || session.expiresAt <= Date.now() || session.userId.toString() !== verifiedToken.userId) {
    throw new ConvexError("AUTH_REQUIRED")
  }

  const user = await ctx.db.get(session.userId)
  if (!user) {
    throw new ConvexError("AUTH_REQUIRED")
  }

  return session.userId
}
