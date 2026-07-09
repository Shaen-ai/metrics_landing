#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER="${SERVER:-ubuntu@145.239.71.158}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/tunzone/frontend/landing}"
REMOTE_OWNER="${REMOTE_OWNER:-ubuntu:ubuntu}"
PM2_NAME="${PM2_NAME:-tunzone-landing}"
PORT="${PORT:-3002}"
NPM_BUILD_SCRIPT="${NPM_BUILD_SCRIPT:-build}"
SSH="${SSH:-ssh}"

echo "==> Preparing $SERVER:$REMOTE_DIR ..."
$SSH "$SERVER" "sudo mkdir -p '$REMOTE_DIR' && sudo chown -R '$REMOTE_OWNER' '$REMOTE_DIR'"

echo "==> Syncing source to $SERVER:$REMOTE_DIR ..."
rsync -avz --delete \
  --exclude ".git" \
  --exclude ".cursor" \
  --exclude ".next" \
  --exclude "node_modules" \
  --exclude ".env*" \
  --exclude ".DS_Store" \
  --exclude "npm-debug.log*" \
  --rsync-path="sudo rsync" \
  "$APP_DIR/" "$SERVER:$REMOTE_DIR/"

$SSH "$SERVER" "sudo chown -R '$REMOTE_OWNER' '$REMOTE_DIR'"

# --- PostHog (NEXT_PUBLIC_* must be present on server before build) ----------
POSTHOG_KEY="$(grep "^NEXT_PUBLIC_POSTHOG_KEY=" "$APP_DIR/.env.local" 2>/dev/null | head -1 | cut -d= -f2-)" || true
if [ -z "$POSTHOG_KEY" ]; then
  POSTHOG_KEY="$(grep "^NEXT_PUBLIC_POSTHOG_KEY=" "$APP_DIR/.env.production" 2>/dev/null | head -1 | cut -d= -f2-)" || true
fi
if [ -n "$POSTHOG_KEY" ]; then
  echo "==> Syncing NEXT_PUBLIC_POSTHOG_KEY to remote .env.local ..."
  $SSH "$SERVER" "cd '$REMOTE_DIR' && touch .env.local && \
    if grep -q '^NEXT_PUBLIC_POSTHOG_KEY=' .env.local 2>/dev/null; then \
      sed -i 's|^NEXT_PUBLIC_POSTHOG_KEY=.*|NEXT_PUBLIC_POSTHOG_KEY=${POSTHOG_KEY}|' .env.local; \
    else \
      echo 'NEXT_PUBLIC_POSTHOG_KEY=${POSTHOG_KEY}' >> .env.local; \
    fi"
fi

echo "==> Installing, building, and restarting PM2 on server..."
$SSH "$SERVER" "cd '$REMOTE_DIR' \
  && npm ci \
  && npm run '$NPM_BUILD_SCRIPT' \
  && if pm2 describe '$PM2_NAME' >/dev/null 2>&1; then PORT='$PORT' pm2 reload '$PM2_NAME' --update-env; else PORT='$PORT' pm2 start npm --name '$PM2_NAME' -- start; fi \
  && pm2 save"

echo "==> Done! Deployed successfully."
