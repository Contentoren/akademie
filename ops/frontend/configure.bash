#!/usr/bin/env bash
set -euo pipefail

# Configure only Akademie's own DNS record and project-registry entries. The
# Convex backend hostnames are managed by the existing prodctl/Cloudflare
# tunnel setup and are deliberately not rewritten here.

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." >/dev/null 2>&1 && pwd)"
CF_BIN_DIR="${CF_BIN_DIR:-$HOME/.local/bin}"
CF_ENV_FILE="${CF_ENV_FILE:-$CF_BIN_DIR/.env}"
CF_ZONE_NAME="${CF_ZONE_NAME:-contentoren.de}"
PRODUCTION_HOST="${PRODUCTION_HOST:-akademie.contentoren.de}"
PREVIEW_HOST="${PREVIEW_HOST:-preview.akademie.contentoren.de}"
PREVIEW_PORT="${PREVIEW_PORT:-3120}"
PRODUCTION_PORT="${PRODUCTION_PORT:-3122}"

require_command() {
  command -v "$1" >/dev/null 2>&1 || {
    echo "required command missing: $1" >&2
    exit 1
  }
}

require_command curl
require_command jq
require_command project-registry
[[ -x "$CF_BIN_DIR/cf_zone_id_get.sh" ]] || {
  echo "Cloudflare helper not found: $CF_BIN_DIR/cf_zone_id_get.sh" >&2
  exit 1
}
[[ -x "$CF_BIN_DIR/cf_dns_record_add.sh" ]] || {
  echo "Cloudflare helper not found: $CF_BIN_DIR/cf_dns_record_add.sh" >&2
  exit 1
}
[[ -x "$CF_BIN_DIR/cf_dns_record_update.sh" ]] || {
  echo "Cloudflare helper not found: $CF_BIN_DIR/cf_dns_record_update.sh" >&2
  exit 1
}
[[ -f "$CF_ENV_FILE" ]] || {
  echo "Cloudflare environment file not found: $CF_ENV_FILE" >&2
  exit 1
}

set -a
# shellcheck disable=SC1090
source "$CF_ENV_FILE"
set +a
if [[ -z "${CLOUDFLARE_API_TOKEN:-}" && -n "${CF_API_TOKEN:-}" ]]; then
  export CLOUDFLARE_API_TOKEN="$CF_API_TOKEN"
fi
: "${CLOUDFLARE_API_TOKEN:?CLOUDFLARE_API_TOKEN or CF_API_TOKEN must be set}"

zone_id="$($CF_BIN_DIR/cf_zone_id_get.sh --env "$CF_ENV_FILE" "$CF_ZONE_NAME")"

dns_record_response() {
  curl -fsS "https://api.cloudflare.com/client/v4/zones/$zone_id/dns_records?name=$PRODUCTION_HOST" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json"
}

record_response="$(dns_record_response)"
[[ "$(jq -r '.success' <<<"$record_response")" == "true" ]] || {
  echo "Cloudflare DNS lookup failed for $PRODUCTION_HOST" >&2
  exit 1
}

record_count="$(jq '.result | length' <<<"$record_response")"
if [[ "$record_count" -gt 1 ]]; then
  echo "Refusing to modify $PRODUCTION_HOST: multiple DNS records exist" >&2
  exit 1
fi

server_ip="${CF_SERVER_IP:-}"
if [[ -z "$server_ip" && "$record_count" == 0 ]]; then
  server_ip="$(getent ahostsv4 "$PREVIEW_HOST" | while read -r ip _rest; do printf '%s\n' "$ip"; done | sort -u | tr '\n' ' ')"
  server_ip="${server_ip%% *}"
fi

if [[ "$record_count" == 0 ]]; then
  [[ -n "$server_ip" ]] || {
    echo "CF_SERVER_IP is required when $PRODUCTION_HOST has no DNS record" >&2
    exit 1
  }
  "$CF_BIN_DIR/cf_dns_record_add.sh" --env "$CF_ENV_FILE" "$PRODUCTION_HOST" "$server_ip"
elif [[ "$(jq -r '.result[0].type' <<<"$record_response")" != "A" ]]; then
  echo "Refusing to modify $PRODUCTION_HOST: existing record is not an A record" >&2
  exit 1
else
  current_ip="$(jq -r '.result[0].content' <<<"$record_response")"
  if [[ -n "$server_ip" && "$current_ip" != "$server_ip" ]]; then
    "$CF_BIN_DIR/cf_dns_record_update.sh" --env "$CF_ENV_FILE" "$PRODUCTION_HOST" "$server_ip"
  else
    echo "DNS already points $PRODUCTION_HOST -> $current_ip"
  fi
fi

configure_project() {
  local name="$1" port="$2" host="$3"
  if project-registry project get "$name" >/dev/null 2>&1; then
    project-registry project edit "$name" \
      --port "$port" \
      --domain "$host" \
      --path "$REPO_DIR" \
      --kind proxy \
      --access external \
      --docs \
      --no-browse \
      --enabled
  else
    project-registry project create \
      --name "$name" \
      --port "$port" \
      --domain "$host" \
      --path "$REPO_DIR" \
      --kind proxy \
      --access external \
      --docs \
      --no-browse \
      --enabled
  fi
}

# Keep the existing preview route on 3120 and move the production hostname to
# its own service/port. project-registry provisions Caddy's HTTPS reverse proxy.
configure_project akademie "$PREVIEW_PORT" "$PREVIEW_HOST"
configure_project akademie-prod "$PRODUCTION_PORT" "$PRODUCTION_HOST"

preview_config="$(project-registry --json project get akademie)"
production_config="$(project-registry --json project get akademie-prod)"
jq -e --arg host "$PREVIEW_HOST" --argjson port "$PREVIEW_PORT" \
  '.data.port == $port and .data.domains == [$host]' <<<"$preview_config" >/dev/null
jq -e --arg host "$PRODUCTION_HOST" --argjson port "$PRODUCTION_PORT" \
  '.data.port == $port and .data.domains == [$host]' <<<"$production_config" >/dev/null

echo "Project registry configured: $PREVIEW_HOST -> 127.0.0.1:$PREVIEW_PORT"
echo "Project registry configured: $PRODUCTION_HOST -> 127.0.0.1:$PRODUCTION_PORT"
