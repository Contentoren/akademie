import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const textFileKind = v.union(v.literal("profile"), v.literal("progress"), v.literal("note"), v.literal("test"))
export const progressStatus = v.union(v.literal("open"), v.literal("in_progress"), v.literal("done"))

export default defineSchema({
  ...authTables,

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
