#!/usr/bin/env bash
set -euo pipefail

APP_NAME=akademie
CONVEX_HOST=convex-akademie.contentoren.de
API_HOST=api.akademie.contentoren.de
INSTANCE_NAME=production
if [[ -f .prodctl-config ]]; then
  # This file contains only deployment routing metadata, never credentials.
  source ./.prodctl-config
fi

# prodctl writes this state-owned file before install commands run.
config_dir="$HOME/.config/$APP_NAME"
source "$config_dir/prodctl-ports.env"
: "${PRODCTL_PORT_CONVEX:?missing Convex port}"
: "${PRODCTL_PORT_API:?missing API port}"
env_file="$config_dir/convex-backend.env"
mkdir -p "$config_dir"

instance_secret=""
if [[ -f "$env_file" ]]; then
  instance_secret="$(awk -F= '$1 == "INSTANCE_SECRET" { print substr($0, index($0, "=") + 1) }' "$env_file" | tail -n 1)"
fi
if [[ -z "$instance_secret" ]]; then
  instance_secret="$(od -An -N32 -tx1 /dev/urandom | tr -d ' \n')"
fi

umask 077
cat >"$env_file" <<EOF
CONVEX_CLOUD_ORIGIN=https://$CONVEX_HOST
CONVEX_SITE_ORIGIN=https://$API_HOST
NEXT_PUBLIC_DEPLOYMENT_URL=https://$CONVEX_HOST
INSTANCE_NAME=$INSTANCE_NAME
INSTANCE_SECRET=$instance_secret
DISABLE_BEACON=true
EOF
chmod 600 "$env_file"

python3 - "ops/prod/podman/akademie-convex-backend.container.in" \
  "ops/prod/podman/akademie-convex-backend.container" \
  "$PRODCTL_PORT_CONVEX" "$PRODCTL_PORT_API" "$APP_NAME" "$CONVEX_HOST" "$API_HOST" <<'PY'
import sys

source, destination, convex_port, api_port, app_name, convex_host, api_host = sys.argv[1:]
content = open(source).read()
replacements = {
    "@APP_NAME@": app_name,
    "@CONVEX_PORT@": convex_port,
    "@API_PORT@": api_port,
    "@CONVEX_HOST@": convex_host,
    "@API_HOST@": api_host,
}
for marker, value in replacements.items():
    content = content.replace(marker, value)
open(destination, "w").write(content)
PY
