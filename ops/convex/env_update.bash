#!/usr/bin/env bash
set -euo pipefail

# Sync application environment values into the selected Convex deployment.
# Deployment selectors, CLI credentials, managed Convex values, and Vite-only
# values must stay local.

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." >/dev/null 2>&1 && pwd)"
ENV_NAME="${1:-}"

if [[ "$ENV_NAME" != "development" && "$ENV_NAME" != "production" ]]; then
  echo "Usage: $0 <development|production>" >&2
  exit 1
fi

ENV_FILE="$REPO_DIR/.env.$ENV_NAME"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Error: $ENV_FILE not found" >&2
  exit 2
fi

trim() {
  local value="$1"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  printf '%s' "$value"
}

declare -a keys=()
declare -a values=()
declare -A seen=()

while IFS= read -r line || [[ -n "$line" ]]; do
  line="$(trim "$line")"
  [[ -z "$line" || "$line" == \#* || "$line" != *=* ]] && continue
  [[ "$line" == export\ * ]] && line="$(trim "${line#export }")"

  key="$(trim "${line%%=*}")"
  value="$(trim "${line#*=}")"
  [[ -z "$key" ]] && continue

  case "$key" in
    # These select/authenticate the CLI target and are never deployment env vars.
    CONVEX_DEPLOYMENT|CONVEX_DEPLOY_KEY|CONVEX_DEPLOYMENT_TOKEN|CONVEX_SELF_HOSTED_*)
      continue
      ;;
    # Vite variables are browser build inputs, not backend function configuration.
    VITE_*)
      continue
      ;;
    # These belonged to the removed Convex Auth/JWKS protocol.
    JWT_PRIVATE_KEY|JWKS|CUSTOM_AUTH_SITE_URL)
      continue
      ;;
  esac

  if [[ "$value" == \"*\" && "$value" == *\" ]]; then
    value="${value:1:${#value}-2}"
  elif [[ "$value" == \'*\' && "$value" == *\' ]]; then
    value="${value:1:${#value}-2}"
  fi

  if [[ -n "${seen[$key]+x}" ]]; then
    echo "Error: duplicate environment variable $key in $ENV_FILE" >&2
    exit 3
  fi
  seen["$key"]=1
  keys+=("$key")
  values+=("$value")
done <"$ENV_FILE"

for required in CONVEX_SITE_URL AUTH_SECRET AUTH_GOOGLE_ID AUTH_GOOGLE_SECRET APP_URL; do
  if [[ -z "${seen[$required]+x}" ]]; then
    echo "Error: $required is required in $ENV_FILE" >&2
    exit 4
  fi
  for i in "${!keys[@]}"; do
    if [[ "${keys[$i]}" == "$required" && -z "${values[$i]}" ]]; then
      echo "Error: $required must not be empty in $ENV_FILE" >&2
      exit 4
    fi
  done
done

set_count=0
for i in "${!keys[@]}"; do
  key="${keys[$i]}"
  value="${values[$i]}"
  # Convex derives this built-in from the self-hosted site's origin.
  [[ "$key" == CONVEX_SITE_URL ]] && continue
  echo "Setting Convex env var: $key"
  bun convex env set --env-file="$ENV_FILE" -- "$key" "$value" >/dev/null
  ((set_count += 1))
done

echo "Convex env sync complete ($set_count variables)"
