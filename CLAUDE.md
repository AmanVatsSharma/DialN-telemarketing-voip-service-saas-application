# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DialN is a SaaS telemarketing platform with outbound calling campaigns, AI-powered voice agents, SMS, CRM integrations, and analytics. It uses Laravel 12 (backend) + React 19 + Inertia.js (frontend) with Twilio for VoIP.

## Commands

### Development
```bash
composer run dev          # Start PHP server + queue worker + Vite (hot reload)
composer run dev:ssr      # Same but with Inertia SSR + Pail log viewer
composer run setup        # First-time setup: install deps, generate key, migrate, build
```

### Frontend
```bash
npm run dev               # Vite dev server only
npm run build             # Production build
npm run build:ssr         # Production build with SSR
npm run build:widget      # Build embeddable widget separately
npm run lint              # ESLint fix
npm run format            # Prettier format
npm run types             # TypeScript type check (no emit)
```

### Backend
```bash
php artisan test          # Run all PHPUnit tests
php artisan test --filter=TestName   # Run single test
composer run test         # Alias for PHPUnit
php artisan migrate       # Run migrations
php artisan queue:work    # Start queue worker manually
php artisan reverb:start  # Start WebSocket server
```

### Production Process Management (PM2)
```bash
pm2 start ecosystem.config.cjs   # Start queue worker, scheduler, reverb
pm2 restart all                  # Restart all workers
```

## Architecture

### Stack
- **Backend:** PHP 8.2+, Laravel 12, MySQL
- **Frontend:** React 19, TypeScript, Tailwind CSS 4, Vite 7
- **Bridge:** Inertia.js (no REST API for page data — server passes props directly)
- **Real-time:** Laravel Reverb (WebSocket), Twilio Voice SDK
- **Queue:** Database-backed Laravel Queue (2 PM2 workers in production)
- **AI/LLM:** OpenRouter API, Deepgram (STT/TTS), OpenAI
- **VoIP:** Twilio (primary), BYOC SIP trunks

### Frontend → Backend Communication
- **Page data:** Inertia props (no fetch — Laravel controller returns `Inertia::render()`)
- **Actions:** Wayfinder-generated type-safe helpers in `resources/js/wayfinder/` and `resources/js/actions/` — regenerated automatically on route/action changes
- **API calls:** REST endpoints under `routes/api.php` using Sanctum tokens, consumed by `resources/js/actions/`
- **Real-time:** Laravel Echo over Reverb WebSocket

### Key Domain Modules

**Campaign System** (`app/Models/Campaign`, `app/Http/Controllers/CampaignController`)
- Outbound call campaigns with contact lists
- Background jobs: `MakeCampaignCallJob`, `ProcessCampaignJob`
- DTMF interaction, recording, transcription, A/B message testing
- Analytics via `AnalyticsService`, `CallSentimentAnalyzer`

**AI Agent System** (`app/Models/AiAgent`, `app/Services/AiAgent/`)
- Real-time conversational voice calls with LLM backend
- Speech pipeline: Deepgram STT → OpenRouter LLM → OpenAI TTS
- WebSocket-based (Reverb) during active calls
- Knowledge base for context; conversation logging with transcript

**Call/VoIP** (`app/Services/TwilioService.php`, `app/Http/Controllers/TwimlController`)
- Twilio webhooks routed via `routes/twilio.php`
- TwiML generation for call flow/IVR
- BYOC SIP trunk support (`TrunkCallService`, `TrunkHealthService`)
- `PhoneNumber` model tracks rentals and costs

**Contact Management** (`app/Models/Contact`, `app/Services/ContactDataCleaningService`)
- Bulk CSV import via `ProcessContactImport` job
- AI deduplication/cleaning, quality scoring, tag-based segmentation

**Sequences** (`app/Models/Sequence`, `app/Services/SequenceEngine`)
- Multi-step drip campaigns with conditional branching and timed delays
- Enrollment tracked via `SequenceEnrollment`, executed by `ProcessSequenceStepsJob`

**SMS** (`app/Models/SmsMessage`, `app/Services/SMS/`, `routes/` SMS webhooks)
- Inbound/outbound SMS, AI-powered auto-replies via `GenerateAISmsResponseJob`

**Billing** (`app/Services/Payment/`, `app/Models/Transaction`)
- Credit-based prepaid calling (Stripe + Razorpay)
- Per-minute pricing in `config/twilio.php`; AI costs in `config/ai-agent.php`

**CRM Integration** (`app/Services/CrmWebhookService`, `app/Models/CrmIntegration`)
- HubSpot, Salesforce, Pipedrive bidirectional sync via webhook

### Configuration Files to Know
- `config/twilio.php` — Twilio voice settings, TTS voices, call pricing, concurrent limits
- `config/ai-agent.php` — LLM models, TTS providers/voices, system prompt templates, conversation limits
- `ecosystem.config.cjs` — PM2 process config for queue workers, scheduler, Reverb
- `vite.config.ts` — Vite plugins (Laravel, React compiler, Tailwind, Wayfinder, Sentry)
- `components.json` — shadcn/ui component generator config

### Routes
- `routes/web.php` — Inertia page routes (auth-protected, role-based)
- `routes/api.php` — REST API v1 (Sanctum tokens, 150+ endpoints)
- `routes/twilio.php` — Twilio webhook endpoints (signature verified)
- `routes/settings.php` — Settings sub-routes
- `routes/kyc.php` — KYC verification flow

### UI Component Pattern
- Primitive components: `resources/js/components/ui/` (Radix UI + shadcn wrappers)
- Domain components: `resources/js/components/{campaigns,contacts,calls,ai-agents,sms,softphone,analytics}/`
- Pages: `resources/js/pages/` (~130 pages, mirrors route structure)
- Layouts: `resources/js/layouts/` (app, auth, settings)
- Global state: `SoftphoneContext` for Twilio Device (active call session)

### Background Jobs (Queue)
All async operations run via database-backed Laravel Queue:
- `MakeCampaignCallJob` — initiates individual campaign calls via Twilio
- `ProcessContactImport` — bulk contact CSV processing
- `ProcessSequenceStepsJob` — sequence step execution engine
- `GenerateAISmsResponseJob` — LLM-powered SMS auto-replies
- Scheduled jobs run via `DialN-scheduler` PM2 process (Laravel scheduler)

### Key External Webhooks
| Webhook | Route | Handler |
|---------|-------|---------|
| Twilio call status | `/twilio/*` | `TwimlController`, `TrunkWebhookController` |
| Twilio SMS | `/sms/*` | `SMS\SmsWebhookController` |
| Stripe payment | `/stripe/webhook` | `PaymentService` |
| Razorpay payment | `/razorpay/webhook` | `PaymentService` |
| CRM events | `/api/v1/crm/*` | `CrmIntegrationController` |
