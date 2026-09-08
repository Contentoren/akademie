import * as v from "valibot"

export const authSessionSchema = v.object({
  token: v.string(),
  tokenType: v.literal("Bearer"),
  expiresAt: v.pipe(v.string(), v.isoTimestamp()),
  user: v.object({
    id: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
  }),
})

export type AuthSession = v.InferOutput<typeof authSessionSchema>
