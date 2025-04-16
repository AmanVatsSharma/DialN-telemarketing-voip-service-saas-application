#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# DialN — Zero-downtime deploy script
# Usage:  bash deploy.sh [--skip-build]
# ─────────────────────────────────────────────────────────────
set -euo pipefail

COMPOSE="docker compose"
SKIP_BUILD=false

for arg in "$@"; do
    case $arg in
        --skip-build) SKIP_BUILD=true ;;
    esac
done

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║          DialN Deployment — $(date '+%Y-%m-%d %H:%M')       ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ── 1. Pull latest code ───────────────────────────────────────
echo "[deploy] Pulling latest code..."
git pull --ff-only

# ── 2. Build new image ────────────────────────────────────────
if [ "$SKIP_BUILD" = false ]; then
    echo "[deploy] Building Docker image..."
    $COMPOSE build \
        --build-arg SENTRY_ORG="${SENTRY_ORG:-}" \
        --build-arg SENTRY_PROJECT="${SENTRY_PROJECT:-}" \
        --build-arg SENTRY_AUTH_TOKEN="${SENTRY_AUTH_TOKEN:-}"
fi

# ── 3. Put app into maintenance mode ─────────────────────────
echo "[deploy] Enabling maintenance mode..."
$COMPOSE exec -T app php artisan down --retry=5 || true

# ── 4. Bring up all services with new image ───────────────────
echo "[deploy] Starting services..."
$COMPOSE up -d --remove-orphans

# ── 5. Wait for app container to be healthy ───────────────────
echo "[deploy] Waiting for app to become healthy..."
for i in $(seq 1 30); do
    STATUS=$($COMPOSE ps -q app | xargs docker inspect --format='{{.State.Health.Status}}' 2>/dev/null || echo "starting")
    if [ "$STATUS" = "healthy" ]; then
        echo "[deploy] App is healthy."
        break
    fi
    echo "[deploy] Status: $STATUS — waiting 10s... ($i/30)"
    sleep 10
done

# ── 6. Disable maintenance mode ───────────────────────────────
echo "[deploy] Disabling maintenance mode..."
$COMPOSE exec -T app php artisan up

# ── 7. Restart queue workers to pick up new code ─────────────
echo "[deploy] Restarting queue workers..."
$COMPOSE exec -T app php artisan queue:restart

# ── 8. Print status ───────────────────────────────────────────
echo ""
echo "[deploy] Service status:"
$COMPOSE ps

echo ""
echo "[deploy] Deploy complete. Verifying health endpoint..."
HTTP_STATUS=$(curl -sf -o /dev/null -w "%{http_code}" https://dialn.vedpragya.com/up || echo "000")
if [ "$HTTP_STATUS" = "200" ]; then
    echo "[deploy] /up returned 200 — deployment successful."
else
    echo "[deploy] WARNING: /up returned $HTTP_STATUS — check logs with: docker compose logs app"
    exit 1
fi
