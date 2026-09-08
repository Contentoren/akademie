import type { AuthSession } from "./authSession"

export function authSessionIsExpired(session: AuthSession, now = Date.now()): boolean {
  const expiresAt = Date.parse(session.expiresAt)
  return !Number.isFinite(expiresAt) || expiresAt <= now
}
