import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

import { legacyConvexAuthTables } from "./legacyConvexAuthTables"

export const textFileKind = v.union(v.literal("profile"), v.literal("progress"), v.literal("note"), v.literal("test"))
export const progressStatus = v.union(v.literal("open"), v.literal("in_progress"), v.literal("done"))

const customAuthLoginMethod = v.union(v.literal("password"), v.literal("google"))

export default defineSchema({
  // Keep the old table definitions while the custom tables are introduced. This
  // lets existing deployments retain their Convex Auth data without importing
  // the library or dropping any tables.
  ...legacyConvexAuthTables,

  customAuthUsers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    emailVerifiedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  customAuthPasswords: defineTable({
    userId: v.id("customAuthUsers"),
    passwordHash: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  customAuthAccounts: defineTable({
    userId: v.id("customAuthUsers"),
    provider: v.literal("google"),
    providerAccountId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_provider_account", ["provider", "providerAccountId"])
    .index("by_userId", ["userId"]),

  customAuthSessions: defineTable({
    userId: v.id("customAuthUsers"),
    jti: v.string(),
    loginMethod: customAuthLoginMethod,
    expiresAt: v.number(),
    createdAt: v.number(),
    lastUsedAt: v.optional(v.number()),
    revokedAt: v.optional(v.number()),
  })
    .index("by_jti", ["jti"])
    .index("by_userId", ["userId"]),

  customAuthOAuthStates: defineTable({
    stateHash: v.string(),
    codeVerifier: v.string(),
    nonce: v.string(),
    returnTo: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
    consumedAt: v.optional(v.number()),
  }).index("by_stateHash", ["stateHash"]),

  customAuthOAuthExchanges: defineTable({
    codeHash: v.string(),
    userId: v.id("customAuthUsers"),
    expiresAt: v.number(),
    createdAt: v.number(),
    consumedAt: v.optional(v.number()),
  }).index("by_codeHash", ["codeHash"]),

  customers: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_updatedAt", ["updatedAt"]),

  textFiles: defineTable({
    customerId: v.id("customers"),
    title: v.string(),
    content: v.string(),
    kind: textFileKind,
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_customer", ["customerId"])
    .index("by_customer_updatedAt", ["customerId", "updatedAt"]),

  progress: defineTable({
    customerId: v.id("customers"),
    label: v.string(),
    status: progressStatus,
    sourceTextFileId: v.optional(v.id("textFiles")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_customer", ["customerId"])
    .index("by_customer_status", ["customerId", "status"]),
})
