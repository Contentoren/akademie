import { createRemoteJWKSet, jwtVerify } from "jose"

import { internal } from "../_generated/api"
import type { ActionCtx } from "../_generated/server"
import { authRandomStringCreate } from "./authRandomStringCreate"
import { authSha256Create } from "./authSha256Create"
import { googleCallbackUrlCreate } from "./googleCallbackUrl"
import { safeReturnToCreate } from "./safeReturnToCreate"

const OAUTH_STATE_COOKIE = "akademie_google_oauth_state"
const OAUTH_STATE_TTL_MS = 10 * 60 * 1000
const OAUTH_EXCHANGE_TTL_MS = 5 * 60 * 1000
const googleJwks = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"))

export async function googleAuthHttpHandler(ctx: ActionCtx, request: Request): Promise<Response> {
  if (request.method !== "GET") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET" } })
  }

  const requestUrl = new URL(request.url)
  const callbackUrl = googleCallbackUrlCreate()
  if (!callbackUrl.success) {
    return new Response("Google OAuth is not configured", { status: 500 })
  }

  const appUrl = process.env.APP_URL || process.env.SITE_URL
  if (!appUrl || !safeReturnToCreate("/", appUrl)) {
    return new Response("Google OAuth return URL is not configured", { status: 500 })
  }

  const isCallback = requestUrl.searchParams.has("code") || requestUrl.searchParams.has("error") || requestUrl.searchParams.has("state")
  if (!isCallback) {
    return await googleAuthStart(ctx, requestUrl, callbackUrl.data, appUrl)
  }

  return await googleAuthCallback(ctx, request, callbackUrl.data)
}

async function googleAuthStart(ctx: ActionCtx, requestUrl: URL, callbackUrl: string, appUrl: string): Promise<Response> {
  const returnTo = safeReturnToCreate(requestUrl.searchParams.get("returnTo"), appUrl)
  if (!returnTo) {
    return new Response("Invalid return URL", { status: 400 })
  }

  const clientId = process.env.AUTH_GOOGLE_ID
  if (!clientId) {
    return new Response("Google OAuth is not configured", { status: 500 })
  }

  const state = authRandomStringCreate()
  const codeVerifier = authRandomStringCreate(48)
  const nonce = authRandomStringCreate()
  await ctx.runMutation(internal.auth.customAuthOAuthStateCreate, {
    stateHash: await authSha256Create(state),
    codeVerifier,
    nonce,
    returnTo,
    expiresAt: Date.now() + OAUTH_STATE_TTL_MS,
  })

  const authorizationUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")
  authorizationUrl.searchParams.set("client_id", clientId)
  authorizationUrl.searchParams.set("redirect_uri", callbackUrl)
  authorizationUrl.searchParams.set("response_type", "code")
  authorizationUrl.searchParams.set("scope", "openid email profile")
  authorizationUrl.searchParams.set("state", state)
  authorizationUrl.searchParams.set("code_challenge", await pkceChallengeCreate(codeVerifier))
  authorizationUrl.searchParams.set("code_challenge_method", "S256")
  authorizationUrl.searchParams.set("nonce", nonce)
  authorizationUrl.searchParams.set("prompt", "select_account")

  const headers = new Headers({
    Location: authorizationUrl.toString(),
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
  })
  headers.append("Set-Cookie", oauthStateCookieCreate(state, new URL(callbackUrl).protocol === "https:"))
  return new Response(null, { status: 302, headers })
}

