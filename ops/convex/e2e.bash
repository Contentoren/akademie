#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." >/dev/null 2>&1 && pwd)"
ENV_NAME="${1:-}"

if [[ "$ENV_NAME" != "development" && "$ENV_NAME" != "production" ]]; then
  echo "Usage: $0 <development|production>" >&2
  exit 1
fi

ENV_FILE="$REPO_DIR/.env.$ENV_NAME"
[[ -f "$ENV_FILE" ]] || { echo "Error: $ENV_FILE not found" >&2; exit 2; }

set -a
# The generated env files contain shell-safe quoted values and no commands.
source "$ENV_FILE"
set +a

: "${CONVEX_SELF_HOSTED_URL:?CONVEX_SELF_HOSTED_URL is required}"
: "${CONVEX_SITE_URL:?CONVEX_SITE_URL is required}"

cd "$REPO_DIR"
ENV_NAME="$ENV_NAME" bun -e '
import { ConvexHttpClient } from "convex/browser"

const convexUrl = process.env.CONVEX_SELF_HOSTED_URL
const siteUrl = process.env.CONVEX_SITE_URL
if (!convexUrl || !siteUrl) throw new Error("Convex URLs are required")

const versionResponse = await fetch(`${convexUrl}/version`)
if (!versionResponse.ok) throw new Error(`Convex health check failed: ${versionResponse.status}`)

const discoveryResponse = await fetch(`${siteUrl}/.well-known/openid-configuration`)
if (!discoveryResponse.ok) throw new Error(`Convex Auth discovery failed: ${discoveryResponse.status}`)
const discovery = await discoveryResponse.json()
if (discovery.issuer !== siteUrl || discovery.jwks_uri !== `${siteUrl}/.well-known/jwks.json`) {
  throw new Error("Convex Auth discovery points at the wrong site URL")
}

const client = new ConvexHttpClient(convexUrl)
const email = `akademie-e2e-${Date.now()}-${Math.random().toString(36).slice(2)}@example.invalid`
const password = `E2e-${crypto.randomUUID()}-password`
const signInResult = await client.action("auth:signIn", {
  provider: "password",
  params: { flow: "signUp", email, password },
})
const token = signInResult?.tokens?.token
if (typeof token !== "string" || token.length < 32) throw new Error("Convex Auth did not return a JWT")

client.setAuth(token)
const overview = await client.query("dashboard:overview", {})
if (typeof overview?.customerCount !== "number") throw new Error("Authenticated dashboard query failed")

console.log(`Backend E2E passed (${process.env.ENV_NAME ?? "configured"})`)
'
