#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
REDIRECTS_DIR="$REPO_DIR/src/www-redirect"
REDIRECTS_FILE="$REDIRECTS_DIR/_redirects"
EXPECTED_RULE='/* https://akademie.contentoren.de/:splat 301'

regular_file_require() {
  local path="$1"
  [[ -f "$path" && ! -L "$path" ]] || { echo "error: expected a regular file: $path" >&2; exit 1; }
}

regular_file_require "$REDIRECTS_FILE"
[[ "$(<"$REDIRECTS_FILE")" == "$EXPECTED_RULE" ]] || {
  echo "error: src/www-redirect/_redirects must contain exactly: $EXPECTED_RULE" >&2
  exit 1
}

[[ "$(fd -t f -d 1 . "$REDIRECTS_DIR" | wc -l)" -eq 1 ]] || {
  echo "error: the src/www-redirect artifact must contain only _redirects" >&2
  exit 1
}

cd "$REPO_DIR"
REDIRECT_PROJECT_NAME=akademie-www-redirect SITE_PROJECT_NAME=akademie bun -e '
const pkg = JSON.parse(await Bun.file("package.json").text())
const scripts = pkg.scripts ?? {}
const redirectProject = process.env.REDIRECT_PROJECT_NAME
const siteProject = process.env.SITE_PROJECT_NAME
const expected = {
  "www-redirect:create": "bunx wrangler pages project create " + redirectProject + " --production-branch=main",
  "deploy:www-redirect":
    "bunx wrangler pages deploy . --cwd src/www-redirect --project-name " +
    redirectProject +
    " --branch main --commit-dirty=true",
  "www-redirect:check": "bash ops/www-redirect/check.bash",
}
for (const [name, command] of Object.entries(expected)) {
  if (scripts[name] !== command) throw new Error("package.json script mismatch: " + name)
}
if (redirectProject === siteProject) throw new Error("the redirect project must be separate from the site project")
if ((scripts["frontend:upload:pages"] ?? "").includes(redirectProject)) {
  throw new Error("the site upload script must not deploy the redirect project")
}
for (const [name, command] of Object.entries(scripts)) {
  if (typeof command === "string" && /pages\s+(domain|deployment\s+domain)/u.test(command)) {
    throw new Error("setup scripts must not mutate custom domains: " + name)
  }
}
'

echo "Verified the separate akademie-www-redirect artifact and scripts."
