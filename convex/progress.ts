import { v } from "convex/values"

import { progressStatus } from "./schema"
import { mutation, query } from "./_generated/server"

export const listByCustomer = query({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db.query("progress").withIndex("by_customer", (q) => q.eq("customerId", args.customerId)).collect()
  },
})

export const create = mutation({
  args: {
    customerId: v.id("customers"),
    label: v.string(),
    status: progressStatus,
    sourceTextFileId: v.optional(v.id("textFiles")),
  },
  handler: async (ctx, args) => {
    const now = Date.now()

    return await ctx.db.insert("progress", {
      customerId: args.customerId,
      label: args.label.trim(),
      status: args.status,
      sourceTextFileId: args.sourceTextFileId,
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const update = mutation({
  args: {
    progressId: v.id("progress"),
    label: v.string(),
    status: progressStatus,
    sourceTextFileId: v.optional(v.id("textFiles")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.progressId, {
      label: args.label.trim(),
      status: args.status,
      sourceTextFileId: args.sourceTextFileId,
      updatedAt: Date.now(),
    })
  },
})

export const updateStatus = mutation({
  args: {
    progressId: v.id("progress"),
    status: progressStatus,
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.progressId, {
      status: args.status,
      updatedAt: Date.now(),
    })
  },
})

export const remove = mutation({
  args: { progressId: v.id("progress") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.progressId)
  },
})
