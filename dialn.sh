#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════════════
#  DialN — Enterprise Deployment & Management Console
#  Powered by Vedpragya Bharat Private Limited
#
#  Usage:  bash dialn.sh
#  Requires: bash 4+, running as non-root user with sudo access
# ═══════════════════════════════════════════════════════════════════════════════
set -euo pipefail

# ── Constants ─────────────────────────────────────────────────────────────────
readonly SCRIPT_VERSION="1.0.0"
readonly APP_NAME="DialN"
readonly APP_DOMAIN="dialn.vedpragya.com"
readonly APP_DIR="/var/www/dialn"
readonly LOG_FILE="/var/log/dialn-deploy.log"
readonly BACKUP_DIR="/var/backups/dialn"
readonly COMPOSE="docker compose"
readonly REQUIRED_DISK_GB=10
readonly REQUIRED_RAM_MB=1800

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m';    BOLD_RED='\033[1;31m'
GREEN='\033[0;32m';  BOLD_GREEN='\033[1;32m'
YELLOW='\033[0;33m'; BOLD_YELLOW='\033[1;33m'
BLUE='\033[0;34m';   BOLD_BLUE='\033[1;34m'
CYAN='\033[0;36m';   BOLD_CYAN='\033[1;36m'
WHITE='\033[0;37m';  BOLD_WHITE='\033[1;37m'
MAGENTA='\033[0;35m';BOLD_MAGENTA='\033[1;35m'
RESET='\033[0m';     DIM='\033[2m'

# ── Logging ───────────────────────────────────────────────────────────────────
_ts()   { date '+%Y-%m-%d %H:%M:%S'; }
log()   { echo -e "${DIM}[$(_ts)]${RESET} $*" | tee -a "$LOG_FILE" 2>/dev/null || echo -e "$*"; }
info()  { echo -e "${BOLD_CYAN}  ℹ  ${RESET}${WHITE}$*${RESET}";  log "INFO  $*"; }
ok()    { echo -e "${BOLD_GREEN}  ✔  ${RESET}${GREEN}$*${RESET}";  log "OK    $*"; }
warn()  { echo -e "${BOLD_YELLOW}  ⚠  ${RESET}${YELLOW}$*${RESET}"; log "WARN  $*"; }
err()   { echo -e "${BOLD_RED}  ✖  ${RESET}${RED}$*${RESET}";    log "ERROR $*"; }
step()  { echo -e "\n${BOLD_BLUE}▶ ${RESET}${BOLD_WHITE}$*${RESET}"; log "STEP  $*"; }
die()   { err "$*"; exit 1; }

# Ensure log file exists
sudo mkdir -p "$(dirname "$LOG_FILE")" 2>/dev/null || true
sudo touch "$LOG_FILE" 2>/dev/null && sudo chmod 666 "$LOG_FILE" 2>/dev/null || true

# ── UI Helpers ────────────────────────────────────────────────────────────────
banner() {
    clear
    echo -e "${BOLD_BLUE}"
    echo "  ╔══════════════════════════════════════════════════════════════╗"
    echo "  ║                                                              ║"
    echo "  ║    ██████╗ ██╗ █████╗ ██╗     ███╗   ██╗                   ║"
    echo "  ║    ██╔══██╗██║██╔══██╗██║     ████╗  ██║                   ║"
    echo "  ║    ██║  ██║██║███████║██║     ██╔██╗ ██║                   ║"
    echo "  ║    ██║  ██║██║██╔══██║██║     ██║╚██╗██║                   ║"
    echo "  ║    ██████╔╝██║██║  ██║███████╗██║ ╚████║                   ║"
    echo "  ║    ╚═════╝ ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝                   ║"
    echo "  ║                                                              ║"
    echo -e "  ║  ${RESET}${WHITE}  Enterprise Deployment & Management Console v${SCRIPT_VERSION}${RESET}${BOLD_BLUE}      ║"
    echo -e "  ║  ${RESET}${DIM}  Powered by Vedpragya Bharat Private Limited${RESET}${BOLD_BLUE}             ║"
    echo "  ║                                                              ║"
    echo "  ╚══════════════════════════════════════════════════════════════╝"
    echo -e "${RESET}"
}

section_header() {
    echo -e "\n${BOLD_BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    echo -e "  ${BOLD_WHITE}$1${RESET}"
    echo -e "${BOLD_BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n"
}

press_enter() {
    echo -e "\n${DIM}  Press ENTER to continue...${RESET}"
    read -r
}

confirm() {
    local msg="${1:-Are you sure?}"
    local answer
    echo -e "\n  ${BOLD_YELLOW}⚠  ${msg}${RESET}"
    echo -ne "  ${WHITE}Type ${BOLD_GREEN}yes${RESET}${WHITE} to confirm: ${RESET}"
    read -r answer
    [[ "$answer" == "yes" ]]
}

spinner() {
    local pid=$1 msg=${2:-"Working..."}
    local spin='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
    local i=0
    echo -ne "  ${CYAN}${msg}${RESET}"
    while kill -0 "$pid" 2>/dev/null; do
        printf "\r  ${CYAN}${spin:$((i % ${#spin})):1}  ${msg}${RESET}"
        ((i++)); sleep 0.1
    done
    printf "\r  ${BOLD_GREEN}✔  ${msg}${RESET}\n"
}

menu_item() {
    local num=$1 label=$2 desc=$3
    printf "  ${BOLD_WHITE}[%2s]${RESET}  ${BOLD_CYAN}%-30s${RESET} ${DIM}%s${RESET}\n" "$num" "$label" "$desc"
}

# ── Prerequisite checks ───────────────────────────────────────────────────────
check_running_in_app_dir() {
    if [[ ! -f "$APP_DIR/docker-compose.yml" && ! -f "$(pwd)/docker-compose.yml" ]]; then
        return 1
    fi
    return 0
}

get_compose_dir() {
    if [[ -f "$APP_DIR/docker-compose.yml" ]]; then
        echo "$APP_DIR"
    elif [[ -f "$(pwd)/docker-compose.yml" ]]; then
        echo "$(pwd)"
    else
        echo ""
    fi
}

require_app_dir() {
    local dir
    dir=$(get_compose_dir)
    if [[ -z "$dir" ]]; then
        err "Application not found. Run 'Fresh Server Setup' first."
        press_enter; return 1
    fi
    cd "$dir"
}

check_docker() {
    command -v docker &>/dev/null && docker info &>/dev/null 2>&1
}

check_env() {
    local dir
    dir=$(get_compose_dir)
    [[ -n "$dir" && -f "$dir/.env" ]]
}

status_badge() {
    local status=$1
    case $status in
        running|healthy) echo -e "${BOLD_GREEN}● RUNNING${RESET}" ;;
        starting)        echo -e "${BOLD_YELLOW}● STARTING${RESET}" ;;
        unhealthy)       echo -e "${BOLD_RED}● UNHEALTHY${RESET}" ;;
        exited|stopped)  echo -e "${RED}● STOPPED${RESET}" ;;
        *)               echo -e "${DIM}● ${status}${RESET}" ;;
    esac
}

