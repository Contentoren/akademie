#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CONFIG_DIR="${XDG_CONFIG_HOME:-$HOME/.config}"
USER_UNIT_DIR="$CONFIG_DIR/systemd/user"
UNITS=("$SCRIPT_DIR"/*.service)

[[ ${#UNITS[@]} -eq 1 ]] || { echo "Expected one service unit in $SCRIPT_DIR" >&2; exit 1; }
UNIT="${UNITS[0]}"
UNIT_NAME="$(basename "$UNIT")"
PROJECT_NAME="$(basename "$REPO_DIR")"

ln -sfn "$REPO_DIR" "$HOME/$PROJECT_NAME"
mkdir -p "$USER_UNIT_DIR"
ln -sfn "$UNIT" "$USER_UNIT_DIR/$UNIT_NAME"
systemctl --user daemon-reload
loginctl enable-linger "$USER" || true
systemctl --user enable --now "$UNIT_NAME"
