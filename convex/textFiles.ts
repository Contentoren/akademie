import { v } from "convex/values"

import { textFileKind } from "./schema"
import { mutation, query } from "./_generated/server"
import { requireAuth } from "./requireAuth"

export const listByCustomer = query({
  args: { token: v.string(), customerId: v.id("customers") },
  handler: async (ctx, args) => {
    await requireAuth(ctx, args.token)

    return await ctx.db
      .query("textFiles")
      .withIndex("by_customer_updatedAt", (q) => q.eq("customerId", args.customerId))
      .order("desc")
      .collect()
  },
})

export const get = query({
  args: { token: v.string(), fileId: v.id("textFiles") },
  handler: async (ctx, args) => {
    await requireAuth(ctx, args.token)

    const file = await ctx.db.get(args.fileId)

    if (!file) {
      return null
    }

    return {
      file,
      customer: await ctx.db.get(file.customerId),
    }
  },
})

export const create = mutation({
  args: {
    token: v.string(),
    customerId: v.id("customers"),
    title: v.string(),
    content: v.string(),
    kind: textFileKind,
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx, args.token)

    const now = Date.now()

    return await ctx.db.insert("textFiles", {
      customerId: args.customerId,
      title: args.title.trim(),
      content: args.content,
      kind: args.kind,
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const update = mutation({
  args: {
    token: v.string(),
    fileId: v.id("textFiles"),
    title: v.string(),
    content: v.string(),
    kind: textFileKind,
  },
  handler: async (ctx, args) => {
    await requireAuth(ctx, args.token)

    await ctx.db.patch(args.fileId, {
      title: args.title.trim(),
      content: args.content,
      kind: args.kind,
      updatedAt: Date.now(),
    })
  },
})

export const remove = mutation({
  args: { token: v.string(), fileId: v.id("textFiles") },
  handler: async (ctx, args) => {
    await requireAuth(ctx, args.token)

    const linkedProgress = await ctx.db
      .query("progress")
      .filter((q) => q.eq(q.field("sourceTextFileId"), args.fileId))
      .collect()

    for (const item of linkedProgress) {
      await ctx.db.patch(item._id, { sourceTextFileId: undefined, updatedAt: Date.now() })
    }

    await ctx.db.delete(args.fileId)
  },
})
