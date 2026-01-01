# ─────────────────────────────────────────────────────────────
# Stage 1: Build frontend assets
# ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS assets

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Sentry source-map upload (optional – skipped if args not set)
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_ORG=$SENTRY_ORG \
    SENTRY_PROJECT=$SENTRY_PROJECT \
    SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN \
    NODE_ENV=production

RUN npm run build && npm run build:widget

# ─────────────────────────────────────────────────────────────
# Stage 2: PHP 8.4-FPM runtime
# ─────────────────────────────────────────────────────────────
FROM php:8.4-fpm-alpine AS runtime

# System dependencies
RUN apk add --no-cache \
    bash \
    git \
    unzip \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    mysql-client \
    supervisor

# PHP extensions
RUN docker-php-ext-configure gd --with-jpeg --with-webp \
 && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        bcmath \
        intl \
        zip \
        pcntl \
        opcache \
        exif \
        gd \
        mbstring

# phpredis (faster than predis)
RUN pecl install redis && docker-php-ext-enable redis

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Install PHP dependencies (cached layer)
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts \
    --prefer-dist

# Copy full application
COPY . .

# Copy pre-built frontend assets from Stage 1
COPY --from=assets /app/public/build  ./public/build
COPY --from=assets /app/public/widget ./public/widget

# Run Composer post-install scripts now that full app is present
RUN composer run-script post-autoload-dump 2>/dev/null || true

# Permissions
RUN chown -R www-data:www-data \
        /var/www/html/storage \
        /var/www/html/bootstrap/cache

# PHP production config
COPY docker/app/php-production.ini /usr/local/etc/php/conf.d/production.ini

# Entrypoint
COPY docker/app/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["php-fpm"]
