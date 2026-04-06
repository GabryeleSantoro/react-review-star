#!/usr/bin/env sh
# Publishes the current package to GitHub Packages (npm.pkg.github.com).
# Requires NODE_AUTH_TOKEN (use GITHUB_TOKEN in GitHub Actions with packages:write).
set -eu
ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ -z "${NODE_AUTH_TOKEN:-}" ]; then
  echo "NODE_AUTH_TOKEN is not set; cannot publish to GitHub Packages." >&2
  exit 1
fi

PKG_NAME="$(node -p "require('./package.json').name")"
case "$PKG_NAME" in
  @*/*) ;;
  *)
    echo "Package name must be scoped (@owner/name) for GitHub Packages, got: ${PKG_NAME}" >&2
    exit 1
    ;;
esac

SCOPE="${PKG_NAME%%/*}"
REGISTRY="https://npm.pkg.github.com"
TMP="$(mktemp)"
trap 'rm -f "$TMP"' EXIT

printf '%s\n' "${SCOPE}:registry=${REGISTRY}" "//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}" >"$TMP"

npm publish --userconfig "$TMP" --registry "$REGISTRY"
