#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." >/dev/null 2>&1 && pwd)"
SERVICE="akademie-prod"

# TanStack Start emits an SSR server and client assets, not a Pages-compatible
# index.html. The local production service is the release target; project-
# registry/Caddy exposes it publicly.
[[ -f "$REPO_DIR/dist/server/server.js" ]] || {
  echo "Production SSR output missing: run bun run frontend:build first" >&2
  exit 2
}
[[ -d "$REPO_DIR/dist/client" ]] || {
  echo "Production client output missing: run bun run frontend:build first" >&2
  exit 2
}

if systemctl --user is-active --quiet "$SERVICE"; then
  systemctl --user restart "$SERVICE"
else
  bash "$REPO_DIR/ops/install-production-service.bash"
fi

systemctl --user --no-pager --quiet is-active "$SERVICE"
echo "Production SSR frontend active on 127.0.0.1:3122"
