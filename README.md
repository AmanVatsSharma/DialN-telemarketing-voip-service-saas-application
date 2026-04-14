<div align="center">

<img src="public/logo.svg" alt="DialN Logo" width="180" />

# DialN

### AI-Powered Telemarketing & VoIP SaaS Platform

**Outbound calling campaigns · AI voice agents · SMS · CRM integrations · Real-time analytics**

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Twilio](https://img.shields.io/badge/Twilio-VoIP-F22F46?style=flat-square&logo=twilio&logoColor=white)](https://twilio.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

---

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Architecture](#-architecture) · [API](#-api-reference) · [Deployment](#-deployment)

</div>

---

## Overview

**DialN** is a full-featured, production-ready SaaS platform for telemarketing operations. It combines automated outbound calling campaigns, real-time AI voice agents, SMS automation, and deep CRM integrations into a single unified platform — all backed by Twilio's VoIP infrastructure.

Built for agencies and enterprises running high-volume outbound calling, DialN handles everything from contact list management and campaign scheduling to AI-powered conversations, sentiment analysis, and billing — out of the box.

---

## Features

### Outbound Call Campaigns
- Launch automated outbound calling campaigns to contact lists
- DTMF (key-press) interaction flows and IVR branching
- A/B message variant testing with performance tracking
- Campaign scheduling with timezone-aware execution windows
- Real-time pause, resume, and status monitoring
- Call recording, transcription, and playback
- Sentiment analysis on call outcomes

### AI Voice Agents
- Real-time conversational AI voice calls powered by LLMs
- Full speech pipeline: **Deepgram STT** → **OpenRouter LLM** → **OpenAI TTS**
- Per-agent knowledge bases for domain-specific context
- Configurable system prompts, voices, TTS providers, and conversation limits
- Live call monitoring via WebSocket
- Full conversation transcripts and cost tracking

### Contact Management
- Bulk CSV import with AI-powered deduplication and quality scoring
- Phone number validation (carrier lookup, format normalization)
- Contact lists, tags, and segmentation
- Engagement scoring and smart scheduling optimizer
- Data cleaning service with duplicate merging

### SMS & Messaging
- Inbound and outbound SMS
- AI-powered auto-reply generation
- SMS conversation threading
- SMS templates and bulk sends
- Per-message credit deduction

### Follow-Up Sequences
- Multi-step drip campaigns mixing calls and SMS
- Conditional branching based on DTMF responses or call outcomes
- Timed delays between steps
- Enrollment tracking and step execution engine

### CRM Integrations
- Bidirectional sync with **HubSpot**, **Salesforce**, and **Pipedrive**
- Event-driven webhooks on call complete, DTMF response, contact update, lead qualified
- Configurable field mappings per integration

### Billing & Credits
- Credit-based prepaid calling model
- **Stripe** and **Razorpay** payment gateway support
- Per-minute pricing rules with customer charge markup
- Admin profit analytics and revenue dashboard
- Transaction history, top-up flows, and invoice tracking

### Phone Number Management
- Rent Twilio phone numbers directly from the platform
- BYOC (Bring Your Own Carrier) SIP trunk support
- Trunk health monitoring and automatic failover
- Per-number SMS and call capability management

### Admin Panel
- Full user management with role-based access control
- KYC verification workflow (basic, business, phone verify)
- System configuration dashboard
- White-label theme editor (hero, features, pricing, FAQs, footer)
- Cron job monitor and error log viewer
- Profit analytics and credit management

### Developer Tools
- Full REST API (150+ endpoints) with OpenAPI/Swagger docs
- API key management with scoped access
- Embeddable softphone widget (UMD/ES bundle)
- Sentry error monitoring integration
- TypeScript-typed route helpers (Wayfinder)

---

## Tech Stack

### Backend
| Layer | Technology |
|-------|-----------|
| Framework | Laravel 12 (PHP 8.2+) |
| Database | MySQL |
| Queue | Laravel Queue (database driver) |
| WebSockets | Laravel Reverb |
| Auth | Laravel Fortify + Sanctum |
| VoIP | Twilio Voice SDK |
| Payments | Stripe, Razorpay |
| AI/LLM | OpenRouter API |
| STT | Deepgram |
| TTS | OpenAI |
| Monitoring | Sentry |
| API Docs | L5-Swagger (OpenAPI 3.0) |

### Frontend
| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Build Tool | Vite 7 |
| Bridge | Inertia.js |
| UI Primitives | Radix UI + shadcn/ui |
| Charts | Recharts |
| 3D Effects | Three.js / React Three Fiber |
| Phone Input | react-phone-number-input |
| CSV | PapaParse |
| Softphone | @twilio/voice-sdk |
| Error Tracking | Sentry |

### Infrastructure
| Layer | Technology |
|-------|-----------|
| Process Manager | PM2 |
| Reverse Proxy | Nginx |
| Containerization | Docker + Docker Compose |
| Supervisor | Supervisor (worker fallback) |

---

## Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 20+
- MySQL 8.0+
- A [Twilio](https://twilio.com) account (Voice + SMS enabled)

### One-Command Setup

```bash
composer run setup
```

This single command installs all dependencies, generates the application key, runs all migrations, and builds frontend assets.

### Manual Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/dialn.git
cd dialn

# 2. Install PHP dependencies
composer install

# 3. Install Node dependencies
npm install

# 4. Configure environment
cp .env.production.example .env
php artisan key:generate

# 5. Configure your database in .env, then run migrations
php artisan migrate

# 6. Seed default roles, permissions, and pricing
php artisan db:seed

# 7. Build the frontend
npm run build

# 8. Start development server
composer run dev
```

### Environment Variables

Copy `.env.production.example` to `.env` and configure:

```env
# Application
APP_NAME=DialN
APP_URL=https://your-domain.com

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=dialn
DB_USERNAME=root
DB_PASSWORD=

# Twilio (required for calling & SMS)
TWILIO_ACCOUNT_SID=ACxxxxxx
TWILIO_AUTH_TOKEN=xxxxxx
TWILIO_TWIML_APP_SID=APxxxxxx
TWILIO_API_KEY=SKxxxxxx
TWILIO_API_SECRET=xxxxxx

# AI Services
OPENROUTER_API_KEY=sk-or-xxxxxx
DEEPGRAM_API_KEY=xxxxxx
OPENAI_API_KEY=sk-xxxxxx

# Payments
STRIPE_KEY=pk_live_xxxxxx
STRIPE_SECRET=sk_live_xxxxxx
RAZORPAY_KEY=rzp_live_xxxxxx
RAZORPAY_SECRET=xxxxxx

# Real-time (Laravel Reverb)
REVERB_APP_ID=xxxxxx
REVERB_APP_KEY=xxxxxx
REVERB_APP_SECRET=xxxxxx
REVERB_HOST=0.0.0.0
REVERB_PORT=8080

# Error monitoring
SENTRY_LARAVEL_DSN=https://xxxxxx@sentry.io/xxxxxx
```

---

## Development

### Start the Dev Server

```bash
composer run dev       # PHP server + queue worker + Vite HMR
composer run dev:ssr   # Same + Inertia SSR + Pail log viewer
```

### Frontend Only

```bash
npm run dev            # Vite dev server with HMR
npm run build          # Production build
npm run build:ssr      # Production build with SSR
npm run build:widget   # Build embeddable softphone widget
npm run lint           # ESLint auto-fix
npm run format         # Prettier format
npm run types          # TypeScript type check (no emit)
```

### Backend

```bash
php artisan test                          # Run all PHPUnit tests
php artisan test --filter=CampaignTest    # Run specific test
php artisan migrate                       # Run migrations
php artisan queue:work                    # Start queue worker
php artisan reverb:start                  # Start WebSocket server
php artisan schedule:run                  # Run scheduled tasks
```

---

## Architecture

```
dialn/
├── app/
│   ├── Actions/          # Single-responsibility action classes
│   ├── Console/Commands/ # 28 artisan commands
│   ├── Events/           # Domain events (CRM, SMS, Campaign)
│   ├── Http/
│   │   ├── Controllers/  # Web, API v1, Admin, Settings, SMS
│   │   ├── Middleware/   # Auth, KYC, Credit, Role checks
│   │   └── Resources/    # API response transformers
│   ├── Jobs/             # Background queue jobs
│   ├── Listeners/        # Event → CRM webhook dispatchers
│   ├── Models/           # 58+ Eloquent models
│   ├── Notifications/    # Email / in-app notifications
│   ├── Policies/         # Authorization policies
│   └── Services/         # Core business logic services
│       ├── AiAgent/      # STT → LLM → TTS pipeline
│       ├── Payment/      # Stripe & Razorpay gateways
│       └── SMS/          # SMS provider abstraction
├── config/               # App, Twilio, AI agent, billing config
├── database/
│   ├── migrations/       # 95+ chronological migrations
│   ├── seeders/          # Roles, permissions, pricing, themes
│   └── factories/        # Model factories for testing
├── resources/
│   ├── css/              # Tailwind entry points
│   └── js/
│       ├── components/   # Radix UI + domain components
│       ├── contexts/     # SoftphoneContext (Twilio Device)
│       ├── hooks/        # Custom React hooks
│       ├── layouts/      # App, auth, settings layouts
│       ├── pages/        # ~130 Inertia page components
│       └── types/        # TypeScript definitions
├── routes/
│   ├── web.php           # Inertia page routes
│   ├── api.php           # REST API v1 (150+ endpoints)
│   ├── twilio.php        # Twilio webhook endpoints
│   ├── kyc.php           # KYC verification flow
│   └── settings.php      # Settings sub-routes
└── docker/               # Dockerfile + Nginx config
```

### Data Flow

```
Browser ──Inertia──► Laravel Controller ──► Inertia::render() ──► React Page
Browser ──Fetch───► /api/v1/* ──► API Controller ──► JSON Response
Browser ──Echo────► Reverb WebSocket ──► Real-time events
Twilio ───Webhook─► /twilio/* ──► TwiML Controller ──► TwiML Response
```

### AI Voice Agent Pipeline

```
Caller Audio ──► Twilio Media Stream ──► Deepgram (STT)
                                              │
                                         Transcript
                                              │
                                      OpenRouter LLM
                                       (with KB ctx)
                                              │
                                          Response
                                              │
                                       OpenAI TTS
                                              │
                                   Audio ──► Twilio ──► Caller
```

---

## API Reference

The full REST API is documented via **Swagger/OpenAPI**. Access it at:

```
https://your-domain.com/api/documentation
```

All API endpoints are under `/api/v1/` and require a **Sanctum Bearer token**:

```bash
# Authenticate
POST /api/v1/auth/login
{ "email": "user@example.com", "password": "secret" }

# Returns: { "token": "..." }

# Use token in subsequent requests
Authorization: Bearer <token>
```

### Key Endpoint Groups

| Group | Base Path | Description |
|-------|-----------|-------------|
| Auth | `/api/v1/auth` | Login, register, token refresh |
| Campaigns | `/api/v1/campaigns` | CRUD + launch/pause/resume |
| Contacts | `/api/v1/contacts` | CRUD + CSV import + quality |
| Calls | `/api/v1/calls` | Call history + transcripts |
| AI Agents | `/api/ai-agent` | Agent management + calls |
| SMS | `/api/sms` | Send, receive, conversations |
| Analytics | `/api/v1/analytics` | Campaign + sentiment stats |
| CRM | `/api/v1/crm` | Webhook event endpoints |
| Users | `/api/v1/users` | User management (admin) |

---

## Deployment

### Docker (Recommended)

```bash
# Build and start all services
docker-compose up -d

# Run migrations
docker-compose exec app php artisan migrate --force

# Seed production data
docker-compose exec app php artisan db:seed --class=RoleSeeder
docker-compose exec app php artisan db:seed --class=PricingRuleSeeder
```

### PM2 (Production Process Management)

```bash
# Install PM2
npm install -g pm2

# Start all workers (queue, scheduler, reverb)
pm2 start ecosystem.config.cjs

# Save PM2 process list for auto-restart on reboot
pm2 save
pm2 startup
```

The `ecosystem.config.cjs` defines three processes:
- `dialn-worker` — Queue worker (2 instances)
- `dialn-scheduler` — Laravel scheduler (cron every minute)
- `dialn-reverb` — Reverb WebSocket server

### Nginx Configuration

A production-ready Nginx config is included at `docker/nginx/default.conf`. Key configuration:

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}

# WebSocket proxy for Reverb
location /app/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
}
```

### Post-Deployment Checklist

```bash
# 1. Set APP_ENV=production and APP_DEBUG=false in .env
# 2. Run migrations
php artisan migrate --force

# 3. Cache config, routes, and views
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 4. Set correct storage permissions
php artisan storage:link
chmod -R 775 storage bootstrap/cache

# 5. Configure Twilio webhooks to point to your domain
#    Voice URL: https://your-domain.com/twilio/voice
#    SMS URL:   https://your-domain.com/sms/incoming

# 6. Start PM2 workers
pm2 start ecosystem.config.cjs
```

---

## Embeddable Softphone Widget

DialN ships with a standalone embeddable softphone widget that can be embedded into any website:

```html
<!-- Add to any webpage -->
<script src="https://your-domain.com/widget/softphone.umd.js"></script>
<link rel="stylesheet" href="https://your-domain.com/widget/softphone.css" />

<script>
  DialNWidget.init({
    apiUrl: 'https://your-domain.com',
    apiKey: 'your-api-key',
  });
</script>
```

Build the widget separately:

```bash
npm run build:widget
```

---

## Webhook Events

DialN fires webhooks to connected CRM integrations for the following events:

| Event | Trigger |
|-------|---------|
| `call.completed` | A campaign call finishes |
| `campaign.started` | A campaign begins dialing |
| `contact.added` | A new contact is created |
| `contact.updated` | A contact record changes |
| `dtmf.response` | A caller presses a key |
| `lead.qualified` | A contact meets qualification criteria |

All webhooks are signed with HMAC-SHA256. Verify the `X-DialN-Signature` header in your receiver.

---

## KYC Verification

DialN includes a built-in KYC workflow for regulatory compliance:

| Tier | Requirements | Limits |
|------|-------------|--------|
| Basic | Name, address, ID document | Standard calling limits |
| Business | Business registration, tax ID | Elevated limits |
| Verified Phone | OTP verification | Full platform access |

KYC settings are configurable per installation from the Admin panel.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes following existing patterns
4. Run tests: `php artisan test`
5. Run type checks: `npm run types`
6. Submit a pull request

### Code Standards

- PHP: PSR-12 (enforced via Pint)
- TypeScript: Strict mode enabled
- Git commits: Conventional Commits format

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with Laravel, React, and Twilio

**[DialN](https://github.com/your-org/dialn)** — Making outbound calling intelligent

</div>