async function googleAuthCallback(ctx: ActionCtx, request: Request, callbackUrl: string): Promise<Response> {
  const requestUrl = new URL(request.url)
  const state = requestUrl.searchParams.get("state")
  const cookieState = oauthStateCookieRead(request.headers.get("cookie"))
  if (!state || !cookieState || state !== cookieState) {
    return new Response("Invalid OAuth state", { status: 400 })
  }

  const consumedState = await ctx.runMutation(internal.auth.customAuthOAuthStateConsume, {
    stateHash: await authSha256Create(state),
  })
  if (!consumedState) {
    return new Response("Invalid OAuth state", { status: 400 })
  }

  const clearCookie = oauthStateCookieClear(new URL(callbackUrl).protocol === "https:")
  const oauthError = requestUrl.searchParams.get("error")
  if (oauthError) {
    return oauthRedirectCreate(consumedState.returnTo, { authError: "google_denied" }, clearCookie)
  }

  const code = requestUrl.searchParams.get("code")
  const clientId = process.env.AUTH_GOOGLE_ID
  const clientSecret = process.env.AUTH_GOOGLE_SECRET
  if (!code || !clientId || !clientSecret) {
    return new Response("Google OAuth callback is invalid", { status: 400, headers: clearCookie })
  }

  try {
    const tokenResponse = await googleTokenExchange(code, consumedState.codeVerifier, callbackUrl, clientId, clientSecret)
    const profile = await googleProfileVerify(tokenResponse.idToken, clientId, consumedState.nonce)
    const userId = await ctx.runMutation(internal.auth.customAuthGoogleUserUpsert, profile)
    const exchangeCode = authRandomStringCreate()
    await ctx.runMutation(internal.auth.customAuthOAuthExchangeCreate, {
      codeHash: await authSha256Create(exchangeCode),
      userId,
      expiresAt: Date.now() + OAUTH_EXCHANGE_TTL_MS,
    })

    return oauthRedirectCreate(consumedState.returnTo, { authCode: exchangeCode }, clearCookie)
  } catch {
    return oauthRedirectCreate(consumedState.returnTo, { authError: "google_failed" }, clearCookie)
  }
}

async function googleTokenExchange(code: string, codeVerifier: string, callbackUrl: string, clientId: string, clientSecret: string) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: callbackUrl,
      grant_type: "authorization_code",
      code_verifier: codeVerifier,
    }),
  })
  if (!response.ok) {
    throw new Error("Google token exchange failed")
  }

  const body: unknown = await response.json()
  if (!isRecord(body) || typeof body.id_token !== "string" || typeof body.access_token !== "string") {
    throw new Error("Google token response is invalid")
  }

  return { idToken: body.id_token, accessToken: body.access_token }
}

async function googleProfileVerify(idToken: string, clientId: string, nonce: string) {
  const { payload } = await jwtVerify(idToken, googleJwks, {
    algorithms: ["RS256"],
    issuer: ["https://accounts.google.com", "accounts.google.com"],
    audience: clientId,
  })
  if (typeof payload.sub !== "string" || typeof payload.email !== "string" || payload.email_verified !== true || payload.nonce !== nonce) {
    throw new Error("Google profile is not verified")
  }

  const email = payload.email.trim().toLowerCase()
  if (!/^\S+@\S+\.\S+$/u.test(email)) {
    throw new Error("Google profile email is invalid")
  }

  return {
    providerAccountId: payload.sub,
    email,
    ...(typeof payload.name === "string" ? { name: payload.name } : {}),
    ...(typeof payload.picture === "string" ? { image: payload.picture } : {}),
  }
}

async function pkceChallengeCreate(verifier: string): Promise<string> {
  return await authSha256Create(verifier)
}

function oauthStateCookieCreate(state: string, secure: boolean): string {
  return `${OAUTH_STATE_COOKIE}=${state}; Max-Age=${OAUTH_STATE_TTL_MS / 1000}; Path=/api/auth/google; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`
}

function oauthStateCookieClear(secure: boolean): Headers {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
  })
  headers.append("Set-Cookie", `${OAUTH_STATE_COOKIE}=; Max-Age=0; Path=/api/auth/google; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`)
  return headers
}

function oauthStateCookieRead(cookieHeader: string | null): string | null {
  if (!cookieHeader) {
    return null
  }

  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=")
    if (separator === -1 || part.slice(0, separator).trim() !== OAUTH_STATE_COOKIE) {
      continue
    }
    return part.slice(separator + 1).trim() || null
  }
  return null
}

function oauthRedirectCreate(returnTo: string, params: Record<string, string>, headers: Headers): Response {
  const redirectUrl = new URL(returnTo)
  for (const [key, value] of Object.entries(params)) {
    redirectUrl.searchParams.set(key, value)
  }
  headers.set("Location", redirectUrl.toString())
  return new Response(null, { status: 302, headers })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}
