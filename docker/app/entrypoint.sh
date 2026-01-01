#!/bin/bash
set -e

# ─────────────────────────────────────────────────────────────
# Wait for MySQL to be ready
# ─────────────────────────────────────────────────────────────
echo "[entrypoint] Waiting for MySQL..."
until php artisan db:show --no-interaction > /dev/null 2>&1; do
    echo "[entrypoint] MySQL not ready — retrying in 3s..."
    sleep 3
done
echo "[entrypoint] MySQL is ready."

# ─────────────────────────────────────────────────────────────
# One-time setup: only the app container runs this
# ─────────────────────────────────────────────────────────────
if [ "${CONTAINER_ROLE}" = "app" ]; then
    echo "[entrypoint] Running app setup..."

    php artisan storage:link --force

    php artisan migrate --force

    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    php artisan event:cache

    echo "[entrypoint] App setup complete."
fi

# ─────────────────────────────────────────────────────────────
# Branch on CONTAINER_ROLE
# ─────────────────────────────────────────────────────────────
case "${CONTAINER_ROLE}" in

    app)
        echo "[entrypoint] Starting PHP-FPM..."
        exec php-fpm
        ;;

    queue)
        echo "[entrypoint] Starting queue worker..."
        exec php artisan queue:work redis \
            --sleep=3 \
            --tries=3 \
            --max-time=3600 \
            --timeout=300 \
            --no-interaction
        ;;

    scheduler)
        echo "[entrypoint] Starting scheduler..."
        exec php artisan schedule:work --no-interaction
        ;;

    reverb)
        echo "[entrypoint] Starting Reverb WebSocket server..."
        exec php artisan reverb:start \
            --host=0.0.0.0 \
            --port=8080 \
            --no-interaction
        ;;

    *)
        echo "[entrypoint] Unknown CONTAINER_ROLE '${CONTAINER_ROLE}' — running default command."
        exec "$@"
        ;;

esac