# ── System Preflight ──────────────────────────────────────────────────────────
run_preflight() {
    section_header "System Requirements Check"
    local all_ok=true

    # OS
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        info "OS: $PRETTY_NAME"
    fi

    # RAM
    local ram_mb
    ram_mb=$(awk '/MemTotal/ {printf "%d", $2/1024}' /proc/meminfo)
    if (( ram_mb >= REQUIRED_RAM_MB )); then
        ok "RAM: ${ram_mb}MB (minimum ${REQUIRED_RAM_MB}MB)"
    else
        warn "RAM: ${ram_mb}MB — minimum ${REQUIRED_RAM_MB}MB recommended. Performance may suffer."
        all_ok=false
    fi

    # Disk
    local disk_gb
    disk_gb=$(df -BG / | awk 'NR==2 {gsub("G",""); print $4}')
    if (( disk_gb >= REQUIRED_DISK_GB )); then
        ok "Free disk: ${disk_gb}GB"
    else
        warn "Free disk: ${disk_gb}GB — minimum ${REQUIRED_DISK_GB}GB required."
        all_ok=false
    fi

    # Docker
    if check_docker; then
        local dver; dver=$(docker --version | grep -oP '\d+\.\d+\.\d+' | head -1)
        ok "Docker: $dver"
    else
        err "Docker not installed or not running."
        all_ok=false
    fi

    # Docker Compose
    if docker compose version &>/dev/null 2>&1; then
        local dcver; dcver=$(docker compose version --short 2>/dev/null || echo "unknown")
        ok "Docker Compose: $dcver"
    else
        err "Docker Compose plugin not found."
        all_ok=false
    fi

    # Git
    if command -v git &>/dev/null; then
        ok "Git: $(git --version | grep -oP '\d+\.\d+\.\d+')"
    else
        warn "Git not installed."
        all_ok=false
    fi

    # Certbot
    if command -v certbot &>/dev/null; then
        ok "Certbot: $(certbot --version 2>&1 | head -1)"
    else
        warn "Certbot not installed (needed for SSL)."
    fi

    # Port checks
    for port in 80 443; do
        if ss -tlnp 2>/dev/null | grep -q ":${port} " || \
           (check_docker && docker ps --format '{{.Ports}}' 2>/dev/null | grep -q "0.0.0.0:${port}->"); then
            ok "Port $port: in use (expected if already running)"
        else
            info "Port $port: available"
        fi
    done

    if $all_ok; then
        echo -e "\n  ${BOLD_GREEN}All critical checks passed.${RESET}"
    else
        echo -e "\n  ${BOLD_YELLOW}Some issues found. Resolve them before deploying.${RESET}"
    fi
}

# ── Fresh Server Setup ────────────────────────────────────────────────────────
fresh_server_setup() {
    section_header "Fresh Server Setup"
    warn "This will install Docker, Certbot, Git and set up the application."
    confirm "Proceed with fresh server setup?" || return

    # 1. Update system
    step "Updating system packages..."
    (sudo apt-get update -qq && sudo apt-get upgrade -y -qq) &
    spinner $! "Updating packages"

    # 2. Install dependencies
    step "Installing required packages..."
    (sudo apt-get install -y -qq curl git ufw fail2ban htop unzip jq) &
    spinner $! "Installing utilities"

    # 3. Install Docker
    if ! check_docker; then
        step "Installing Docker..."
        curl -fsSL https://get.docker.com | sudo bash &>/dev/null &
        spinner $! "Installing Docker"
        sudo usermod -aG docker "$USER"
        ok "Docker installed. You may need to log out and back in."
    else
        ok "Docker already installed, skipping."
    fi

    # 4. Install Certbot
    if ! command -v certbot &>/dev/null; then
        step "Installing Certbot..."
        (sudo apt-get install -y -qq certbot) &
        spinner $! "Installing Certbot"
    else
        ok "Certbot already installed, skipping."
    fi

    # 5. Firewall
    step "Configuring firewall (UFW)..."
    sudo ufw --force reset &>/dev/null
    sudo ufw default deny incoming &>/dev/null
    sudo ufw default allow outgoing &>/dev/null
    sudo ufw allow 22/tcp comment 'SSH' &>/dev/null
    sudo ufw allow 80/tcp comment 'HTTP' &>/dev/null
    sudo ufw allow 443/tcp comment 'HTTPS' &>/dev/null
    sudo ufw --force enable &>/dev/null
    ok "Firewall configured (22, 80, 443 open)"

    # 6. Clone repository
    step "Setting up application directory..."
    local repo_url
    echo -ne "\n  ${WHITE}Enter your Git repository URL: ${RESET}"
    read -r repo_url

    if [[ -z "$repo_url" ]]; then
        warn "No repository URL provided — skipping clone."
    else
        sudo mkdir -p "$APP_DIR"
        sudo chown "$USER:$USER" "$APP_DIR"
        if [[ -d "$APP_DIR/.git" ]]; then
            warn "Repository already cloned. Pulling latest..."
            git -C "$APP_DIR" pull --ff-only
        else
            git clone "$repo_url" "$APP_DIR"
        fi
        ok "Repository ready at $APP_DIR"
    fi

    # 7. Cert renewal cron
    step "Setting up SSL auto-renewal cron..."
    local cron_job="0 3 * * 1 certbot renew --quiet && docker compose -f ${APP_DIR}/docker-compose.yml restart nginx >> /var/log/certbot-renew.log 2>&1"
    (crontab -l 2>/dev/null | grep -qF "certbot renew") || \
        (crontab -l 2>/dev/null; echo "$cron_job") | crontab -
    ok "SSL renewal cron installed (runs Mondays at 3am)"

    echo -e "\n  ${BOLD_GREEN}✔ Server setup complete!${RESET}"
    echo -e "  ${WHITE}Next step: Run ${BOLD_CYAN}'Configure Environment'${RESET}${WHITE} from the main menu.${RESET}"
    press_enter
}

