import { jwtVerify } from "jose"

import type { AuthLoginMethod } from "./authTokenCreate"

export type AuthTokenVerified = { userId: string; jti: string; expiresAt: number; loginMethod: AuthLoginMethod }

export async function authTokenVerify(token: string, secret = process.env.AUTH_SECRET): Promise<AuthTokenVerified | null> {
  if (!secret || secret.length < 32 || !token) {
    return null
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
      issuer: "akademie",
      audience: "akademie",
    })
    const loginMethod = payload.loginMethod

    if (
      typeof payload.sub !== "string" ||
      typeof payload.jti !== "string" ||
      typeof payload.exp !== "number" ||
      (loginMethod !== "password" && loginMethod !== "google")
    ) {
      return null
    }

    return { userId: payload.sub, jti: payload.jti, expiresAt: payload.exp * 1000, loginMethod }
  } catch {
    return null
  }
}
