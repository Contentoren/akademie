#!/usr/bin/env bash
set -euo pipefail

# Deploy the self-hosted Convex backend through the rootless prodctl broker.
# Runtime secrets stay on this workstation and are never part of the archive.

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." >/dev/null 2>&1 && pwd)"
ENV_NAME="${1:-production}"
FROM_CHECKOUT=0
if [[ "$ENV_NAME" == "--from-checkout" ]]; then
  ENV_NAME=production
  FROM_CHECKOUT=1
elif [[ "${2:-}" == "--from-checkout" ]]; then
  FROM_CHECKOUT=1
fi

case "$ENV_NAME" in
  development)
    APP="${PRODCTL_APP:-akademie-dev}"
    CONVEX_HOST="${CONVEX_HOST:-convex-akademie-dev.contentoren.de}"
    API_HOST="${API_HOST:-api-akademie-dev.contentoren.de}"
    INSTANCE_NAME=development
    ;;
  production)
    APP="${PRODCTL_APP:-akademie}"
    CONVEX_HOST="${CONVEX_HOST:-convex-akademie.contentoren.de}"
    API_HOST="${API_HOST:-api-akademie.contentoren.de}"
    INSTANCE_NAME=production
    ;;
  *)
    echo "Usage: $0 <development|production> [--from-checkout]" >&2
    exit 1
    ;;
esac

ENV_FILE="$REPO_DIR/.env.$ENV_NAME"
if (( FROM_CHECKOUT == 0 )); then
  [[ -f "$ENV_FILE" ]] || { echo "$ENV_FILE is required" >&2; exit 2; }
fi
command -v prodctl >/dev/null 2>&1 || { echo "prodctl client is required" >&2; exit 1; }

archive_release() {
  local archive="$1" temp="$2" sha
  sha="$(git -C "$REPO_DIR" rev-parse HEAD)"
  git -C "$REPO_DIR" archive --format=tar HEAD -o "$archive"
  # ops/prod may be changed while validating a release; it is non-secret.
  tar --append -f "$archive" -C "$REPO_DIR" ops/prod
  printf '%s\n' "$sha" >"$temp/.prodctl-sha"
  tar --append -f "$archive" -C "$temp" .prodctl-sha
  cat >"$temp/.prodctl-config" <<EOF
APP_NAME=$APP
CONVEX_HOST=$CONVEX_HOST
API_HOST=$API_HOST
INSTANCE_NAME=$INSTANCE_NAME
EOF
  tar --append -f "$archive" -C "$temp" .prodctl-config
}

deploy_from_checkout() {
  local archive temp
  archive="$(mktemp)"
  temp="$(mktemp -d)"
  trap 'rm -f "$archive"; rm -rf "$temp"' RETURN
  archive_release "$archive" "$temp"

  if ! prodctl status "$APP" >/dev/null 2>&1; then
    prodctl create "$APP" --type quadlet --mem 4G --cpu 200% \
      --route "convex:$CONVEX_HOST" \
      --route "api:$API_HOST"
  fi

  # prodctl validates this forced command; the client has no root privileges.
  ssh -o BatchMode=yes -o IdentitiesOnly=yes contentoren-prodctl deploy "$APP" <"$archive"
}

write_env_value() {
  local env_file="$1" name="$2" value="$3"
  ENV_FILE="$env_file" ENV_NAME="$name" ENV_VALUE="$value" python3 - <<'PY'
import os
from pathlib import Path

path = Path(os.environ["ENV_FILE"])
name = os.environ["ENV_NAME"]
value = os.environ["ENV_VALUE"]
lines = path.read_text().splitlines()
updated, replaced = [], False
for line in lines:
    raw = line.strip()
    candidate = raw[7:].lstrip() if raw.startswith("export ") else raw
    if "=" in candidate and not candidate.startswith("#"):
        current = candidate.split("=", 1)[0].strip()
        if current == name:
            updated.append(f"{name}={value!r}")
            replaced = True
            continue
    updated.append(line)
if not replaced:
    updated.append(f"{name}={value!r}")
path.write_text("\n".join(updated).rstrip() + "\n")
PY
}

ensure_auth_keys() {
  local env_file="$1"
  ENV_FILE="$env_file" bun -e '
import { readFileSync, writeFileSync } from "node:fs"
import { exportJWK, exportPKCS8, generateKeyPair } from "jose"

const path = process.env.ENV_FILE
if (!path) throw new Error("ENV_FILE is required")
const source = readFileSync(path, "utf8")
const singleQuote = String.fromCharCode(39)
const doubleQuote = String.fromCharCode(34)
const value = (name) => {
  const match = source.match(new RegExp(`^(?:export\\s+)?${name}\\s*=\\s*(.*)$`, "m"))
  if (!match) return ""
  const raw = match[1].trim()
  if ((raw.startsWith(doubleQuote) && raw.endsWith(doubleQuote)) || (raw.startsWith(singleQuote) && raw.endsWith(singleQuote))) return raw.slice(1, -1)
  return raw
}

const privateKey = value("JWT_PRIVATE_KEY")
const jwks = value("JWKS")
if (privateKey || jwks) {
  if (!privateKey || !jwks) throw new Error("JWT_PRIVATE_KEY and JWKS must be configured together")
  process.exit(0)
}

const keys = await generateKeyPair("RS256", { extractable: true })
const privateKeyValue = (await exportPKCS8(keys.privateKey)).trimEnd().replaceAll("\n", " ")
const publicKey = await exportJWK(keys.publicKey)
const jwksValue = JSON.stringify({ keys: [{ use: "sig", ...publicKey }] })
const quote = (input) => singleQuote + input.replaceAll(singleQuote, singleQuote + "\\\\" + singleQuote + singleQuote) + singleQuote
const replacement = {
  JWT_PRIVATE_KEY: quote(privateKeyValue),
  JWKS: quote(jwksValue),
}
let output = source
for (const [name, next] of Object.entries(replacement)) {
  const line = new RegExp(`^(?:export\\s+)?${name}\\s*=.*$`, "m")
  output = line.test(output) ? output.replace(line, `${name}=${next}`) : `${output.trimEnd()}\n${name}=${next}\n`
}
writeFileSync(path, output.endsWith("\n") ? output : `${output}\n`, { mode: 0o600 })
'
  chmod 600 "$env_file"
}

deploy_from_checkout

if (( FROM_CHECKOUT == 1 )); then
  echo "Backend deployed from checkout: $APP"
  exit 0
fi

key="$(prodctl credential "$APP" --convex-admin-key)"
umask 077
write_env_value "$ENV_FILE" CONVEX_SELF_HOSTED_URL "https://$CONVEX_HOST"
write_env_value "$ENV_FILE" CONVEX_SELF_HOSTED_ADMIN_KEY "$key"
write_env_value "$ENV_FILE" VITE_CONVEX_URL "https://$CONVEX_HOST"
write_env_value "$ENV_FILE" CONVEX_SITE_URL "https://$API_HOST"
ensure_auth_keys "$ENV_FILE"

runtime_env="$(mktemp)"
trap 'rm -f "$runtime_env"' EXIT
chmod 600 "$runtime_env"
printf 'CONVEX_SELF_HOSTED_URL=https://%s\nCONVEX_SELF_HOSTED_ADMIN_KEY=%s\n' "$CONVEX_HOST" "$key" >"$runtime_env"
(cd "$REPO_DIR" && bun convex deploy --env-file="$runtime_env")
(cd "$REPO_DIR" && bash ops/convex/env_update.bash "$ENV_NAME")

echo "Backend deployed: $APP"