# ── Environment Configuration ─────────────────────────────────────────────────
configure_environment() {
    section_header "Environment Configuration"

    local dir
    if [[ -d "$APP_DIR" ]]; then
        dir="$APP_DIR"
    elif [[ -f "$(pwd)/docker-compose.yml" ]]; then
        dir="$(pwd)"
    else
        err "Application directory not found. Run 'Fresh Server Setup' first."
        press_enter; return
    fi

    cd "$dir"

    if [[ ! -f ".env" ]]; then
        if [[ -f ".env.production.example" ]]; then
            cp .env.production.example .env
            ok "Created .env from .env.production.example"
        else
            die "No .env.production.example found in $dir"
        fi
    else
        warn ".env already exists."
        confirm "Overwrite with fresh template?" && cp .env.production.example .env && ok "Reset to template."
    fi

    echo ""
    echo -e "  ${BOLD_WHITE}Let's configure your environment. Press ENTER to skip any field.${RESET}"
    echo ""

    _prompt() {
        local key=$1 prompt=$2 default=${3:-}
        local current val
        current=$(grep -E "^${key}=" .env 2>/dev/null | cut -d= -f2- | tr -d '"' || echo "")
        [[ -z "$default" && -n "$current" && "$current" != "<CHANGE_ME>" ]] && default="$current"
        if [[ -n "$default" ]]; then
            echo -ne "  ${CYAN}${prompt}${RESET} ${DIM}[${default}]${RESET}: "
        else
            echo -ne "  ${CYAN}${prompt}${RESET}: "
        fi
        read -r val
        val="${val:-$default}"
        if [[ -n "$val" && "$val" != "<CHANGE_ME>" ]]; then
            # Escape special chars for sed
            local escaped; escaped=$(printf '%s\n' "$val" | sed 's/[[\.*^$()+?{|]/\\&/g')
            sed -i "s|^${key}=.*|${key}=${escaped}|" .env
        fi
    }

    _prompt_secret() {
        local key=$1 prompt=$2
        echo -ne "  ${CYAN}${prompt}${RESET} ${DIM}(hidden)${RESET}: "
        local val
        read -rs val; echo ""
        if [[ -n "$val" ]]; then
            sed -i "s|^${key}=.*|${key}=${val}|" .env
        fi
    }

    echo -e "  ${BOLD_YELLOW}── Application ─────────────────────────────${RESET}"
    _prompt "APP_URL"  "App URL" "https://${APP_DOMAIN}"

    # Generate APP_KEY if needed
    local current_key; current_key=$(grep "^APP_KEY=" .env | cut -d= -f2-)
    if [[ -z "$current_key" || "$current_key" == "<CHANGE_ME>" ]]; then
        info "Generating APP_KEY..."
        if command -v php &>/dev/null && [[ -f "$dir/artisan" ]]; then
            local new_key; new_key=$(php artisan key:generate --show --no-interaction 2>/dev/null)
            sed -i "s|^APP_KEY=.*|APP_KEY=${new_key}|" .env
            ok "APP_KEY generated."
        else
            warn "PHP not available — you must set APP_KEY manually in .env"
        fi
    fi

    echo -e "\n  ${BOLD_YELLOW}── Database ─────────────────────────────────${RESET}"
    _prompt "DB_DATABASE"    "Database name"     "dialn_production"
    _prompt "DB_USERNAME"    "Database user"     "dialn"
    _prompt_secret "DB_PASSWORD"    "Database password"
    _prompt_secret "DB_ROOT_PASSWORD" "MySQL root password"

    echo -e "\n  ${BOLD_YELLOW}── Twilio ───────────────────────────────────${RESET}"
    _prompt "TWILIO_ACCOUNT_SID"  "Twilio Account SID"
    _prompt_secret "TWILIO_AUTH_TOKEN" "Twilio Auth Token"
    _prompt "TWILIO_PHONE_NUMBER" "Twilio Phone Number (e.g. +14155551234)"
    _prompt "TWILIO_WEBHOOK_URL"  "Twilio Webhook Base URL" "https://${APP_DOMAIN}"

    echo -e "\n  ${BOLD_YELLOW}── Reverb WebSocket ─────────────────────────${RESET}"
    local rev_id; rev_id=$(shuf -i 100000-999999 -n 1)
    local rev_key; rev_key=$(head /dev/urandom | tr -dc 'a-z0-9' | head -c 20)
    local rev_secret; rev_secret=$(head /dev/urandom | tr -dc 'a-z0-9' | head -c 20)
    _prompt "REVERB_APP_ID"     "Reverb App ID"     "$rev_id"
    _prompt "REVERB_APP_KEY"    "Reverb App Key"    "$rev_key"
    _prompt "REVERB_APP_SECRET" "Reverb App Secret" "$rev_secret"

    echo -e "\n  ${BOLD_YELLOW}── AI Services ──────────────────────────────${RESET}"
    _prompt_secret "DEEPGRAM_API_KEY"  "Deepgram API Key"
    _prompt_secret "OPENROUTER_API_KEY" "OpenRouter API Key"

    echo -e "\n  ${BOLD_YELLOW}── Mail (SMTP) ───────────────────────────────${RESET}"
    _prompt "MAIL_HOST"         "SMTP Host"
    _prompt "MAIL_PORT"         "SMTP Port" "587"
    _prompt "MAIL_USERNAME"     "SMTP Username"
    _prompt_secret "MAIL_PASSWORD" "SMTP Password"
    _prompt "MAIL_FROM_ADDRESS" "From Address" "noreply@${APP_DOMAIN}"

    echo -e "\n  ${BOLD_YELLOW}── Payments (optional) ──────────────────────${RESET}"
    _prompt "STRIPE_PUBLIC_KEY" "Stripe Public Key"
    _prompt_secret "STRIPE_SECRET_KEY" "Stripe Secret Key"

    ok ".env configured successfully."
    echo -e "  ${DIM}File saved at: ${dir}/.env${RESET}"
    press_enter
}

