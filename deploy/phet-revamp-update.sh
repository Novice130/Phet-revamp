#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/Novice130/Phet-revamp.git"
REPO_DIR="/opt/phet-revamp"
WWW_ROOT_PARENT="/var/www/learnnovice"
WWW_DIR="${WWW_ROOT_PARENT}/phet-revamp"
LOCK_FILE="/var/lock/phet-revamp-update.lock"

mkdir -p "$(dirname "$LOCK_FILE")" "$REPO_DIR" "$WWW_DIR" "$WWW_ROOT_PARENT"

# Prevent overlapping runs
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  echo "Another update is running; exiting."
  exit 0
fi

if [ ! -d "${REPO_DIR}/.git" ]; then
  echo "Cloning ${REPO_URL} -> ${REPO_DIR}"
  rm -rf "${REPO_DIR}"/*
  git clone --depth 1 "${REPO_URL}" "${REPO_DIR}"
fi

cd "${REPO_DIR}"

git remote set-url origin "${REPO_URL}"

git fetch --prune origin

# Ensure we have an upstream to compare against
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
UPSTREAM="@{u}"
if ! git rev-parse "$UPSTREAM" >/dev/null 2>&1; then
  git branch --set-upstream-to="origin/${BRANCH}" "${BRANCH}" >/dev/null 2>&1 || true
fi

LOCAL_SHA="$(git rev-parse HEAD)"
REMOTE_SHA="$(git rev-parse @{u} 2>/dev/null || echo "")"

if [ -n "$REMOTE_SHA" ] && [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
  echo "No changes (HEAD=$LOCAL_SHA)."
  exit 0
fi

echo "Updating source..."
git pull --ff-only

echo "Installing deps..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

echo "Building..."
npm run build

echo "Publishing dist -> ${WWW_DIR}"
rsync -a --delete "${REPO_DIR}/dist/" "${WWW_DIR}/"

# Make sure nginx can read
if id www-data >/dev/null 2>&1; then
  chown -R www-data:www-data "${WWW_DIR}" || true
fi

echo "Done. Deployed $(git rev-parse --short HEAD)"
