import * as v from "valibot"

import type { AuthResult } from "./authResult"
import { authSessionSchema, type AuthSession } from "./authSession"

export function authSessionParse(value: unknown): AuthResult<AuthSession> {
  const op = "authSessionParse"
  const result = v.safeParse(authSessionSchema, value)
  if (!result.success) {
    return { success: false, op, errorMessage: v.summarize(result.issues) }
  }

  return { success: true, data: result.output }
}