# ── SSL Certificate ───────────────────────────────────────────────────────────
setup_ssl() {
    section_header "SSL Certificate Setup"

    local domain
    echo -ne "  ${WHITE}Domain name ${DIM}[${APP_DOMAIN}]${RESET}: "
    read -r domain
    domain="${domain:-$APP_DOMAIN}"

    local email
    echo -ne "  ${WHITE}Email for Let's Encrypt alerts: ${RESET}"
    read -r email

    # Check DNS
    step "Checking DNS for $domain..."
    local resolved_ip; resolved_ip=$(dig +short "$domain" 2>/dev/null | tail -1 || echo "")
    local server_ip; server_ip=$(curl -sf https://api.ipify.org 2>/dev/null || echo "unknown")
    info "Server IP: $server_ip"
    info "DNS resolves $domain to: ${resolved_ip:-NOT FOUND}"
    if [[ "$resolved_ip" != "$server_ip" ]]; then
        warn "DNS does not point to this server yet. SSL will fail."
        confirm "Continue anyway?" || return
    fi

    # Check nothing is using port 80
    if ss -tlnp | grep -q ':80 '; then
        warn "Port 80 is in use. Stopping Docker services temporarily..."
        require_app_dir && $COMPOSE stop nginx 2>/dev/null || true
    fi

    step "Obtaining SSL certificate..."
    sudo certbot certonly --standalone --agree-tos \
        --email "$email" \
        -d "$domain" \
        --non-interactive

    ok "Certificate obtained for $domain"

    # Update nginx conf with correct domain if different
    if [[ "$domain" != "$APP_DOMAIN" ]]; then
        warn "Domain differs from default ($APP_DOMAIN). Update docker/nginx/default.conf manually."
    fi

    # Check expiry
    local expiry
    expiry=$(sudo openssl x509 -noout -enddate \
        -in "/etc/letsencrypt/live/${domain}/fullchain.pem" 2>/dev/null \
        | cut -d= -f2 || echo "unknown")
    ok "Certificate valid until: $expiry"
    press_enter
}

check_ssl_expiry() {
    local domain="${1:-$APP_DOMAIN}"
    local cert="/etc/letsencrypt/live/${domain}/fullchain.pem"
    if [[ ! -f "$cert" ]]; then
        echo -e "  ${RED}No certificate found for $domain${RESET}"
        return
    fi
    local expiry days_left
    expiry=$(sudo openssl x509 -noout -enddate -in "$cert" 2>/dev/null | cut -d= -f2)
    days_left=$(( ( $(date -d "$expiry" +%s) - $(date +%s) ) / 86400 ))
    if (( days_left > 30 )); then
        ok "SSL expires: $expiry (${days_left} days left)"
    elif (( days_left > 7 )); then
        warn "SSL expires: $expiry (${days_left} days left — renew soon)"
    else
        err "SSL expires: $expiry (${days_left} days left — CRITICAL)"
    fi
}

renew_ssl() {
    section_header "Renew SSL Certificate"
    step "Running certbot renew..."
    sudo certbot renew --quiet
    require_app_dir && $COMPOSE restart nginx
    ok "SSL renewed and nginx reloaded."
    press_enter
}

# ── Deploy ────────────────────────────────────────────────────────────────────
do_deploy() {
    local skip_build=${1:-false}
    section_header "Deploying DialN"
    require_app_dir || return

    if ! check_env; then
        err ".env not configured. Run 'Configure Environment' first."
        press_enter; return
    fi

    # Git pull
    step "Pulling latest code..."
    local before_commit; before_commit=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
    git pull --ff-only
    local after_commit; after_commit=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
    if [[ "$before_commit" == "$after_commit" ]]; then
        info "Already up to date (${after_commit})."
    else
        ok "Updated: ${before_commit} → ${after_commit}"
    fi

    # Build
    if [[ "$skip_build" != "true" ]]; then
        step "Building Docker image (this takes 3-8 minutes on first run)..."
        echo -e "  ${DIM}Logs → $LOG_FILE${RESET}\n"
        $COMPOSE build \
            --build-arg SENTRY_ORG="${SENTRY_ORG:-}" \
            --build-arg SENTRY_PROJECT="${SENTRY_PROJECT:-}" \
            --build-arg SENTRY_AUTH_TOKEN="${SENTRY_AUTH_TOKEN:-}" \
            2>&1 | tee -a "$LOG_FILE" | grep -E "^(Step|#|ERROR|Successfully)" || true
        ok "Image built."
    else
        info "Skipping build (--skip-build mode)."
    fi

    # Maintenance mode
    step "Enabling maintenance mode..."
    $COMPOSE exec -T app php artisan down --retry=5 2>/dev/null || true

    # Start services
    step "Starting all services..."
    $COMPOSE up -d --remove-orphans

    # Wait for health
    step "Waiting for app container to become healthy..."
    local attempts=0 status
    while (( attempts < 30 )); do
        status=$(docker inspect --format='{{.State.Health.Status}}' \
            "$($COMPOSE ps -q app 2>/dev/null | head -1)" 2>/dev/null || echo "starting")
        if [[ "$status" == "healthy" ]]; then
            ok "App container is healthy."
            break
        fi
        printf "\r  ${CYAN}⠋  Status: %-12s  Attempt %d/30${RESET}" "$status" "$((attempts+1))"
        sleep 10; ((attempts++))
    done
    echo ""

    # Take out of maintenance
    step "Disabling maintenance mode..."
    $COMPOSE exec -T app php artisan up

    # Restart queues
    step "Restarting queue workers..."
    $COMPOSE exec -T app php artisan queue:restart

    # Health check
    step "Verifying deployment..."
    sleep 3
    local http_status
    http_status=$(curl -sf -o /dev/null -w "%{http_code}" "https://${APP_DOMAIN}/up" 2>/dev/null || echo "000")
    if [[ "$http_status" == "200" ]]; then
        echo ""
        echo -e "  ${BOLD_GREEN}╔════════════════════════════════════════╗${RESET}"
        echo -e "  ${BOLD_GREEN}║  ✔  Deployment successful!             ║${RESET}"
        echo -e "  ${BOLD_GREEN}║     https://${APP_DOMAIN}         ║${RESET}"
        echo -e "  ${BOLD_GREEN}╚════════════════════════════════════════╝${RESET}"
    else
        warn "Health check returned HTTP $http_status. Check logs if the site is unreachable."
    fi
    press_enter
}

first_deploy() {
    section_header "First-Time Deployment"

    if ! check_docker; then
        err "Docker is not installed. Run 'Fresh Server Setup' first."; press_enter; return
    fi
    if ! check_env; then
        err ".env not configured. Run 'Configure Environment' first."; press_enter; return
    fi

    warn "This is the FIRST deploy — it will:"
    echo -e "  ${WHITE}  • Pull and build the Docker image (~5-8 minutes)${RESET}"
    echo -e "  ${WHITE}  • Create MySQL & Redis containers${RESET}"
    echo -e "  ${WHITE}  • Run database migrations${RESET}"
    echo -e "  ${WHITE}  • Start all services${RESET}"
    confirm "Proceed with first deployment?" || return

    do_deploy false
}

quick_deploy() {
    section_header "Quick Deploy (No Rebuild)"
    warn "This skips the Docker build step. Use only when NO PHP/frontend code changed."
    confirm "Proceed with quick deploy?" || return
    do_deploy true
}

# ── Service Management ────────────────────────────────────────────────────────
service_management() {
    while true; do
        banner
        section_header "Service Management"
        require_app_dir || return

        # Show current status
        echo -e "  ${BOLD_WHITE}Current Status:${RESET}\n"
        local services=("nginx" "app" "queue" "scheduler" "reverb" "mysql" "redis")
        for svc in "${services[@]}"; do
            local cid; cid=$($COMPOSE ps -q "$svc" 2>/dev/null | head -1 || echo "")
            if [[ -n "$cid" ]]; then
                local s; s=$(docker inspect --format='{{.State.Status}}' "$cid" 2>/dev/null || echo "unknown")
                local hs; hs=$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}n/a{{end}}' "$cid" 2>/dev/null || echo "n/a")
                [[ "$hs" != "n/a" ]] && s="$hs"
                printf "  %-12s %s\n" "$svc" "$(status_badge "$s")"
            else
                printf "  %-12s %s\n" "$svc" "$(status_badge "stopped")"
            fi
        done

        echo ""
        menu_item  1 "Start All Services"         "docker compose up -d"
        menu_item  2 "Stop All Services"          "docker compose stop"
        menu_item  3 "Restart All Services"       "docker compose restart"
        menu_item  4 "Restart Single Service"     "choose which service"
        menu_item  5 "Stop Single Service"        "choose which service"
        menu_item  6 "Pull New Images"            "docker compose pull"
        menu_item  7 "Remove Stopped Containers"  "prune stopped containers"
        menu_item  0 "Back to Main Menu"          ""
        echo ""
        echo -ne "  ${BOLD_WHITE}Select option: ${RESET}"
        read -r choice

        case $choice in
            1) $COMPOSE up -d; ok "All services started."; press_enter ;;
            2) confirm "Stop ALL services?" && $COMPOSE stop && ok "Stopped." ; press_enter ;;
            3) $COMPOSE restart && ok "Restarted." ; press_enter ;;
            4)
                echo -ne "  ${WHITE}Service name (nginx/app/queue/scheduler/reverb/mysql/redis): ${RESET}"
                read -r svc_name
                $COMPOSE restart "$svc_name" && ok "$svc_name restarted."
                press_enter ;;
            5)
                echo -ne "  ${WHITE}Service name: ${RESET}"
                read -r svc_name
                confirm "Stop $svc_name?" && $COMPOSE stop "$svc_name" && ok "$svc_name stopped."
                press_enter ;;
            6) $COMPOSE pull && ok "Images pulled."; press_enter ;;
            7) docker container prune -f && ok "Pruned." ; press_enter ;;
            0) return ;;
        esac
    done
}

