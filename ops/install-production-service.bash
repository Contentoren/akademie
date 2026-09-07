#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG_DIR="${XDG_CONFIG_HOME:-$HOME/.config}"
USER_UNIT_DIR="$CONFIG_DIR/systemd/user"
UNIT_NAME="akademie-prod.service"

[[ -f "$REPO_DIR/dist/server/server.js" ]] || {
  echo "Production build missing: run bun run frontend:build first" >&2
  exit 2
}
[[ -d "$REPO_DIR/dist/client" ]] || {
  echo "Production client output missing: run bun run frontend:build first" >&2
  exit 2
}

mkdir -p "$USER_UNIT_DIR"
ln -sfn "$REPO_DIR/ops/akademie-prod.service" "$USER_UNIT_DIR/$UNIT_NAME"
systemctl --user daemon-reload
loginctl enable-linger "$USER" || true
systemctl --user enable --now "$UNIT_NAME"
