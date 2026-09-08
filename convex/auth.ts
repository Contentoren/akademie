import { ConvexError, v } from "convex/values"

import { internal } from "./_generated/api"
import type { Doc, Id } from "./_generated/dataModel"
import { action, internalMutation, internalQuery, mutation, query, type ActionCtx } from "./_generated/server"
import { authSha256Create } from "./auth/authSha256Create"
import { authTokenCreate } from "./auth/authTokenCreate"
import { authTokenVerify } from "./auth/authTokenVerify"
import { passwordHashCreate } from "./auth/passwordHashCreate"
import { passwordHashVerify } from "./auth/passwordHashVerify"
import { requireAuth } from "./requireAuth"

const loginMethod = v.union(v.literal("password"), v.literal("google"))

export type AuthSessionResponse = {
  token: string
  tokenType: "Bearer"
  expiresAt: string
  user: {
    id: string
    email: string
    name?: string
    image?: string
  }
}

export const signUp = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args): Promise<AuthSessionResponse> => {
    const email = authEmailNormalize(args.email)
    authPasswordValidate(args.password)
    const passwordHash = await passwordHashCreate(args.password)
    const userId = await ctx.runMutation(internal.auth.customAuthPasswordUserCreate, { email, passwordHash })
    return await authSessionIssue(ctx, userId, "password")
  },
})

export const signIn = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args): Promise<AuthSessionResponse> => {
    const email = authEmailNormalize(args.email)
    authPasswordValidate(args.password)
    const credentials = await ctx.runQuery(internal.auth.customAuthCredentialsGet, { email })

    if (!credentials || !(await passwordHashVerify(args.password, credentials.password.passwordHash))) {
      throw new ConvexError("AUTH_INVALID_CREDENTIALS")
    }

    return await authSessionIssue(ctx, credentials.user._id, "password")
  },
})

export const exchangeGoogleCode = action({
  args: { code: v.string() },
  handler: async (ctx, args): Promise<AuthSessionResponse> => {
    if (args.code.trim().length < 20) {
      throw new ConvexError("AUTH_INVALID_OAUTH_CODE")
    }

    const codeHash = await authSha256Create(args.code)
    const userId = await ctx.runMutation(internal.auth.customAuthOAuthExchangeConsume, { codeHash })
    if (!userId) {
      throw new ConvexError("AUTH_INVALID_OAUTH_CODE")
    }

    return await authSessionIssue(ctx, userId, "google")
  },
})

export const signOut = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const verifiedToken = await authTokenVerify(args.token)
    if (!verifiedToken) {
      return { revoked: false }
    }

    const session = await ctx.db
      .query("customAuthSessions")
      .withIndex("by_jti", (q) => q.eq("jti", verifiedToken.jti))
      .first()

    if (!session || session.revokedAt !== undefined || session.userId.toString() !== verifiedToken.userId) {
      return { revoked: false }
    }

    await ctx.db.patch(session._id, { revokedAt: Date.now() })
    return { revoked: true }
  },
})

export const currentUser = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx, args.token)
    const user = await ctx.db.get(userId)
    if (!user) {
      throw new ConvexError("AUTH_REQUIRED")
    }

    return authUserResponseCreate(user)
  },
})

export const customAuthUserByEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("customAuthUsers").withIndex("by_email", (q) => q.eq("email", args.email)).first()
  },
})

export const customAuthUserById = internalQuery({
  args: { userId: v.id("customAuthUsers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId)
  },
})

export const customAuthCredentialsGet = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.query("customAuthUsers").withIndex("by_email", (q) => q.eq("email", args.email)).first()
    if (!user) {
      return null
    }

    const password = await ctx.db
      .query("customAuthPasswords")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first()
    if (!password) {
      return null
    }

    return { user, password }
  },
})

export const customAuthPasswordUserCreate = internalMutation({
  args: { email: v.string(), passwordHash: v.string() },
  handler: async (ctx, args): Promise<Id<"customAuthUsers">> => {
    const existingUser = await ctx.db.query("customAuthUsers").withIndex("by_email", (q) => q.eq("email", args.email)).first()
    if (existingUser) {
      throw new ConvexError("AUTH_EMAIL_EXISTS")
    }

    const now = Date.now()
    const userId = await ctx.db.insert("customAuthUsers", { email: args.email, createdAt: now, updatedAt: now })
    await ctx.db.insert("customAuthPasswords", { userId, passwordHash: args.passwordHash, createdAt: now, updatedAt: now })
    return userId
  },
})