# ── Logs ──────────────────────────────────────────────────────────────────────
view_logs() {
    banner
    section_header "View Logs"
    require_app_dir || return

    menu_item  1 "App (PHP-FPM)"          "recent 100 lines"
    menu_item  2 "Queue Workers"          "recent 100 lines"
    menu_item  3 "Scheduler"              "recent 50 lines"
    menu_item  4 "Reverb WebSocket"       "recent 50 lines"
    menu_item  5 "Nginx Access"           "recent 100 lines"
    menu_item  6 "Nginx Error"            "recent 100 lines"
    menu_item  7 "MySQL"                  "recent 50 lines"
    menu_item  8 "All Services (live)"    "streaming — Ctrl+C to stop"
    menu_item  9 "Laravel App Logs"       "storage/logs/laravel.log"
    menu_item 10 "Deploy History"         "/var/log/dialn-deploy.log"
    menu_item  0 "Back"                   ""
    echo ""
    echo -ne "  ${BOLD_WHITE}Select option: ${RESET}"
    read -r choice

    case $choice in
        1)  $COMPOSE logs --tail=100 app ;;
        2)  $COMPOSE logs --tail=100 queue ;;
        3)  $COMPOSE logs --tail=50 scheduler ;;
        4)  $COMPOSE logs --tail=50 reverb ;;
        5)  $COMPOSE exec -T nginx tail -100 /var/log/nginx/access.log 2>/dev/null || \
            $COMPOSE logs --tail=100 nginx ;;
        6)  $COMPOSE exec -T nginx tail -100 /var/log/nginx/error.log 2>/dev/null || \
            $COMPOSE logs --tail=100 nginx ;;
        7)  $COMPOSE logs --tail=50 mysql ;;
        8)  info "Streaming all logs — press Ctrl+C to stop."; $COMPOSE logs -f ;;
        9)
            local logfile
            local dir; dir=$(get_compose_dir)
            logfile="$dir/storage/logs/laravel.log"
            if [[ -f "$logfile" ]]; then
                tail -200 "$logfile"
            else
                # Try via docker
                $COMPOSE exec -T app tail -200 storage/logs/laravel.log 2>/dev/null || \
                err "Log file not accessible."
            fi ;;
        10) [[ -f "$LOG_FILE" ]] && tail -100 "$LOG_FILE" || err "No deploy log found." ;;
        0)  return ;;
    esac
    press_enter
}

