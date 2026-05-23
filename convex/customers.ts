import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

function cleanOptional(value: string | undefined) {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("customers").withIndex("by_updatedAt").order("desc").collect()
  },
})

export const get = query({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.customerId)
  },
})

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now()

    return await ctx.db.insert("customers", {
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      company: cleanOptional(args.company),
      notes: cleanOptional(args.notes),
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const update = mutation({
  args: {
    customerId: v.id("customers"),
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.customerId, {
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      company: cleanOptional(args.company),
      notes: cleanOptional(args.notes),
      updatedAt: Date.now(),
    })
  },
})

export const remove = mutation({
  args: { customerId: v.id("customers") },
  handler: async (ctx, args) => {
    const [files, progressItems] = await Promise.all([
      ctx.db.query("textFiles").withIndex("by_customer", (q) => q.eq("customerId", args.customerId)).collect(),
      ctx.db.query("progress").withIndex("by_customer", (q) => q.eq("customerId", args.customerId)).collect(),
    ])

    for (const file of files) {
      await ctx.db.delete(file._id)
    }

    for (const item of progressItems) {
      await ctx.db.delete(item._id)
    }

    await ctx.db.delete(args.customerId)
  },
})
