import { query } from "./_generated/server"
import { requireAuth } from "./requireAuth"

export const overview = query({
  args: {},
  handler: async (ctx) => {
    await requireAuth(ctx)

    const [customers, textFiles, progressItems] = await Promise.all([
      ctx.db.query("customers").collect(),
      ctx.db.query("textFiles").collect(),
      ctx.db.query("progress").collect(),
    ])

    const doneProgress = progressItems.filter((item) => item.status === "done").length

    return {
      customerCount: customers.length,
      textFileCount: textFiles.length,
      progressCount: progressItems.length,
      doneProgress,
    }
  },
})
