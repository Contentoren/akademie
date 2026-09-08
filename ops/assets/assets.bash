#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
repo_dir="$(cd "$script_dir/../.." >/dev/null 2>&1 && pwd)"
assets_service_dir="${ASSETS_SERVICE_DIR:-$repo_dir/../assets-service}"
cli_entrypoint="$assets_service_dir/src/entrypoints/assets-cli.ts"

if [[ ! -f "$cli_entrypoint" ]]; then
  echo "Error: Assets Service CLI entrypoint not found at: $cli_entrypoint" >&2
  echo "Expected sibling checkout at ~/projects/assets-service or ASSETS_SERVICE_DIR override." >&2
  exit 1
fi

env_file="${AKADEMIE_ASSETS_ENV_FILE:-${ASSETS_ENV_FILE:-}}"
if [[ -z "$env_file" && -f "${HOME:-}/.config/akademie/assets-cli.env" ]]; then
  env_file="${HOME:-}/.config/akademie/assets-cli.env"
fi
if [[ -z "$env_file" && -f "$repo_dir/.env.assets" ]]; then
  env_file="$repo_dir/.env.assets"
fi
if [[ -z "$env_file" && -f "$repo_dir/.env" ]]; then
  env_file="$repo_dir/.env"
fi
if [[ -n "$env_file" ]]; then
  if [[ ! -f "$env_file" || ! -r "$env_file" ]]; then
    echo "Error: Assets-service environment file is not readable: $env_file" >&2
    exit 1
  fi
  export ASSETS_ENV_FILE="$env_file"
fi

export ASSETS_API_URL="${ASSETS_API_URL:-https://assets-service.contentoren.de}"
# Let the selected protected environment file provide ASSETS_ENVIRONMENT.
# Keep development as the fallback only when no environment file is configured.
if [[ -z "${ASSETS_ENVIRONMENT:-}" && -z "$env_file" ]]; then
  export ASSETS_ENVIRONMENT="development"
fi
unset ASSETS_PROJECT_ID
export ASSETS_PROJECT="akademie"

bun_bin="$(command -v bun || true)"
if [[ -z "$bun_bin" && -x "${BUN_INSTALL:-$HOME/.bun}/bin/bun" ]]; then
  bun_bin="${BUN_INSTALL:-$HOME/.bun}/bin/bun"
fi
if [[ -z "$bun_bin" ]]; then
  echo "Error: bun runtime is required but was not found on PATH" >&2
  exit 1
fi

export NODE_PATH="${repo_dir}/node_modules:${assets_service_dir}/node_modules:${NODE_PATH:-}"
exec "$bun_bin" run "$cli_entrypoint" "$@"