# ── Database Management ───────────────────────────────────────────────────────
database_management() {
    while true; do
        banner
        section_header "Database Management"
        require_app_dir || return

        menu_item  1 "Run Migrations"         "php artisan migrate"
        menu_item  2 "Migration Status"       "show pending migrations"
        menu_item  3 "Backup Database"        "dump to compressed SQL"
        menu_item  4 "Restore Database"       "from a backup file"
        menu_item  5 "List Backups"           "show available backups"
        menu_item  6 "Open MySQL Shell"       "interactive MySQL prompt"
        menu_item  7 "Database Size"          "show table sizes"
        menu_item  0 "Back"                   ""
        echo ""
        echo -ne "  ${BOLD_WHITE}Select option: ${RESET}"
        read -r choice

        case $choice in
            1)
                confirm "Run migrations now?" || continue
                $COMPOSE exec -T app php artisan migrate --force
                ok "Migrations complete."
                press_enter ;;
            2)
                $COMPOSE exec -T app php artisan migrate:status
                press_enter ;;
            3)
                sudo mkdir -p "$BACKUP_DIR"
                local db_name; db_name=$(grep "^DB_DATABASE=" .env | cut -d= -f2-)
                local db_user; db_user=$(grep "^DB_USERNAME=" .env | cut -d= -f2-)
                local db_pass; db_pass=$(grep "^DB_PASSWORD=" .env | cut -d= -f2-)
                local backup_file="${BACKUP_DIR}/dialn_$(date +%Y%m%d_%H%M%S).sql.gz"
                step "Backing up database to $backup_file..."
                $COMPOSE exec -T mysql \
                    mysqldump -u"$db_user" -p"$db_pass" "$db_name" \
                    --single-transaction --quick --lock-tables=false \
                    2>/dev/null | gzip > "$backup_file"
                local size; size=$(du -sh "$backup_file" | cut -f1)
                ok "Backup created: $backup_file ($size)"
                press_enter ;;
            4)
                echo -e "\n  ${BOLD_WHITE}Available backups:${RESET}"
                ls -lh "${BACKUP_DIR}"/*.sql.gz 2>/dev/null || { warn "No backups found."; press_enter; continue; }
                echo -ne "\n  ${WHITE}Enter full path to backup file: ${RESET}"
                read -r bfile
                [[ ! -f "$bfile" ]] && { err "File not found."; press_enter; continue; }
                confirm "Restore $bfile? THIS WILL OVERWRITE CURRENT DATA." || continue
                local db_name; db_name=$(grep "^DB_DATABASE=" .env | cut -d= -f2-)
                local db_user; db_user=$(grep "^DB_USERNAME=" .env | cut -d= -f2-)
                local db_pass; db_pass=$(grep "^DB_PASSWORD=" .env | cut -d= -f2-)
                step "Restoring database..."
                gunzip -c "$bfile" | $COMPOSE exec -T mysql \
                    mysql -u"$db_user" -p"$db_pass" "$db_name"
                ok "Database restored from $bfile"
                press_enter ;;
            5)
                echo -e "\n  ${BOLD_WHITE}Database backups in $BACKUP_DIR:${RESET}\n"
                ls -lh "${BACKUP_DIR}"/*.sql.gz 2>/dev/null || warn "No backups found."
                press_enter ;;
            6)
                local db_user; db_user=$(grep "^DB_USERNAME=" .env | cut -d= -f2-)
                local db_pass; db_pass=$(grep "^DB_PASSWORD=" .env | cut -d= -f2-)
                local db_name; db_name=$(grep "^DB_DATABASE=" .env | cut -d= -f2-)
                info "Opening MySQL shell. Type 'exit' to return."
                $COMPOSE exec mysql mysql -u"$db_user" -p"$db_pass" "$db_name" ;;
            7)
                local db_user; db_user=$(grep "^DB_USERNAME=" .env | cut -d= -f2-)
                local db_pass; db_pass=$(grep "^DB_PASSWORD=" .env | cut -d= -f2-)
                local db_name; db_name=$(grep "^DB_DATABASE=" .env | cut -d= -f2-)
                $COMPOSE exec -T mysql mysql -u"$db_user" -p"$db_pass" "$db_name" \
                    -e "SELECT table_name AS 'Table', ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)' FROM information_schema.TABLES WHERE table_schema='${db_name}' ORDER BY (data_length + index_length) DESC;" \
                    2>/dev/null
                press_enter ;;
            0) return ;;
        esac
    done
}

# ── Cache & Queue ─────────────────────────────────────────────────────────────
cache_queue_management() {
    while true; do
        banner
        section_header "Cache & Queue Management"
        require_app_dir || return

        menu_item  1 "Clear All Caches"         "config, route, view, app cache"
        menu_item  2 "Rebuild Caches"           "re-cache config, routes, views"
        menu_item  3 "Queue Status"             "pending / failed job counts"
        menu_item  4 "View Failed Jobs"         "list recent failures"
        menu_item  5 "Retry Failed Jobs"        "retry all failed queue jobs"
        menu_item  6 "Clear Failed Jobs"        "delete all failed job records"
        menu_item  7 "Restart Queue Workers"    "graceful restart"
        menu_item  8 "Flush Redis"              "⚠  clears ALL Redis data"
        menu_item  0 "Back"                     ""
        echo ""
        echo -ne "  ${BOLD_WHITE}Select option: ${RESET}"
        read -r choice

        case $choice in
            1)
                $COMPOSE exec -T app php artisan cache:clear
                $COMPOSE exec -T app php artisan config:clear
                $COMPOSE exec -T app php artisan route:clear
                $COMPOSE exec -T app php artisan view:clear
                $COMPOSE exec -T app php artisan event:clear
                ok "All caches cleared."
                press_enter ;;
            2)
                $COMPOSE exec -T app php artisan config:cache
                $COMPOSE exec -T app php artisan route:cache
                $COMPOSE exec -T app php artisan view:cache
                $COMPOSE exec -T app php artisan event:cache
                ok "Caches rebuilt."
                press_enter ;;
            3)
                echo -e "\n  ${BOLD_WHITE}Pending jobs:${RESET}"
                $COMPOSE exec -T app php artisan queue:monitor --once 2>/dev/null || \
                $COMPOSE exec -T app php artisan queue:size 2>/dev/null || \
                echo "  (queue:monitor not available — check queue logs)"
                press_enter ;;
            4)
                $COMPOSE exec -T app php artisan queue:failed
                press_enter ;;
            5)
                confirm "Retry all failed jobs?" || continue
                $COMPOSE exec -T app php artisan queue:retry all
                ok "Retried."
                press_enter ;;
            6)
                confirm "Delete ALL failed job records?" || continue
                $COMPOSE exec -T app php artisan queue:flush
                ok "Failed jobs cleared."
                press_enter ;;
            7)
                $COMPOSE exec -T app php artisan queue:restart
                ok "Queue workers will restart after their current job completes."
                press_enter ;;
            8)
                confirm "Flush ALL Redis data? Sessions and cache will be wiped." || continue
                $COMPOSE exec -T redis redis-cli FLUSHALL
                ok "Redis flushed."
                press_enter ;;
            0) return ;;
        esac
    done
}

# ── Monitoring ────────────────────────────────────────────────────────────────
monitoring() {
    banner
    section_header "System Monitoring"
    require_app_dir || return

    echo -e "  ${BOLD_WHITE}Docker Container Status:${RESET}\n"
    $COMPOSE ps 2>/dev/null
    echo ""

    echo -e "  ${BOLD_WHITE}Resource Usage (live — Ctrl+C to stop):${RESET}\n"
    info "Press Ctrl+C to exit monitoring."
    sleep 1
    docker stats $($COMPOSE ps -q 2>/dev/null) \
        --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}" \
        2>/dev/null || true
}

health_check() {
    banner
    section_header "Full Health Check"
    require_app_dir || return

    # Containers
    echo -e "  ${BOLD_WHITE}Container Health:${RESET}\n"
    local services=("nginx" "app" "queue" "scheduler" "reverb" "mysql" "redis")
    for svc in "${services[@]}"; do
        local cid; cid=$($COMPOSE ps -q "$svc" 2>/dev/null | head -1 || echo "")
        if [[ -n "$cid" ]]; then
            local s; s=$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' "$cid" 2>/dev/null || echo "unknown")
            printf "  %-14s %s\n" "$svc:" "$(status_badge "$s")"
        else
            printf "  %-14s %s\n" "$svc:" "$(status_badge "stopped")"
        fi
    done

    # Web endpoints
    echo -e "\n  ${BOLD_WHITE}Web Endpoints:${RESET}\n"
    for url in "https://${APP_DOMAIN}/up" "https://${APP_DOMAIN}/login"; do
        local code; code=$(curl -sf -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
        if [[ "$code" == "200" || "$code" == "302" ]]; then
            ok "$url → HTTP $code"
        else
            err "$url → HTTP $code"
        fi
    done

    # SSL
    echo -e "\n  ${BOLD_WHITE}SSL Certificate:${RESET}\n"
    check_ssl_expiry "$APP_DOMAIN"

    # Disk
    echo -e "\n  ${BOLD_WHITE}Disk Usage:${RESET}\n"
    df -h / | awk 'NR==1{printf "  %-20s %-10s %-10s %-10s\n",$1,$2,$3,$5} NR==2{printf "  %-20s %-10s %-10s ",$1,$2,$3; if($5+0>85){printf "\033[1;31m%-10s\033[0m\n",$5}else{printf "\033[0;32m%-10s\033[0m\n",$5}}'

    # Artisan health
    echo -e "\n  ${BOLD_WHITE}Application Health:${RESET}\n"
    $COMPOSE exec -T app php artisan about --only=environment 2>/dev/null | \
        grep -E "(env|debug|url|cache|queue)" | \
        awk '{printf "  %-30s %s\n", $1, $2}' || true

    press_enter
}

# ── Maintenance Mode ──────────────────────────────────────────────────────────
maintenance_mode() {
    banner
    section_header "Maintenance Mode"
    require_app_dir || return

    menu_item 1 "Enable Maintenance Mode"  "show 'under maintenance' to users"
    menu_item 2 "Disable Maintenance Mode" "bring site back online"
    menu_item 3 "Check Status"             "is maintenance mode active?"
    menu_item 0 "Back"                     ""
    echo ""
    echo -ne "  ${BOLD_WHITE}Select option: ${RESET}"
    read -r choice

    case $choice in
        1)
            local secret; secret=$(head /dev/urandom | tr -dc 'A-Za-z0-9' | head -c 24)
            $COMPOSE exec -T app php artisan down --secret="$secret" --retry=15
            ok "Maintenance mode ON."
            info "Bypass URL: https://${APP_DOMAIN}/${secret}"
            ;;
        2)
            $COMPOSE exec -T app php artisan up
            ok "Maintenance mode OFF. Site is live." ;;
        3)
            $COMPOSE exec -T app php artisan down --help | head -1 || true
            if [[ -f "$(get_compose_dir)/storage/framework/down" ]]; then
                warn "Maintenance mode is ACTIVE."
            else
                ok "Site is LIVE (not in maintenance mode)."
            fi ;;
        0) return ;;
    esac
    press_enter
}

# ── Storage Management ────────────────────────────────────────────────────────
storage_management() {
    banner
    section_header "Storage Management"
    require_app_dir || return

    menu_item 1 "Show Storage Usage"       "disk usage by volume"
    menu_item 2 "Re-link Storage"          "php artisan storage:link"
    menu_item 3 "Clean Log Files"          "truncate old laravel logs"
    menu_item 4 "Clean Temp Files"         "clear tmp files in storage"
    menu_item 0 "Back"                     ""
    echo ""
    echo -ne "  ${BOLD_WHITE}Select option: ${RESET}"
    read -r choice

    case $choice in
        1)
            echo -e "\n  ${BOLD_WHITE}Docker Volume Sizes:${RESET}\n"
            docker system df -v 2>/dev/null | grep -A 20 "Local Volumes" || \
            docker volume ls --format '{{.Name}}' | while read -r v; do
                local size; size=$(docker run --rm -v "${v}:/vol" alpine du -sh /vol 2>/dev/null | cut -f1)
                printf "  %-35s %s\n" "$v" "$size"
            done
            press_enter ;;
        2)
            $COMPOSE exec -T app php artisan storage:link --force
            ok "Storage linked."
            press_enter ;;
        3)
            confirm "Truncate Laravel log files (keeps last 500 lines)?" || { press_enter; return; }
            $COMPOSE exec -T app sh -c 'for f in storage/logs/*.log; do tail -500 "$f" > /tmp/log_trunc && mv /tmp/log_trunc "$f"; done'
            ok "Logs trimmed."
            press_enter ;;
        4)
            $COMPOSE exec -T app sh -c 'rm -rf storage/framework/cache/data/* 2>/dev/null; echo done'
            ok "Framework cache cleared."
            press_enter ;;
        0) return ;;
    esac
}

# ── Docker Housekeeping ───────────────────────────────────────────────────────
docker_housekeeping() {
    banner
    section_header "Docker Housekeeping"
    require_app_dir || return

    echo -e "  ${BOLD_WHITE}Docker Disk Usage:${RESET}\n"
    docker system df
    echo ""

    menu_item 1 "Remove Unused Images"    "free disk space"
    menu_item 2 "Remove Unused Volumes"   "⚠  caution: may delete data"
    menu_item 3 "Full System Prune"       "⚠  removes all unused resources"
    menu_item 4 "View Running Containers" "all containers, not just app"
    menu_item 0 "Back"                    ""
    echo ""
    echo -ne "  ${BOLD_WHITE}Select option: ${RESET}"
    read -r choice

    case $choice in
        1) docker image prune -f && ok "Unused images removed."; press_enter ;;
        2)
            confirm "Remove unused Docker VOLUMES? This may delete data from stopped containers." || { press_enter; return; }
            docker volume prune -f && ok "Unused volumes removed."
            press_enter ;;
        3)
            confirm "FULL Docker system prune? Removes stopped containers, unused images, networks, build cache." || { press_enter; return; }
            docker system prune -af && ok "System pruned."
            press_enter ;;
        4) docker ps -a; press_enter ;;
        0) return ;;
    esac
}

# ── Update Application ────────────────────────────────────────────────────────
update_app() {
    banner
    section_header "Update Application"
    require_app_dir || return

    echo -e "  ${BOLD_WHITE}Current version:${RESET}"
    git log --oneline -5 2>/dev/null || info "No git history found."
    echo ""

    menu_item 1 "Full Update (with rebuild)"    "git pull + docker build + deploy"
    menu_item 2 "Quick Update (skip rebuild)"   "git pull + restart services only"
    menu_item 3 "View Changelog"                "recent git commits"
    menu_item 0 "Back"                          ""
    echo ""
    echo -ne "  ${BOLD_WHITE}Select option: ${RESET}"
    read -r choice

    case $choice in
        1) do_deploy false ;;
        2) do_deploy true ;;
        3) git log --oneline --graph --decorate -20; press_enter ;;
        0) return ;;
    esac
}

# ── Environment Editor ────────────────────────────────────────────────────────
env_editor() {
    banner
    section_header "Environment Settings"
    require_app_dir || return

    menu_item 1 "View .env (redacted)"       "show config without secrets"
    menu_item 2 "Edit .env manually"         "opens in nano editor"
    menu_item 3 "Re-run Setup Wizard"        "guided environment config"
    menu_item 4 "Validate Configuration"     "check required vars are set"
    menu_item 0 "Back"                       ""
    echo ""
    echo -ne "  ${BOLD_WHITE}Select option: ${RESET}"
    read -r choice

    case $choice in
        1)
            echo -e "\n  ${BOLD_WHITE}.env values (secrets hidden):${RESET}\n"
            grep -v "^#" .env | grep -v "^$" | \
            sed -E 's/(PASSWORD|TOKEN|SECRET|KEY|AUTH|SID)=(.{4})(.*)/\1=\2****/gI' | \
            awk -F= '{printf "  %-35s = %s\n", $1, substr($0, index($0,$2))}' | head -60
            press_enter ;;
        2)
            nano .env
            ok "Saved. Restart services for changes to take effect." ;;
        3)
            configure_environment ;;
        4)
            echo -e "\n  ${BOLD_WHITE}Checking required variables:${RESET}\n"
            local required_vars=(
                "APP_KEY" "APP_URL" "DB_DATABASE" "DB_USERNAME" "DB_PASSWORD"
                "DB_ROOT_PASSWORD" "REDIS_HOST" "REVERB_APP_ID" "REVERB_APP_KEY"
                "REVERB_APP_SECRET" "TWILIO_ACCOUNT_SID" "TWILIO_AUTH_TOKEN"
            )
            local all_ok=true
            for var in "${required_vars[@]}"; do
                local val; val=$(grep "^${var}=" .env 2>/dev/null | cut -d= -f2-)
                if [[ -z "$val" || "$val" == "<CHANGE_ME>" ]]; then
                    err "$var — NOT SET"
                    all_ok=false
                else
                    ok "$var — set"
                fi
            done
            $all_ok && echo -e "\n  ${BOLD_GREEN}All required variables are configured.${RESET}" || \
                echo -e "\n  ${BOLD_RED}Some variables need attention.${RESET}"
            press_enter ;;
        0) return ;;
    esac
}

