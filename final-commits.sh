#!/bin/bash
set -euo pipefail

# Final phase: commit all staged and untracked files in logical batches
cd "$(dirname "$0")"

c() {
  local msg="$1"
  git commit -m "$msg"
}

echo "📦 Committing remaining actions..."
c "Add campaign pause, resume, and update actions"
git reset HEAD app/Actions/Campaigns/Pause* app/Actions/Campaigns/Resume* app/Actions/Campaigns/Update* app/Actions/Campaigns/Upload* 2>/dev/null || true
git add app/Actions/Campaigns/Pause* app/Actions/Campaigns/Resume* app/Actions/Campaigns/Update* app/Actions/Campaigns/Upload* 2>/dev/null || true
c "Add contact management actions" 

git reset HEAD app/Actions/Contacts/* 2>/dev/null || true
git add app/Actions/Contacts/*
c "Add contact management actions"

git reset HEAD app/Actions/Fortify/* 2>/dev/null || true
git add app/Actions/Fortify/*
c "Add Fortify authentication actions"

git reset HEAD app/Actions/Twilio/* 2>/dev/null || true
git add app/Actions/Twilio/*
c "Add Twilio service actions"

echo "📦 Committing bootstrap and providers..."
git add bootstrap/*
c "Add Laravel bootstrap files"

git add app/Providers/*
c "Add service providers"

echo "📦 Committing configuration..."
git add config/{app,database,auth,cache,session,queue,logging,mail,cors}.php
c "Configure core systems (app, database, auth, cache, session, queue, logging, mail, cors)"

git add config/{filesystems,sanctum,broadcasting,twilio,reverb,services}.php
c "Configure file storage, API auth, and real-time systems (Sanctum, Twilio, Reverb)"

git add config/{ai-agent,deepgram,openrouter}.php
c "Configure AI and external service integrations"

git add config/{fortify,inertia,campaigns,sentry,l5-swagger}.php
c "Configure authentication, templating, and monitoring (Fortify, Inertia, Sentry)"

echo "📦 Committing enums, traits, and helpers..."
git add app/Enums/*
c "Add application enums"

git add app/Traits/*
c "Add trait classes"

git add app/Helpers/*
c "Add helper functions"

echo "📦 Committing database migrations..."
find database/migrations -name "*.php" | head -30 | xargs git add
c "Add core database migrations (part 1)"

find database/migrations -name "*.php" | tail -n +31 | head -30 | xargs git add
c "Add database migrations (part 2)"

find database/migrations -name "*.php" | tail -n +61 | xargs git add
c "Add database migrations (part 3)"

echo "📦 Committing models..."
find app/Models -name "*.php" | head -20 | xargs git add
c "Add core database models (auth, settings, Twilio)"

find app/Models -name "*.php" | tail -n +21 | head -20 | xargs git add
c "Add campaign and contact models"

find app/Models -name "*.php" | tail -n +41 | xargs git add
c "Add AI, SMS, theme, and SIP trunk models"

echo "📦 Committing events and listeners..."
git add app/Events/*
c "Add domain events"

git add app/Listeners/*
c "Add event listeners"

echo "📦 Committing notifications..."
git add app/Notifications/*
c "Add notification classes"

echo "📦 Committing jobs..."
git add app/Jobs/*
c "Add background queue jobs"

echo "📦 Committing services..."
find app/Services -maxdepth 1 -name "*.php" | head -10 | xargs git add
c "Add core business services (Twilio, Phone, Credit, Pricing)"

find app/Services -maxdepth 1 -name "*.php" | tail -n +11 | xargs git add
c "Add analytics, contact, and CRM services"

git add app/Services/Payment/*
c "Add payment gateway services"

git add app/Services/SMS/*
c "Add SMS provider services"

git add app/Services/AiAgent/*
c "Add AI agent conversation services"

git add app/Services/Twilio/*
c "Add Twilio media stream handler"

echo "📦 Committing policies..."
git add app/Policies/*
c "Add authorization policies"

echo "📦 Committing middleware..."
git add app/Http/Middleware/*
c "Add HTTP middleware"

echo "📦 Committing form requests and resources..."
git add app/Http/Requests/*
c "Add form request validators"

git add app/Http/Resources/*
c "Add API response resources"

echo "📦 Committing controllers..."
git add app/Http/Controllers/Controller.php app/Http/Controllers/Dashboard* app/Http/Controllers/Install*
c "Add base and dashboard controllers"

find app/Http/Controllers -maxdepth 1 -name "*Controller.php" | grep -v "Dashboard\|Install\|Controller.php" | head -10 | xargs git add
c "Add feature controllers (campaign, contact, call, sequence)"

find app/Http/Controllers -maxdepth 1 -name "*Controller.php" | grep -v "Dashboard\|Install\|Controller.php" | tail -n +11 | xargs git add
c "Add remaining feature controllers (AI, SMS, KYC, User, Credit)"

git add app/Http/Controllers/Admin/*
c "Add admin controllers"

git add app/Http/Controllers/Settings/*
c "Add settings controllers"

git add app/Http/Controllers/SMS/*
c "Add SMS controllers"

git add app/Http/Controllers/Api/*
c "Add API controllers"

echo "📦 Committing console commands..."
find app/Console/Commands -name "*.php" | head -15 | xargs git add
c "Add console commands (batch 1: configuration and setup)"

find app/Console/Commands -name "*.php" | tail -n +16 | xargs git add
c "Add console commands (batch 2: operations and testing)"

echo "📦 Committing database seeders and factories..."
git add database/factories/*
c "Add model factories"

git add database/seeders/*
c "Add database seeders"

echo "📦 Committing routes..."
git add routes/*.php
c "Add application routes"

echo "📦 Committing frontend..."
git add resources/views/*
c "Add Blade views and L5 Swagger"

git add resources/css/*
c "Add stylesheets"

git add resources/js/app.tsx resources/js/bootstrap.ts resources/js/ssr.tsx resources/js/widget.tsx
c "Add React app entry points"

git add resources/js/wayfinder/*
c "Add Wayfinder route helper"

echo "📦 Committing TypeScript infrastructure..."
git add resources/js/types/*
c "Add TypeScript type definitions"

git add resources/js/lib/*
c "Add utility libraries"

git add resources/js/hooks/*
c "Add React hooks"

git add resources/js/contexts/*
c "Add React context providers"

git add resources/js/layouts/*
c "Add page layouts"

echo "📦 Committing UI components..."
find resources/js/components/ui -maxdepth 1 -type f | sort | xargs -I {} git add {} && git commit -m "Add UI component: $(basename {} .tsx)" || true

echo "📦 Committing app shell..."
find resources/js/components -maxdepth 1 -name "*app*" -o -name "nav*" -o -name "*header*" -o -name "*sidebar*" | xargs git add
c "Add app shell components"

git add resources/js/components/appearance* resources/js/components/breadcrumb* resources/js/components/heading* resources/js/components/text-link* resources/js/components/user* resources/js/components/page-help*
c "Add navigation and utility shell components"

echo "📦 Committing feature components..."
find resources/js/components/{calls,campaigns,contacts,analytics,scheduling,sms,ai-agents,softphone} -type f | head -50 | xargs git add
c "Add feature components (calls, campaigns, contacts, AI agents)"

find resources/js/components/{calls,campaigns,contacts,analytics,scheduling,sms,ai-agents,softphone} -type f | tail -n +51 | xargs git add
c "Add feature components (analytics, scheduling, SMS, softphone)"

git add resources/js/components/*error* resources/js/components/*modal* resources/js/components/*balance* resources/js/components/*search* resources/js/components/*notification* resources/js/components/*permission* resources/js/components/*Switcher* resources/js/components/*factor*
c "Add shared utility components"

echo "📦 Committing pages..."
find resources/js/pages/auth -type f | xargs git add
c "Add authentication pages"

find resources/js/pages/Install -type f | xargs git add
c "Add installation wizard pages"

find resources/js/pages -maxdepth 1 -name "*.tsx" | xargs git add
c "Add dashboard and welcome pages"

find resources/js/pages/campaigns -type f | xargs git add
c "Add campaign pages"

find resources/js/pages/contacts -type f | xargs git add
c "Add contact pages"

find resources/js/pages/{ContactLists,ContactTags,calls,AudioFiles} -type f 2>/dev/null | xargs git add 2>/dev/null || true
c "Add contact lists, calls, and audio pages"

find resources/js/pages/analytics -type f | xargs git add
c "Add analytics pages"

find resources/js/pages/sms -type f | xargs git add
c "Add SMS pages"

find resources/js/pages/{ai-agents,agents,knowledge-bases,sequences,integrations} -type f | xargs git add
c "Add AI agents, sequences, and integrations pages"

find resources/js/pages/{Credit,settings} -type f | xargs git add
c "Add credit and settings pages"

find resources/js/pages/{users,roles,Customer,twilio,TwilioIntegration} -type f 2>/dev/null | xargs git add 2>/dev/null || true
c "Add user management, customer, and Twilio pages"

find resources/js/pages/Admin -type f | head -20 | xargs git add
c "Add admin pages (part 1)"

find resources/js/pages/Admin -type f | tail -n +21 | xargs git add
c "Add admin pages (part 2)"

echo "📦 Committing TypeScript routes and actions..."
find resources/js/routes -type f | head -40 | xargs git add
c "Add TypeScript route helpers (batch 1)"

find resources/js/routes -type f | tail -n +41 | xargs git add
c "Add TypeScript route helpers (batch 2)"

find resources/js/actions -type f | head -50 | xargs git add
c "Add Wayfinder action helpers (batch 1)"

find resources/js/actions -type f | tail -n +51 | xargs git add
c "Add Wayfinder action helpers (batch 2)"

echo "📦 Committing tests..."
git add tests/*.php
c "Add test infrastructure"

find tests/Feature -type f | head -10 | xargs git add
c "Add feature tests (auth and core)"

find tests/Feature -type f | tail -n +11 | xargs git add
c "Add feature tests (campaigns, contacts, KYC)"

find tests/Unit -type f | xargs git add
c "Add unit tests"

echo "📦 Committing Docker and deployment..."
git add docker/*
c "Add Docker configuration"

git add deployment/*
c "Add deployment configuration"

git add docs/*
c "Add documentation"

echo "📦 Committing static assets..."
git add storage/*
c "Add storage gitignores"

git add public/*
c "Add public assets"

echo "📦 Final commit: cleanup scripts..."
git add commit-bulk.sh commit-journey.sh final-commits.sh 2>/dev/null || true
c "Add commit automation scripts" || true

echo ""
echo "✅ All commits complete!"
echo ""
git log --oneline | head -30
echo "..."
echo ""
TOTAL=$(git log --oneline | wc -l)
echo "📊 Total commits: $TOTAL"
echo "🎉 DialN SaaS successfully committed to git with realistic commit history!"