export const customAuthGoogleUserUpsert = internalMutation({
  args: {
    email: v.string(),
    providerAccountId: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<Id<"customAuthUsers">> => {
    const now = Date.now()
    const existingAccount = await ctx.db
      .query("customAuthAccounts")
      .withIndex("by_provider_account", (q) => q.eq("provider", "google").eq("providerAccountId", args.providerAccountId))
      .first()

    if (existingAccount) {
      const existingUser = await ctx.db.get(existingAccount.userId)
      if (!existingUser) {
        throw new ConvexError("AUTH_ACCOUNT_INVALID")
      }

      await ctx.db.patch(existingUser._id, {
        email: args.email,
        name: args.name,
        image: args.image,
        emailVerifiedAt: now,
        updatedAt: now,
      })
      await ctx.db.patch(existingAccount._id, { updatedAt: now })
      return existingUser._id
    }

    const existingUser = await ctx.db.query("customAuthUsers").withIndex("by_email", (q) => q.eq("email", args.email)).first()
    const userId = existingUser
      ? existingUser._id
      : await ctx.db.insert("customAuthUsers", {
          email: args.email,
          name: args.name,
          image: args.image,
          emailVerifiedAt: now,
          createdAt: now,
          updatedAt: now,
        })

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        name: args.name,
        image: args.image,
        emailVerifiedAt: now,
        updatedAt: now,
      })
    }

    await ctx.db.insert("customAuthAccounts", {
      userId,
      provider: "google",
      providerAccountId: args.providerAccountId,
      createdAt: now,
      updatedAt: now,
    })
    return userId
  },
})

export const customAuthSessionCreate = internalMutation({
  args: { userId: v.id("customAuthUsers"), jti: v.string(), loginMethod, expiresAt: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert("customAuthSessions", {
      userId: args.userId,
      jti: args.jti,
      loginMethod: args.loginMethod,
      expiresAt: args.expiresAt,
      createdAt: Date.now(),
    })
  },
})

export const customAuthOAuthStateCreate = internalMutation({
  args: { stateHash: v.string(), codeVerifier: v.string(), nonce: v.string(), returnTo: v.string(), expiresAt: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert("customAuthOAuthStates", { ...args, createdAt: Date.now() })
  },
})

export const customAuthOAuthStateConsume = internalMutation({
  args: { stateHash: v.string() },
  handler: async (ctx, args) => {
    const state = await ctx.db
      .query("customAuthOAuthStates")
      .withIndex("by_stateHash", (q) => q.eq("stateHash", args.stateHash))
      .first()
    const now = Date.now()
    if (!state || state.consumedAt !== undefined || state.expiresAt <= now) {
      return null
    }

    await ctx.db.patch(state._id, { consumedAt: now })
    return state
  },
})

export const customAuthOAuthExchangeCreate = internalMutation({
  args: { codeHash: v.string(), userId: v.id("customAuthUsers"), expiresAt: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert("customAuthOAuthExchanges", { ...args, createdAt: Date.now() })
  },
})

export const customAuthOAuthExchangeConsume = internalMutation({
  args: { codeHash: v.string() },
  handler: async (ctx, args): Promise<Id<"customAuthUsers"> | null> => {
    const exchange = await ctx.db
      .query("customAuthOAuthExchanges")
      .withIndex("by_codeHash", (q) => q.eq("codeHash", args.codeHash))
      .first()
    const now = Date.now()
    if (!exchange || exchange.consumedAt !== undefined || exchange.expiresAt <= now) {
      return null
    }

    await ctx.db.patch(exchange._id, { consumedAt: now })
    return exchange.userId
  },
})

async function authSessionIssue(ctx: Pick<ActionCtx, "runQuery" | "runMutation">, userId: Id<"customAuthUsers">, loginMethodValue: "password" | "google") {
  const token = await authTokenCreate(String(userId), loginMethodValue)
  await ctx.runMutation(internal.auth.customAuthSessionCreate, {
    userId,
    jti: token.jti,
    loginMethod: loginMethodValue,
    expiresAt: token.expiresAt,
  })

  const user = await ctx.runQuery(internal.auth.customAuthUserById, { userId })
  if (!user) {
    throw new ConvexError("AUTH_ACCOUNT_INVALID")
  }

  return {
    token: token.token,
    tokenType: "Bearer" as const,
    expiresAt: new Date(token.expiresAt).toISOString(),
    user: authUserResponseCreate(user),
  }
}

function authEmailNormalize(email: string): string {
  const normalized = email.trim().toLowerCase()
  if (!normalized || normalized.length > 320 || !/^\S+@\S+\.\S+$/u.test(normalized)) {
    throw new ConvexError("AUTH_INVALID_INPUT")
  }
  return normalized
}

function authPasswordValidate(password: string): void {
  if (password.length < 8 || password.length > 256) {
    throw new ConvexError("AUTH_INVALID_INPUT")
  }
}

function authUserResponseCreate(user: Doc<"customAuthUsers">) {
  return {
    id: String(user._id),
    email: user.email,
    ...(user.name ? { name: user.name } : {}),
    ...(user.image ? { image: user.image } : {}),
  }
}