# ── Twilio Sync ───────────────────────────────────────────────────────────────
twilio_sync() {
    section_header "Twilio Configuration"
    require_app_dir || return

    info "This updates all Twilio webhook URLs to point to https://${APP_DOMAIN}"
    confirm "Run Twilio Sync Configuration?" || return

    $COMPOSE exec -T app php artisan twilio:sync 2>/dev/null || \
        warn "artisan twilio:sync not available. Use Settings → Twilio → Sync Configuration in the web UI."
    press_enter
}

# ── Show Connection Info ──────────────────────────────────────────────────────
show_info() {
    banner
    section_header "DialN Connection Information"

    local dir; dir=$(get_compose_dir)
    local app_url domain db_name db_user
    if [[ -n "$dir" && -f "$dir/.env" ]]; then
        app_url=$(grep "^APP_URL=" "$dir/.env" | cut -d= -f2-)
        db_name=$(grep "^DB_DATABASE=" "$dir/.env" | cut -d= -f2-)
        db_user=$(grep "^DB_USERNAME=" "$dir/.env" | cut -d= -f2-)
    fi

    echo -e "  ${BOLD_WHITE}Application:${RESET}"
    echo -e "  URL:          ${BOLD_CYAN}${app_url:-https://${APP_DOMAIN}}${RESET}"
    echo -e "  Admin Login:  ${BOLD_CYAN}https://${APP_DOMAIN}/login${RESET}"
    echo -e "  Health Check: ${BOLD_CYAN}https://${APP_DOMAIN}/up${RESET}"
    echo ""
    echo -e "  ${BOLD_WHITE}Server:${RESET}"
    local server_ip; server_ip=$(curl -sf https://api.ipify.org 2>/dev/null || echo "unknown")
    echo -e "  Public IP:    ${BOLD_CYAN}${server_ip}${RESET}"
    echo -e "  App Dir:      ${BOLD_CYAN}$(get_compose_dir || echo $APP_DIR)${RESET}"
    echo -e "  Log File:     ${BOLD_CYAN}$LOG_FILE${RESET}"
    echo -e "  Backups:      ${BOLD_CYAN}$BACKUP_DIR${RESET}"
    echo ""
    echo -e "  ${BOLD_WHITE}Database:${RESET}"
    echo -e "  Database:     ${BOLD_CYAN}${db_name:-not configured}${RESET}"
    echo -e "  User:         ${BOLD_CYAN}${db_user:-not configured}${RESET}"
    echo -e "  Host:         ${BOLD_CYAN}mysql (internal Docker network)${RESET}"
    echo ""
    echo -e "  ${BOLD_WHITE}SSL Certificate:${RESET}"
    check_ssl_expiry "$APP_DOMAIN"
    echo ""
    echo -e "  ${BOLD_WHITE}Useful Commands:${RESET}"
    echo -e "  ${DIM}View live logs:${RESET}  docker compose logs -f"
    echo -e "  ${DIM}Open MySQL:${RESET}      docker compose exec mysql mysql -u\$DB_USER -p"
    echo -e "  ${DIM}Artisan shell:${RESET}   docker compose exec app php artisan tinker"
    press_enter
}

# ── First-Run Wizard ──────────────────────────────────────────────────────────
first_run_wizard() {
    banner
    echo -e "  ${BOLD_WHITE}Welcome to the DialN Deployment Wizard!${RESET}"
    echo -e "  ${WHITE}Let's get your application running step by step.${RESET}\n"

    echo -e "  ${BOLD_CYAN}This wizard will guide you through:${RESET}"
    echo -e "  ${WHITE}  1. Installing Docker and dependencies${RESET}"
    echo -e "  ${WHITE}  2. Configuring your environment (.env)${RESET}"
    echo -e "  ${WHITE}  3. Setting up SSL (HTTPS)${RESET}"
    echo -e "  ${WHITE}  4. Deploying the application${RESET}\n"

    confirm "Start the setup wizard?" || return

    # Step 1
    echo -e "\n  ${BOLD_MAGENTA}Step 1 of 4 — Server Setup${RESET}"
    fresh_server_setup

    # Step 2
    echo -e "\n  ${BOLD_MAGENTA}Step 2 of 4 — Environment Configuration${RESET}"
    configure_environment

    # Step 3
    echo -e "\n  ${BOLD_MAGENTA}Step 3 of 4 — SSL Certificate${RESET}"
    setup_ssl

    # Step 4
    echo -e "\n  ${BOLD_MAGENTA}Step 4 of 4 — First Deploy${RESET}"
    first_deploy

    echo -e "\n  ${BOLD_GREEN}╔══════════════════════════════════════════════════════╗${RESET}"
    echo -e "  ${BOLD_GREEN}║    🎉  DialN is now live!                            ║${RESET}"
    echo -e "  ${BOLD_GREEN}║    Visit: https://${APP_DOMAIN}           ║${RESET}"
    echo -e "  ${BOLD_GREEN}╚══════════════════════════════════════════════════════╝${RESET}"
    press_enter
}

# ══════════════════════════════════════════════════════════════════════════════
#  MAIN MENU
# ══════════════════════════════════════════════════════════════════════════════
main_menu() {
    while true; do
        banner

        # Quick status bar
        local docker_ok compose_dir app_status
        docker_ok=$(check_docker && echo "Running" || echo "Not running")
        compose_dir=$(get_compose_dir || echo "")
        if [[ -n "$compose_dir" ]]; then
            app_status=$(cd "$compose_dir" && $COMPOSE ps --status=running -q 2>/dev/null | wc -l)
            app_status="${app_status} containers up"
        else
            app_status="Not deployed"
        fi
        echo -e "  ${DIM}Docker: ${docker_ok}  │  App: ${app_status}  │  $(date '+%Y-%m-%d %H:%M')${RESET}\n"

        # Menu sections
        echo -e "  ${BOLD_YELLOW}── SETUP & DEPLOY ─────────────────────────────────────${RESET}"
        menu_item  1 "First-Time Setup Wizard"   "new server — guided setup"
        menu_item  2 "Configure Environment"     "edit .env settings"
        menu_item  3 "Setup SSL Certificate"     "Let's Encrypt HTTPS"
        menu_item  4 "Deploy Application"        "full build + deploy"
        menu_item  5 "Quick Deploy"              "restart without rebuilding"

        echo -e "\n  ${BOLD_YELLOW}── OPERATIONS ─────────────────────────────────────────${RESET}"
        menu_item  6 "Service Management"        "start / stop / restart services"
        menu_item  7 "View Logs"                 "app, nginx, queue, all"
        menu_item  8 "Health Check"              "full system diagnostics"
        menu_item  9 "Live Monitoring"           "CPU / memory / network stats"
        menu_item 10 "Maintenance Mode"          "enable / disable"

        echo -e "\n  ${BOLD_YELLOW}── DATA & MAINTENANCE ─────────────────────────────────${RESET}"
        menu_item 11 "Database Management"       "backup, restore, migrate, shell"
        menu_item 12 "Cache & Queue"             "clear caches, manage failed jobs"
        menu_item 13 "Storage Management"        "disk usage, re-link, cleanup"
        menu_item 14 "Update Application"        "pull latest code and redeploy"
        menu_item 15 "Docker Housekeeping"       "prune images, volumes"

        echo -e "\n  ${BOLD_YELLOW}── INFO ────────────────────────────────────────────────${RESET}"
        menu_item 16 "Connection Info"           "URLs, IPs, credentials summary"
        menu_item 17 "Renew SSL Certificate"     "force SSL renewal"
        menu_item 18 "System Requirements Check" "verify prerequisites"
        menu_item 19 "Twilio Sync"               "sync webhook URLs to Twilio"

        echo ""
        menu_item  0 "Exit"                      ""
        echo ""
        echo -ne "  ${BOLD_WHITE}Select option [0-19]: ${RESET}"
        read -r choice

        case $choice in
            1)  first_run_wizard ;;
            2)  configure_environment ;;
            3)  setup_ssl ;;
            4)  first_deploy ;;
            5)  quick_deploy ;;
            6)  service_management ;;
            7)  view_logs ;;
            8)  health_check ;;
            9)  monitoring ;;
            10) maintenance_mode ;;
            11) database_management ;;
            12) cache_queue_management ;;
            13) storage_management ;;
            14) update_app ;;
            15) docker_housekeeping ;;
            16) show_info ;;
            17) renew_ssl ;;
            18) run_preflight; press_enter ;;
            19) twilio_sync ;;
            0)
                echo -e "\n  ${BOLD_GREEN}Goodbye!${RESET}\n"
                exit 0 ;;
            *)
                warn "Invalid option '$choice'." ;;
        esac
    done
}

# ── Entry point ───────────────────────────────────────────────────────────────
main_menu
