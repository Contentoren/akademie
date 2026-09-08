import { SignJWT } from "jose"

export type AuthLoginMethod = "password" | "google"
export type AuthTokenCreated = { token: string; jti: string; expiresAt: number }

const AUTH_SESSION_DURATION_MS = 14 * 24 * 60 * 60 * 1000
const AUTH_SECRET_MIN_LENGTH = 32

export async function authTokenCreate(
  userId: string,
  loginMethod: AuthLoginMethod,
  now = Date.now(),
  secret = process.env.AUTH_SECRET,
): Promise<AuthTokenCreated> {
  if (!secret) {
    throw new Error("AUTH_SECRET is required")
  }
  if (secret.length < AUTH_SECRET_MIN_LENGTH) {
    throw new Error("AUTH_SECRET must contain at least 32 characters")
  }

  const issuedAt = Math.floor(now / 1000)
  const expiresAt = now + AUTH_SESSION_DURATION_MS
  const jti = crypto.randomUUID()
  const token = await new SignJWT({ loginMethod })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer("akademie")
    .setAudience("akademie")
    .setSubject(userId)
    .setJti(jti)
    .setIssuedAt(issuedAt)
    .setExpirationTime(Math.floor(expiresAt / 1000))
    .sign(new TextEncoder().encode(secret))

  return { token, jti, expiresAt }
}
